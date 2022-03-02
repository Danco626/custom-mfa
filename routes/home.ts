import HomeController from '../controllers/home.controller';
import secured from '../middleware/secured';
import express from 'express';
const router = express.Router();

const { landingPageHandler } = new HomeController();
router.get('/', secured(), landingPageHandler);
// router.get('/error', landingPageHandler);

// }) 
export default router;