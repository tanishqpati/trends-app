import Trend from '../models/Trend.js';
import config from '../config/index.js';
import * as cache from './cacheService.js';

const CACHE_KEY_TRENDS = 'trends:all';
const CACHE_KEY_TOP = 'trends:top';
const CACHE_KEY_OPPORTUNITIES = 'trends:opportunities';

export async function getAllTrends() {
  const cached = cache.get(CACHE_KEY_TRENDS);
  if (cached) return cached;

  const trends = await Trend.find().sort({ 'scores.trendScore': -1, createdAt: -1 }).lean();
  cache.set(CACHE_KEY_TRENDS, trends, config.cacheTtlMs);
  return trends;
}

export async function getTopTrends(limit = 10) {
  const cacheKey = `${CACHE_KEY_TOP}:${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const trends = await Trend.find()
    .sort({ 'scores.trendScore': -1, createdAt: -1 })
    .limit(limit)
    .lean();
  cache.set(cacheKey, trends, config.cacheTtlMs);
  return trends;
}

export async function getTrendById(id) {
  const trend = await Trend.findById(id).lean();
  return trend;
}

export async function getOpportunities() {
  const cached = cache.get(CACHE_KEY_OPPORTUNITIES);
  if (cached) return cached;

  const trends = await Trend.find({ trendType: 'REAL_TREND' })
    .sort({ 'scores.trendScore': -1 })
    .limit(10)
    .lean();
  cache.set(CACHE_KEY_OPPORTUNITIES, trends, config.cacheTtlMs);
  return trends;
}

export function invalidateTrendCache() {
  cache.del(CACHE_KEY_TRENDS);
  cache.del(CACHE_KEY_OPPORTUNITIES);
  cache.del(`${CACHE_KEY_TOP}:10`);
}
