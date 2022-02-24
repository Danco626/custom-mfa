import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
const router = express.Router();


const {loginHandler, callbackHandler, logoutHandler, mfaEnrollmentHandler, mfaValidationHandler} = new AuthController(new AuthService());


router.get('/login', loginHandler);
router.get('/callback', callbackHandler);
router.get('/logout', logoutHandler);
router.get('/enroll/:factor', mfaEnrollmentHandler);
router.get('/mfa', mfaValidationHandler);
//router.get('/redirect/enroll', mfaEnrollmentHandler);
// router.get('/auth', async(req: Request, res: Response, next:NextFunction) => {
//   res.render('index', {})
// }) 

export default router;