"use client";
import { Transaction } from "../store/useTransactionStore";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { shortenAddress } from "../lib/utils";
import { useTransactionReceipt } from "wagmi";
import { getTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../context/config/wagmiConfig";
interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  //   map through the transactions and get the receipt for each
  //   const tx = transactions.map(async (tx) => {
  //     const receipt = await getTransactionReceipt(wagmiConfig, {
  //       hash: tx.hash as `0x${string}`,
  //     });
  //     return { ...tx, receipt };
  //   });

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No transactions found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="bg-gray-50 flex items-center space-x-4 p-2 rounded-lg shadow space-y-2"
        >
          <div>
            <Image
              src={"/avatar/boy.svg"}
              alt="Token Icon"
              width={50}
              height={50}
            />
          </div>

          <div className="grid grid-cols-4 gap-3 w-full space-y-0">
            <div className="flex justify-between flex-col items-start">
              <span className="font-bold text-sm">Tx</span>
              <p className="text-sm">{shortenAddress(tx.hash)}</p>
              {/* <ExplorerLink hash={tx.hash} type="transaction" /> */}
            </div>
            <div className="flex justify-between flex-col items-start">
              <span className="font-bold text-sm">From:</span>
              <span className="font-mono text-sm">
                {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between flex-col items-start">
              <span className="font-bold text-sm">To:</span>
              <span className="font-mono text-sm">
                {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between flex-col items-start">
              <span className="font-bold text-sm">Value:</span>
              <span className="text-sm">{tx.value}</span>
            </div>
          </div>
          <Link href={`/tx/${tx.hash}`}>
            <MoreVertical className="cursor-pointer" />
          </Link>

          {/* <div className="flex justify-between items-center">
             <span className="font-medium">Tx:</span>
             <ExplorerLink hash={tx.hash} type="transaction" />
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-600">From:</span>
             <span className="font-mono">
               {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
             </span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-600">To:</span>
             <span className="font-mono">
               {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
             </span>
           </div> */}
          {/* <div className="flex justify-between items-center">
             <span className="text-gray-600">Value:</span>
             <span>{tx.value} ETH</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-600">Type:</span>
             <span className="capitalize">{tx.type}</span>
           </div>
           {tx.confirmations !== undefined && (
             <div className="flex justify-between items-center">
               <span className="text-gray-600">Confirmations:</span>
               <span>
                 {tx.confirmations} / {tx.requiredConfirmations}
               </span>
             </div>
           )} */}
        </div>
      ))}
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case "confirming":
      return "bg-yellow-100 text-yellow-800";
    case "submitting":
      return "bg-blue-100 text-blue-800";
    case "executing":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
