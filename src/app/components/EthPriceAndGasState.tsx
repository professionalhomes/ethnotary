"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/app/components/ui/card";
import { TransactionsTab } from "./Tabs/TransactionsTab";

interface PriceData {
  ethereum: {
    usd: number;
    btc: number;
  };
}

interface GasData {
  gasPrice: number;
  lastBlock: string;
}

const EthPriceAndGasState = () => {
  const [prices, setPrices] = useState<PriceData | null>(null);
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,btc"
      );
      const data = await response.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGasPrice = async () => {
    try {
      const response = await fetch(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=35BC3H7YMGUJS6S6MWFRPGI18JFT65F6XM"
      );
      const data = await response.json();
      setGasData({
        gasPrice: data.result.SafeGasPrice,
        lastBlock: data.result.LastBlock,
      });
    } catch (error) {
      console.error("Error fetching gas price:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    fetchGasPrice();

    // Refresh prices every 30 seconds
    const interval = setInterval(() => {
      fetchPrices();
      fetchGasPrice();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchPrices();
    fetchGasPrice();
  };

  return (
    <div>
      <div className="grid md:grid-cols-6 gap-10 mt-10">
        <div className="md:col-span-2 flex flex-col gap-10">
          <Card>
            <CardContent className="p-10">
              <CardTitle className="text-[#7e8299] mb-2">Ether Price</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#20d489]">
                  ${prices?.ethereum.usd.toFixed(2) ?? "Loading..."}
                </span>
                <span className="text-[#a1a5b7]">
                  @ {prices?.ethereum.btc.toFixed(6) ?? "Loading..."} BTC
                </span>
              </div>
              <CardDescription className="mt-2">
                As of {lastUpdated.toLocaleString()}
              </CardDescription>
              <CardFooter className="flex items-center gap-2 mt-2 p-0">
                <span className="text-sm text-[#7e8299]">
                  Source: coingecko.com
                </span>
                <button
                  className="px-3 py-1 bg-[#20d489] text-white rounded-full text-sm disabled:opacity-50"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
              </CardFooter>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-10">
              <CardTitle className="text-[#7e8299] mb-4">
                Ethereum Stats
              </CardTitle>
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="text-[#7e8299]">Gas Price</span>
                  <span className="text-[#3f4254]">
                    {gasData?.gasPrice ?? "Loading..."} Gwei
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#7e8299]">Network Congestion</span>
                    <span className="text-[#3f4254]">15.5%</span>
                  </div>
                  <div className="h-2 bg-[#e4e6ef] rounded-full overflow-hidden">
                    <div className="h-full w-[15.5%] bg-[#20d489] rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="md:col-span-4">
          <CardContent>
            <TransactionsTab />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EthPriceAndGasState;
