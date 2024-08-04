// import { z } from "zod";

// const RoleEnum = z.enum(['FOUNDATION', 'TOP', 'PRO']);
// export const UserSchema = z.object({
//     id: z.string().min(1),
//     fullname: z.string().min(1),
//     email: z.string().min(1),
//     phone: z.string().min(1),
//     grade: z.string().min(1),
//     password: z.string().min(1),
//     role: RoleEnum,
//     city: z.string().min(1),
//     refercode: z.string().optional(),
//     isVerified: z.boolean(),
//     createdAt: z.string().min(1),
// })