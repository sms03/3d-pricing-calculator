'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PriceBreakdown from '../../components/PriceBreakdown';
import CurrencySelector from '../../components/CurrencySelector';
import {
  calculateCGIPrice,
  calculateVFXPrice,
  getPriceBreakdown,
  RESOLUTION_MULTIPLIERS,
  ASPECT_RATIO_MULTIPLIERS,
  FPS_MULTIPLIERS,
  COMPLEXITY_MULTIPLIERS,
  ADDITIONAL_FACTORS,
  CURRENCY_RATES,
  convertCurrency
} from '../../utils/calculations';

type ServiceType = 'cgi' | 'vfx';

export default function CGIVFXPage() {
  // Service selection
  const [serviceType, setServiceType] = useState<ServiceType>('cgi');

  // Basic parameters
  const [resolution, setResolution] = useState<keyof typeof RESOLUTION_MULTIPLIERS>('1080p');
  const [aspectRatio, setAspectRatio] = useState<keyof typeof ASPECT_RATIO_MULTIPLIERS>('16:9');
  const [fps, setFps] = useState<keyof typeof FPS_MULTIPLIERS>('24');
  const [customFps, setCustomFps] = useState<number>(24);
  const [complexity, setComplexity] = useState<keyof typeof COMPLEXITY_MULTIPLIERS>('Medium');
  const [length, setLength] = useState<number>(10);

  // Additional options
  const [selectedFactors, setSelectedFactors] = useState<(keyof typeof ADDITIONAL_FACTORS)[]>([]);
  const [currency, setCurrency] = useState<keyof typeof CURRENCY_RATES>('USD');

  // Results
  const [price, setPrice] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Animation effect when price changes
  useEffect(() => {
    if (price !== null) {
      const timer = setTimeout(() => {
        setIsCalculating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [price]);

  const handleFactorToggle = (factor: keyof typeof ADDITIONAL_FACTORS) => {
    setSelectedFactors(prev =>
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const calculatePrice = () => {
    setIsCalculating(true);

    // Add a small delay to show the calculation animation
    setTimeout(() => {
      let calculatedPrice: number;

      if (serviceType === 'cgi') {
        calculatedPrice = calculateCGIPrice(
          resolution,
          aspectRatio,
          complexity,
          length
        );
      } else {
        calculatedPrice = calculateVFXPrice(
          resolution,
          aspectRatio,
          fps,
          complexity,
          length,
          fps === 'Custom' ? customFps : undefined
        );
      }

      // Apply additional factors
      let finalPrice = calculatedPrice;
      selectedFactors.forEach(factor => {
        finalPrice *= ADDITIONAL_FACTORS[factor];
      });

      setPrice(Math.round(finalPrice));

      const priceBreakdown = getPriceBreakdown(
        serviceType,
        finalPrice,
        {
          resolution,
          aspectRatio,
          ...(serviceType === 'vfx' ? { fps } : {}),
          complexity,
          lengthInSeconds: length,
          additionalFactors: selectedFactors,
          currency
        }
      );

      setBreakdown(priceBreakdown);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen dark:text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text mb-2">CGI & VFX Pricing</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Calculate accurate pricing for your CGI and VFX projects</p>

          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700">
            {/* Service Type Selection */}
            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
                Select Service Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  className={`py-4 px-4 rounded-lg text-center font-medium transition-all shadow-sm ${serviceType === 'cgi'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-700'}`}
                  onClick={() => setServiceType('cgi')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">🎭</span>
                    <span>CGI</span>
                    <span className="text-xs mt-1 opacity-80">(Computer Generated Imagery)</span>
                  </div>
                </motion.button>
                <motion.button
                  className={`py-4 px-4 rounded-lg text-center font-medium transition-all shadow-sm ${serviceType === 'vfx'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-700'}`}
                  onClick={() => setServiceType('vfx')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">✨</span>
                    <span>VFX</span>
                    <span className="text-xs mt-1 opacity-80">(Visual Effects)</span>
                  </div>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resolution */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resolution
                </label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value as keyof typeof RESOLUTION_MULTIPLIERS)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {Object.keys(RESOLUTION_MULTIPLIERS).map((res) => (
                    <option key={res} value={res}>
                      {res}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Aspect Ratio */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as keyof typeof ASPECT_RATIO_MULTIPLIERS)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {Object.keys(ASPECT_RATIO_MULTIPLIERS).map((ratio) => (
                    <option key={ratio} value={ratio}>
                      {ratio}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* FPS (only for VFX) */}
              {serviceType === 'vfx' && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    FPS (Frames Per Second)
                  </label>
                  <select
                    value={fps}
                    onChange={(e) => setFps(e.target.value as keyof typeof FPS_MULTIPLIERS)}
                    className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    {Object.keys(FPS_MULTIPLIERS).map((fpsOption) => (
                      <option key={fpsOption} value={fpsOption}>
                        {fpsOption}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Custom FPS (if selected and VFX) */}
              {serviceType === 'vfx' && fps === 'Custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custom FPS Value
                  </label>
                  <input
                    type="number"
                    value={customFps}
                    onChange={(e) => setCustomFps(Number(e.target.value))}
                    min="1"
                    max="240"
                    className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </motion.div>
              )}

              {/* Length */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Length (seconds)
                </label>
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  min="1"
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </motion.div>

              {/* Complexity */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Complexity
                </label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value as keyof typeof COMPLEXITY_MULTIPLIERS)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {Object.keys(COMPLEXITY_MULTIPLIERS).map((complexityOption) => (
                    <option key={complexityOption} value={complexityOption}>
                      {complexityOption}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Currency Selector */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <CurrencySelector
                  selectedCurrency={currency}
                  onCurrencyChange={setCurrency}
                />
              </motion.div>
            </div>

            {/* Additional Factors */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Additional Factors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(ADDITIONAL_FACTORS).map((factor) => (
                  <motion.div
                    key={factor}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedFactors.includes(factor as keyof typeof ADDITIONAL_FACTORS)
                      ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800'}`}
                    onClick={() => handleFactorToggle(factor as keyof typeof ADDITIONAL_FACTORS)}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${selectedFactors.includes(factor as keyof typeof ADDITIONAL_FACTORS)
                        ? 'bg-indigo-500'
                        : 'bg-gray-200 dark:bg-gray-600'}`}>
                        {selectedFactors.includes(factor as keyof typeof ADDITIONAL_FACTORS) && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm">{factor}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Multiplier: {ADDITIONAL_FACTORS[factor as keyof typeof ADDITIONAL_FACTORS].toFixed(1)}x
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                onClick={calculatePrice}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </>
                ) : (
                  'Calculate Price'
                )}
              </motion.button>
            </div>

            {price !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-8 text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Estimated Price</h2>
                <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text mt-2">
                  {CURRENCY_RATES[currency].symbol}{convertCurrency(price, currency)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Price in {CURRENCY_RATES[currency].name}
                </p>
              </motion.div>
            )}
          </div>

          {breakdown && <PriceBreakdown breakdown={breakdown} />}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-4 mt-8 rounded-r-lg"
          >
            <p className="text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> This calculator provides estimates based on standard industry rates.
              Actual prices may vary depending on specific project requirements, revisions, and additional services.
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
