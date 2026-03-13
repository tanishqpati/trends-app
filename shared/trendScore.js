const WEIGHTS = {
  searchVelocity: 0.35,
  socialGrowth: 0.25,
  researchBacking: 0.2,
  competitionInverse: 0.1,
  marketPotential: 0.1,
};

export function calculateTrendScore(normalizedMetrics) {
  const {
    searchVelocity = 0,
    socialGrowth = 0,
    researchBacking = 0,
    competitionInverse = 0,
    marketPotential = 0,
  } = normalizedMetrics;

  return (
    WEIGHTS.searchVelocity * searchVelocity +
    WEIGHTS.socialGrowth * socialGrowth +
    WEIGHTS.researchBacking * researchBacking +
    WEIGHTS.competitionInverse * competitionInverse +
    WEIGHTS.marketPotential * marketPotential
  );
}

export { WEIGHTS };
