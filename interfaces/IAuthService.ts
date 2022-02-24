import { AxiosPromise } from "axios";
import { Factor, MfaAssociatedResponse, AuthResponse} from '../types/auth.types';

export default interface IAuthService {
  addAuthenticator(accessToken: string, factor: Factor, identifier?:string): Promise<AxiosPromise<MfaAssociatedResponse>>;
  confirmSecondFactor(accessToken: string, factor: Factor, oob_code: string, binding_code: string): Promise<AxiosPromise<AuthResponse>>;
  
}