import mongoose from 'mongoose';
import config from './index.js';

export async function connectDb() {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}
