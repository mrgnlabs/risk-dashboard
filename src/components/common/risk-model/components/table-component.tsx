import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "~/components/ui/table";
import { dataType } from "../risk-model";
import Image from "next/image";
import { tokenPriceFormatter } from "@mrgnlabs/mrgn-common";

interface TableComponentProps {
  data: dataType[];
}

export const TableComponent = ({ data }: TableComponentProps) => {
  return (
    <Table className="my-4">
      <TableHeader>
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
      <TableBody>
        {data.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {row.health.isHealthy ? (
                  <span className="text-green-600">Healthy</span>
                ) : (
                  <span className="text-red-600">Unhealthy</span>
                )}
                {/* TODO: add indicators */}
              </TableCell>
              <TableCell>
                {row.type === "Buy" ? (
                  <span className="text-green-600">Buy</span>
                ) : (
                  <span className="text-red-600">Sell</span>
                )}
              </TableCell>
              <TableCell>
                <Image src={row.tokenImage} alt={""} width={24} height={24} />{" "}
              </TableCell>
              <TableCell>{row.tokenSymbol}</TableCell>
              <TableCell>
                {tokenPriceFormatter(
                  row.price?.priceRealtime?.price?.toNumber()!
                )}
              </TableCell>
              <TableCell>
                {Number(row.liquidatorCapacity)?.toFixed(2)}
              </TableCell>
              <TableCell>{Number(row.currentBankLimit)?.toFixed(2)}</TableCell>
              <TableCell>{Number(row.dailyDisplaced)?.toFixed(2)}</TableCell>
              <TableCell>{Number(row.target)?.toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

// TODO: add indicators, format numbers, add sorting
