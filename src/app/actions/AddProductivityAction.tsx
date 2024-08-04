"use server"

import { prodSChema } from "@/zodSchema/productivitySchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const prisma = new PrismaClient();
export async function AddProductivityAction(data: { userid: string, points: number }): Promise<CreaResponse> {
    const parsedData = prodSChema.safeParse(data);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/productivity" }
    }
    
    const d: z.infer<typeof prodSChema> = parsedData.data;
    try {
        const alradyexists = await prisma.productivity.findFirst({
            where: {
                userId: d.userid
            }
        })
        if (alradyexists) {
            return { success: false, msg: "User already exists! Please use the previous page!", redirectUrl: "/productivity" }
        }
        await prisma.productivity.create({
            data: {
                userId: d.userid,
                points: d.points,
            },
        });
        revalidatePath('/productivity')
        return { success: true, redirectUrl: '/productivity' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/productivity' }
    }
}