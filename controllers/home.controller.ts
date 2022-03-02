import { Request, Response, NextFunction } from 'express'
import { isMfaByConnection } from '../config/config'
import enabledFactors from '../config/enabledFactors'
import { Factor } from '../types/auth.types';
import IUser from '../interfaces/IUser';

export default class HomeController {
  constructor() {  }

  public landingPageHandler = async (req: Request, res: Response, next: NextFunction) => {   

    let availableFactors = [Factor.email, Factor.sms, Factor.otp];

    if (req.hasOwnProperty('user') && req.user !== undefined) {
      const user = req.user as IUser;

      if(isMfaByConnection == true) {
        const connection = user.connection;      
        for (let i = 0; i < enabledFactors.length; i++) {
          if (enabledFactors[i].connection === connection) {
            availableFactors = enabledFactors[i].factors;
            break;
          }
        }
      }
    }

    res.render('index', { factors: availableFactors })
  };
}