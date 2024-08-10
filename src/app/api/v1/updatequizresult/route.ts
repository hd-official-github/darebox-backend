import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';
import { z } from 'zod';
const typeSchema = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);
const prisma = new PrismaClient();
const zodShema = z.object({
    id: z.number(),
    score: z.string()
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
    // console.log('role ', role, 'type ', d.type)
    try {
        const quizresult = await prisma.quizResult.findFirst({
            where: {
                id: d.id
            }
        });
        if (quizresult) {
            await prisma.quizResult.update({
                where: {
                    id: d.id
                }, data: {
                    score: d.score
                }
            })
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ msg: 'You have not taken the test' }, { status: 500 })
        }

    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch quiz records' }, { status: 500 });
    }
}