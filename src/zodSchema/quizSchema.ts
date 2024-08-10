import { z } from "zod";
const plantype = z.enum(['FOUNDATION', 'TOP', 'PRO']);
const typetype = z.enum(['DAILY', 'WEEKLY', 'MONTHLY']);
export const AddQuizSchema = z.object({
    plan: plantype,
    quiztype: typetype,
})
export const AddQuesSchema = z.object({
    question: z.string(),
    quesid: z.string()
})
export const AddChoiceSchema = z.object({
    choice: z.string(),
    iscorrect: z.string(),
    quesid: z.string()
})