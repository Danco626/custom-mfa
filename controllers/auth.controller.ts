import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthenticateOptions } from "passport-auth0";
import { auth0domain, clientId, port } from '../config/config';
import url from 'url';
import { Factor } from '../types/auth.types';
import IAuthService from "../interfaces/IAuthService";
import IUser from "../interfaces/IUser";
import log from '../utils/logger';
import * as sessionProps from '../types/session'; // required to extend express SessionData

interface AuthenticationOptionsAudience extends AuthenticateOptions {
  audience: string
}

export default class AuthController  {
  constructor(private authService: IAuthService) {  }
  
  public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const redirectState = req.query.state?.toString();
    if(redirectState) {
      log.info("recieved state", redirectState);    
      req.session.state = redirectState;
    }

    const options: AuthenticationOptionsAudience = {
      scope: 'enroll offline_access read:authenticators remove:authenticators openid profile email',
      audience: `https://${auth0domain}/mfa/`
    }

    passport.authenticate("auth0", options, () => {
      console.log('in callback');
    })(req, res, next);
  };

  public callbackHandler = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("auth0", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {                
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        res.redirect('/');
      });

    })(req, res, next);
  };

  public logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    req.logout();

    let returnTo = `${req.protocol}://${req.hostname}:${port}`;
    let logoutURL = new url.URL(`https://${auth0domain}/v2/logout`);

    logoutURL.searchParams.append('client_id', clientId);
    logoutURL.searchParams.append('returnTo', returnTo);

    res.redirect(logoutURL.toString());
  };

  public mfaEnrollmentHandler = async (req: Request, res: Response, next: NextFunction) => {
    const factor = req.params.factor as Factor;
    const user = req.user as IUser;
    const identifier = factor === Factor.email ? user.displayName : user.phone_number;
    
    try {
      const result = await this.authService.addAuthenticator(user.accessToken, factor, identifier);
      
      if(result.status !== 200) {
        throw new Error('An error occurred while enrolling in MFA');
      }
      req.session.mfaAssociateInfo = result.data      
      //req.session.factor = factor;
      res.render('code', { factor: factor })

    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  public mfaValidationHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.mfaAssociateInfo || !req.query.mfa_code) {
      throw new Error('Missing session data');
    }    
    
    const user = req.user as IUser;        
    const mfaEnrollmentInfo = req.session.mfaAssociateInfo;    
    const code = req.query.mfa_code.toString();

    try {
      const result = await this.authService.confirmSecondFactor(user.accessToken, mfaEnrollmentInfo, code);
      
     
      if(result.status !== 200) {
        throw new Error('An error occurred while verifying your code');
      }      

      if (!req.session.state) {
        log.info("in if", req.session.state);
        const enrollmentStatus = {code: 200, message: `Successfully enrolled in ${mfaEnrollmentInfo.oob_channel} MFA` };
        res.render('mfaComplete', enrollmentStatus); 
      } else {
        res.redirect(`https://${auth0domain}/continue?state=${req.session.state}`);                  
      }
    } catch (e) {      
      next(e);
    }
  }

}