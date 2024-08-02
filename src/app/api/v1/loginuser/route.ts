import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.NEXTAUTH_SECRET || 'your_secret_key'; // Use a secure secret key from environment variables
const reqZodSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})
export async function POST(req: NextRequest) {
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
                ],
            },
        });

        // If user is not found
        if (!user) {
            return NextResponse.json({ msg: 'Invalid credentials' }, { status: 500 });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(d.password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ msg: 'Invalid credentials' }, { status: 500 });
        }
        const iat = Math.floor(Date.now() / 1000); // Issued at
        const exp = iat + 60 * 60; // Expiration time (1 hour)

        const token = await new SignJWT({ username: d.username, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt(iat)
            .setExpirationTime(exp)
            .sign(new TextEncoder().encode(SECRET_KEY));
        // Generate JWT token
        // const token = jwt.sign(
        //     {
        //         username: d.username, // Or user.username if username exists
        //         role: user.role,
        //     },
        //     SECRET_KEY,
        //     { expiresIn: '1h' }
        // );

        // Send the token as the response
        return NextResponse.json({ token }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}