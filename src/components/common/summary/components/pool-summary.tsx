import { numeralFormatter } from "@mrgnlabs/mrgn-common";
import { BankSummaryValues } from "~/constants/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface PoolSummaryProps {
  poolName: string;
  poolData: BankSummaryValues;
}

export const PoolSummary = ({ poolName, poolData }: PoolSummaryProps) => {
  return (
    <div className="flex flex-col w-full px-2 sm:px-0 gap-2 items-start justify-center">
      <h2 className="text-2xl font-medium text-background dark:text-foreground">
        {poolName}
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  return (
    <Card className="bg-foreground text-background dark:bg-background dark:text-foreground transition-colors">
      <CardHeader>
        <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-background dark:text-foreground">
          {poolName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {poolNumber === undefined ? (
          <div className="animate-pulse h-6 w-24 bg-muted rounded-md text-muted-foreground" />
        ) : (
          <p>{numeralFormatter(poolNumber)}</p>
        )}
      </CardContent>
    </Card>
  );
};
