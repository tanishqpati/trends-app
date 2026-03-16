import { useEffect, useState, useMemo } from 'react';
import { getTrends } from '../services/api';
import TrendCard from '../components/TrendCard';
import TrendRadarChart from '../components/RadarChart';
import SignalBreakdown from '../components/SignalBreakdown';
import DashboardFilters from '../components/DashboardFilters';
import PipelineStatus from '../components/PipelineStatus';
import { exportTrendsToCSV, exportTrendsToPDF } from '../utils/exportTrends';

export default function Dashboard() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trendTypeFilter, setTrendTypeFilter] = useState('all');
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    getTrends()
      .then(setTrends)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredTrends = useMemo(() => {
    return trends.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      if (q && !t.name?.toLowerCase().includes(q) && !t.keyword?.toLowerCase().includes(q)) return false;
      if (trendTypeFilter !== 'all' && t.trendType !== trendTypeFilter) return false;
      const score = Math.round((t.scores?.trendScore ?? 0) * 100);
      if (score < minScore) return false;
      return true;
    });
  }, [trends, searchQuery, trendTypeFilter, minScore]);

  if (loading) {
    return (
      <div>
        <div className="mb-8 flex flex-col gap-4">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-96 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          <div className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-12 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg
            className="h-7 w-7 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Failed to load trends
        </h2>
        <p className="mb-6 max-w-md text-center text-gray-600 dark:text-gray-400">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const topTrend = filteredTrends[0];
  const realTrendsCount = trends.filter((t) => t.trendType === 'REAL_TREND').length;
  const fadCount = trends.filter((t) => t.trendType === 'FAD').length;

  return (
    <div className="space-y-10">
      <header>
        <div className="mb-4">
          <PipelineStatus />
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
            {trends.length} trends tracked
          </span>
          {realTrendsCount > 0 && (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              {realTrendsCount} real opportunities
            </span>
          )}
          {fadCount > 0 && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
              {fadCount} fads
            </span>
          )}
        </div>
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Top Emerging Trends
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sorted by trend score. Click any card for full opportunity brief.
        </p>
      </header>

      {trends.length > 0 && (
        <section>
          <DashboardFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            trendType={trendTypeFilter}
            onTrendTypeChange={setTrendTypeFilter}
            minScore={minScore}
            onMinScoreChange={setMinScore}
            onExportCSV={() => exportTrendsToCSV(filteredTrends)}
            onExportPDF={() => exportTrendsToPDF(filteredTrends)}
            resultCount={filteredTrends.length}
            totalCount={trends.length}
          />
        </section>
      )}

      {topTrend && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
              Featured
            </span>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {topTrend.name}
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Signal radar
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Performance across 5 dimensions
                </p>
              </div>
              <div className="p-6">
                <TrendRadarChart trend={topTrend} />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  Signal breakdown
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Raw metrics from each source
                </p>
              </div>
              <div className="p-6">
                <SignalBreakdown trend={topTrend} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
          All trends
        </h2>
        {trends.length > 0 ? (
          filteredTrends.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTrends.map((trend) => (
                <TrendCard key={trend._id} trend={trend} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                No trends match your filters. Try adjusting search, type, or score range.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <svg
                className="h-8 w-8 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              No trends yet
            </h3>
            <p className="mb-6 max-w-sm text-center text-gray-600 dark:text-gray-400">
              Run the pipeline to collect signals and populate trends.
            </p>
            <p className="rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              curl -X POST /api/pipeline/run
            </p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Or run <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">npm run seed</code> in the backend.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
