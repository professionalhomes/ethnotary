"use client";

import { useCallback } from "react";
import useTransactionStore from "../store/useTransactionStore";
import type { TokenDetail } from "../store/useTransactionStore";

export function useTokens() {
  const {
    tokens,
    addToken,
    removeToken,
    updateTokenBalance,
    isLoading,
    setLoading,
    error,
    setError,
  } = useTransactionStore();

  const handleAddToken = useCallback(
    async (tokenData: TokenDetail) => {
      try {
        setLoading(true);
        setError(null);

        // Check if token already exists
        if (tokens.some((t) => t.address === tokenData.address)) {
          throw new Error("Token already exists");
        }

        addToken(tokenData);
        return tokenData;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add token");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [tokens, addToken, setLoading, setError]
  );

  const handleUpdateBalance = useCallback(
    (address: string, balance: string) => {
      try {
        updateTokenBalance(address, balance);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update token balance"
        );
        throw err;
      }
    },
    [updateTokenBalance, setError]
  );

  const handleRemoveToken = useCallback(
    (address: string) => {
      try {
        removeToken(address);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove token");
        throw err;
      }
    },
    [removeToken, setError]
  );

  return {
    tokens,
    addToken: handleAddToken,
    removeToken: handleRemoveToken,
    updateBalance: handleUpdateBalance,
    isLoading,
    error,
  };
}
