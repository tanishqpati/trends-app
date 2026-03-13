function estimateMarketPotentialCr(trendScore, researchPapers) {
  if (trendScore >= 0.8 && researchPapers >= 5) return '40–50Cr';
  if (trendScore >= 0.6 && researchPapers >= 3) return '25–40Cr';
  if (trendScore >= 0.4) return '15–30Cr';
  return '10–20Cr';
}

export function generateOpportunityBrief(scoredTrend) {
  const { name, keyword, metrics = {}, scores = {}, trendType } = scoredTrend;
  const { searchGrowth, redditMentions, youtubeMentions, researchPapers } = metrics;
  const trendScore = scores.trendScore ?? 0;

  const whyNowParts = [];
  if (searchGrowth && searchGrowth !== 0) {
    const sign = searchGrowth > 0 ? '+' : '';
    whyNowParts.push(`Search interest ${sign}${searchGrowth}%`);
  }
  if ((redditMentions ?? 0) > 0) {
    whyNowParts.push(`Reddit discussion momentum`);
  }
  if ((researchPapers ?? 0) > 0) {
    whyNowParts.push(`${researchPapers} research publications in the last 12 months`);
  }
  const whyNow = whyNowParts.length ? whyNowParts.join('. ') : 'Growing signals across platforms.';

  const productIdeas = {
    ashwagandha: 'stress-relief gummies targeting Indian working professionals',
    adaptogens: 'adaptogen supplements for urban professionals',
    'collagen peptides': 'premium collagen drink mix targeting urban women',
    probiotics: 'gut health supplements for Indian consumers',
    'vitamin d': 'vitamin D supplements for office workers',
    'omega 3': 'omega-3 supplements for heart health',
    turmeric: 'turmeric-based wellness products',
    curcumin: 'curcumin supplements for inflammation support',
    biotin: 'hair and nail supplements',
    melatonin: 'sleep supplements for shift workers',
    magnesium: 'magnesium supplements for stress and sleep',
    berberine: 'blood sugar support supplements',
    astragalus: 'immune support supplements',
    'mushroom supplements': 'functional mushroom supplements',
    'gut health': 'gut microbiome supplements',
    'sleep supplements': 'sleep aid products',
    'stress relief': 'stress-relief supplements',
  };
  const opportunityTemplate =
    productIdeas[keyword?.toLowerCase()] ??
    `Premium ${name} products targeting Indian wellness consumers.`;

  const marketPotential = estimateMarketPotentialCr(trendScore, researchPapers ?? 0);

  const competitionGap =
    trendType === 'REAL_TREND'
      ? 'Few premium Indian D2C brands focused on this segment.'
      : 'Market may be saturated or temporary.';

  return {
    whyNow,
    opportunity: `Launch ${opportunityTemplate}`,
    marketPotential: `Estimated ₹${marketPotential} D2C opportunity.`,
    competitionGap,
  };
}
