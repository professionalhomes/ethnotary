"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWriteContract, useAccount } from "wagmi";
import { Button } from "@/src/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Input } from "@/src/app/components/ui/input";
import { useToast } from "@/src/app/hooks/use-toast";
import { MSA_FACTORY } from "@/src/app/constants/addresses";
import { MSA_FACTORY_ABI } from "@/src/app/constants/abi/MSAFactory";
import { Address, isAddress } from "viem";
import Spinner from "@/src/app/components/ui/spinner";

interface WizardStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function Wizard() {
  const router = useRouter();
  const { address } = useAccount();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);

  // Form state
  const [contractType, setContractType] = useState<string>("multisig");
  const [contractName, setContractName] = useState<string>("");
  const [owners, setOwners] = useState<Address[]>([address!]);
  const [confirmations, setConfirmations] = useState<string>("");
  const [pin, setPin] = useState<string>("");

  const { writeContract: createAccount, isPending } = useWriteContract();

  const addOwnerField = () => {
    setOwners([...owners, "0x" as Address]);
  };

  const removeOwnerField = (index: number) => {
    const newOwners = owners.filter((_, i) => i !== index);
    setOwners(newOwners);
  };

  const updateOwner = (index: number, value: string) => {
    const newOwners = [...owners];
    newOwners[index] = value as Address;
    setOwners(newOwners);
  };

  const validateInputs = () => {
    // Check if all addresses are valid
    if (owners.some((owner) => !isAddress(owner))) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid Ethereum addresses for all owners",
      });
      return false;
    }

    // Validate confirmations
    const numConfirmations = parseInt(confirmations);
    if (
      isNaN(numConfirmations) ||
      numConfirmations < 1 ||
      numConfirmations > owners.length
    ) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description:
          "Required confirmations must be between 1 and the number of owners",
      });
      return false;
    }

    // Validate PIN
    if (pin.length !== 4 || isNaN(Number(pin))) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "PIN must be a 4-digit number",
      });
      return false;
    }

    return true;
  };

  const deployContract = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      setIsDeploying(true);

      const hash = await createAccount({
        address: MSA_FACTORY,
        abi: MSA_FACTORY_ABI,
        functionName: "createAccount",
        args: [owners, BigInt(confirmations), BigInt(pin)],
      });

      toast({
        title: "Success",
        description:
          "Contract deployment initiated. Please wait for confirmation.",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Deployment error:", error);
      toast({
        variant: "destructive",
        title: "Deployment Failed",
        description:
          error.message || "Failed to deploy contract. Please try again.",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const steps: WizardStep[] = [
    {
      id: 1,
      title: "Contract Type",
      description: "What will your smart contract do?",
      component: (
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle>Contract Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  contractType === "multisig"
                    ? "bg-green-50 border-2 border-green-500"
                    : "hover:bg-green-50"
                }`}
                onClick={() => setContractType("multisig")}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">🔐</div>
                  <div>
                    <h3 className="font-semibold">Multi-Signature Account</h3>
                    <p className="text-sm text-gray-500">
                      A contract designed so that multiple signatures from
                      different addresses are needed for a transaction to be
                      executed.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">🎨</div>
                  <div>
                    <h3 className="font-semibold">Non-Fungible Token</h3>
                    <p className="text-sm text-gray-500">
                      Blockchain-based tokens that each represent a unique asset
                      like a piece of art, digital content, or media.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-green-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">🏛️</div>
                  <div>
                    <h3 className="font-semibold">
                      Decentralized Autonomous Organization
                    </h3>
                    <p className="text-sm text-gray-500">
                      A organization managed by contracts, with voting and
                      finances handled through a blockchain.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 2,
      title: "Contract Name",
      description: "Name your contract",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Contract Name</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter contract name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </CardContent>
        </Card>
      ),
    },
    {
      id: 3,
      title: "Add Owners",
      description: "Add owners to your contract",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Add Owners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {owners.map((owner, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium">
                  Owner {index + 1} Address
                </label>
                <div className="flex gap-2">
                  <Input
                    value={owner}
                    onChange={(e) => updateOwner(index, e.target.value)}
                    placeholder="0x..."
                  />
                  {owners.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeOwnerField(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addOwnerField}
              className="w-full"
            >
              Add Another Owner
            </Button>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 4,
      title: "Parameters",
      description: "Setup how your contract will behave",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Contract Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Required Confirmations
              </label>
              <Input
                type="number"
                value={confirmations}
                onChange={(e) => setConfirmations(e.target.value)}
                placeholder="Number of required confirmations"
                min="1"
                max={owners.length}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Security PIN (4 digits)
              </label>
              <Input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 4-digit PIN"
                maxLength={4}
              />
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 5,
      title: "Deploy!",
      description: "Review and Submit",
      component: (
        <Card>
          <CardHeader>
            <CardTitle>Review Contract Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Contract Type: Multi-Signature Account
              </p>
              <p className="text-sm font-medium">
                Contract Name: {contractName}
              </p>
              <p className="text-sm font-medium">
                Required Signatures: {confirmations}
              </p>
              <p className="text-sm font-medium">
                Number of Owners: {owners.length}
              </p>
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={deployContract}
              disabled={isDeploying || isPending}
            >
              {isDeploying || isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="text-white" />
                  <span>Deploying...</span>
                </div>
              ) : (
                "Deploy Contract"
              )}
            </Button>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="flex relative h-screen">
      {/* Sidebar */}
      <div
        className={`
        absolute top-0 left-0 h-full bg-white ${
          isSidebarOpen ? "border-r" : ""
        } rounded-xl border-gray-200 transition-all duration-300 
        ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden
      `}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Steps</h2>
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`
                  p-3 rounded-lg cursor-pointer transition-colors
                  ${
                    currentStep === step.id
                      ? "bg-green-50 text-green-600"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-sm
                    ${
                      currentStep === step.id
                        ? "bg-green-100 text-green-600"
                        : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                    }
                  `}
                  >
                    {step.id}
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Create Smart Contract</h2>
              <p className="text-gray-500">
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? "← Hide Steps" : "Show Steps →"}
              </Button>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentStep((prev) => Math.max(1, prev - 1))
                  }
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length && (
                <Button
                  onClick={() =>
                    setCurrentStep((prev) => Math.min(steps.length, prev + 1))
                  }
                >
                  Next Step
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full ${
                  step.id <= currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">{steps[currentStep - 1].component}</div>
        </div>
      </div>
    </div>
  );
}
