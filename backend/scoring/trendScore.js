import { calculateTrendScore } from '../../shared/trendScore.js';
import { minMaxNormalize, getMinMax } from '../utils/normalize.js';

function toName(keyword) {
  return keyword
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function buildMetricsFromRaw(rawTrends) {
  return rawTrends.map((r) => ({
    keyword: r.keyword,
    name: toName(r.keyword),
    searchGrowth: r.searchGrowth ?? 0,
    redditMentions: r.redditMentions ?? 0,
    youtubeMentions: r.youtubeMentions ?? 0,
    researchPapers: r.researchPapers ?? 0,
    competitionScore: r.competitionScore ?? 0.5,
    evidence: {
      googleTrendData: r.timelineData ?? r.googleTrendData ?? [],
      redditPosts: r.redditPosts ?? [],
      youtubeVideos: r.youtubeVideos ?? [],
    },
  }));
}

export function scoreTrends(rawTrends) {
  const metrics = buildMetricsFromRaw(rawTrends);
  if (metrics.length === 0) return [];

  const { min: searchMin, max: searchMax } = getMinMax(metrics, (m) => m.searchGrowth);
  const { min: redditMin, max: redditMax } = getMinMax(metrics, (m) => m.redditMentions);
  const { min: ytMin, max: ytMax } = getMinMax(metrics, (m) => m.youtubeMentions);
  const { min: researchMin, max: researchMax } = getMinMax(metrics, (m) => m.researchPapers);
  const { min: compMin, max: compMax } = getMinMax(metrics, (m) => m.competitionScore);

  const socialMax = Math.max(redditMax, ytMax);
  const socialMin = Math.min(redditMin, ytMin);

  return metrics.map((m) => {
    const searchVelocity = minMaxNormalize(m.searchGrowth, searchMin, searchMax);
    const redditNorm = minMaxNormalize(m.redditMentions, redditMin, redditMax);
    const ytNorm = minMaxNormalize(m.youtubeMentions, ytMin, ytMax);
    const socialGrowth = (redditNorm + ytNorm) / 2;
    const researchBacking = minMaxNormalize(m.researchPapers, researchMin, Math.max(researchMax, 1));
    const competitionInverse = 1 - minMaxNormalize(m.competitionScore, compMin, compMax);
    const marketPotential = (searchVelocity + socialGrowth + researchBacking) / 3;

    const trendScore = calculateTrendScore({
      searchVelocity,
      socialGrowth,
      researchBacking,
      competitionInverse,
      marketPotential,
    });

    return {
      ...m,
      metrics: {
        searchGrowth: m.searchGrowth,
        redditMentions: m.redditMentions,
        youtubeMentions: m.youtubeMentions,
        researchPapers: m.researchPapers,
        competitionScore: m.competitionScore,
      },
      scores: {
        velocityScore: searchVelocity,
        marketPotential,
        trendScore,
      },
    };
  });
}
