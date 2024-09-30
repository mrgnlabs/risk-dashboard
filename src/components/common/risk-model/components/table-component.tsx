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
    <div className="h-[75vh] relative overflow-auto">
      <Table className="h-fit max-h-80 overflow-y-auto relative">
        <TableHeader className="sticky top-0 bg-black">
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
              <TableRow key={index}>
                <TableCell>
                  {row.health.isHealthy ? (
                    <span className="text-green-600">Healthy</span>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600">
                      Unhealthy
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <IconInfoCircle
                              className="text-gray-600"
                              size={14}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{row.health.statusMessage}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
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
                  {numeralFormatter(Number(row.liquidatorCapacity))}
                </TableCell>
                <TableCell>
                  {numeralFormatter(Number(row.currentBankLimit))}
                </TableCell>
                <TableCell>
                  {numeralFormatter(Number(row.dailyDisplaced))}
                </TableCell>
                <TableCell>{numeralFormatter(Number(row.target))}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24	"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-20"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-16"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
              <TableCell>
                <div className="h-4 bg-muted rounded-md animate-pulse w-24"></div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
