import express, { Request, Response, NextFunction } from 'express';
import HomeController from '../controllers/home.controller';


const router = express.Router();

const { landingPageHandler } = new HomeController();
router.get('/', landingPageHandler);

// router.get('/', async(req: Request, res: Response, next:NextFunction) => {
//   console.log(req.user);
//   console.log('in index router');  
//   res.render('index',{factors:['otp', 'email', 'sms']}) //{"factors": JSON.stringify({factors:['otp', 'email', 'sms']}, null, 2)})
// }) 
export default router;