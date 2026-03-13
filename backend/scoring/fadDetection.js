function hasSuddenSpike(timelineData) {
  if (!timelineData || timelineData.length < 4) return false;
  const values = timelineData.map((d) => d.value ?? 0);
  const recent = values.slice(-3);
  const older = values.slice(0, Math.floor(values.length / 2));
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
  if (olderAvg === 0) return recentAvg > 30;
  const growth = (recentAvg - olderAvg) / olderAvg;
  return growth > 2;
}

function hasLowResearchBacking(researchPapers) {
  return (researchPapers ?? 0) < 2;
}

function isSinglePlatformHype(redditMentions, youtubeMentions) {
  const hasReddit = (redditMentions ?? 0) > 10;
  const hasYoutube = (youtubeMentions ?? 0) > 10;
  return (hasReddit && !hasYoutube) || (hasYoutube && !hasReddit);
}

function hasMultiPlatformGrowth(redditMentions, youtubeMentions) {
  return (redditMentions ?? 0) > 5 && (youtubeMentions ?? 0) > 5;
}

function hasCreatorAdoption(youtubeMentions) {
  return (youtubeMentions ?? 0) > 20;
}

function hasResearchBacking(researchPapers) {
  return (researchPapers ?? 0) >= 3;
}

export function classifyTrendType(scoredTrend) {
  const { metrics = {}, evidence = {} } = scoredTrend;
  const { searchGrowth, redditMentions, youtubeMentions, researchPapers } = metrics;
  const timelineData = evidence.googleTrendData ?? [];

  let fadScore = 0;
  let trendScore = 0;

  if (hasSuddenSpike(timelineData) && hasLowResearchBacking(researchPapers)) {
    fadScore += 2;
  }
  if (hasLowResearchBacking(researchPapers)) {
    fadScore += 1;
  }
  if (isSinglePlatformHype(redditMentions, youtubeMentions) && hasLowResearchBacking(researchPapers)) {
    fadScore += 2;
  }

  if (hasMultiPlatformGrowth(redditMentions, youtubeMentions)) {
    trendScore += 1;
  }
  if (hasResearchBacking(researchPapers)) {
    trendScore += 2;
  }
  if (hasCreatorAdoption(youtubeMentions)) {
    trendScore += 1;
  }
  if (!hasSuddenSpike(timelineData) && (searchGrowth ?? 0) > 0 && (searchGrowth ?? 0) < 200) {
    trendScore += 1;
  }

  return fadScore > trendScore ? 'FAD' : 'REAL_TREND';
}
