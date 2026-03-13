import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900 hover:text-gray-700"
          >
            Wellness Trend Radar
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              to="/methodology"
              className="text-gray-600 hover:text-gray-900"
            >
              Methodology
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
