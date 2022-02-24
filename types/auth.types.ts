export const enum AuthenticatorType {
  otp = 'otp',
  oob = 'oob'
}

export const enum Factor {
  email = 'email',
  sms = 'sms',
  otp = 'otp'
}

export type MfaAssociatedRequest = {
  authenticator_types: [AuthenticatorType],
  email?: string,
  phone_number?: string,
  oob_channels?: [Factor]  
}

export type MfaAssociatedResponse = {
  authenticator_type: AuthenticatorType,
  recovery_codes: string[],
  barcode_uri: string, 
  binding_method?: string,
  oob_channel?: Factor,
  oob_code?: string,
  secret?: string
}

export type MfaConfirmationRequest = {
  mfa_token: string,
  client_id: string,
  client_secret: string,
  grant_type: string,
  oob_code?: string,
  binding_code?: string,
  otp?: string  
}

export type AuthResponse = {
  id_token: string,
  access_token:string,
  expires_in: number,
  scope: string,
  token_type: string
}

