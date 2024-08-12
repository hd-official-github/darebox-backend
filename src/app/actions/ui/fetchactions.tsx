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
export async function getorders() {
  const order = await prisma.order.findMany({
    include: {
      User: {
        select: {
          fullname: true,
        },
      },
    },
  });
  return order
}
export async function getwallet() {
  const order = await prisma.wallet.findMany({
    include: {
      user: {
        select: {
          fullname: true,
          role: true
        }
      }
    },
  });
  return order
}
export async function getquizmodel() {
  const quizmodel = await prisma.quizModel.findMany()
  return quizmodel
}
export async function getquesandchoicecount(id: string) {
  const quesandchoicecount = await prisma.quizQuestion.findMany({
    where: {
      quizModelId: Number(id),
    },
    select: {
      id: true,
      question: true,
      _count: {
        select: { Choice: true }, // Count the number of choices
      },
      quizmodel: {
        select: {
          plan: true,
          quiztype: true
        }
      }
    }
  })
  // console.log("QS ", quesandchoicecount);

  return quesandchoicecount
}
export async function getchoices(id: string) {
  const choices = await prisma.choice.findMany({
    where: {
      quizQuestionId: Number(id)
    }
  })
  // console.log('chs ', choices);
  return choices

}
export async function getquizresults() {
  const qres = await prisma.quizResult.findMany({
    include: {
      user: {
        select: {
          fullname: true
        }
      }
    }
  })
  // console.log('chs ', choices);
  return qres

}
export async function getquizmodeldata(id: string) {
  const qmodel = await prisma.quizModel.findFirst({
    where: {
      id: Number(id)
    },
    select: {
      questionCount: true,
      timingInfo: true
    }
  })
  // console.log('chs ', choices);
  // console.log('qm ', qmodel);
  return qmodel

}