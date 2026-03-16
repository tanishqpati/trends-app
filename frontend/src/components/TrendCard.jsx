import { Link } from 'react-router-dom';

export default function TrendCard({ trend }) {
  const score = trend?.scores?.trendScore ?? 0;
  const scorePercent = Math.round(score * 100);
  const scoreColor =
    scorePercent >= 70
      ? 'text-emerald-600 dark:text-emerald-400'
      : scorePercent >= 40
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-gray-600 dark:text-gray-400';

  return (
    <Link
      to={`/trends/${trend._id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-800 dark:hover:shadow-lg"
    >
      <div className="flex p-6">
        <div className="mr-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700">
          <span className={`text-xl font-bold ${scoreColor}`}>{scorePercent}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
              {trend.name}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                trend.trendType === 'FAD'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
              }`}
            >
              {trend.trendType === 'FAD' ? 'Fad' : 'Real'}
            </span>
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              Search {trend.metrics?.searchGrowth ?? 0}%
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              R:{trend.metrics?.redditMentions ?? 0}
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              YT:{trend.metrics?.youtubeMentions ?? 0}
            </span>
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              Res:{trend.metrics?.researchPapers ?? 0}
            </span>
          </div>
          {trend.opportunityBrief?.opportunity && (
            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {trend.opportunityBrief.opportunity}
            </p>
          )}
        </div>
        <div className="ml-2 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
