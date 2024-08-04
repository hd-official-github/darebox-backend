import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getReqHeaders } from '@/utils/getReqheaders';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {

    // get role,uid of user from token
    const { role, uid } = getReqHeaders(req.headers)
    try {
        // Fetch all creativity records from the database
        const opportunity = await prisma.opportunity.findMany();
        return NextResponse.json({ success: true, opportunity }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: 'Failed to fetch opportunities records' }, { status: 500 });
    }
}