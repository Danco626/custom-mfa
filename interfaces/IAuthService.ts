import { AxiosPromise } from "axios";
import { Factor, MfaAssociatedInfo, AuthResponse} from '../types/auth.types';

export default interface IAuthService {
  addAuthenticator(accessToken: string, factor: Factor, identifier?:string): Promise<AxiosPromise<MfaAssociatedInfo>>;
  confirmSecondFactor(accessToken: string, mfaEnrollmentInfo: MfaAssociatedInfo, binding_code: string): Promise<AxiosPromise<AuthResponse>>
  
}