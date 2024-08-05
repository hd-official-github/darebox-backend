//this is a config file. NextJS standard
export { middleware as default } from '@/app/middlewares/apiMiddleware';
export const config = {
  matcher: ['/api/v1/getcreativity',
    '/api/v1/getopportunity',
    '/api/v1/getproductivity',
    '/api/v1/getUserInfo'
  
  ],
};

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     console.log("HEREEEEE");
    
//   return NextResponse.next()
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/api/v1/getcreativity',
// }