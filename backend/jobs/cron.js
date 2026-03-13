import cron from 'node-cron';
import { runPipeline } from './pipeline.js';

const CRON_SCHEDULE = '0 2 * * *';

export function registerCron() {
  cron.schedule(CRON_SCHEDULE, async () => {
    try {
      console.log('Running scheduled pipeline...');
      const count = await runPipeline();
      console.log(`Pipeline completed: ${count} trends stored.`);
    } catch (err) {
      console.error('Pipeline error:', err.message);
    }
  });
}
