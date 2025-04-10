'use client';

import { motion } from 'framer-motion';

interface PriceBreakdownProps {
  breakdown: {
    item: string;
    value: string | number;
    multiplier: number;
  }[];
}

export default function PriceBreakdown({ breakdown }: PriceBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl shadow-lg p-6 mt-8 border border-indigo-100 dark:border-indigo-800 backdrop-blur-sm"
    >
      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">Price Breakdown</h3>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-indigo-200 dark:divide-indigo-800">
          <thead className="bg-indigo-50 dark:bg-indigo-900/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                Multiplier
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-indigo-100 dark:divide-indigo-900/50">
            {breakdown.map((item, index) => {
              const isTotal = index === breakdown.length - 1;
              return (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={isTotal
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800/50 dark:to-purple-800/50 font-semibold'
                    : 'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100">
                    {item.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100">
                    {isTotal ? (
                      <span className="font-bold text-indigo-600 dark:text-indigo-300">{item.value}</span>
                    ) : item.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-100">
                    {isTotal ? '-' : (
                      <span className={`${Number(item.multiplier) > 1 ? 'text-red-600 dark:text-red-300 font-bold' : 'text-green-600 dark:text-green-300 font-bold'}`}>
                        {item.multiplier.toFixed(2)}
                      </span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
        <p>* Multipliers greater than 1.0 increase the price, while those less than 1.0 decrease it.</p>
      </div>
    </motion.div>
  );
}
