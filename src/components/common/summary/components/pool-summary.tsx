import { BankSummaryValues } from "~/constants/interfaces";
import { formatNumber } from "~/utils/general-utils";

interface PoolSummaryProps {
  poolName: string;
  poolData: BankSummaryValues;
}

export const PoolSummary = ({ poolName, poolData }: PoolSummaryProps) => {
  return (
    <div className="flex flex-col w-full px-2 sm:px-0 gap-2 items-start justify-center">
      <h2 className="text-2xl font-medium">{poolName}</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PoolItem
          poolName={"Total number of loans"}
          poolNumber={poolData?.totalLoans}
        />
        <PoolItem
          poolName={"Total deposits (USD)"}
          poolNumber={poolData?.totalDeposits}
        />
        <PoolItem
          poolName={"Total borrows (USD)"}
          poolNumber={poolData?.totalBorrows}
        />
        <PoolItem poolName={"TVL (USD)"} poolNumber={poolData?.totalTvl} />
      </div>
    </div>
  );
};

interface PoolItemProps {
  poolName: string;
  poolNumber?: number;
}

const PoolItem = ({ poolName, poolNumber }: PoolItemProps) => {
  if (poolNumber === undefined) {
    return <LoadingItem poolName={poolName} />;
  }

  return (
    <div className="flex flex-col items-start justify-center w-full h-16">
      <h3 className="text-md sm:text-l font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {poolName}
      </h3>
      <h1 className="text-xl sm:text-2xl font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {formatNumber(poolNumber)}
      </h1>
    </div>
  );
};

const LoadingItem = ({ poolName }: { poolName: string }) => {
  return (
    <div className="flex flex-col items-start justify-center w-full h-16">
      <h3 className="text-md sm:text-l font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {poolName}
      </h3>
      <div className="h-[1.75rem] sm:h-[2rem] w-24 bg-muted rounded-md animate-pulse"></div>
    </div>
  );
};
