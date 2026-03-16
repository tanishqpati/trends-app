import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrends } from '../services/api';
import CompareRadarChart from '../components/CompareRadarChart';

export default function Compare() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(['', '', '']);

  useEffect(() => {
    getTrends()
      .then(setTrends)
      .catch(() => setTrends([]))
      .finally(() => setLoading(false));
  }, []);

  const selectedTrends = selectedIds
    .filter(Boolean)
    .map((id) => trends.find((t) => t._id === id))
    .filter(Boolean);

  const setSelected = (index, id) => {
    const next = [...selectedIds];
    next[index] = id;
    setSelectedIds(next);
  };

  const metricsRows = [
    { key: 'searchGrowth', label: 'Search growth %' },
    { key: 'redditMentions', label: 'Reddit mentions' },
    { key: 'youtubeMentions', label: 'YouTube mentions' },
    { key: 'researchPapers', label: 'Research papers' },
    { key: 'competitionScore', label: 'Competition (0–1)' },
  ];

  const scoreRows = [
    { key: 'trendScore', label: 'Trend score' },
    { key: 'velocityScore', label: 'Velocity' },
    { key: 'marketPotential', label: 'Market potential' },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-72 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Compare trends
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select up to 3 trends to compare signals, metrics, and scores side by side.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Select trends</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
                Trend {i + 1}
              </label>
              <select
                value={selectedIds[i]}
                onChange={(e) => setSelected(i, e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">— Select —</option>
                {trends.map((t) => (
                  <option key={t._id} value={t._id} disabled={selectedIds.includes(t._id) && selectedIds[i] !== t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {selectedTrends.length >= 2 && (
        <>
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Radar comparison</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Signal strength across 5 dimensions
              </p>
            </div>
            <div className="p-6">
              <CompareRadarChart trends={selectedTrends} />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Metrics comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Metric</th>
                    {selectedTrends.map((t) => (
                      <th key={t._id} className="px-6 py-3 text-left font-medium text-gray-900 dark:text-gray-100">
                        <Link to={`/trends/${t._id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                          {t.name}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metricsRows.map(({ key, label }) => (
                    <tr key={key} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="px-6 py-2 text-gray-600 dark:text-gray-400">{label}</td>
                      {selectedTrends.map((t) => (
                        <td key={t._id} className="px-6 py-2 font-mono text-gray-900 dark:text-gray-100">
                          {typeof t.metrics?.[key] === 'number'
                            ? t.metrics[key].toFixed(1)
                            : t.metrics?.[key] ?? '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {scoreRows.map(({ key, label }) => (
                    <tr key={key} className="border-b border-gray-100 dark:border-gray-700/50">
                      <td className="px-6 py-2 text-gray-600 dark:text-gray-400">{label}</td>
                      {selectedTrends.map((t) => (
                        <td key={t._id} className="px-6 py-2 font-mono text-gray-900 dark:text-gray-100">
                          {typeof t.scores?.[key] === 'number'
                            ? (t.scores[key] * 100).toFixed(0) + '%'
                            : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {selectedTrends.length < 2 && trends.length > 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-gray-600 dark:text-gray-400">
            Select at least 2 trends above to see the comparison.
          </p>
        </div>
      )}

      {trends.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
          <p className="text-gray-600 dark:text-gray-400">No trends yet. Run the pipeline to populate data.</p>
          <Link to="/dashboard" className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
