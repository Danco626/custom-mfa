import { Factor } from "../types/auth.types"

export default [
  { 
    connection: 'Username-Password-Authentication', 
    factors: [Factor.email] 
  }, { 
    connection: 'SMSConnection', 
    factors: [Factor.sms] 
  }
]
