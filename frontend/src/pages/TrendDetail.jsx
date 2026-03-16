import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTrendById } from '../services/api';
import TrendRadarChart from '../components/RadarChart';
import SignalBreakdown from '../components/SignalBreakdown';
import OpportunityBrief from '../components/OpportunityBrief';

export default function TrendDetail() {
  const { id } = useParams();
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrendById(id)
      .then(setTrend)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !trend) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
        {error || 'Trend not found'}
        <Link to="/dashboard" className="ml-4 text-indigo-600 hover:underline dark:text-indigo-400">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const scorePercent = Math.round((trend.scores?.trendScore ?? 0) * 100);

  return (
    <div>
      <Link
        to="/dashboard"
        className="mb-6 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        &larr; Back to Dashboard
      </Link>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{trend.name}</h1>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
              trend.trendType === 'FAD'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
            }`}
          >
            {trend.trendType === 'FAD' ? 'Fad' : 'Real Trend'}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">{scorePercent}</span>
          <span className="text-gray-500 dark:text-gray-400">/ 100</span>
        </div>
      </div>
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <TrendRadarChart trend={trend} />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <SignalBreakdown trend={trend} />
        </div>
      </div>
      <div className="mb-8">
        <OpportunityBrief brief={trend.opportunityBrief} />
      </div>
      {(trend.evidence?.redditPosts?.length > 0 ||
        trend.evidence?.youtubeVideos?.length > 0) && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Evidence</h3>
          <div className="space-y-4">
            {trend.evidence.redditPosts?.slice(0, 5).map((p, i) => (
              <a
                key={i}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {p.title}
              </a>
            ))}
            {trend.evidence.youtubeVideos?.slice(0, 5).map((v, i) => (
              <a
                key={i}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {v.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
