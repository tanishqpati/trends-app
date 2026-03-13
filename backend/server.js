import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import { connectDb } from './config/db.js';
import trendRoutes from './routes/trendRoutes.js';
import pipelineRoutes from './routes/pipelineRoutes.js';
import { registerCron } from './jobs/cron.js';

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', trendRoutes);
app.use('/api', pipelineRoutes);

app.listen(config.port, async () => {
  await connectDb();
  registerCron();
  console.log(`Server running on port ${config.port}`);
});
