"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAccount,
  usePublicClient,
  useWriteContract,
  useReadContract,
  useSimulateContract,
  useEstimateGas,
} from "wagmi";
import { estimateGas } from "@wagmi/core";
import { parseUnits } from "viem";
import { toast } from "../../hooks/use-toast";
import { ExplorerLink } from "../ExternalLinks";
import { useTransactions } from "../../hooks/useTransactions";
import {
  tokenTransferSchema,
  type TokenTransferForm,
} from "../../lib/validations/transaction";
import { ERC20_ABI } from "../../constants/abi/ERC20";
import { FetchTokenDetails } from "./FetchTokenDetails";
import { useGasOptimization } from "@/src/app/hooks/useGasOptimization";
import { wagmiConfig } from "../../context/config/wagmiConfig";

export function TokenTransfer() {
  const { address } = useAccount();
  const { handleNewTransaction } = useTransactions();
  const [tokenDetails, setTokenDetails] = useState<{
    name: string;
    symbol: string;
    decimals: number;
  } | null>(null);

  const { writeContractAsync } = useWriteContract();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    getValues,
  } = useForm<TokenTransferForm>({
    resolver: zodResolver(tokenTransferSchema),
  });

  const tokenAddress = watch("tokenAddress");
  const recipient = watch("recipient");
  const amount = watch("amount");

  const onSubmit = async (data: TokenTransferForm) => {
    if (!address || !tokenDetails) {
      toast({
        title: "Error",
        description: !address
          ? "Please connect your wallet"
          : "Token details not found",
        variant: "destructive",
      });
      return;
    }

    try {
      const hash = await writeContractAsync({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [
          data.recipient as `0x${string}`,
          parseUnits(data.amount, tokenDetails?.decimals || 18),
        ],
        account: address,
      });

      await handleNewTransaction({
        hash,
        from: address,
        to: data.recipient,
        value: data.amount,
        type: "send",
      });

      toast({
        title: "Transaction Sent",
        description: `Transferring ${data.amount} ${tokenDetails?.symbol} to ${data.recipient}`,
        variant: "default",
        action: <ExplorerLink hash={hash} type="transaction" />,
      });

      reset();
    } catch (error) {
      console.error("Error sending token:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send tokens",
        variant: "destructive",
      });
    }
  };

  const { bestGasPrice, bestTimeToTransact } = useGasOptimization();

  // const handleTransfer = async () => {
  //   try {
  //     // Get gas estimate with buffer
  //     // const gasEstimate = await estimateTransferGas(
  //     //   data.recipient as `0x${string}`,
  //     //   parseUnits(data.amount, tokenDetails?.decimals || 18)
  //     // );

  //     // Use optimal gas price if available
  //     const gasPrice = bestGasPrice || (await getOptimalGasPrice(publicClient));

  //     // Execute transaction with optimized gas settings
  //     const tx = await writeContractAsync({
  //       address: tokenAddress,
  //       abi: erc20Abi,
  //       functionName: "transfer",
  //       args: [recipientAddress, amount],
  //       gas: gasEstimate,
  //       maxFeePerGas: gasPrice,
  //     });
  //   } catch (error) {
  //     console.error("Transfer failed:", error);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Token Address</label>
          <input
            {...register("tokenAddress")}
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="0x..."
          />
          {errors.tokenAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tokenAddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Recipient Address</label>
          <input
            {...register("recipient")}
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="0x..."
          />
          {errors.recipient && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recipient.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Amount</label>
          <input
            {...register("amount")}
            type="number"
            className="w-full p-2 border rounded mt-1"
            placeholder="0.0"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          // disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isSubmitting ? "Sending..." : "Send Tokens"}
        </button>
      </form>

      <FetchTokenDetails
        tokenAddress={tokenAddress}
        setTokenDetails={setTokenDetails}
      />

      {bestTimeToTransact && (
        <div className="text-sm text-gray-600 mb-2">
          💡 Recommended time to transact: {bestTimeToTransact}
        </div>
      )}
    </>
  );
}
