import { z } from "zod";
const plantype = z.enum(['FOUNDATION', 'TOP', 'PRO']);
const typetype = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);
export const nbSchema = z.object({
    plan:plantype,
    type:typetype,
    name: z.string().min(1),
    rank:z.string().min(1),
    points:z.string().min(1)
})