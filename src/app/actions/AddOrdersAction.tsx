"use server"

import { orderSchema } from "@/zodSchema/orderSchema";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
const prisma = new PrismaClient();
type INPType = z.infer<typeof orderSchema>
export async function AddOrdersAction(data: INPType): Promise<CreaResponse> {
    const parsedData = orderSchema.safeParse(data);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/orders" }
    }

    const d: z.infer<typeof orderSchema> = parsedData.data;
    try {
        await prisma.order.create({
            data: {
                userId: d.userid,
                productname: d.productname,
                price: d.price,
                date: d.date,
                productUrl: d.productUrl,
                description: d.description
            },
        });
        revalidatePath('/orders')
        return { success: true, redirectUrl: '/orders' }
        // Reset error on successful submission

    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/productivity' }
    }
}