import { z } from "zod";

export const AdminSchema = z.object({
    email: z.string().min(1, { message: "field(s) should not be empty" }),
    pass: z.string().min(1, { message: "field(s) should not be empty" })
})