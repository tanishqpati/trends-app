import { useEffect, useState } from 'react';
import { getKeywords, addKeyword, deleteKeyword } from '../services/api';

export default function Settings() {
  const [keywords, setKeywords] = useState(null);
  const [custom, setCustom] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    getKeywords()
      .then(({ keywords: kw, custom: c }) => {
        setKeywords(kw ?? []);
        setCustom(c ?? []);
      })
      .catch(() => setKeywords([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const k = newKeyword.trim().toLowerCase();
    if (!k || submitting) return;
    setSubmitting(true);
    try {
      await addKeyword(k);
      setNewKeyword('');
      load();
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await deleteKeyword(id);
      load();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage custom keywords. The pipeline tracks both built-in and custom keywords.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Custom keywords</h2>
        <form onSubmit={handleAdd} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Add keyword to track..."
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={submitting || !newKeyword.trim()}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Add
          </button>
        </form>
        {custom.length > 0 ? (
          <ul className="space-y-2">
            {custom.map((c) => (
              <li
                key={c._id}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">{c.keyword}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(c._id)}
                  disabled={submitting}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No custom keywords yet.</p>
        )}
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          {keywords?.length ?? 0} total keywords (built-in + custom). Run the pipeline to refresh data.
        </p>
      </section>
    </div>
  );
}
