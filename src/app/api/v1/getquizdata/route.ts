import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';
import { z } from 'zod';
const typeSchema = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);
const prisma = new PrismaClient();
const zodShema = z.object({
    type: typeSchema,
});
export async function POST(req: NextRequest) {

    // get role,uid of user from token
    const data = await req.json()
    const parsedData = zodShema.safeParse(data)
    if (!parsedData.success) {
        return NextResponse.json({ msg: 'Incorrect Data' }, { status: 500 });
    }
    const { role, uid } = getReqHeaders(req.headers)
    const d = parsedData.data
    console.log('role ', role, 'type ', d.type)
    try {
        // Fetch all creativity records from the database
        const quizdata = await prisma.quizModel.findMany({
            where: {
                AND: [
                    { plan: role },
                    { quiztype: d.type },
                    { isactive: true }
                ]
            },
            include: {
                QuizQuestion: {
                    include: {
                        Choice: true
                    }
                }
            }
        });
        return NextResponse.json({ success: true, quizdata }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch quiz records' }, { status: 500 });
    }
}