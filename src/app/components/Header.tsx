'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 dark:from-blue-950 dark:via-indigo-900 dark:to-purple-900 text-gray-800 dark:text-white p-4 shadow-lg backdrop-blur-sm sticky top-0 z-50 border-b border-indigo-100 dark:border-indigo-900"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0">
          <Link href="/" className="flex items-center">
            <span className="mr-2 text-3xl">🎨</span>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">3D Pricing Calculator</span>
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <nav className="flex space-x-1 bg-white/40 dark:bg-gray-800/40 p-1 rounded-lg backdrop-blur-sm shadow-inner">
            {[
              { path: '/', label: 'Home' },
              { path: '/calculators/still-frame', label: 'Still Frame' },
              { path: '/calculators/animation', label: 'Animation' },
              { path: '/calculators/cgi-vfx', label: 'CGI & VFX' }
            ].map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className={`px-3 py-2 rounded-md transition-all duration-300 block font-medium ${
                    pathname === item.path
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'text-indigo-800 dark:text-indigo-200 hover:bg-indigo-100/50 dark:hover:bg-indigo-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
