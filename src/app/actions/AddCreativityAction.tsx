"use server"

import { CreativitySchema } from "@/zodSchema/creativitySchema";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddCreativityAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = CreativitySchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/creativity" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof CreativitySchema> = parsedData.data;
    try {
        await prisma.creativity.create({
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
        return { success: true, redirectUrl: '/creativity' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/creativity' }
    }
}