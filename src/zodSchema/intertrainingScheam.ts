import { z } from "zod";

export const InterTrainingSchema = z.object({
    name: z.string().min(1, { message: "field(s) should not be empty" }),
    price: z.string().min(1, { message: "field(s) should not be empty" }),
    description: z.string().min(1, { message: "field(s) should not be empty" }),
    url: z.string().min(1, { message: "field(s) should not be empty" }),
})