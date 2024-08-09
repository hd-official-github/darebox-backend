"use server"

import { walletSchema } from "@/zodSchema/walletSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const prisma = new PrismaClient();
export async function AddWalletAction(data: { userid: string, amount: string }): Promise<CreaResponse> {
    const parsedData = walletSchema.safeParse(data);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/wallet" }
    }

    const d: z.infer<typeof walletSchema> = parsedData.data;
    try {
        const alradyexists = await prisma.wallet.findFirst({
            where: {
                userId: d.userid
            }
        })
        if (alradyexists) {
            return { success: false, msg: "User already exists! Please delete the previous one!", redirectUrl: "/wallet" }
        }
        await prisma.wallet.create({
            data: {
                userId: d.userid,
                amount: d.amount,
            },
        });
        revalidatePath('/wallet')
        return { success: true, redirectUrl: '/wallet' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/productivity' }
    }
}