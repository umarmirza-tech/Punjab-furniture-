import React from 'react';
import { MapPin, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const SpecialCTA: React.FC = () => {
  return (
    <section className="py-20 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Subtle warm radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#78350F]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-3">
          Personalized Showroom Experience
        </span>
        
        <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
          Looking for the right furniture?
        </h2>

        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto mb-10 font-light">
          Visit our showroom or talk to us on WhatsApp. Our team in Saharanpur is ready to assist you with ready designs, custom measurements, and prompt delivery.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Get Directions */}
          <a
            href={BUSINESS_CONFIG.address.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-white text-[#1C1917] hover:bg-[#FAF9F5] font-semibold text-xs sm:text-sm rounded-md transition-all shadow-md flex items-center gap-2 group"
          >
            <MapPin className="w-4 h-4 text-[#78350F]" />
            <span>Get Directions</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* WhatsApp Us */}
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I would like to visit your showroom or enquire about furniture.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs sm:text-sm rounded-md transition-all shadow-md flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us ({BUSINESS_CONFIG.whatsapp})</span>
          </a>

          {/* Call Now */}
          <a
            href={`tel:${BUSINESS_CONFIG.phone}`}
            className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/25 font-semibold text-xs sm:text-sm rounded-md transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#C5A880]" />
            <span>Call Now ({BUSINESS_CONFIG.phone})</span>
          </a>
        </div>

        {/* Showroom timing line */}
        <div className="mt-8 text-xs text-stone-400">
          <span>Showroom timing: Open 7 days a week until {BUSINESS_CONFIG.timing.closesAt}</span>
          <span className="mx-2">·</span>
          <span>{BUSINESS_CONFIG.address.full}</span>
        </div>
      </div>
    </section>
  );
};
