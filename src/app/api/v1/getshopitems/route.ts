import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { JWTPayload } from 'jose';
import { z } from 'zod';
import { getReqHeaders } from '@/utils/getReqheaders';
const planSchema = z.enum(['FOUNDATION', 'TOP', 'PRO']);
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { role, uid } = getReqHeaders(req.headers)
    // const data = await req.json()
    // console.log('print role ', req.headers.get('user-custom-role'))

    try {
        // Fetch all creativity records from the database
        const result = await prisma.shop.findMany({
            where: {
                plan: role
            }
        })
        return NextResponse.json({ success: true, items: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch noticeboard records' }, { status: 500 });
    }
}