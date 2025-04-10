'use client';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-100 dark:from-blue-950 dark:via-indigo-900 dark:to-purple-900 text-gray-700 dark:text-gray-200 p-6 mt-auto border-t border-indigo-100 dark:border-indigo-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">3D Pricing Calculator</h3>
            <p className="text-sm mt-1">Professional pricing for 3D designers</p>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} 3D Pricing Calculator. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              Disclaimer: Prices are estimates and may vary based on project specifics.
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent my-6" />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Made with ❤️ for 3D designers worldwide</p>
        </div>
      </div>
    </footer>
  );
}
