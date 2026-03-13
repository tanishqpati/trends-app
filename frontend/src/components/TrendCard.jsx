import { Link } from 'react-router-dom';

export default function TrendCard({ trend }) {
  const score = trend?.scores?.trendScore ?? 0;
  const scorePercent = Math.round(score * 100);

  return (
    <Link
      to={`/trends/${trend._id}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{trend.name}</h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            trend.trendType === 'FAD'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {trend.trendType === 'FAD' ? 'Fad' : 'Real Trend'}
        </span>
      </div>
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{scorePercent}</span>
        <span className="text-sm text-gray-500">/ 100</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-600">
        <span>Search: {trend.metrics?.searchGrowth ?? 0}%</span>
        <span>Reddit: {trend.metrics?.redditMentions ?? 0}</span>
        <span>YouTube: {trend.metrics?.youtubeMentions ?? 0}</span>
        <span>Research: {trend.metrics?.researchPapers ?? 0}</span>
      </div>
      {trend.opportunityBrief?.opportunity && (
        <p className="line-clamp-2 text-sm text-gray-600">
          {trend.opportunityBrief.opportunity}
        </p>
      )}
    </Link>
  );
}
