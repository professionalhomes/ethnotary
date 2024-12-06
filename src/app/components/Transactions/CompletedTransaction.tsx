"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePublicClient } from "wagmi";
import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import Spinner from "@/src/app/components/ui/spinner";
import { formatEther } from "viem";
import { cn } from "@/src/app/lib/utils";
import { ExternalLink, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface TransactionDetails {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  gasUsed: bigint;
  status: boolean;
  blockNumber: bigint;
  timestamp: number;
}

const CompletedTransaction = () => {
  const params = useParams();
  const router = useRouter();
  const publicClient = usePublicClient();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const txHash = params.txHash as string;

  useEffect(() => {
    fetchTransactionDetails();
  }, [txHash, publicClient]);

  const fetchTransactionDetails = async () => {
    if (!txHash) {
      setError("No transaction hash provided");
      setLoading(false);
      return;
    }

    try {
      const [tx, receipt, block] = await Promise.all([
        publicClient.getTransaction({ hash: txHash as `0x${string}` }),
        publicClient.getTransactionReceipt({ hash: txHash as `0x${string}` }),
        publicClient.getBlock({ blockHash: receipt.blockHash }),
      ]);

      if (tx && receipt && block) {
        setTransaction({
          hash: tx.hash,
          from: tx.from,
          to: tx.to || "0x",
          value: tx.value,
          gasUsed: receipt.gasUsed,
          status: receipt.status === "success",
          blockNumber: tx.blockNumber!,
          timestamp: Number(block.timestamp),
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error fetching transaction details");
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-muted-foreground">Loading transaction details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
          <XCircle className="h-12 w-12 text-destructive" />
          <CardTitle className="text-destructive">{error}</CardTitle>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!transaction) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
          <XCircle className="h-12 w-12 text-muted-foreground" />
          <CardTitle className="text-muted-foreground">
            Transaction Not Found
          </CardTitle>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {transaction.status ? (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          ) : (
            <XCircle className="h-12 w-12 text-destructive" />
          )}
        </div>
        <CardTitle
          className={cn(
            "text-2xl",
            transaction.status ? "text-green-500" : "text-destructive"
          )}
        >
          Transaction {transaction.status ? "Completed" : "Failed"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Transaction Hash:</span>
            <span className="font-mono">{formatAddress(transaction.hash)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">From:</span>
            <span className="font-mono">{formatAddress(transaction.from)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">To:</span>
            <span className="font-mono">{formatAddress(transaction.to)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Value:</span>
            <span>{formatEther(transaction.value)} ETH</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Gas Used:</span>
            <span>{transaction.gasUsed.toString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Block Number:</span>
            <span>{transaction.blockNumber.toString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Timestamp:</span>
            <span>{formatTimestamp(transaction.timestamp)}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `https://sepolia.etherscan.io/tx/${transaction.hash}`,
                "_blank"
              )
            }
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Etherscan
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedTransaction;
