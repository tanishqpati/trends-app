export default function Methodology() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">Methodology</h1>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Trend Scoring Formula
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Each trend receives a normalized score (0–100) based on five weighted factors:
        </p>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <p>TrendScore = 0.35 × Search Velocity</p>
          <p className="pl-4">+ 0.25 × Social Growth</p>
          <p className="pl-4">+ 0.20 × Research Backing</p>
          <p className="pl-4">+ 0.10 × Competition Inverse</p>
          <p className="pl-4">+ 0.10 × Market Potential</p>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Metrics are min-max normalized across all tracked keywords before scoring.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Data Sources
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          <li>
            <strong>Google Trends:</strong> Search interest over 12 months in India (geo: IN).
            Growth computed as % change from older to recent periods.
          </li>
          <li>
            <strong>Reddit:</strong> Mentions and engagement across wellness subreddits
            (IndianSkincareAddicts, IndianFitness, Supplements, etc.).
          </li>
          <li>
            <strong>YouTube:</strong> Video search results in India (regionCode: IN), with
            view counts, likes, and comments contributing to social buzz.
          </li>
          <li>
            <strong>PubMed:</strong> Research publication count per keyword in the last
            12 months. No API key required.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Fad vs Real Trend Classification
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Trends are classified as FAD or REAL_TREND based on multiple signals:
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/50">
            <h3 className="mb-2 font-medium text-amber-900 dark:text-amber-200">FAD Indicators</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-amber-800 dark:text-amber-300">
              <li>Sudden spike in search with low research backing</li>
              <li>Single-platform hype (Reddit or YouTube only)</li>
              <li>Few or no research publications</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/50">
            <h3 className="mb-2 font-medium text-emerald-900 dark:text-emerald-200">Real Trend Indicators</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-emerald-800 dark:text-emerald-300">
              <li>Multi-platform growth (Reddit and YouTube)</li>
              <li>Steady momentum (moderate search growth)</li>
              <li>Creator adoption (YouTube content)</li>
              <li>Research backing (3+ publications)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Pipeline & Updates
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          The data pipeline runs automatically every 24 hours (2:00 AM UTC). It collects
          signals from all sources, calculates metrics, scores trends, applies fad
          detection, generates opportunity briefs, and stores results in MongoDB. You can
          also trigger a manual run via POST /api/pipeline/run.
        </p>
      </section>
    </div>
  );
}
