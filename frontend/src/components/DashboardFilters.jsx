export default function DashboardFilters({
  searchQuery,
  onSearchChange,
  trendType,
  onTrendTypeChange,
  minScore,
  onMinScoreChange,
  onExportCSV,
  onExportPDF,
  resultCount,
  totalCount,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Filters</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Search
          </label>
          <input
            type="search"
            placeholder="Keyword or name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Trend type
          </label>
          <select
            value={trendType}
            onChange={(e) => onTrendTypeChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="all">All</option>
            <option value="REAL_TREND">Real trends only</option>
            <option value="FAD">Fads only</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500 dark:text-gray-400">
            Min score: {minScore}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={minScore}
            onChange={(e) => onMinScoreChange(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-600"
          />
        </div>
        <div className="flex flex-col justify-end gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onExportCSV}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={onExportPDF}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Export PDF
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Showing {resultCount} of {totalCount} trends
      </p>
    </div>
  );
}
