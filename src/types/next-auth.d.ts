import { JWTPayload } from 'jose';
import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { NextRequest } from 'next/server';

type UserId = string | undefined

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId,
        }
    }
}
// declare module 'next/server' {
//     interface NextRequest {
//       user?: JWTPayload;
//     }
//   }