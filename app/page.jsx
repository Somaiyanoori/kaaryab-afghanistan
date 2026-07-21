import HeroSection from "../components/home/HeroSection.jsx";
import CategoriesSection from "../components/home/CategoriesSection.jsx";
import FeaturedOpportunities from "../components/home/FeaturedOpportunities.jsx";
import HowItWorks from "../components/home/HowItWorks.jsx";
import TestimonialsSection from "../components/home/TestimonialsSection.jsx";
export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Categories Section */}
      <CategoriesSection />
      {/* Featured Opportunities */}
      <FeaturedOpportunities />
      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <TestimonialsSection />
      {/* Placeholder for next sections */}
    </>
  );
}
