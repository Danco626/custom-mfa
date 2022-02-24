import { Request, Response, NextFunction } from 'express'
import { enabledFactors } from '../config/config'
import IUser from '../interfaces/IUser';
import BaseController from './base.controller';

export default class HomeController implements BaseController {
  constructor() {  }

  public landingPageHandler = async (req: Request, res: Response, next: NextFunction) => {   

    let availableFactors;

    if (req.hasOwnProperty('user') && req.user !== undefined) {
      const user = req.user as IUser;
      const connection = user.connection;


      
      for (let i = 0; i < enabledFactors.length; i++) {
        if (enabledFactors[i].connection === connection) {
          availableFactors = enabledFactors[i].factors;
          break;
        }
      }
    }


    res.render('index', { factors: availableFactors })
  };


}