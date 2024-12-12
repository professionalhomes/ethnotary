import { Address } from "viem";
import { useChainId, useChains } from "wagmi";
import { Chain } from "wagmi/chains";

type ExplorerLinkProps = {
  hash: string | Address | `0x${string}`;
  type: "address" | "transaction" | "token" | "block";
  text?: string;
};

const getExplorerUrl = (
  chains: Chain[],
  chainId: number | undefined,
  hash: string,
  type: ExplorerLinkProps["type"]
): string => {
  if (!chainId) return "";

  const currentChain = chains.find((chain) => chain.id === chainId);
  if (!currentChain?.blockExplorers?.default?.url) return "";

  const baseUrl = currentChain.blockExplorers.default.url;

  switch (type) {
    case "address":
      return `${baseUrl}/address/${hash}`;
    case "transaction":
      return `${baseUrl}/tx/${hash}`;
    case "token":
      return `${baseUrl}/token/${hash}`;
    default:
      return baseUrl;
  }
};

export function ExplorerLink({ hash, type, text }: ExplorerLinkProps) {
  const chains = useChains();
  const chainId = useChainId();
  if (!hash) return null;

  const mutableChains = [...chains];
  const explorerUrl = getExplorerUrl(mutableChains, chainId, hash, type);

  if (!explorerUrl) return null;

  const currentChain = chains.find((c) => c.id === chainId);
  const explorerName =
    currentChain?.blockExplorers?.default?.name || "Explorer";

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700 underline"
    >
      {text ? text : `View on ${explorerName}`}
      {/* View on {explorerName} */}
    </a>
  );
}
