"use server"

import { NoticeBoardPlan, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
type NBResp = {id:any,plan:string,type:string,rank:string,name:string,points:string}
export async function getnbfoundation():Promise<NBResp[] | []> {
  const resp = await prisma.noticeBoard.findMany({
    where:{
        plan:NoticeBoardPlan.FOUNDATION
    }
  });
  return resp;
}
export async function getnbtop():Promise<NBResp[] | []> {
  const resp = await prisma.noticeBoard.findMany({
    where:{
        plan:NoticeBoardPlan.TOP
    }
  });
  return resp;
}
export async function getnbpro():Promise<NBResp[] | []> {
  const resp = await prisma.noticeBoard.findMany({
    where:{
        plan:NoticeBoardPlan.PRO
    }
  });
  return resp;
}
