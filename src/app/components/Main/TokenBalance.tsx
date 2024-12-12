import { useAccount, useReadContracts } from "wagmi";
import { erc20Abi } from "viem";

interface TokenBalanceProps {
  tokenAddress: string;
}

export function TokenBalance({ tokenAddress }: TokenBalanceProps) {
  const { address } = useAccount();

  const { data: tokenBalance } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
    // enabled: Boolean(address && tokenAddress),
  });

  if (!tokenBalance) return null;

  const formattedBalance =
    Number(tokenBalance[0]) / Math.pow(10, Number(tokenBalance[1]));

  return (
    <div className="mt-2">
      <p>Balance: {formattedBalance}</p>
    </div>
  );
}
