"use server"

import { ShopSchema } from "@/zodSchema/shopSchema";
import { PrismaClient, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type CreaResponse = { success: boolean, msg?: string, redirectUrl: string }
export async function AddShopAction(data: FormData): Promise<CreaResponse> {
    const formDataEntries = Object.fromEntries(data);
    
    const parsedData = ShopSchema.safeParse(formDataEntries);
    console.log(parsedData.error)
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured with form!", redirectUrl: "/shop" }
    }
    const prisma = new PrismaClient();
    const d: z.infer<typeof ShopSchema> = parsedData.data;
    try {
        await prisma.shop.create({
            data: {
                name: d.name,
                price: d.price,
                description: d.description,
                imgurl: d.imgurl,
                producturl: d.producturl,
                plan: d.plan
            },
        });
        revalidatePath('/shop')
        return { success: true, redirectUrl: '/shop' }
        // Reset error on successful submission
        
    } catch (error: any) {
        // Handle error and set it to state

        console.error(error);
        return { success: false, msg: error.message, redirectUrl: '/shop' }
    }
}