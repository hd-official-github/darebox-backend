"use server";
import { AddChoiceSchema } from "@/zodSchema/quizSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddChoiceData(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = AddChoiceSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: `/quiz/` }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof AddChoiceSchema> = parsedData.data;
    try {

        await prisma.choice.create({
            data: {
                choice: d.choice,
                iscorrect: Boolean(d.iscorrect == "TRUE"),
                quizQuestionId: Number(d.quesid)
            },
        });
        revalidatePath(`/quiz/choices/${d.quesid}`)
        return { success: true, redirectUrl: `/quiz/choices/${d.quesid}` }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: `/quiz/choices/${d.quesid}` }
    }
}