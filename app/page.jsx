import HeroSection from "../components/home/HeroSection.jsx";
import StatsSection from "../components/home/StatsSection.jsx";
import CategoriesSection from "../components/home/CategoriesSection.jsx";
import FeaturedOpportunities from "../components/home/FeaturedOpportunities.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import TestimonialsSection from "../components/home/TestimonialsSection.jsx";
import RecentlyViewedHomeSection from "../components/home/RecentlyViewedHomeSection.jsx";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Statistics Counter Section */}
      <StatsSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Featured Opportunities */}
      <FeaturedOpportunities />

      {/* Recently Viewed */}
      <RecentlyViewedHomeSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialsSection />
    </>
  );
}
