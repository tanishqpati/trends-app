export default function OpportunityBrief({ brief }) {
  if (!brief) return null;

  const sections = [
    { title: 'Why Now', content: brief.whyNow },
    { title: 'Opportunity', content: brief.opportunity },
    { title: 'Market Potential', content: brief.marketPotential },
    { title: 'Competition Gap', content: brief.competitionGap },
  ].filter((s) => s.content);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Opportunity Brief
      </h3>
      <div className="space-y-4">
        {sections.map(({ title, content }) => (
          <div key={title}>
            <h4 className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
