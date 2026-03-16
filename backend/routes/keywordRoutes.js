import { Router } from 'express';
import * as keywordController from '../controllers/keywordController.js';

const router = Router();

router.get('/keywords', keywordController.getKeywords);
router.post('/keywords', keywordController.addKeyword);
router.delete('/keywords/:id', keywordController.removeKeyword);

export default router;
