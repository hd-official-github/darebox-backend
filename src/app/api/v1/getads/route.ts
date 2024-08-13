import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    try {

        const ads = await prisma.ads.findMany();
        return NextResponse.json({ success: true, ads }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch ads' }, { status: 500 });
    }
}