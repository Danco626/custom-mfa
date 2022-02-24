import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AuthenticateOptions } from "passport-auth0";
import { auth0domain, clientId, port } from '../config/config';
import url from 'url';
import { Factor, AuthenticatorType } from '../types/auth.types';
import IAuthService from "../interfaces/IAuthService";
import IUser from "../interfaces/IUser";

import BaseController from './base.controller';


interface AuthenticationOptionsAudience extends AuthenticateOptions {
  audience: string
}

export default class AuthController implements BaseController {
  constructor(private authService: IAuthService) {

  }
  public loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    //const redirectState = req.query.state;
    //req.session. ["redirectState"] = redirectState;

    const options: AuthenticationOptionsAudience = {
      scope: 'enroll offline_access read:authenticators remove:authenticators openid profile email',
      audience: `https://${auth0domain}/mfa/`
    }

    passport.authenticate("auth0", options, () => {
      console.log('in callback');
    })(req, res, next);//,
    // (req: Request, res: Response) => {
    //   res.redirect("/")
    // }
  };

  public callbackHandler = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("auth0", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        console.log("no user");
        console.log(info)
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
    console.log(req.session);

    try {
      const result = await this.authService.addAuthenticator(user.accessToken, factor, identifier);
      const authenticatorResult = result.data;
      req.session.oob_code = authenticatorResult.oob_code;
      req.session.factor = factor;
      res.render('code', { factor: factor })

    } catch (e) {
      console.log(e);
    }
  };

  public mfaValidationHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.factor || !req.session.oob_code || !req.query.mfa_code) {
      throw new Error('');
    }
    
    const user = req.user as IUser;
    const factor = req.session.factor as Factor;
    const oobCode = req.session.oob_code!;    
    const code = req.query.mfa_code.toString();
    try {
      const result = await this.authService.confirmSecondFactor(user.accessToken, factor, oobCode, code);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }

}