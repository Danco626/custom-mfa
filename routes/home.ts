import HomeController from '../controllers/home.controller';
import express from 'express';
const router = express.Router();

const { landingPageHandler } = new HomeController();
router.get('/', landingPageHandler);
// router.get('/error', landingPageHandler);

// }) 
export default router;