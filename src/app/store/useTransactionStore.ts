"use client";
import { Address } from "cluster";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Transaction {
  hash: `0x${string}`;
  status: "pending" | "confirmed" | "failed" | "reverted" | "success" | "error";
  timestamp: number;
  from: string;
  to: string;
  value: string;
  type: "send" | "receive" | "approve" | "execute";
  confirmations?: number;
  requiredConfirmations?: number;
  token?: string;
}

export interface TokenDetail {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
}

export interface WizardData {
  step: number;
  tokenAddress?: string;
  recipient?: string;
  amount?: string;
  data?: string;
}

interface TransactionStore {
  // Transactions
  transactions: Transaction[];
  pendingTransactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransaction: (hash: string, updates: Partial<Transaction>) => void;
  removeTransaction: (hash: string) => void;

  // Token Details
  tokens: TokenDetail[];
  addToken: (token: TokenDetail) => void;
  removeToken: (address: string) => void;
  updateTokenBalance: (address: string, balance: string) => void;

  // Wizard State
  wizardData: WizardData;
  setWizardData: (data: Partial<WizardData>) => void;
  resetWizardData: () => void;

  // General State
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      // Transactions State & Actions
      transactions: [],
      pendingTransactions: [],
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
          pendingTransactions:
            tx.status === "pending"
              ? [tx, ...state.pendingTransactions]
              : state.pendingTransactions,
        })),
      updateTransaction: (hash, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.hash === hash ? { ...tx, ...updates } : tx
          ),
          pendingTransactions: state.pendingTransactions
            .map((tx) => (tx.hash === hash ? { ...tx, ...updates } : tx))
            .filter((tx) => tx.status === "pending"),
        })),
      removeTransaction: (hash) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.hash !== hash),
          pendingTransactions: state.pendingTransactions.filter(
            (tx) => tx.hash !== hash
          ),
        })),

      // Token Details State & Actions
      tokens: [],
      addToken: (token) =>
        set((state) => ({
          tokens: [...state.tokens, token],
        })),
      removeToken: (address) =>
        set((state) => ({
          tokens: state.tokens.filter((token) => token.address !== address),
        })),
      updateTokenBalance: (address, balance) =>
        set((state) => ({
          tokens: state.tokens.map((token) =>
            token.address === address ? { ...token, balance } : token
          ),
        })),

      // Wizard State & Actions
      wizardData: {
        step: 1,
      },
      setWizardData: (data) =>
        set((state) => ({
          wizardData: { ...state.wizardData, ...data },
        })),
      resetWizardData: () =>
        set({
          wizardData: { step: 1 },
        }),

      // General State & Actions
      isLoading: false,
      setLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: "transaction-store",
      // Only persist transactions and tokens
      partialize: (state) => ({
        transactions: state.transactions,
        tokens: state.tokens,
      }),
    }
  )
);

export default useTransactionStore;
