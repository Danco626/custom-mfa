import { Factor, AuthenticatorType, MfaAssociatedInfo } from '../types/auth.types';
declare module 'express-session' {
  interface SessionData {
    authenticator_type: AuthenticatorType,
    recovery_codes: string[],
    barcode_uri: string,
    binding_method?: string,
    oob_channel?: Factor,
    oob_code?: string,
    secret?: string,
    returnTo: string,
    redirectState: string,
    state: string,
    factor: Factor,
    mfaAssociateInfo: MfaAssociatedInfo    
  }
}