"use client";
import { useEffect } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { Address, erc20Abi } from "viem";

export function FetchTokenDetails({
  tokenAddress,
  setTokenDetails,
}: {
  tokenAddress: Address;
  setTokenDetails: (
    tokenDetails: {
      name: string;
      symbol: string;
      decimals: number;
      totalSupply?: bigint;
    } | null
  ) => void;
}) {
  const { data: balance } = useBalance({
    address: tokenAddress,
  });

  const {
    data: tokenData,
    isError,
    isLoading,
  } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
      },
    ],
  });

  useEffect(() => {
    if (tokenData && !isError) {
      const [decimals, name, symbol, totalSupply] = tokenData;
      setTokenDetails({
        decimals,
        name,
        symbol,
        totalSupply,
      });
    } else if (isError) {
      setTokenDetails(null);
    }
  }, [tokenData, isError, setTokenDetails]);

  if (isError || !tokenData) {
    return (
      <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-200">
        <p className="text-red-600">
          Token details not found! Please Enter Token Address
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-600">Loading token details...</p>
      </div>
    );
  }

  if (isError || !tokenData) {
    return (
      <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-200">
        <p className="text-red-600">
          Token details not found! Please Enter Valid Token Address
        </p>
      </div>
    );
  }

  const [decimals, name, symbol, totalSupply] = tokenData;

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
      <h4 className="font-medium text-gray-700">Token Details</h4>
      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
        <div>
          <span className="text-gray-600">Name:</span>
          <span className="ml-2 font-medium">{name}</span>
        </div>
        <div>
          <span className="text-gray-600">Symbol:</span>
          <span className="ml-2 font-medium">{symbol}</span>
        </div>
        <div>
          <span className="text-gray-600">Decimals:</span>
          <span className="ml-2 font-medium">{decimals}</span>
        </div>
        <div>
          <span className="text-gray-600">Total Supply:</span>
          <span className="ml-2 font-medium">{totalSupply?.toString()}</span>
        </div>
        <div>
          <span className="text-gray-600">Your Balance:</span>
          <span className="ml-2 font-medium">{balance?.value?.toString()}</span>
        </div>
      </div>
    </div>
  );
}
