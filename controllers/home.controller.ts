import { Request, Response, NextFunction } from 'express'
import { isMfaByConnection } from '../config/config'
import { enabledFactors, supportedFactors } from '../config/factorMapping'
import { Factor } from '../types/auth.types';
import IUser from '../interfaces/IUser';

export default class HomeController {
  constructor() { }

  public landingPageHandler = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user as IUser;
    let factors = await this.getValidFactors(user.connection);
    res.render('index', { factors })

  };

  private getValidFactors = async (connection: string = '') => {

    if (!connection || isMfaByConnection == false) {
      return supportedFactors;
    }


    for (let i = 0; i < enabledFactors.length; i++) {
      if (enabledFactors[i].connection === connection) {
        return enabledFactors[i].factors;
      }
    }
    
  }

}