import HeroSection from "../components/home/HeroSection.jsx";
import CategoriesSection from "../components/home/CategoriesSection.jsx";
import FeaturedOpportunities from "../components/home/FeaturedOpportunities.jsx";
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section */}
      <CategoriesSection />
      {/* Featured Opportunities */}
      <FeaturedOpportunities />
      {/* Placeholder for next sections */}
      <div className="container-custom py-20">
        <div className="text-center space-y-8">
          <div className="p-12 bg-white dark:bg-slate-800 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              📖 How It Works — Coming Next
            </p>
          </div>
          <div className="p-12 bg-white dark:bg-slate-800 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              💬 Testimonials — Coming Next
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
