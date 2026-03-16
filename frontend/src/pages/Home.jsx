import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,#f8fafc_0%,#f1f5f9_50%,#e2e8f0_100%)] dark:bg-[linear-gradient(to_bottom_right,#0f172a_0%,#1e293b_50%,#334155_100%)]" />
      <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-indigo-100/50 blur-3xl dark:bg-indigo-900/20" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            For D2C Founders
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            Spot wellness trends before
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">they go mainstream</span>
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
            We analyze Google Trends, Reddit, YouTube, and research to surface emerging
            opportunities in India—3–6 months ahead of the curve.
          </p>
          <p className="mb-10 text-gray-500 dark:text-gray-400">
            Founder-ready briefs for ₹10Cr–₹50Cr market opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30"
            >
              Explore trends
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3.5 font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200/80 bg-white/60 py-16 backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/60">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex rounded-lg bg-indigo-100 p-3">
              <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Real signals</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Google Trends, Reddit discussions, YouTube content, and PubMed research—no hype, just data.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex rounded-lg bg-emerald-100 p-3">
              <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Fad vs real</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Our scoring model separates genuine trends from short-lived hype across multiple platforms.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 inline-flex rounded-lg bg-amber-100 p-3">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Opportunity briefs</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Each trend comes with market potential, competition gaps, and actionable product ideas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No login required. Updated daily.
        </p>
      </section>
    </div>
  );
}
