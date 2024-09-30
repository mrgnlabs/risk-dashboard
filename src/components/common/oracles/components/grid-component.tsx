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
import { OraclePrice } from "@mrgnlabs/marginfi-client-v2";
import { IconExclamationCircle } from "~/components/ui/icons";

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
                iconURI={row.tokenImage}
                symbol={row.tokenSymbol!}
                oraclePrice={row.oraclePrice!}
                isStale={row.isStale}
              />
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

const Card = (info: {
  symbol: string;
  iconURI: string;
  oraclePrice: OraclePrice;
  isStale: boolean;
}) => {
  return (
    <div className="flex gap-2 w-full flex-col items-center justify-center sm:w-52 h-52 p-4 bg-black border-background-gray-light/50 rounded-md">
      <Image src={info.iconURI} alt={""} width={48} height={48} />{" "}
      <h4 className="text-2xl">{info.symbol}</h4>
      <span>
        {tokenPriceFormatter(
          info.oraclePrice?.priceRealtime?.price?.toNumber()
        )}
      </span>
      {info.isStale && (
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IconExclamationCircle className="text-red-600" size={24} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{`Last updated: ${new Date(
                  info.oraclePrice.timestamp.toNumber()
                )?.toTimeString()}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-red-600">Stale</span>
        </div>
      )}
    </div>
  );
};
