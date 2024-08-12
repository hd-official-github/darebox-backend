import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role of user from payload
    const { role, uid } = getReqHeaders(req.headers)

    try {
        // Fetch all creativity records from the database
        const qmodels = await prisma.quizModel.findMany({
            where: {
                plan: role
            }
        });
        return NextResponse.json({ success: true, qmodels }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch qmodels records' }, { status: 500 });
    }
}