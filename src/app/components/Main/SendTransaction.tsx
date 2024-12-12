"use client";
import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { toast } from "../../hooks/use-toast";
import { ExplorerLink } from "../ExternalLinks";
import { useTransactions } from "../../hooks/useTransactions";

export function SendTransaction() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const { address } = useAccount();

  const { data: hash, sendTransactionAsync } = useSendTransaction();
  const { handleNewTransaction } = useTransactions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !amount || !address) return;

    try {
      const tx = await sendTransactionAsync({
        to: to as `0x${string}`,
        value: parseEther(amount),
      });

      if (tx) {
        await handleNewTransaction({
          hash: tx,
          from: address,
          to,
          value: amount,
          type: "send",
        });

        toast({
          title: "Transaction sent",
          description: "Transaction sent successfully",
          variant: "default",
          action: <>{tx && <ExplorerLink hash={tx} type="transaction" />}</>,
        });
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Recipient Address"
          className="w-full p-2 border rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={!to || !amount}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Send
      </button>

      {hash && (
        <div className="mt-2">
          <ExplorerLink hash={hash} type="transaction" />
        </div>
      )}
    </form>
  );
}
