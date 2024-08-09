import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'your_secret_key'; // Use a secure secret key from environment variables
const reqZodSchema = z.object({
    username: z.string().min(1),
    newpass: z.string().min(1),
})
export async function POST(req: NextRequest) {
    // const { role, uid } = getReqHeaders(req.headers)
    try {
        const data = await req.json();
        const parsedData = reqZodSchema.safeParse(data)
        if (!parsedData.success) {
            return NextResponse.json({ msg: 'Incorrect Data' }, { status: 500 });
        }
        const d: z.infer<typeof reqZodSchema> = parsedData.data
        // Find the user by email or phone
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: d.username },
                    { phone: d.username },
                ]
            }
        });
        // If user is not found
        if (!user) {
            return NextResponse.json({ msg: 'User does not exists' }, { status: 500 });
        }
        const newMatchesold = await bcrypt.compare(d.newpass, user.password);
        if (newMatchesold) {
            return NextResponse.json({ msg: 'Old and new passwords cannot be same' }, { status: 500 });
        }
        const hashedPassword = await bcrypt.hash(d.newpass, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword
            },
        })
        return NextResponse.json({ success: true, msg: 'Success' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}