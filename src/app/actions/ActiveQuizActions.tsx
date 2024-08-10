"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { NewsSchema } from "../../zodSchema/newsSchema";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const prisma = new PrismaClient();

export async function ActivateQuizModel(idd: number): Promise<CreaResponse> {

    try {
       
        await prisma.quizModel.update({
            where: { id: idd },
            data: {
                isactive: true
            }
        })
        revalidatePath('/quiz')
        return { success: true, redirectUrl: '/quiz' }
        // Reset error on successful submission

    } catch (error: any) {
        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/quiz' }
    }
}
export async function DeActivateQuizModel(idd: number): Promise<CreaResponse> {

    try {
        // const prisma = new PrismaClient();
        await prisma.quizModel.update({
            where: { id: idd },
            data: {
                isactive: false
            }
        })
        revalidatePath('/quiz')
        return { success: true, redirectUrl: '/quiz' }
        // Reset error on successful submission

    } catch (error: any) {
        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/quiz' }
    }
}