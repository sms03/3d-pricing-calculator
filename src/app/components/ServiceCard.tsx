'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="block bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-indigo-900/50 dark:to-purple-900/50 rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-indigo-100 dark:border-indigo-800 h-full hover:border-indigo-200 dark:hover:border-indigo-700"
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="text-5xl mb-5 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 p-4 rounded-full shadow-inner">{icon}</div>
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">{title}</h3>
        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
