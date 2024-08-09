import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role of user from payload
    const { role, uid } = getReqHeaders(req.headers)

    try {
        const delacc = await prisma.user.delete({
            where: {
                id: uid
            }
        });
        return NextResponse.json({ success: true, delacc }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to delete your account' }, { status: 500 });
    }
}