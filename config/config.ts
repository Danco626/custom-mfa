//import Factor from '../types/auth.types';
import dotenv from 'dotenv';
dotenv.config();

export const auth0domain = process.env.AUTH0_DOMAIN || '';
export const clientId = process.env.CLIENT_ID || '';
export const clientSecret = process.env.CLIENT_SECRET || '';
export const callbackUrl = process.env.AUTH0_CALLBACK_URL || '';
export const port = process.env.PORT || '4000';

export const enabledFactors = [{connection: 'Username-Password-Authentication', factors: ['sms']}, {connection: 'SMSConnection', factors: ['sms']}]
// export const auth0domain = () => {
//   if(!process.env.AUTH0_DOMAIN)         
//     throw new Error('Auth0 domain required')  
//   return process.env.AUTH0_DOMAIN
// };
// export const clientId = () => {
//   if(!process.env.CLIENT_ID)         
//     throw new Error('Auth0 client id required')  
//   return process.env.CLIENT_ID
// };

// export const clientSecret = () => {
//   if(!process.env.CLIENT_SECRET)         
//     throw new Error('Auth0 client secret required')  
//   return process.env.CLIENT_SECRET
// };
