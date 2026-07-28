export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 border-4 border-yellow-500/20 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            Loading...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please wait a moment
          </p>
        </div>

        {/* Skeleton bars */}
        <div className="mt-4 space-y-2 w-48">
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse w-3/4 mx-auto" />
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}
