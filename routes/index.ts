import express from 'express';
import home from './home';
import auth from './auth';
const router = express.Router();

router.use('/', home);
router.use('/', auth);

export default router;








