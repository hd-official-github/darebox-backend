"use server";
import { PrismaClient, Role } from "@prisma/client";
type UserData ={
    id:string,
    fullname:string,
    role:string
}
const prisma=new PrismaClient()
export async function GetUserbyRole(role:Role):Promise<UserData[] | []>{
    const users=await prisma.user.findMany({
        where:{
            role:role
        },
        select:{
            id:true,
            fullname:true,
            role:true
        }
    })
    return users
}