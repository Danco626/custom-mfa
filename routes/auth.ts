import express from 'express';
import AuthController from '../controllers/auth.controller';
import AuthService from '../services/auth.service';
import secured from '../middleware/secured';
const router = express.Router();

const {
  loginHandler, 
  callbackHandler, 
  logoutHandler, 
  mfaEnrollmentHandler, 
  mfaValidationHandler
} = new AuthController(new AuthService());

router.get('/login', loginHandler);
router.get('/callback', callbackHandler);
router.get('/logout', logoutHandler);
router.get('/enroll/:factor', secured(), mfaEnrollmentHandler);
router.get('/mfa', secured(), mfaValidationHandler);

export default router;