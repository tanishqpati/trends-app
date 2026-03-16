import config from '../config/index.js';
import { fetchAllWellnessTrends } from '../scrapers/googleTrends.js';
import { fetchAllRedditData } from '../scrapers/reddit.js';
import { fetchAllYouTubeData } from '../scrapers/youtube.js';
import { fetchAllPublicationCounts } from '../scrapers/pubmed.js';
import { scoreTrends } from '../scoring/trendScore.js';
import { classifyTrendType } from '../scoring/fadDetection.js';
import { generateOpportunityBrief } from '../utils/briefGenerator.js';
import Trend from '../models/Trend.js';
import PipelineRun from '../models/PipelineRun.js';
import { invalidateTrendCache } from '../services/trendService.js';

function mergeByKeyword(gt, reddit, youtube, pubmed) {
  const keywords = config.wellnessKeywords;
  const map = new Map();

  for (const r of gt ?? []) {
    map.set(r.keyword, { ...r, timelineData: r.timelineData ?? [] });
  }
  for (const r of reddit ?? []) {
    const existing = map.get(r.keyword) ?? { keyword: r.keyword };
    map.set(r.keyword, {
      ...existing,
      redditMentions: r.redditMentions,
      redditPosts: r.redditPosts ?? [],
    });
  }
  for (const r of youtube ?? []) {
    const existing = map.get(r.keyword) ?? { keyword: r.keyword };
    map.set(r.keyword, {
      ...existing,
      youtubeMentions: r.youtubeMentions,
      youtubeVideos: r.youtubeVideos ?? [],
    });
  }
  for (const r of pubmed ?? []) {
    const existing = map.get(r.keyword) ?? { keyword: r.keyword };
    map.set(r.keyword, {
      ...existing,
      researchPapers: r.researchPapers,
    });
  }

  return keywords.map((k) => map.get(k) ?? { keyword: k, searchGrowth: 0, redditMentions: 0, youtubeMentions: 0, researchPapers: 0, timelineData: [], redditPosts: [], youtubeVideos: [] });
}

export async function runPipeline() {
  const keywords = config.wellnessKeywords;
  await PipelineRun.create({ status: 'running' });

  try {
    const [gt, reddit, youtube, pubmed] = await Promise.all([
    fetchAllWellnessTrends(),
    fetchAllRedditData(keywords),
    fetchAllYouTubeData(keywords),
    fetchAllPublicationCounts(keywords),
  ]);

  const rawTrends = mergeByKeyword(gt, reddit, youtube, pubmed);
  const scored = scoreTrends(rawTrends);

  const trendsToStore = scored.map((t) => {
    const trendType = classifyTrendType(t);
    const opportunityBrief = generateOpportunityBrief({ ...t, trendType });
    return {
      name: t.name,
      keyword: t.keyword,
      metrics: t.metrics,
      scores: t.scores,
      trendType,
      opportunityBrief,
      evidence: t.evidence ?? {},
    };
  });

    await Trend.deleteMany({});
    await Trend.insertMany(trendsToStore);
    invalidateTrendCache();

    await PipelineRun.create({ status: 'success', trendsStored: trendsToStore.length });
    return trendsToStore.length;
  } catch (err) {
    await PipelineRun.create({ status: 'error', errorMessage: err.message });
    throw err;
  }
}
