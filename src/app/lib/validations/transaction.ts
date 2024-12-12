import * as z from "zod";
import { isAddress } from "viem";

export const tokenTransferSchema = z.object({
  tokenAddress: z
    .string()
    .min(1, "Token address is required")
    .refine((val) => isAddress(val), {
      message: "Invalid token address format",
    }),
  recipient: z
    .string()
    .min(1, "Recipient address is required")
    .refine((val) => isAddress(val), {
      message: "Invalid recipient address format",
    }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
});

export type TokenTransferForm = z.infer<typeof tokenTransferSchema>;
