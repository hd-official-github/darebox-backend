"use server"
import { AddQuesSchema } from "@/zodSchema/quizSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddquestionAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = AddQuesSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: `/quiz` }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof AddQuesSchema> = parsedData.data;
    try {
        await prisma.quizQuestion.create({
            data: {
                quizModelId: Number(d.quesid),
                question: d.question
            },
        });
        revalidatePath(`/quiz/questions/${d.quesid}`)
        return { success: true, redirectUrl: `/quiz/questions/${d.quesid}` }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: `/quiz/questions/${d.quesid}` }
    }
}