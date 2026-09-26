import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { TrustSection } from '../components/TrustSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { SpecialCTA } from '../components/SpecialCTA';
import { CATEGORIES } from '../data/categories';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import showroomImg from '../assets/images/furniture_showroom_craft_1790252305357.jpg';

export const HomePage: React.FC = () => {
  const { products, setActivePage, setSelectedCategory } = useCart();

  // Featured 4 products for homepage
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  // Top 6 categories for homepage showcase
  const topCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
                Curated Spaces
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917]">
                Explore By Category
              </h2>
            </div>

            <button
              onClick={() => setActivePage('categories')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78350F] hover:text-[#552509] transition-colors cursor-pointer"
            >
              <span>View All 10 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products Collection */}
      <section className="py-20 bg-[#FAF9F5] border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
                Handpicked Favorites
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917]">
                Featured Showroom Pieces
              </h2>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all');
                setActivePage('shop');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78350F] hover:text-[#552509] transition-colors cursor-pointer"
            >
              <span>View Full Shop Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Showroom Craftsmanship Teaser */}
      <section className="py-20 bg-white border-t border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Showroom Image */}
            <div className="relative rounded-xl overflow-hidden border border-[#E8E4DC] shadow-md bg-[#F4F1EA]">
              <img
                src={showroomImg}
                alt="Punjab Furnitures Saharanpur Showroom Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-lg border border-[#E8E4DC] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block">Punjab Furnitures Showroom</span>
                  <span className="text-stone-500">{BUSINESS_CONFIG.address.full}</span>
                </div>
                <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
                  Open till {BUSINESS_CONFIG.timing.closesAt}
                </span>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block">
                Local Showroom Heritage
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917] leading-tight">
                Crafted for Modern Living, Rooted in Saharanpur Quality
              </h2>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Punjab Furnitures is a furniture showroom in {BUSINESS_CONFIG.address.full} offering a wide selection of furniture for modern homes and spaces. From deeply comfortable sofas and solid wood beds to dining sets, wardrobes, and custom orders, we provide solutions that match both your lifestyle and architecture.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">Wide Variety Across All Rooms</h4>
                    <p className="text-xs text-stone-600">Multiple choices of sofas, king & queen beds, dining tables, and storage solutions under one roof.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">Custom Furniture Support</h4>
                    <p className="text-xs text-stone-600">Tailored dimensions, custom fabric palettes, and seasoned wood stains created to your specifications.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">Attentive Local Service</h4>
                    <p className="text-xs text-stone-600">Prompt consultation, personal walkthroughs, and direct WhatsApp customer support on {BUSINESS_CONFIG.whatsapp}.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('about')}
                  className="px-5 py-2.5 bg-[#1C1917] text-white hover:bg-[#78350F] font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Read About Our Showroom
                </button>

                <button
                  onClick={() => setActivePage('contact')}
                  className="px-5 py-2.5 bg-white border border-[#E8E4DC] text-stone-800 hover:bg-[#FAF9F5] font-semibold text-xs rounded transition-colors cursor-pointer"
                >
                  Visit Showroom
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Trust Section */}
      <TrustSection />

      {/* 6. Customer Reviews Section */}
      <ReviewsSection />

      {/* 7. Special CTA */}
      <SpecialCTA />
    </div>
  );
};
