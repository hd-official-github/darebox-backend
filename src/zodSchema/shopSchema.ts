import { z } from "zod";
const plantype = z.enum(['FOUNDATION', 'TOP', 'PRO']);
export const ShopSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.string().min(1),
    imgurl: z.string().min(1),
    producturl: z.string().min(1),
    plan: plantype
})