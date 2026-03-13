import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const AXES = [
  { key: 'searchMomentum', label: 'Search Momentum' },
  { key: 'socialBuzz', label: 'Social Buzz' },
  { key: 'researchBacking', label: 'Research Backing' },
  { key: 'marketSize', label: 'Market Size' },
  { key: 'competitionGap', label: 'Competition Gap' },
];

function buildRadarData(trend) {
  const metrics = trend?.metrics ?? {};
  const scores = trend?.scores ?? {};
  const searchGrowth = metrics.searchGrowth ?? 0;
  const reddit = metrics.redditMentions ?? 0;
  const youtube = metrics.youtubeMentions ?? 0;
  const research = metrics.researchPapers ?? 0;

  const searchMomentum = Math.min(100, Math.max(0, (searchGrowth + 50) / 2));
  const socialBuzz = Math.min(100, Math.max(0, (reddit + youtube) / 2));
  const researchBacking = Math.min(100, research * 10);
  const marketSize = (scores.marketPotential ?? 0.5) * 100;
  const competitionGap = (1 - (metrics.competitionScore ?? 0.5)) * 100;

  return [
    { subject: 'Search Momentum', value: searchMomentum, fullMark: 100 },
    { subject: 'Social Buzz', value: socialBuzz, fullMark: 100 },
    { subject: 'Research Backing', value: researchBacking, fullMark: 100 },
    { subject: 'Market Size', value: marketSize, fullMark: 100 },
    { subject: 'Competition Gap', value: competitionGap, fullMark: 100 },
  ];
}

export default function TrendRadarChart({ trend }) {
  const data = buildRadarData(trend);
  if (!data.length) return null;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          <Radar
            name={trend?.name ?? 'Score'}
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
