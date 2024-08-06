//this is a config file. NextJS standard
export { middleware as default } from '@/app/middlewares/apiMiddleware';
export const config = {
  matcher: ['/api/v1/getcreativity',
    '/api/v1/getopportunity',
    '/api/v1/getproductivity',
    '/api/v1/getUserInfo',
    '/api/v1/getnoticeboard',
    '/api/v1/getnews',
    '/api/v1/getlifeskills',
    '/api/v1/getspokenenglish',
    '/api/v1/getinterviewtraining',
    '/api/v1/getworkshop',
    '/api/v1/getshopitems',
  ],
};