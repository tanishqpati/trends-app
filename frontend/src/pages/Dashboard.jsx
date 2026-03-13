import { useEffect, useState } from 'react';
import { getTopTrends } from '../services/api';
import TrendCard from '../components/TrendCard';
import TrendRadarChart from '../components/RadarChart';
import SignalBreakdown from '../components/SignalBreakdown';

export default function Dashboard() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopTrends(10)
      .then(setTrends)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Failed to load trends: {error}
      </div>
    );
  }

  const topTrend = trends[0];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Top Emerging Trends
      </h1>
      {topTrend && (
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {topTrend.name} - Radar
            </h2>
            <TrendRadarChart trend={topTrend} />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <SignalBreakdown trend={topTrend} />
          </div>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend) => (
          <TrendCard key={trend._id} trend={trend} />
        ))}
      </div>
      {trends.length === 0 && (
        <p className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
          No trends yet. Run the pipeline to populate data.
        </p>
      )}
    </div>
  );
}
