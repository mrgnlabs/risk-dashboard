"use client";
import React from "react";
import * as riskModelComponents from "./components";
import { healthTableDataType, UIRiskModelType } from "~/types";
import { useMrgnStore } from "~/stores";
import { Connection } from "@solana/web3.js";
import { Bank, MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import * as globalComponents from "~/components/common/global-components";
import {
  calculateRiskModelHealthFactor,
  parseCSVToObject,
} from "~/utils/general-utils";

export const RiskModel = () => {
  const [searchValue, setSearchValue] = React.useState<string | undefined>();
  const [filterValue, setFilterValue] = React.useState<UIRiskModelType>("All");
  const { fetchMrgnClient, mrgnClient } = useMrgnStore();
  const [data, setData] = React.useState<healthTableDataType[]>([]);
  const [filteredData, setFilteredData] = React.useState<
    healthTableDataType[] | undefined
  >([]);

  const fetchData = async (mrgnClient: MarginfiClient) => {
    const banks = Array.from(mrgnClient.banks.entries());

    const fetchBankDataForType = async (
      bank: Bank,
      type: "buy" | "sell",
      configLimit: string
    ): Promise<healthTableDataType> => {
      const tokenAddress = bank.mint.toString();
      const oraclePricePerBank = mrgnClient.getOraclePriceByBank(bank.address);
      let parsedData = null;

      try {
        const response = await fetch(
          `/api/getCsvData?tokenAddress=${tokenAddress}&type=${type}`
        );

        if (response.ok) {
          const data = await response.json();
          parsedData = parseCSVToObject(data.data);
        }
      } catch (error) {
        // If the fetch fails, parsedData remains null, ensuring an entry is still created
      }

      const health = parsedData
        ? calculateRiskModelHealthFactor({
            liquidatorCapacity:
              parsedData["tail_risk_profitability_capacity_native"],
            dailyDisplaced: parsedData["daily_displaced_at_risk_native"],
          })
        : undefined;

      const tvl = bank.computeTvl(oraclePricePerBank!);

      return {
        health,
        type: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize "buy" or "sell"
        tokenImage: `https://storage.googleapis.com/mrgn-public/mrgn-token-icons/${bank.tokenSymbol}.png`,
        tokenSymbol: bank.tokenSymbol ?? null,
        oraclePrice: oraclePricePerBank,
        liquidatorCapacity: parsedData
          ? parsedData.tail_risk_profitability_capacity_native
          : null,
        currentBankLimit: configLimit,
        dailyDisplaced: parsedData
          ? parsedData.daily_displaced_at_risk_native
          : null,
        target: parsedData ? parsedData.final_target_limit_native : null,
        tvl: tvl.toNumber(),
      };
    };

    const fetchBankData = async (bank: Bank) => {
      const [buyDataObject, sellDataObject] = await Promise.all([
        fetchBankDataForType(bank, "buy", bank.config.borrowLimit.toString()),
        fetchBankDataForType(bank, "sell", bank.config.depositLimit.toString()),
      ]);

      setData((prevData) => [...prevData, buyDataObject, sellDataObject]);
    };

    await Promise.all(
      banks.map(([, bank]) => bank.tokenSymbol && fetchBankData(bank))
    );

    setData((prevData) =>
      prevData
        .sort((a, b) =>
          a.tokenSymbol && b.tokenSymbol
            ? a.tokenSymbol.localeCompare(b.tokenSymbol)
            : 0
        )
        .sort((a, b) => b.tvl - a.tvl)
    );
  };

  React.useEffect(() => {
    if (!mrgnClient) {
      const connection = new Connection( // eslint-disable-next-line
        process.env.NEXT_PUBLIC_MARGINFI_RPC_ENDPOINT!,
        "confirmed"
      );
      fetchMrgnClient({ connection });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (mrgnClient) fetchData(mrgnClient);
  }, [mrgnClient]);

  React.useEffect(() => {
    let _data = filteredData ?? data;
    if (filterValue === "All") {
      _data = data;
    } else if (filterValue === "Buy" || filterValue === "Sell") {
      _data = data.filter(
        (item) => item.type.toLowerCase() === filterValue.toLowerCase()
      );
    } else if (
      filterValue === "Healthy" ||
      filterValue === "Unhealthy" ||
      filterValue === "Unknown"
    ) {
      _data = data.filter((item) =>
        item.health
          ? filterValue === "Healthy"
            ? item.health.isHealthy
            : filterValue === "Unhealthy" && !item.health.isHealthy
          : filterValue === "Unknown"
      );
    }

    if (searchValue) {
      _data = _data.filter((item) =>
        item.tokenSymbol?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredData(_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, searchValue]);

  return (
    <div className="w-full p-3 sm:p-6 flex flex-col gap-4">
      <div className="flex justify-between ">
        <globalComponents.SearchComponent
          placeHolder="Search by token symbol"
          value={searchValue}
          setValue={setSearchValue}
        />
        <globalComponents.FilterComponent
          selectedFilter={filterValue}
          setSelectedFilter={
            setFilterValue as React.Dispatch<React.SetStateAction<string>>
          }
          items={[
            ["All"],
            ["Buy", "Sell"],
            ["Healthy", "Unhealthy", "Unknown"],
          ]}
        />
      </div>
      <riskModelComponents.TableComponent
        data={filteredData && filteredData.length > 0 ? filteredData : data}
      />
    </div>
  );
};
