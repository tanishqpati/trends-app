export function exportTrendsToCSV(trends) {
  const headers = [
    'Name',
    'Keyword',
    'Trend Type',
    'Trend Score',
    'Search Growth',
    'Reddit Mentions',
    'YouTube Mentions',
    'Research Papers',
    'Opportunity',
    'Market Potential',
    'Competition Gap',
  ];
  const rows = trends.map((t) => [
    t.name ?? '',
    t.keyword ?? '',
    t.trendType ?? '',
    Math.round((t.scores?.trendScore ?? 0) * 100),
    t.metrics?.searchGrowth ?? 0,
    t.metrics?.redditMentions ?? 0,
    t.metrics?.youtubeMentions ?? 0,
    t.metrics?.researchPapers ?? 0,
    t.opportunityBrief?.opportunity ?? '',
    t.opportunityBrief?.marketPotential ?? '',
    t.opportunityBrief?.competitionGap ?? '',
  ]);

  const escape = (val) => {
    const s = String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const csv = [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join(
    '\n'
  );
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wellness-trends-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportTrendsToPDF(trends) {
  window.print();
}
