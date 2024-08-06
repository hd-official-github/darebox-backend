"use server"

import { WorkShopSchema } from "@/zodSchema/workshopSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddWorkshopAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = WorkShopSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/workshop" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof WorkShopSchema> = parsedData.data;
    try {
        await prisma.workShop.create({
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
        revalidatePath('/workshop')
        return { success: true, redirectUrl: '/workshop' }
        // Reset error on successful submission
        
    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/workshop' }
    }
}