"use server"


import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const prisma = new PrismaClient();
export async function Add10Productivity(userid: string): Promise<CreaResponse> {


    try {
        await prisma.productivity.update({
            where: { userId: userid },
            data: {
                points: {
                    increment: 10, 
                },
            },
        });
        revalidatePath('/productivity')
        return { success: true, redirectUrl: '/productivity' }

    } catch (error: any) {

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/productivity' }
    }
}