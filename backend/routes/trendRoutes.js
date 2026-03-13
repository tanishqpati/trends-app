import { Router } from 'express';
import * as trendController from '../controllers/trendController.js';

const router = Router();

router.get('/trends', trendController.getTrends);
router.get('/trends/top', trendController.getTopTrends);
router.get('/trends/:id', trendController.getTrendById);
router.get('/opportunities', trendController.getOpportunities);

export default router;
