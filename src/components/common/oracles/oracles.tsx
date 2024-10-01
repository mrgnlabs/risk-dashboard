"use client";
import React from "react";
import * as staleOracleComponents from "./components";
import * as globalComponents from "~/components/common/global-components";
import { oracleData } from "~/types";
import { useMrgnStore } from "~/stores";
import { Connection } from "@solana/web3.js";
import { MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { isBankOracleStale } from "~/utils/general-utils";
import { Button } from "~/components/ui/button";
import { IconLoader } from "~/components/ui/icons";

type filterValue = "All" | "Stale" | "Not stale";

export const Oracles = () => {
  const [filterValue, setFilterValue] = React.useState<filterValue>("All");
  const [filteredData, setFilteredData] = React.useState<
    oracleData[] | undefined
  >([]);
  const [oracleData, setData] = React.useState<oracleData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { fetchMrgnClient, mrgnClient, refetchMrgnClient } = useMrgnStore();

  const fetchData = (mrgnClient: MarginfiClient) => {
    const banks = Array.from(mrgnClient.banks.values());

    const formattedData = banks
      .filter((bank) => bank.tokenSymbol)
      .map((bank) => {
        const oraclePricePerBank = mrgnClient.getOraclePriceByBank(
          bank.address
        );
        const tvl = bank.computeTvl(oraclePricePerBank!);
        const _isBankOracleStale = isBankOracleStale(bank, oraclePricePerBank!);
        return {
          tokenImage: `https://storage.googleapis.com/mrgn-public/mrgn-token-icons/${bank.tokenSymbol}.png`,
          tokenSymbol: bank.tokenSymbol ?? null,
          oraclePrice: oraclePricePerBank,
          tvl: tvl.toNumber(),
          isStale: _isBankOracleStale,
        } as oracleData;
      })
      .sort((a, b) => b.tvl - a.tvl);

    setIsLoading(false);
    setData(formattedData);
  };

  const handleRefresh = () => {
    setData([]);
    setFilteredData([]);
    setIsLoading(true);

    const connection = new Connection( // eslint-disable-next-line
      process.env.NEXT_PUBLIC_MARGINFI_RPC_ENDPOINT!,
      "confirmed"
    );
    refetchMrgnClient({ connection });
  };

  React.useEffect(() => {
    const connection = new Connection( // eslint-disable-next-line
      process.env.NEXT_PUBLIC_MARGINFI_RPC_ENDPOINT!,
      "confirmed"
    );
    fetchMrgnClient({ connection });

    const interval = setInterval(() => {
      refetchMrgnClient({ connection });
    }, 30000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (mrgnClient) {
      fetchData(mrgnClient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mrgnClient]);

  React.useEffect(() => {
    let _data = filteredData ?? oracleData;
    switch (filterValue) {
      case "All":
        _data = oracleData;
        break;
      case "Stale":
        _data = oracleData.filter((item) => item.isStale);
        break;
      case "Not stale":
        _data = oracleData.filter((item) => !item.isStale);
        break;
      default:
        _data = [];
        break;
    }

    setFilteredData(_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, oracleData]);

  return (
    <div className="w-full p-3 sm:p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <Button
          className="w-20 dark:bg-white border-background bg-black text-white dark:text-black transition-colors hover:bg-black/90 hover:text-white"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading ? <IconLoader /> : "Refresh"}
        </Button>
        <staleOracleComponents.LiveClock />
        <globalComponents.FilterComponent
          selectedFilter={filterValue}
          setSelectedFilter={
            setFilterValue as React.Dispatch<React.SetStateAction<string>>
          }
          items={["All", "Stale", "Not stale"]}
        />
      </div>

      <staleOracleComponents.GridComponent
        data={
          filteredData && filteredData.length > 0 ? filteredData : oracleData
        }
      />
    </div>
  );
};
