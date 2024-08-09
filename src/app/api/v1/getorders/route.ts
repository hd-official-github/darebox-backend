import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role,uid of user from token
    const { role, uid } = getReqHeaders(req.headers)
    console.log('role ', role, 'uidd ', uid);

    if (!uid)
        return NextResponse.json({ msg: 'Userid cannot be null' }, { status: 500 });
    try {
        // Fetch all creativity records from the database
        const orders = await prisma.order.findMany({
            where: {
                userId: uid
            },
        });
        return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
        console.log('err ', error)
        return NextResponse.json({ msg: 'Failed to fetch orders records' }, { status: 500 });
    }
}