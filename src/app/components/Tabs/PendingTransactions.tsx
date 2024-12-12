"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/app/components/ui/tabs";
import { useTransactions } from "@/src/app/hooks/useTransactions";
import { formatEther } from "viem";
import { ExplorerLink } from "../ExternalLinks";
import Image from "next/image";
import { shortenAddress } from "../../lib/utils";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

export function PendingTransactions() {
  const { pendingTransactions } = useTransactions();

  const tabContents = [
    {
      value: "All Pending Tsx",
      label: "All Pending Tsx",
      content: (
        <div className="space-y-4 p-4">
          {pendingTransactions.length === 0 ? (
            <div className="text-center text-gray-500">
              No pending transactions
            </div>
          ) : (
            pendingTransactions.map((tx) => (
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
                    <span className="text-sm">{tx.value} ETH</span>
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
            ))
          )}
        </div>
      ),
    },
    {
      value: "Pending Confirmation",
      label: "Pending Confirmation",
      content: (
        <div className="space-y-4 p-4">
          {pendingTransactions
            .filter(
              (tx) =>
                tx.confirmations !== undefined &&
                tx.confirmations < (tx.requiredConfirmations || 0)
            )
            .map((tx) => (
              <div
                key={tx.hash}
                className="bg-gray-50 p-4 rounded-lg shadow space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Transaction Hash:</span>
                  <ExplorerLink hash={tx.hash} type="transaction" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Confirmations:</span>
                  <span>
                    {tx.confirmations} / {tx.requiredConfirmations}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ),
    },
    {
      value: "Ready To Send",
      label: "Ready To Send",
      content: (
        <div className="space-y-4 p-4">
          {pendingTransactions
            .filter(
              (tx) =>
                tx.confirmations !== undefined &&
                tx.confirmations >= (tx.requiredConfirmations || 0)
            )
            .map((tx) => (
              <div
                key={tx.hash}
                className="bg-gray-50 p-4 rounded-lg shadow space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Transaction Hash:</span>
                  <ExplorerLink hash={tx.hash} type="transaction" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-500">Ready to Execute</span>
                </div>
              </div>
            ))}
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full">
      <Tabs
        defaultValue="All Pending Tsx"
        className="w-full h-full flex flex-col"
      >
        <div className="flex items-center mb-2">
          <h3 className="font-bold text-black mr-4">Pending Transactions</h3>
          <TabsList className="grid grid-cols-3">
            {tabContents.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabContents.map(({ value, content }) => (
          <TabsContent
            key={value}
            value={value}
            className="w-full h-full data-[state=inactive]:hidden flex-grow bg-white text-black rounded-lg overflow-auto"
          >
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
