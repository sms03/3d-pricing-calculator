import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen dark:text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text mb-4">3D Design Pricing Calculator</h1>
          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Calculate accurate prices for your 3D design projects based on resolution, aspect ratio, FPS, DPI, length, and more.
          </p>
        </div>

        <div className="mt-16 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-indigo-100 dark:border-indigo-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text mb-6">Why Use Our Calculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-100 dark:border-indigo-800">
              <div className="text-indigo-500 dark:text-indigo-400 text-2xl mr-4">⚡</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Accurate Pricing</h3>
                <p className="text-gray-700 dark:text-gray-300">Get precise estimates based on industry standards and project parameters.</p>
              </div>
            </div>

            <div className="flex items-start p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-100 dark:border-indigo-800">
              <div className="text-indigo-500 dark:text-indigo-400 text-2xl mr-4">🔍</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">Detailed Breakdown</h3>
                <p className="text-gray-700 dark:text-gray-300">See exactly how each factor affects your project's final price.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
