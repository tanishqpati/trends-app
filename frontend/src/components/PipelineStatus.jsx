import { useEffect, useState } from 'react';
import { getPipelineStatus } from '../services/api';

function formatRelativeTime(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  return `${diffDays}d ago`;
}

export default function PipelineStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPipelineStatus()
      .then(setStatus)
      .catch(() => setStatus({ status: 'unknown' }))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !status) return null;

  const { lastRunAt, status: runStatus, trendsStored, errorMessage } = status;

  const statusColors = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    running: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    never: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
    unknown: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  };
  const colorClass = statusColors[runStatus] ?? statusColors.unknown;

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Pipeline
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${colorClass}`}>
          {runStatus?.replace('_', ' ')}
        </span>
        {lastRunAt && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Last run {formatRelativeTime(lastRunAt)}
          </span>
        )}
        {trendsStored != null && runStatus === 'success' && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {trendsStored} trends stored
          </span>
        )}
        {errorMessage && (
          <span className="max-w-xs truncate text-xs text-red-600 dark:text-red-400" title={errorMessage}>
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}
