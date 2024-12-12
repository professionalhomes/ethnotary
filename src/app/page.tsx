import { Send, FileText, Link2 } from "lucide-react";
import Image from "next/image";
import { PendingTransactions } from "./components/Tabs/PendingTransactions";
import { TransactionsTab } from "./components/Tabs/TransactionsTab";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/app/components/ui/dialog";
import { SendTransaction } from "./components/Main/SendTransaction";
import { TokenTransfer } from "./components/Main/TokenTransfer";
const ACTIONS = [
  {
    icon: <Send className="w-5 h-5" />,
    title: "Send ETH",
    description: "Send ETH to another wallet address",
    content: <SendTransaction />,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Transfer Token",
    description: "Transfer ERC20 tokens to another address",
    // content: (
    //   <div className="space-y-4">
    //     <div>
    //       <label className="text-sm font-medium">Token Address</label>
    //       <input
    //         type="text"
    //         className="w-full p-2 border rounded mt-1"
    //         placeholder="0x..."
    //       />
    //     </div>
    //     <div>
    //       <label className="text-sm font-medium">Recipient Address</label>
    //       <input
    //         type="text"
    //         className="w-full p-2 border rounded mt-1"
    //         placeholder="0x..."
    //       />
    //     </div>
    //     <div>
    //       <label className="text-sm font-medium">Amount</label>
    //       <input
    //         type="number"
    //         className="w-full p-2 border rounded mt-1"
    //         placeholder="0.0"
    //       />
    //     </div>
    //   </div>
    // ),
    content: <TokenTransfer />,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Import Token",
    description: "Import an ERC20 token to track in your wallet",
    content: (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32">Token Contract:</label>
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="0x..."
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32">Symbol:</label>
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            placeholder="Enter token symbol"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium w-32">Token Type:</label>
          <select className="flex-1 p-2 border rounded">
            <option value="erc20">Fungible Token (ERC20)</option>
            <option value="erc721">Non-Fungible Token (ERC721)</option>
            <option value="erc1155">Non-Fungible Token (ERC1155)</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Import
          </button>
        </div>
      </div>
    ),
  },
  {
    icon: <Link2 className="w-5 h-5" />,
    title: "Connect to dApp",
    description: "Connect your wallet to a decentralized application",
    content: (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">dApp URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            placeholder="https://"
          />
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <>
      <div className="grid md:grid-cols-6 gap-10 ">
        <Card className="md:col-span-2">
          <CardContent className="p-10">
            <div className="grid gap-6">
              <Card className="bg-green-light">
                <CardContent className="overflow-hidden relative p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardDescription className="text-[#7e8299] mb-1">
                        Balance
                      </CardDescription>
                      <CardTitle className="text-2xl font-bold text-[#152c5b] mb-2">
                        ETH
                      </CardTitle>
                      <span className="inline-block px-3 py-1 bg-[#20d489] text-white rounded-full text-sm">
                        Token Holdings
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <Image
                        src="/logo/barry.png"
                        alt="Mascot"
                        width={200}
                        height={200}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {ACTIONS.map((action, i) => (
                  <Dialog key={i}>
                    <DialogTrigger asChild>
                      <Card className="hover:bg-green-light border-2 border-transparent bg-clay-primary border-dashed hover:border-green-primary transition-all ease-in duration-150 cursor-pointer">
                        <CardContent className="flex items-start flex-col gap-3 p-5">
                          <span className="text-[#3f4254]">{action.icon}</span>
                          <span className="text-[#3f4254] font-medium">
                            {action.title}
                          </span>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{action.title}</DialogTitle>
                        <DialogDescription>
                          {action.description}
                        </DialogDescription>
                      </DialogHeader>
                      {action.content}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardContent className="p-5">
            <PendingTransactions />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-6 gap-10 mt-10">
        <div className="md:col-span-2 flex flex-col gap-10">
          <Card>
            <CardContent className="p-10">
              <CardTitle className="text-[#7e8299] mb-2">Ether Price</CardTitle>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#20d489]">
                  $3666.32
                </span>
                <span className="text-[#a1a5b7]">@ 0.037804 BTC</span>
              </div>
              <CardDescription className="mt-2">
                As of Monday, December 2, 2024 at 08:54:28 PM
              </CardDescription>
              <CardFooter className="flex items-center gap-2 mt-2 p-0">
                <span className="text-sm text-[#7e8299]">
                  Source: coingecko.com
                </span>
                <button className="px-3 py-1 bg-[#20d489] text-white rounded-full text-sm">
                  Refresh
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
                  <span className="text-[#3f4254]">31.806494879 Gwei</span>
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
    </>
  );
}
