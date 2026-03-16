export default function SignalBreakdown({ trend }) {
  const metrics = trend?.metrics ?? {};
  const scores = trend?.scores ?? {};

  const signals = [
    {
      label: 'Search Growth',
      value: metrics.searchGrowth ?? 0,
      suffix: '%',
      description: 'Google Trends interest change over 12 months',
    },
    {
      label: 'Reddit Mentions',
      value: metrics.redditMentions ?? 0,
      suffix: '',
      description: 'Reddit discussion engagement',
    },
    {
      label: 'YouTube Mentions',
      value: metrics.youtubeMentions ?? 0,
      suffix: '',
      description: 'YouTube content and engagement',
    },
    {
      label: 'Research Papers',
      value: metrics.researchPapers ?? 0,
      suffix: '',
      description: 'PubMed publications in last 12 months',
    },
    {
      label: 'News Mentions',
      value: metrics.newsMentions ?? 0,
      suffix: '',
      description: 'News articles mentioning the trend',
    },
    {
      label: 'Product Count',
      value: metrics.productCount ?? 0,
      suffix: '',
      description: 'Amazon/Flipkart products (estimate)',
    },
    {
      label: 'Velocity Score',
      value: Math.round((scores.velocityScore ?? 0) * 100),
      suffix: '/100',
      description: 'Normalized search momentum',
    },
    {
      label: 'Market Potential',
      value: Math.round((scores.marketPotential ?? 0) * 100),
      suffix: '/100',
      description: 'Derived market opportunity score',
    },
  ];

  const maxVal = Math.max(...signals.map((s) => s.value), 1);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Signal Breakdown</h3>
      <div className="space-y-3">
        {signals.map((s) => (
          <div key={s.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">{s.label}</span>
              <span className="text-gray-600 dark:text-gray-400">
                {s.value}
                {s.suffix}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${(s.value / maxVal) * 100}%` }}
              />
            </div>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
