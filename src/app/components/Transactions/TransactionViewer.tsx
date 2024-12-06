"use client";
import { useState } from "react";
import { useContractRead, useWriteContract, useAccount } from "wagmi";
import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { useToast } from "@/src/app/hooks/use-toast";
import { MULTI_SIGNATURE_ACCOUNT } from "@/src/app/constants/addresses";
import { MULTI_SIGNATURE_ACCOUNT_ABI } from "@/src/app/constants/abi/MultiSignatureWallet";
import { Address } from "viem";
import Spinner from "@/src/app/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/components/ui/table";
import { Badge } from "@/src/app/components/ui/badge";
import { shortenAddress } from "@/src/app/lib/utils";

interface Transaction {
  id: number;
  to: Address;
  value: bigint;
  data: string;
  executed: boolean;
  numConfirmations: number;
  isConfirmedByCurrentUser: boolean;
}

const TransactionViewer = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Contract Read Operations
  const { data: transactions, isLoading: isLoadingTx } = useContractRead({
    address: MULTI_SIGNATURE_ACCOUNT,
    abi: MULTI_SIGNATURE_ACCOUNT_ABI,
    functionName: "getTransactions",
  });

  const { data: numConfirmationsRequired } = useContractRead({
    address: MULTI_SIGNATURE_ACCOUNT,
    abi: MULTI_SIGNATURE_ACCOUNT_ABI,
    functionName: "numConfirmationsRequired",
  });

  // Contract Write Operations
  const { writeContract: confirmTransaction, isPending: isConfirming } =
    useWriteContract();
  const { writeContract: executeTransaction, isPending: isExecuting } =
    useWriteContract();
  const { writeContract: revokeConfirmation, isPending: isRevoking } =
    useWriteContract();

  const handleConfirm = async (txId: number) => {
    try {
      await confirmTransaction({
        address: MULTI_SIGNATURE_ACCOUNT,
        abi: MULTI_SIGNATURE_ACCOUNT_ABI,
        functionName: "confirmTransaction",
        args: [BigInt(txId)],
      });

      toast({
        title: "Success",
        description: "Transaction confirmation submitted",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleExecute = async (txId: number) => {
    try {
      await executeTransaction({
        address: MULTI_SIGNATURE_ACCOUNT,
        abi: MULTI_SIGNATURE_ACCOUNT_ABI,
        functionName: "executeTransaction",
        args: [BigInt(txId)],
      });

      toast({
        title: "Success",
        description: "Transaction execution submitted",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleRevoke = async (txId: number) => {
    try {
      await revokeConfirmation({
        address: MULTI_SIGNATURE_ACCOUNT,
        abi: MULTI_SIGNATURE_ACCOUNT_ABI,
        functionName: "revokeConfirmation",
        args: [BigInt(txId)],
      });

      toast({
        title: "Success",
        description: "Confirmation revocation submitted",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (isLoadingTx) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner className="text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          View and manage multi-signature transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Confirmations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((tx: Transaction) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{shortenAddress(tx.to)}</TableCell>
                <TableCell>{tx.value.toString()} ETH</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.executed ? "success" : "secondary"}
                    className="capitalize"
                  >
                    {tx.executed ? "Executed" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tx.numConfirmations} / {numConfirmationsRequired?.toString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {!tx.executed && !tx.isConfirmedByCurrentUser && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirm(tx.id)}
                        disabled={isConfirming}
                      >
                        {isConfirming ? (
                          <Spinner className="text-white h-4 w-4" />
                        ) : (
                          "Confirm"
                        )}
                      </Button>
                    )}
                    {!tx.executed && tx.isConfirmedByCurrentUser && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRevoke(tx.id)}
                        disabled={isRevoking}
                      >
                        {isRevoking ? (
                          <Spinner className="text-white h-4 w-4" />
                        ) : (
                          "Revoke"
                        )}
                      </Button>
                    )}
                    {!tx.executed &&
                      tx.numConfirmations >=
                        (numConfirmationsRequired || 0) && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleExecute(tx.id)}
                          disabled={isExecuting}
                        >
                          {isExecuting ? (
                            <Spinner className="text-white h-4 w-4" />
                          ) : (
                            "Execute"
                          )}
                        </Button>
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionViewer;
