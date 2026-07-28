"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-20">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl">
          <span className="text-4xl">⚠️</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or go back home.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-sm rounded-xl shadow-lg transition-all"
          >
            Try Again
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:border-yellow-500 transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
