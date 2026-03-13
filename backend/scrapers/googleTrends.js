import googleTrends from 'google-trends-api';
import config from '../config/index.js';

const GEO = 'IN';

function parseInterestOverTimeResponse(res) {
  try {
    const data = JSON.parse(res);
    const timeline = data?.default?.timelineData;
    if (!timeline || !Array.isArray(timeline)) return [];
    return timeline.map((d) => ({
      date: d.time,
      value: d.value?.[0] ?? 0,
      formatted: d.formattedTime ?? d.time,
    }));
  } catch {
    return [];
  }
}

function computeSearchGrowth(timelineData) {
  if (!timelineData || timelineData.length < 2) return 0;
  const recent = timelineData.slice(-Math.min(4, Math.floor(timelineData.length / 2)));
  const older = timelineData.slice(0, Math.min(4, Math.floor(timelineData.length / 2)));
  const recentAvg = recent.reduce((s, d) => s + (d.value || 0), 0) / recent.length;
  const olderAvg = older.reduce((s, d) => s + (d.value || 0), 0) / older.length;
  if (olderAvg === 0) return recentAvg > 0 ? 100 : 0;
  return Math.round(((recentAvg - olderAvg) / olderAvg) * 100);
}

export async function fetchKeywordTrend(keyword) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);

    const res = await googleTrends.interestOverTime({
      keyword,
      geo: GEO,
      startTime: startDate,
      endTime: endDate,
    });

    const timelineData = parseInterestOverTimeResponse(res);
    const searchGrowth = computeSearchGrowth(timelineData);

    return {
      keyword,
      searchGrowth,
      timelineData,
    };
  } catch (err) {
    console.error(`googleTrends.fetchKeywordTrend: ${keyword}`, err.message);
    return { keyword, searchGrowth: 0, timelineData: [] };
  }
}

export async function fetchAllWellnessTrends() {
  const keywords = config.wellnessKeywords;
  const results = [];

  for (const keyword of keywords) {
    const result = await fetchKeywordTrend(keyword);
    results.push(result);
  }

  return results;
}
