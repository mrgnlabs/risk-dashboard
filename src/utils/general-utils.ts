import { nativeToUi } from "@mrgnlabs/mrgn-common";
import {
  Bank,
  MarginfiClient,
  OraclePrice,
} from "@mrgnlabs/marginfi-client-v2";
import { BankSummaryValues } from "~/constants/interfaces";
import { HealthCheckResult, RiskModelData } from "~/types";

const calculateTotals = (
  banks: Bank[],
  client: MarginfiClient
): BankSummaryValues => {
  let totalTvl = 0;
  let totalDeposits = 0;
  let totalBorrows = 0;

  for (const bank of banks) {
    const oraclePricePerBank = client.getOraclePriceByBank(bank.address);
    if (!oraclePricePerBank) continue;
    const realTimePrice =
      oraclePricePerBank.priceRealtime.price?.toNumber() ?? 0;

    const tvlPerBank = bank.computeTvl(oraclePricePerBank).toNumber();
    const totalDepositsQuantity = bank.getTotalAssetQuantity().toNumber();
    const totalBorrowsQuantity = bank.getTotalLiabilityQuantity().toNumber();

    totalTvl += tvlPerBank * realTimePrice;
    totalDeposits +=
      nativeToUi(totalDepositsQuantity, bank.mintDecimals) * realTimePrice;
    totalBorrows +=
      nativeToUi(totalBorrowsQuantity, bank.mintDecimals) * realTimePrice;
  }

  return {
    totalTvl: Math.round(totalTvl * 100) / 100,
    totalDeposits: Math.round(totalDeposits * 100) / 100,
    totalBorrows: Math.round(totalBorrows * 100) / 100,
    totalLoans: 0, // TODO: compute total number of loans once cached in the api
  };
};

const calculateRiskModelHealthFactor = (
  data: RiskModelData
): HealthCheckResult => {
  const liquidatorCapacity = parseFloat(data.liquidatorCapacity);
  const dailyDisplaced = parseFloat(data.dailyDisplaced);

  const healthFactor = liquidatorCapacity - dailyDisplaced;
  const isHealthy = liquidatorCapacity > dailyDisplaced;
  const statusMessage = isHealthy
    ? "The bank is healthy with sufficient liquidity."
    : "The bank is at risk due to insufficient liquidator capacity.";

  return {
    isHealthy,
    healthFactor,
    statusMessage,
  };
};

const parseCSVToObject = (csvText: string) => {
  const rows = csvText.trim().split("\n");
  const headers = rows[0].split(",");
  const dataRow = rows[1].split(",");

  const parsedObject = Object.fromEntries(
    headers.map((header, index) => [header, dataRow[index] || ""])
  ) as Record<string, string>;

  return parsedObject;
};

function isBankOracleStale(bank: Bank, oraclePrice: OraclePrice) {
  const maxAge = bank.config.oracleMaxAge;
  const currentTime = Math.round(Date.now() / 1000);
  const oracleTime = Math.round(
    oraclePrice.timestamp
      ? oraclePrice.timestamp.toNumber()
      : new Date().getTime()
  );
  const isStale = currentTime - oracleTime > maxAge;

  return isStale;
}

export {
  calculateTotals,
  calculateRiskModelHealthFactor,
  parseCSVToObject,
  isBankOracleStale,
};
