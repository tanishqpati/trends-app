import { Router } from 'express';
import { runPipeline } from '../jobs/pipeline.js';

const router = Router();

router.post('/pipeline/run', async (_req, res) => {
  try {
    const count = await runPipeline();
    res.json({ success: true, trendsStored: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
