"use client";
import { Separator } from "~/components/ui/separator";
import * as summaryComponents from "./components";
import React from "react";
import { MarginfiClient } from "@mrgnlabs/marginfi-client-v2";
import { BankSummaryValues } from "~/constants/interfaces";
import { useMrgnStore } from "~/stores";
import { Connection } from "@solana/web3.js";
import { calculateTotals } from "~/utils/general-utils";
import { UIPoolType } from "~/types";

export const Summary = () => {
  const [selectedPool, setSelectedPool] =
    React.useState<UIPoolType>("All pools");
  const [collateralBanksValues, setCollateralBanksValues] = React.useState<
    BankSummaryValues | undefined
  >(undefined);
  const [isolatedBanksValues, setIsolatedBanksValues] = React.useState<
    BankSummaryValues | undefined
  >(undefined);
  const { fetchMrgnClient, mrgnClient } = useMrgnStore();

  const getBanks = async (client: MarginfiClient) => {
    const banksArray = Array.from(client.banks.values());
    setCollateralBanksValues(
      calculateTotals(
        banksArray.filter((bank) => bank.config.riskTier === "Collateral"),
        client
      )
    );
    setIsolatedBanksValues(
      calculateTotals(
        banksArray.filter((bank) => bank.config.riskTier === "Isolated"),
        client
      )
    );
  };

  React.useEffect(() => {
    const connection = new Connection( // eslint-disable-next-line
      process.env.NEXT_PUBLIC_MARGINFI_RPC_ENDPOINT!,
      "confirmed"
    );
    fetchMrgnClient({ connection });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (mrgnClient) getBanks(mrgnClient);
  }, [mrgnClient]);

  return (
    <div className="flex flex-col items-center w-full p-2 sm:py-4 sm:px-6 gap-3">
      <div className="flex justify-between items-center w-full gap-2 ">
        <h1 className="text-4xl font-medium">Summary</h1>
        <summaryComponents.FilterComponent
          setSelectedPool={setSelectedPool}
          selectedPool={selectedPool}
        />
      </div>
      <Separator />
      <div className="w-full gap-6 flex flex-col items-center justify-center">
        {selectedPool === "All pools" && (
          <>
            <summaryComponents.PoolSummary
              poolName="Global pools"
              poolData={collateralBanksValues!}
            />
            <Separator />

            <summaryComponents.PoolSummary
              poolName="Isolated pools"
              poolData={isolatedBanksValues!}
            />
          </>
        )}

        {selectedPool === "Global pools" && (
          <summaryComponents.PoolSummary
            poolName="Global pools"
            poolData={collateralBanksValues!}
          />
        )}

        {selectedPool === "Isolated pools" && (
          <summaryComponents.PoolSummary
            poolName="Isolated pools"
            poolData={isolatedBanksValues!}
          />
        )}
      </div>
    </div>
  );
};