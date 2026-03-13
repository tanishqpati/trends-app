import express from 'express';
import cors from 'cors';
import config from './config/index.js';

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
