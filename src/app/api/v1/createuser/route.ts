import { NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';
const reqZodSchema = z.object({
    fullname: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().min(1),
    grade: z.string().min(1),
    password: z.string().min(1),
    city: z.string().min(1),
    refercode: z.string().optional(),
})
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = reqZodSchema.safeParse(data)
        if (!parsedData.success) {
            return NextResponse.json({ msg: 'Incorrect Data' }, { status: 500 });
        }
        const d: z.infer<typeof reqZodSchema> = parsedData.data
        // Check if the email or phone number already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: d.email },
                    { phone: d.phone },
                ],
            },
        });

        if (existingUser) {
            return NextResponse.json({ msg: 'Email or phone number already exists' }, { status: 500 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(d.password, 10);
        var role: Role = Role.FOUNDATION;
        if (parseInt(d.grade) > 0 && parseInt(d.grade) <= 5) {
            role = Role.FOUNDATION
        }
        if (parseInt(d.grade) > 5 && parseInt(d.grade) <= 12) {
            role = Role.TOP
        }
        if (parseInt(d.grade) > 12 && parseInt(d.grade) <= 14) {
            role = Role.PRO
        }
        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                fullname: d.fullname,
                email: d.email,
                phone: d.phone,
                grade: d.grade,
                role: role,
                city: d.city,
                refercode: d.refercode,
                password: hashedPassword,
            },
        });
        const iat = Math.floor(Date.now() / 1000); // Issued at
        const exp = iat + 60 * 60; // Expiration time (1 hour)

        const token = await new SignJWT({ uid: newUser.id, role: newUser.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt(iat)
            .setExpirationTime(exp)
            .sign(new TextEncoder().encode(JWT_SECRET));
        return NextResponse.json({ token }, { status: 200 });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
    }
}