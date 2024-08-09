import { z } from "zod";

export const walletSchema = z.object({
    userid: z.string().min(1),
    amount: z.string().min(1)
})