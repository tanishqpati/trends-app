import dotenv from 'dotenv';
dotenv.config();

import { connectDb } from '../config/db.js';
import { runPipeline } from '../jobs/pipeline.js';

async function seed() {
  try {
    await connectDb();
    const count = await runPipeline();
    console.log(`Seed complete: ${count} trends stored.`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
