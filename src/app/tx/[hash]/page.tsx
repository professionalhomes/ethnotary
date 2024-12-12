"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useChainId,
  usePublicClient,
  useWatchPendingTransactions,
} from "wagmi";
import { formatEther, formatUnits } from "viem";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { ExplorerLink } from "@/src/app/components/ExternalLinks";
import { Skeleton } from "@/src/app/components/ui/skeleton";
import { Badge } from "@/src/app/components/ui/badge";
import { cn } from "../../lib/utils";
import { CopyButton } from "../../components/Helper/CopyButton";

interface TransactionDetails {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  nonce: number;
  gasLimit: bigint;
  gasPrice: bigint;
  gasUsed?: bigint;
  status?: "success" | "reverted";
  blockNumber?: bigint;
  blockHash?: string;
  timestamp?: number;
  data: string;
  chainId: number;
}

export default function TransactionPage() {
  const params = useParams();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!params.hash) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch transaction, receipt, and block data in parallel
        const [tx, receipt] = await Promise.all([
          publicClient.getTransaction({ hash: params.hash as `0x${string}` }),
          publicClient.getTransactionReceipt({
            hash: params.hash as `0x${string}`,
          }),
        ]);

        if (!tx) {
          setError("Transaction not found");
          return;
        }

        // Fetch block data if we have a block number
        let block;
        if (receipt?.blockNumber) {
          block = await publicClient.getBlock({
            blockNumber: receipt.blockNumber,
          });
        }

        setTransaction({
          hash: tx.hash,
          from: tx.from,
          to: tx.to || "0x",
          value: tx.value,
          nonce: tx.nonce,
          gasLimit: tx.gas,
          gasPrice: tx.gasPrice || 0n,
          gasUsed: receipt?.gasUsed,
          status: receipt?.status,
          blockNumber: tx.blockNumber,
          blockHash: tx.blockHash,
          timestamp: block ? Number(block.timestamp) : undefined,
          data: tx.input,
          chainId: chainId,
        });
      } catch (err) {
        console.error("Error fetching transaction:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch transaction details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [params.hash, publicClient, chainId]);

  if (loading) {
    return <TransactionSkeleton />;
  }

  if (error || !transaction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error || "Transaction not found"}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction Details</CardTitle>
          <Badge
            variant={transaction.status === "success" ? "success" : "secondary"}
          >
            {transaction.status === "success" ? "Success" : "Failed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transaction Hash */}
        <DetailRow
          label="Transaction Hash"
          value={
            <div className="flex items-center gap-2 justify-between">
              <CopyButton text={transaction.hash} />
              <ExplorerLink hash={transaction.hash} type="transaction" />
            </div>
          }
        />

        {/* Status and Block Info */}
        <div className="flex gap-2 justify-between">
          <DetailRow
            label="Block"
            value={
              transaction.blockNumber ? (
                <ExplorerLink
                  hash={transaction.blockNumber.toString() || ""}
                  type="block"
                  text={transaction.blockNumber.toString()}
                />
              ) : (
                "Pending"
              )
            }
          />
          <DetailRow
            label="Timestamp"
            value={
              transaction.timestamp
                ? new Date(transaction.timestamp * 1000).toLocaleString()
                : "Pending"
            }
            textAlign="right"
          />
        </div>

        {/* From/To Addresses */}
        <DetailRow
          label="From"
          value={
            <div className="flex items-center gap-2 justify-between">
              <CopyButton text={transaction.from} />
              <ExplorerLink hash={transaction.from} type="address" />
            </div>
          }
        />
        <DetailRow
          label="To"
          value={
            <div className="flex items-center gap-2 justify-between">
              <CopyButton text={transaction.to} />
              <ExplorerLink hash={transaction.to} type="address" />
            </div>
          }
        />

        {/* Value and Nonce */}
        <div className="flex items-center gap-2 justify-between">
          <DetailRow
            label="Value"
            value={`${formatEther(transaction.value)} ETH`}
          />
          <DetailRow
            label="Nonce"
            value={transaction.nonce.toString()}
            textAlign="right"
          />
        </div>

        {/* Gas Information */}
        <div className="flex items-center gap-2 justify-between">
          <DetailRow
            label="Gas Limit"
            value={formatUnits(transaction.gasLimit, 0)}
          />
          <DetailRow
            label="Gas Price"
            value={`${formatUnits(transaction.gasPrice, 9)} Gwei`}
            textAlign="center"
          />
          <DetailRow
            label="Gas Used"
            value={
              transaction.gasUsed
                ? formatUnits(transaction.gasUsed, 0)
                : "Pending"
            }
            textAlign="right"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Input Data</h3>
          <div className="bg-gray-50 p-4 rounded-lg break-all font-mono text-sm">
            {transaction.data === "0x" ? "(none)" : transaction.data}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({
  label,
  value,
  textAlign = "left",
}: {
  label: string;
  value: React.ReactNode;
  textAlign?: "left" | "right" | "center";
}) {
  return (
    <div className="flex flex-col space-y-1">
      <span
        className={cn(
          "text-sm font-medium text-gray-500",
          textAlign === "right" && "text-right",
          textAlign === "center" && "text-center"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-medium",
          textAlign === "center" && "text-center",
          textAlign === "right" && "text-right"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function TransactionSkeleton() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
