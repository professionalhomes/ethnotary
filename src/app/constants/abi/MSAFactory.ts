export const MSA_FACTORY_ABI = [
  // Your factory contract ABI here
  {
    inputs: [
      { type: "address[]", name: "owners" },
      { type: "uint256", name: "required" },
      { type: "uint256", name: "pin" },
    ],
    name: "createAccount",
    outputs: [{ type: "address", name: "account" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // ... other ABI entries
];
