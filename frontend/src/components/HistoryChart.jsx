import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getTrendHistory } from '../services/api';

export default function HistoryChart({ trendId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trendId) return setLoading(false);
    getTrendHistory(trendId)
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [trendId]);

  if (loading) return null;
  if (!history?.length) return null;

  const data = history.map((h) => ({
    date: new Date(h.recordedAt).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    }),
    score: Math.round((h.scores?.trendScore ?? 0) * 100),
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-gray-600 dark:text-gray-400" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} className="text-gray-600 dark:text-gray-400" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tw-bg-opacity, 1)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: 'var(--tw-text-opacity)' }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
