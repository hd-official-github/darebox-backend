"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { NewsSchema } from "../../zodSchema/newsSchema";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }


export async function AddNewsAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = NewsSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        console.log('err ',parsedData.error);
        
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/news" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof NewsSchema> = parsedData.data;
    try {
        await prisma.news.create({
            data: {
                title: d.title,
                description: d.description,
                imgurl: d.imgurl
            },
        });
        revalidatePath('/news')
        return { success: true, redirectUrl: '/news' }
        // Reset error on successful submission
        
    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/news' }
    }
}