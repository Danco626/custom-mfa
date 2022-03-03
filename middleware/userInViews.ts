import { Request, Response, NextFunction } from 'express';
import IUser from '../interfaces/IUser';

export default () => {
  return (req: Request, res: Response, next: NextFunction ) => {
    res.locals.user = req.user as IUser;
    next();
  }
}