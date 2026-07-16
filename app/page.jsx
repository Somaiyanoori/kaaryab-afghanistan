export default function Home() {
  return (
    <>
      {/* Temporary content to test footer */}
      <div className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{" "}
            <span className="gradient-text">KaarYab Afghanistan</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Opportunity Finder Platform for Afghan Youth. Navbar and Footer are
            working! Next we build the full home page sections.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="btn-yellow">Get Started</button>
            <button className="btn-primary">Browse Opportunities</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>

        {/* Placeholder sections so footer appears below */}
        <div className="mt-20 space-y-8">
          <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Hero Section Coming Next</p>
          </div>
          <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Categories Section Coming Next</p>
          </div>
          <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Featured Opportunities Coming Next</p>
          </div>
        </div>
      </div>
    </>
  );
}
