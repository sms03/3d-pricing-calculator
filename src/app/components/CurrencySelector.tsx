'use client';

import { useState, useEffect } from 'react';
import { CURRENCY_RATES } from '../utils/calculations';
import { motion } from 'framer-motion';

interface CurrencySelectorProps {
  selectedCurrency: keyof typeof CURRENCY_RATES;
  onCurrencyChange: (currency: keyof typeof CURRENCY_RATES) => void;
}

export default function CurrencySelector({ 
  selectedCurrency, 
  onCurrencyChange 
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCurrencySelect = (currency: keyof typeof CURRENCY_RATES) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSelectorClick}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="flex items-center">
          <span className="mr-2 text-lg">{CURRENCY_RATES[selectedCurrency].symbol}</span>
          <span>{CURRENCY_RATES[selectedCurrency].name}</span>
        </span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          <ul className="py-1">
            {Object.entries(CURRENCY_RATES).map(([code, { name, symbol }]) => (
              <motion.li
                key={code}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleCurrencySelect(code as keyof typeof CURRENCY_RATES)}
                className={`px-4 py-2 cursor-pointer flex items-center ${
                  selectedCurrency === code ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                <span className="mr-2 text-lg">{symbol}</span>
                <span>{name}</span>
                {selectedCurrency === code && (
                  <svg
                    className="w-5 h-5 ml-auto text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
