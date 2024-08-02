
"use server";
import { signIn } from '@/auth';
import { AdminSchema } from '@/zodSchema/adminSchema';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

type AuthResponse = { success: boolean, msg?: string, redirectUrl: string }
type AdminType = z.infer<typeof AdminSchema>


export async function AdminSubmit(data: FormData): Promise<AuthResponse> {
    const formDataEntries = Object.fromEntries(data);
    const parsedData = AdminSchema.safeParse(formDataEntries);
    if (!parsedData.success) {
        return { success: false, msg: "Error Occured while submitting", redirectUrl: "/" }
    }
    const prisma = new PrismaClient()
    const d: AdminType = parsedData.data;
    try {
        await signIn("credentials", {
            email: d.email,
            pass: d.pass,
            redirect: false
        })
        return { success: true, redirectUrl: '/dashboard' }
    } catch (err: any) {
        console.log("MYERR ",err.code);
        
        return { success: false, msg: err.code, redirectUrl: "/" }
    }
}