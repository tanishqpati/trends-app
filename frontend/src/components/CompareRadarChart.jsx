import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

function metricForTrend(trend) {
  const m = trend?.metrics ?? {};
  const s = trend?.scores ?? {};
  const searchGrowth = m.searchGrowth ?? 0;
  const reddit = m.redditMentions ?? 0;
  const youtube = m.youtubeMentions ?? 0;
  const research = m.researchPapers ?? 0;

  return {
    searchMomentum: Math.min(100, Math.max(0, (searchGrowth + 50) / 2)),
    socialBuzz: Math.min(100, Math.max(0, (reddit + youtube) / 2)),
    researchBacking: Math.min(100, research * 10),
    marketSize: (s.marketPotential ?? 0.5) * 100,
    competitionGap: (1 - (m.competitionScore ?? 0.5)) * 100,
  };
}

function buildCompareData(trends) {
  const subjects = ['Search Momentum', 'Social Buzz', 'Research Backing', 'Market Size', 'Competition Gap'];
  const keys = ['searchMomentum', 'socialBuzz', 'researchBacking', 'marketSize', 'competitionGap'];

  return subjects.map((subject, i) => {
    const row = { subject, fullMark: 100 };
    trends.forEach((t, j) => {
      const vals = metricForTrend(t);
      row[`v${j}`] = vals[keys[i]];
    });
    return row;
  });
}

export default function CompareRadarChart({ trends }) {
  if (!trends?.length) return null;

  const data = buildCompareData(trends);

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} />
          {trends.map((t, i) => (
            <Radar
              key={t._id}
              name={t.name}
              dataKey={`v${i}`}
              stroke={COLORS[i]}
              fill={COLORS[i]}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          ))}
          <Legend />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
