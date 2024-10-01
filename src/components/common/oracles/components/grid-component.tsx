import Image from "next/image";
import { tokenPriceFormatter } from "@mrgnlabs/mrgn-common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import React from "react";
import { oracleData } from "~/types";
import { IconExclamationCircle } from "~/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface GridComponentProps {
  data: oracleData[];
}

export const GridComponent = ({ data }: GridComponentProps) => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4">
        {data.length > 0
          ? data.map((row, index) => (
              <Card
                key={index}
                className="bg-foreground text-background gap-4 dark:bg-background dark:text-foreground transition-colors flex w-full flex-col items-center sm:w-52 h-52 p-4"
              >
                <CardHeader className="flex flex-col gap-2 p-2 justify-center items-center">
                  <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-background dark:text-foreground">
                    {row.tokenSymbol}
                  </CardTitle>
                  <CardDescription>
                    <Image
                      src={row.tokenImage}
                      alt={""}
                      width={48}
                      height={48}
                    />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span>
                    {tokenPriceFormatter(
                      row.oraclePrice?.priceRealtime?.price?.toNumber() ?? 0
                    )}
                  </span>
                  {row.isStale && (
                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <IconExclamationCircle
                              className="text-red-600"
                              size={24}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{`Last updated: ${new Date(
                              row.oraclePrice?.timestamp.toNumber() ?? 0
                            )?.toTimeString()}`}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-red-600">Stale</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-52 bg-muted rounded-md animate-pulse w-full sm:w-52"
              />
            ))}
      </div>
    </div>
  );
};
