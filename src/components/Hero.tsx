import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';
import heroImg from '../assets/images/hero_punjab_furniture_1790252286120.jpg';

export const Hero: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#1C1917] text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Punjab Furnitures Luxury Living Room Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayer gradient scrim for 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/80 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[580px] lg:min-h-[680px]">
        <div className="max-w-2xl">
          {/* Subtle location / trust tag (clean unboxed text with separator) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C5A880] mb-4 tracking-wider uppercase font-medium">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Saharanpur Showroom</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Solid Wood & Modern Comfort</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
            Transform Your Space With Timeless Furniture
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#DCD6CA] font-light leading-relaxed mb-8 max-w-xl">
            Discover premium furniture crafted for comfort, style and everyday living.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#B3956B] text-[#1C1917] font-semibold text-sm rounded-md transition-all duration-200 flex items-center gap-2 shadow-lg shadow-black/20 cursor-pointer"
            >
              <span>Shop Furniture</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('categories')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-md backdrop-blur-sm border border-white/20 transition-all duration-200 cursor-pointer"
            >
              Explore Collection
            </button>

            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I would like to enquire about furniture shown in your hero showcase.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-sm rounded-md transition-all duration-200 flex items-center gap-2 shadow-lg shadow-black/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Small Trust Line */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-300">
            <span className="text-[#C5A880] font-medium">Quality Furniture</span>
            <span aria-hidden="true" className="text-stone-500">•</span>
            <span>Wide Selection</span>
            <span aria-hidden="true" className="text-stone-500">•</span>
            <span>Trusted Local Showroom</span>
            <span aria-hidden="true" className="text-stone-500">•</span>
            <span className="text-stone-400">Google 4.0 ★ (43 Reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
