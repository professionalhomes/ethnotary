"use client";

import { useCallback } from "react";
import useTransactionStore from "../store/useTransactionStore";
import type { Transaction } from "../store/useTransactionStore";

export function useTransactions() {
  const {
    transactions,
    pendingTransactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    isLoading,
    setLoading,
    error,
    setError,
  } = useTransactionStore();

  const handleNewTransaction = useCallback(
    async (tx: Omit<Transaction, "status" | "timestamp">) => {
      try {
        setLoading(true);
        setError(null);

        // Add the transaction to the store
        const newTx: Transaction = {
          ...tx,
          status: "pending",
          timestamp: Date.now(),
        };
        addTransaction(newTx);

        return newTx;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addTransaction, setLoading, setError]
  );

  const confirmTransaction = useCallback(
    (hash: string) => {
      updateTransaction(hash, { status: "confirmed" });
    },
    [updateTransaction]
  );

  const failTransaction = useCallback(
    (hash: string) => {
      updateTransaction(hash, { status: "failed" });
    },
    [updateTransaction]
  );

  return {
    transactions,
    pendingTransactions,
    handleNewTransaction,
    confirmTransaction,
    failTransaction,
    isLoading,
    error,
  };
}
