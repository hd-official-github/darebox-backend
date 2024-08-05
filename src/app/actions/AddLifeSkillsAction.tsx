"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LifeSkillSchema } from "../../zodSchema/lifeSkillSchema";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }


export async function Addlifeskillsaction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = LifeSkillSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/lifeskills" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof LifeSkillSchema> = parsedData.data;
    try {
        await prisma.lifeSkills.create({
            data: {
                title: d.title,
                description: d.description,
                url: d.url,
                price: d.price
            },
        });
        revalidatePath('/lifeskills')
        return { success: true, redirectUrl: '/lifeskills' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/lifeskills' }
    }
}