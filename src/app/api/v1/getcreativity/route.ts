import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { JWTPayload } from 'jose';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role of user from payload
    console.log('print role ',req.headers.get('user-custom-role'))
    
    try {
        // Fetch all creativity records from the database
        const creativity = await prisma.creativity.findMany();
        return NextResponse.json({ success: true, creativity }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch creativity records' }, { status: 500 });
    }
}