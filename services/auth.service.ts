import axios, { AxiosPromise } from 'axios';
import { auth0domain, clientId, clientSecret } from '../config/config';
import IAuthService from '../interfaces/IAuthService';
import { AuthenticatorType, Factor, MfaAssociatedRequest, MfaAssociatedResponse, MfaConfirmationRequest, AuthResponse} from '../types/auth.types';

export default class AuthService implements IAuthService{
  constructor() { }

  public async addAuthenticator(accessToken: string, factor: Factor, identifier?:string): Promise<AxiosPromise<MfaAssociatedResponse>> {
   
    //default to OTP
    let request: MfaAssociatedRequest = { authenticator_types: [AuthenticatorType.otp] };

    if (factor === Factor.email) {
      request = {
        authenticator_types: [AuthenticatorType.oob],
        email: identifier,
        oob_channels: [factor]
      };
    }

    if (factor === Factor.sms) {
      request = {
        authenticator_types: [AuthenticatorType.oob],
        phone_number: identifier,
        oob_channels: [factor]
      };
    } 


    return axios({
      url: `https://${auth0domain}/mfa/associate`,
      method: 'POST',
      headers: { authorization: `bearer ${accessToken}` },
      data: request
    });
  }

  public async confirmSecondFactor(accessToken: string, factor: Factor, oob_code: string, binding_code: string): Promise<AxiosPromise<AuthResponse>> {
    const grantType:string = oob_code ? 'oob' : 'otp'; 

    let request: MfaConfirmationRequest = {
      mfa_token: accessToken,
      client_id: clientId || '',
      client_secret: clientSecret || '',
      grant_type: `http://auth0.com/oauth/grant-type/mfa-${grantType}`,
     };

    if(oob_code) {
      request = {
        ...request,
        oob_code: oob_code,
        binding_code: binding_code
      };      
    } else {
      request = {
        ...request,
        otp: '',
      };            
    }
    
    return axios({
      url: `https://${auth0domain}/oauth/token`,
      method: 'POST',
      data: request
    });
  }



}