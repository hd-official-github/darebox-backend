import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { JWTPayload } from 'jose';
import { z } from 'zod';
const planSchema = z.enum(['FOUNDATION', 'TOP', 'PRO']);
const typeSchema = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);
const prisma = new PrismaClient();
const zodShema = z.object({
    plan: planSchema,
    type: typeSchema,
});
export async function POST(req: NextRequest) {
    const data = await req.json()
    const parsedData = zodShema.safeParse(data)
    if (!parsedData.success) {
        return NextResponse.json({ msg: 'Incorrect Data' }, { status: 500 });
    }
    const d = parsedData.data
    // console.log('print role ', req.headers.get('user-custom-role'))

    try {
        // Fetch all creativity records from the database
        const result = await prisma.noticeBoard.findMany({
            where: {
                AND: {
                    type: d.type,
                    plan: d.plan
                }
            }
        })
        return NextResponse.json({ success: true, noticeboard:result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch noticeboard records' }, { status: 500 });
    }
}