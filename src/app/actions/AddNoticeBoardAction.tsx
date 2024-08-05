"use server"

import { nbSchema } from "@/zodSchema/nbSchema";
import { NoticeBoardPlan, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddNoticeboardAction(data: FormData): Promise<CreaResponse> {
    // console.log('action');
    
    const formDataEntries = Object.fromEntries(data);
    const parsedData = nbSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        console.log(parsedData.error);
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/noticeboard" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof nbSchema> = parsedData.data;

    try {
        await prisma.noticeBoard.create({
            data: {
                name: d.name,
                plan: d.plan,
                rank:d.rank,
                type:d.type,
                points:d.points
            },
        });
        revalidatePath('/noticeboard')
        return { success: true, redirectUrl: '/noticeboard' }

    } catch (error: any) {

        console.error("ERROR ",error);
        return { success: false, msg: error.message, redirectUrl: '/noticeboard' }
    }
}