import { Factor } from "../types/auth.types"

export const enabledFactors = [
  { 
    connection: 'Username-Password-Authentication', 
    factors: [Factor.email] 
  }, { 
    connection: 'SMSConnection', 
    factors: [Factor.sms] 
  }
];

export const supportedFactors = [
  Factor.email, 
  Factor.sms, 
  //Factor.otp - OTP support is a WIP 
];



