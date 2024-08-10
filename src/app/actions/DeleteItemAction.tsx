"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
type Props = {
    id: string | number,
    model: string,
    redirecturl: string,
}
export async function DeleteItemAction(data: Props): Promise<CreaResponse> {
    // console.log('data model ', data);

    const prisma = new PrismaClient();
    try {
        if (data.model == "Choice") {
            await prisma.choice.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "Question") {
            await prisma.quizQuestion.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "quizresults") {
            await prisma.quizResult.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        revalidatePath(data.redirecturl)
        return { success: true, redirectUrl: data.redirecturl }


    } catch (error: any) {
        console.error(error);
        return { success: false, msg: error.message, redirectUrl: data.redirecturl }
    }
}