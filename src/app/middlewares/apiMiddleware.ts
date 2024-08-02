import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeProtectedHeader, jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';
export async function middleware(req: NextRequest) {

  // Extract the Authorization header
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload, protectedHeader } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
      algorithms: ['HS256'],
    });
    const response = NextResponse.next();
    response.headers.set('user-custom-role', payload.role);
    return response;
  } catch (error) {
    console.log('err ', error);

    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}