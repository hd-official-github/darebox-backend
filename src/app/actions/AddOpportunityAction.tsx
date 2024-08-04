"use server"

import { OppSchema } from "@/zodSchema/opportunitySchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddOpportunityAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = OppSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/creativity" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof OppSchema> = parsedData.data;
    try {
        await prisma.opportunity.create({
            data: {
                title: d.title,
                description: d.description,
            },
        });
        revalidatePath('/opportunity')
        return { success: true, redirectUrl: '/opportunity' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/opportunity' }
    }
}