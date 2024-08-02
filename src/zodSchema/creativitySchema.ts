import { z } from "zod";

export const CreativitySchema = z.object({
    name: z.string().min(1, { message: "field(s) should not be empty" }),
    author: z.string().min(1, { message: "field(s) should not be empty" }),
    rating: z.string().min(1, { message: "field(s) should not be empty" }),
    review: z.string().min(1, { message: "field(s) should not be empty" }),
    price: z.string().min(1, { message: "field(s) should not be empty" }),
    description: z.string().min(1, { message: "field(s) should not be empty" }),
    url: z.string().min(1, { message: "field(s) should not be empty" }),
})