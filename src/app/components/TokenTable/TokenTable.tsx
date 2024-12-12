import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/components/ui/table";
import { TokenInfo } from "@/src/app/types/token";
import { formatUnits } from "viem";

interface TokenTableProps {
  tokens: TokenInfo[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => (
          <TableRow key={token.address}>
            <TableCell>{token.name}</TableCell>
            <TableCell>{token.symbol}</TableCell>
            <TableCell>
              {formatUnits(token.balance, token.decimals)} {token.symbol}
            </TableCell>
            <TableCell className="font-mono">{token.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
