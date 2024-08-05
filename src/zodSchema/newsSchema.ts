import { z } from "zod";

export const NewsSchema = z.object({
    title: z.string().min(1, { message: "field(s) should not be empty" }),
    description: z.string().min(1, { message: "field(s) should not be empty" }),
    imgurl: z.string().min(1, { message: "field(s) should not be empty" }),
})