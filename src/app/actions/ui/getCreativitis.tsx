"use server"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function getcreativits() {
    const creas = await prisma.creativity.findMany();
    return creas;
}