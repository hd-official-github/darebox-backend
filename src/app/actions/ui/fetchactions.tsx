"use server"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function getcreativits() {
  const creas = await prisma.creativity.findMany();
  return creas;
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      fullname: true
    }
  });
}
export async function getProductivity() {

  const prodata = await prisma.productivity.findMany({
    include: {
      user: {
        select: {
          fullname: true,
          role: true
        }
      }
    }
  })
  // console.log(prodata);
  // await prisma.$disconnect()
  return prodata
}

export async function getnews() {
  const newsdata = await prisma.news.findMany()
  return newsdata
}
export async function getlifeskills() {
  const lifedata = await prisma.lifeSkills.findMany()
  return lifedata
}

export async function getspokenenglish() {
  const spokenenglish = await prisma.spokenEnglish.findMany()
  return spokenenglish
}
export async function getinterviewtraining() {
  const interviewTraining = await prisma.interviewTraining.findMany()
  return interviewTraining
}
export async function getworkshop() {
  const workShop = await prisma.workShop.findMany()
  return workShop
}
export async function getshopitems() {
  const workShop = await prisma.shop.findMany()
  return workShop
}