import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { SignJWT } from 'jose';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'your_secret_key'; // Use a secure secret key from environment variables
const reqZodSchema = z.object({
    old: z.string().min(1),
    new: z.string().min(1),
})
export async function POST(req: NextRequest) {
    const { role, uid } = getReqHeaders(req.headers)
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
                id: uid
            }
        });

        // If user is not found
        if (!user) {
            return NextResponse.json({ msg: 'User does not exists' }, { status: 500 });
        }
        const passwordMatch = await bcrypt.compare(d.old, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ msg: 'Old Password is invalid' }, { status: 500 });
        }
        const newMatchesold = await bcrypt.compare(d.new, user.password);
        if (newMatchesold) {
            return NextResponse.json({ msg: 'Old and new passwords cannot be same' }, { status: 500 });
        }
        const hashedPassword = await bcrypt.hash(d.new, 10);
        await prisma.user.update({
            where: { id: uid },
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