"use server"
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }

const ZodSchema = z.object({
    id: z.string().min(1),
    questionCount: z.string().min(1, { message: "field(s) should not be empty" }),
    timingInfo: z.string().min(1, { message: "field(s) should not be empty" }),
})
export async function Updatequizmodel(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = ZodSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/quiz" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof ZodSchema> = parsedData.data;
    try {
        await prisma.quizModel.update({
            where: {
                id: Number(d.id)
            },
            data: {
                questionCount: d.questionCount,
                timingInfo: d.timingInfo
            }
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