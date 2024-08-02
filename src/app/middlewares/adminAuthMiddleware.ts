"use server";
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
export async function adminAuthMiddleware() {
    const session = await auth()
    if (!session?.user || session?.user.email != "admin") {
        redirect('/')
    }
    else return session.user
}