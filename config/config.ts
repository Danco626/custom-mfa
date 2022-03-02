import dotenv from 'dotenv';
dotenv.config();

export const auth0domain = process.env.AUTH0_DOMAIN || '';
export const clientId = process.env.CLIENT_ID || '';
export const clientSecret = process.env.CLIENT_SECRET || '';
export const callbackUrl = process.env.AUTH0_CALLBACK_URL || '';
export const port = process.env.PORT || '4000';
export const sessionSecret = process.env.SESSION_SECRET || '';
export const customClaimNamespace = process.env.CUSTOM_CLAIM_NAMESPACE || '';
export const isMfaByConnection = process.env.IS_MFA_BY_CONNECTION?.toLowerCase() == 'true';
