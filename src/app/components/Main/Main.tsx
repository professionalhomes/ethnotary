"use client";
import { useState } from "react";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Input } from "@/src/app/components/ui/input";
import { Label } from "@/src/app/components/ui/label";
import { useToast } from "@/src/app/hooks/use-toast";
import { MULTI_SIGNATURE_ACCOUNT } from "@/src/app/constants/addresses";
import { MULTI_SIGNATURE_ACCOUNT_ABI } from "@/src/app/constants/abi/MultiSignatureWallet";
import { parseEther, isAddress } from "viem";
import Spinner from "@/src/app/components/ui/spinner";
import { Address } from "viem";

const Main = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: MULTI_SIGNATURE_ACCOUNT,
  });

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const { toast } = useToast();
  const { writeContract: submitTransaction, isPending } = useWriteContract();

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     if (!recipient || !amount || !pin) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         description: "Please fill in all fields",
  //       });
  //       return;
  //     }

  //     // Validate address
  //     if (!isAddress(recipient)) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         description: "Invalid recipient address",
  //       });
  //       return;
  //     }

  //     // Validate PIN
  //     if (pin.length !== 4 || isNaN(Number(pin))) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         description: "PIN must be a 4-digit number",
  //       });
  //       return;
  //     }

  //     try {
  //       const hash = await submitTransaction({
  //         address: MULTI_SIGNATURE_ACCOUNT,
  //         abi: MULTI_SIGNATURE_ACCOUNT_ABI,
  //         functionName: "submitTransaction",
  //         args: [recipient as `0x${string}`, parseEther(amount), BigInt(pin)],
  //       });

  //       toast({
  //         title: "Success",
  //         description: "Transaction submitted successfully",
  //       });

  //       // Reset form
  //       setRecipient("");
  //       setAmount("");
  //       setPin("");
  //     } catch (error: any) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error",
  //         description: error.message,
  //       });
  //     }
  //   };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Multi-Signature Wallet</CardTitle>
          <CardDescription>Submit a new transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="text-2xl font-semibold text-primary">
              Balance: {balance?.formatted} {balance?.symbol}
            </div>
          </div>

          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              step="0.000000000000000001"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin">Security PIN</Label>
            <Input
              id="pin"
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !recipient || !amount || !pin}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-white" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Transaction"
            )}
          </Button>
          {/* </form> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
