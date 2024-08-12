import { z } from "zod";

export const orderSchema = z.object({
    userid: z.string().min(1),
    productname: z.string().min(1),
    price: z.string().min(1),
    date: z.string().min(1),
    productUrl: z.string().min(1),
    description: z.string().min(1),

})