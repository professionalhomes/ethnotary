"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/app/components/ui/tabs";
import { TransactionList } from "../TransactionList";
import useTransactionStore from "../../store/useTransactionStore";

export function TransactionsTab() {
  const transactions = useTransactionStore((state) => state.transactions);

  const tabContents = [
    {
      value: "All Txn",
      label: "All Txn",
      content: transactions,
      filter: () => true, // Show all transactions
    },
    {
      value: "Confirms",
      label: "Confirms",
      content: transactions.filter((tx) => tx.status === "success"),
    },
    // {
    //   value: "Submits",
    //   label: "Submits",
    //   content: transactions.filter((tx) => tx.status === "submitting"),
    // },
    // {
    //   value: "Execute",
    //   label: "Execute",
    //   content: transactions.filter((tx) => tx.status === "executing"),
    // },
    // {
    //   value: "Deposits",
    //   label: "Deposits",
    //   content: transactions.filter((tx) => tx.type === "deposit"),
    // },
    // {
    //   value: "Account",
    //   label: "Account",
    //   content: transactions.filter((tx) => tx.type === "account"),
    // },
  ];

  return (
    <div className="w-full h-full p-5">
      <Tabs defaultValue="All Txn" className="w-full h-full flex flex-col">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-black mr-4">Transactions</h2>
          <TabsList className="grid grid-cols-6 gap-2">
            {tabContents.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="flex-grow">
          {tabContents.map(({ value, content }) => (
            <TabsContent
              key={value}
              value={value}
              className="w-full h-full data-[state=inactive]:hidden"
            >
              <div className="w-full h-full bg-white rounded-lg p-4">
                <TransactionList transactions={content} />
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
