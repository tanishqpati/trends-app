import { Router } from 'express';
import { runPipeline } from '../jobs/pipeline.js';
import PipelineRun from '../models/PipelineRun.js';

const router = Router();

router.get('/pipeline/status', async (_req, res) => {
  try {
    const latest = await PipelineRun.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.json({ lastRunAt: null, status: 'never', trendsStored: null, errorMessage: null });
    }
    res.json({
      lastRunAt: latest.createdAt,
      status: latest.status,
      trendsStored: latest.trendsStored ?? null,
      errorMessage: latest.errorMessage ?? null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/pipeline/run', async (_req, res) => {
  try {
    const count = await runPipeline();
    res.json({ success: true, trendsStored: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
