"use server"

import { InterTrainingSchema } from "@/zodSchema/intertrainingScheam";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddInterviewTrainAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = InterTrainingSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/interviewtraining" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof InterTrainingSchema> = parsedData.data;
    try {
        await prisma.interviewTraining.create({
            data: {
                title: d.name,
                price: d.price,
                description: d.description,
                url: d.url
            },
        });
        revalidatePath('/interviewtraining')
        return { success: true, redirectUrl: '/interviewtraining' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/interviewtraining' }
    }
}