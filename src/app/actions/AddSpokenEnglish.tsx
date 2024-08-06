"use server"

import { SpokenEngSchema } from "@/zodSchema/spokenEngSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddSpokenEnglishAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = SpokenEngSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/spokenenglish" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof SpokenEngSchema> = parsedData.data;
    try {
        await prisma.spokenEnglish.create({
            data: {
                name: d.name,
                author: d.author,
                price: d.price,
                rating: d.rating,
                review: d.review,
                description: d.description,
                url: d.url
            },
        });
        revalidatePath('/spokenenglish')
        return { success: true, redirectUrl: '/spokenenglish' }
        // Reset error on successful submission
        
    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/spokenenglish' }
    }
}