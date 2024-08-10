"use server"
import { AddQuizSchema } from "@/zodSchema/quizSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddNewQuiz(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = AddQuizSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/quiz" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof AddQuizSchema> = parsedData.data;
    try {
        const isExists = await prisma.quizModel.findFirst({
            where: {
                AND: [
                    { plan: d.plan },
                    { quiztype: d.quiztype }
                ]
            }
        })
        if (isExists) {
            return { success: false, msg: "This Quiz model already exists!", redirectUrl: '/quiz' }
        }
        await prisma.quizModel.create({
            data: {
                plan: d.plan,
                quiztype: d.quiztype,
                isactive: false
            },
        });
        revalidatePath('/quiz')
        return { success: true, redirectUrl: '/quiz' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/quiz' }
    }
}