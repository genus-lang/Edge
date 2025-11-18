import { Navigation } from "../components/Navigation";
import { TestimonialsHero } from "../components/testimonials/TestimonialsHero";
import { TestimonialsCarousel } from "../components/testimonials/TestimonialsCarousel";
import { RatingsSummary } from "../components/testimonials/RatingsSummary";
import { VideoTestimonials } from "../components/testimonials/VideoTestimonials";
import { CompanyLogos } from "../components/testimonials/CompanyLogos";
import { TestimonialsCTA } from "../components/testimonials/TestimonialsCTA";
import { Footer } from "../components/Footer";

export function Testimonials() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <TestimonialsHero />
      <TestimonialsCarousel />
      <RatingsSummary />
      <VideoTestimonials />
      <CompanyLogos />
      <TestimonialsCTA />
      <Footer />
    </div>
  );
}
