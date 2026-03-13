import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
        Wellness Trend Radar India
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        Detect emerging wellness trends 3–6 months before mainstream adoption.
      </p>
      <p className="mb-8 text-gray-500">
        Identify ₹10Cr–₹50Cr D2C market opportunities from real-world signals.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/dashboard"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          View Dashboard
        </Link>
        <Link
          to="/methodology"
          className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
        >
          How It Works
        </Link>
      </div>
    </div>
  );
}
