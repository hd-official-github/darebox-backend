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
            revalidatePath('/quiz/quizresults')
        }
        if (data.model == "creativity") {
            await prisma.creativity.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "opportunity") {
            await prisma.opportunity.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "productivity") {
            await prisma.productivity.delete({
                where: {
                    id: data.id.toString()
                }
            })
        }
        if (data.model == "noticeboard") {
            await prisma.noticeBoard.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "news") {
            await prisma.news.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "lifeskills") {
            await prisma.lifeSkills.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "spokenenglish") {
            await prisma.spokenEnglish.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "interviewtraining") {
            await prisma.interviewTraining.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "workshop") {
            await prisma.workShop.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "shop") {
            await prisma.shop.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "orders") {
            await prisma.order.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "wallet") {
            await prisma.wallet.delete({
                where: {
                    id: Number(data.id)
                }
            })
        }
        if (data.model == "ads") {
            await prisma.ads.delete({
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