import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
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
    // console.log('role ', role, 'type ', d.type)
    try {
        const quizresult = await prisma.quizResult.findFirst({
            where: {
                AND: [
                    { userId: uid },
                    { plan: role },
                    { type: d.type }
                ]
            }
        });
        if (!quizresult) {
            const res = await prisma.quizResult.create({
                data: {
                    plan: role,
                    type: d.type,
                    userId: uid,
                    score: "0"
                }
            })
            revalidatePath('/quiz/quizresults')
            return NextResponse.json({ success: true, res }, { status: 200 });
        } else {
            revalidatePath('/quiz/quizresults')
            return NextResponse.json({ success: false, msg: 'You have already taken the test' }, { status: 200 })
        }

    } catch (error) {
        revalidatePath('/quiz/quizresults')
        return NextResponse.json({ msg: 'Failed to fetch quiz records' }, { status: 500 });
    }
}