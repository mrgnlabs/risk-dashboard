import { nativeToUi } from "@mrgnlabs/mrgn-common";
import { Bank, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { BankSummaryValues } from "~/constants/interfaces";

const formatNumber = (number: number | string): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
    totalLoans: 0, // TODO: fix
  };
};

export { formatNumber, calculateTotals };
