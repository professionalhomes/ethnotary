import { Address, encodeFunctionData, erc20Abi } from "viem";

export function batchTransfers(
  tokenAddress: Address,
  recipients: Address[],
  amounts: bigint[]
) {
  // Encode multiple transfers into a single transaction
  const multicallData = recipients.map((to, i) =>
    encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, amounts[i]],
    })
  );

  return multicallData;
}
