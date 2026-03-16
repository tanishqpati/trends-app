import { fetchAllWellnessTrends } from '../scrapers/googleTrends.js';
import { fetchAllRedditData } from '../scrapers/reddit.js';
import { fetchAllYouTubeData } from '../scrapers/youtube.js';
import { fetchAllPublicationCounts } from '../scrapers/pubmed.js';
import { fetchAllNewsData } from '../scrapers/news.js';
import { fetchAllProductCounts } from '../scrapers/products.js';
import { scoreTrends } from '../scoring/trendScore.js';
import { classifyTrendType } from '../scoring/fadDetection.js';
import { generateOpportunityBrief } from '../utils/briefGenerator.js';
import Trend from '../models/Trend.js';
import TrendSnapshot from '../models/TrendSnapshot.js';
import PipelineRun from '../models/PipelineRun.js';
import { invalidateTrendCache } from '../services/trendService.js';
import { getAllKeywords } from '../services/keywordService.js';

function mergeByKeyword(keywords, gt, reddit, youtube, pubmed, news, products) {
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
    map.set(r.keyword, { ...existing, researchPapers: r.researchPapers });
  }
  for (const r of news ?? []) {
    const existing = map.get(r.keyword) ?? { keyword: r.keyword };
    map.set(r.keyword, {
      ...existing,
      newsMentions: r.newsMentions,
      newsArticles: r.newsArticles ?? [],
    });
  }
  for (const r of products ?? []) {
    const existing = map.get(r.keyword) ?? { keyword: r.keyword };
    map.set(r.keyword, {
      ...existing,
      productCount: r.productCount ?? 0,
    });
  }

  const empty = {
    searchGrowth: 0,
    redditMentions: 0,
    youtubeMentions: 0,
    researchPapers: 0,
    newsMentions: 0,
    productCount: 0,
    timelineData: [],
    redditPosts: [],
    youtubeVideos: [],
    newsArticles: [],
  };

  return keywords.map((k) => {
    const r = map.get(k);
    if (!r) return { keyword: k, ...empty };
    return {
      keyword: r.keyword,
      searchGrowth: r.searchGrowth ?? 0,
      redditMentions: r.redditMentions ?? 0,
      youtubeMentions: r.youtubeMentions ?? 0,
      researchPapers: r.researchPapers ?? 0,
      newsMentions: r.newsMentions ?? 0,
      productCount: r.productCount ?? 0,
      timelineData: r.timelineData ?? [],
      redditPosts: r.redditPosts ?? [],
      youtubeVideos: r.youtubeVideos ?? [],
      newsArticles: r.newsArticles ?? [],
    };
  });
}

export async function runPipeline() {
  const keywords = await getAllKeywords();
  await PipelineRun.create({ status: 'running' });

  try {
    const [gt, reddit, youtube, pubmed, news, products] = await Promise.all([
      fetchAllWellnessTrends(keywords),
      fetchAllRedditData(keywords),
      fetchAllYouTubeData(keywords),
      fetchAllPublicationCounts(keywords),
      fetchAllNewsData(keywords),
      fetchAllProductCounts(keywords),
    ]);

    const rawTrends = mergeByKeyword(keywords, gt, reddit, youtube, pubmed, news, products);
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
    const inserted = await Trend.insertMany(trendsToStore);
    invalidateTrendCache();

    const snapshots = trendsToStore.map((t) => ({
      keyword: t.keyword,
      name: t.name,
      metrics: t.metrics,
      scores: t.scores,
      trendType: t.trendType,
      recordedAt: new Date(),
    }));
    await TrendSnapshot.insertMany(snapshots);

    await PipelineRun.create({ status: 'success', trendsStored: trendsToStore.length });
    return trendsToStore.length;
  } catch (err) {
    await PipelineRun.create({ status: 'error', errorMessage: err.message });
    throw err;
  }
}
