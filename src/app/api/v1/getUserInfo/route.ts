import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role,uid of user from token
    const { role, uid } = getReqHeaders(req.headers)
    try {
        // Fetch all creativity records from the database
        const user = await prisma.user.findFirst({
            where: {
                id: uid
            },
            select:{
                id:true,
                fullname:true,
                email:true,
                phone:true,
                role:true,
                city:true
            }
        });
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch creativity records' }, { status: 500 });
    }
}