import { PublicClient } from "viem";

export async function getOptimalGasPrice(client: PublicClient) {
  // Get the last few blocks
  const blocks = await Promise.all(
    Array.from({ length: 5 }, (_, i) =>
      client.getBlock({ blockNumber: -1n - BigInt(i) })
    )
  );

  // Calculate average gas price
  const avgGasPrice =
    blocks.reduce((sum, block) => sum + (block.baseFeePerGas || 0n), 0n) /
    BigInt(blocks.length);

  return avgGasPrice;
}
