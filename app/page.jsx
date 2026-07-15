export default function Home() {
  return (
    <div className="container-custom py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="gradient-text">KaarYab Afghanistan</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Opportunity Finder Platform for Afghan Youth. Navbar is working! Next
          we build the full home page.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="btn-yellow">Get Started</button>
          <button className="btn-primary">Browse Opportunities</button>
          <button className="btn-outline">Learn More</button>
        </div>
      </div>
    </div>
  );
}
