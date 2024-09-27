"use client";
import React, { useEffect } from "react";
import * as riskModelComponents from "./components";
import { dataType, UIRiskModelType } from "~/types";
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
  const [data, setData] = React.useState<dataType[]>([]);
  const [filteredData, setFilteredData] = React.useState<
    dataType[] | undefined
  >([]);

  const fetchData = async (mrgnClient: MarginfiClient) => {
    const banks = Array.from(mrgnClient.banks.entries());

    const fetchBankData = async (bank: Bank) => {
      const tokenSymbol = bank.tokenSymbol;
      let buyDataObject: dataType | null = null;
      let sellDataObject: dataType | null = null;
      const oraclePricePerBank = mrgnClient.getOraclePriceByBank(bank.address);

      try {
        const buyResponse = await fetch(
          `/api/getCsvData?tokenSymbol=${tokenSymbol}&type=buy`
        );
        if (buyResponse.ok) {
          const buyData = await buyResponse.json();
          const parsedBuyData = parseCSVToObject(buyData.data);

          const health = calculateRiskModelHealthFactor({
            liquidatorCapacity:
              parsedBuyData["tail_risk_profitability_capacity_native"],
            dailyDisplaced: parsedBuyData["daily_displaced_at_risk_native"],
          });

          buyDataObject = {
            health,
            type: "Buy",
            tokenImage: `https://storage.googleapis.com/mrgn-public/mrgn-token-icons/${bank.tokenSymbol}.png`,
            tokenSymbol: bank.tokenSymbol ?? null,
            price: oraclePricePerBank,
            liquidatorCapacity:
              parsedBuyData.tail_risk_profitability_capacity_native,
            currentBankLimit: bank.config.borrowLimit.toString(),
            dailyDisplaced: parsedBuyData["daily_displaced_at_risk_native"],
            target: parsedBuyData.final_target_limit_native,
          };
        } else {
          console.error(`Failed to fetch buy data for ${tokenSymbol}`);
        }
      } catch (error) {
        console.error(`Error fetching buy data for ${tokenSymbol}:`, error);
      }

      try {
        const sellResponse = await fetch(
          `/api/getCsvData?tokenSymbol=${tokenSymbol}&type=sell`
        );
        if (sellResponse.ok) {
          const sellData = await sellResponse.json();
          const parsedSellData = parseCSVToObject(sellData.data);

          const health = calculateRiskModelHealthFactor({
            liquidatorCapacity:
              parsedSellData["tail_risk_profitability_capacity_native"],
            dailyDisplaced: parsedSellData["daily_displaced_at_risk_native"],
          });

          sellDataObject = {
            health,
            type: "Sell",
            tokenImage: `https://storage.googleapis.com/mrgn-public/mrgn-token-icons/${bank.tokenSymbol}.png`,
            tokenSymbol: bank.tokenSymbol ?? null,
            price: oraclePricePerBank,
            liquidatorCapacity:
              parsedSellData.tail_risk_profitability_capacity_native,
            currentBankLimit: bank.config.depositLimit.toString(),
            dailyDisplaced: parsedSellData.daily_displaced_at_risk_native,
            target: parsedSellData.final_target_limit_native,
          };
        } else {
          console.error(`Failed to fetch sell data for ${tokenSymbol}`);
        }
      } catch (error) {
        console.error(`Error fetching sell data for ${tokenSymbol}:`, error);
      }

      if (buyDataObject) {
        setData((prevData) => [...prevData, buyDataObject]);
      }
      if (sellDataObject) {
        setData((prevData) => [...prevData, sellDataObject]);
      }
    };

    const fetchPromises = banks.map(
      ([, bank]) => bank.tokenSymbol && fetchBankData(bank)
    );

    await Promise.all(fetchPromises);
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

  useEffect(() => {
    let _data = filteredData ?? data;
    if (filterValue === "All") {
      _data = data;
    } else {
      _data = data.filter(
        (item) => item.type.toLowerCase() === filterValue.toLowerCase()
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
          items={["All", "Buy", "Sell"]}
        />
      </div>
      <riskModelComponents.TableComponent
        data={filteredData && filteredData.length > 0 ? filteredData : data}
      />
    </div>
  );
};
