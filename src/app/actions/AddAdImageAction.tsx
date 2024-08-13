"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const ZodSchema = z.object({
    imageurl: z.string().min(1)
})
export async function AddAdImageAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = ZodSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/ads" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof ZodSchema> = parsedData.data;
    try {
        await prisma.ads.create({
            data: {
                imageurl: d.imageurl
            },
        });
        revalidatePath('/ads')
        return { success: true, redirectUrl: '/ads' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/ads' }
    }
}