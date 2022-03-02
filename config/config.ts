//import Factor from '../types/auth.types';
import dotenv from 'dotenv';
dotenv.config();

export const auth0domain = process.env.AUTH0_DOMAIN || '';
export const clientId = process.env.CLIENT_ID || '';
export const clientSecret = process.env.CLIENT_SECRET || '';
export const callbackUrl = process.env.AUTH0_CALLBACK_URL || '';
export const port = process.env.PORT || '4000';
export const sessionSecret = process.env.SESSION_SECRET || '';
export const enabledFactors = [{connection: 'Username-Password-Authentication', factors: ['email']}, {connection: 'SMSConnection', factors: ['sms']}]
