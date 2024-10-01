import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "~/components/ui/table";
import Image from "next/image";
import { tokenPriceFormatter, numeralFormatter } from "@mrgnlabs/mrgn-common";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { IconInfoCircle } from "~/components/ui/icons";
import React from "react";
import { healthTableDataType } from "~/types";

interface TableComponentProps {
  data: healthTableDataType[];
}

export const TableComponent = ({ data }: TableComponentProps) => {
  return (
    <div className="h-[75vh] relative overflow-auto bg-foreground dark:bg-background text-background dark:text-foreground transition-colors">
      <Table className="h-fit max-h-80 overflow-y-auto relative">
        <TableHeader className="sticky hover:bg-foreground dark:hover:bg-background top-0 bg-foreground text-background dark:bg-background dark:text-foreground transition-colors">
          <TableRow>
            <TableHead>Health</TableHead>
            <TableHead>Buy/Sell</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Token Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Liquidator Capacity</TableHead>
            <TableHead>Current Bank Limit</TableHead>
            <TableHead>Daily Displaced</TableHead>
            <TableHead>Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-y-auto max-h-[500px]">
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index} className=" transition-colors">
                <TableCell>
                  {row.health ? (
                    row.health.isHealthy ? (
                      <span className="text-green-600">Healthy</span>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600">
                        Unhealthy
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <IconInfoCircle
                                className="text-gray-600 dark:text-gray-300"
                                size={14}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-foreground text-background dark:bg-background dark:text-foreground">
                              <p>{row.health.statusMessage}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )
                  ) : (
                    "Unknown"
                  )}
                </TableCell>
                <TableCell>
                  {row.type === "Buy" ? (
                    <span className="text-green-600">Buy</span>
                  ) : (
                    <span className="text-red-600">Sell</span>
                  )}
                </TableCell>
                <TableCell>
                  <Image src={row.tokenImage} alt={""} width={24} height={24} />
                </TableCell>
                <TableCell>{row.tokenSymbol}</TableCell>
                <TableCell>
                  {tokenPriceFormatter(
                    row.oraclePrice?.priceRealtime?.price?.toNumber()!
                  )}
                </TableCell>
                <TableCell>
                  {row.liquidatorCapacity
                    ? numeralFormatter(Number(row.liquidatorCapacity))
                    : "..."}
                </TableCell>
                <TableCell>
                  {row.currentBankLimit
                    ? numeralFormatter(Number(row.currentBankLimit))
                    : "..."}
                </TableCell>
                <TableCell>
                  {row.dailyDisplaced
                    ? numeralFormatter(Number(row.dailyDisplaced))
                    : "..."}
                </TableCell>
                <TableCell>
                  {row.target ? numeralFormatter(Number(row.target)) : "..."}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              {Array.from({ length: 9 }).map((_, index) => (
                <TableCell key={index}>
                  <div className="h-4 bg-muted rounded-md animate-pulse w-24 dark:bg-muted transition-colors"></div>
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
