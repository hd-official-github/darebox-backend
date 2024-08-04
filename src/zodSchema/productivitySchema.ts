import { z } from "zod";

export const prodSChema = z.object({
    userid: z.string().min(1),
    points: z.number().min(0)
})