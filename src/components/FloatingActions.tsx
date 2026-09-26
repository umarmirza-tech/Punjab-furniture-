import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Optional Back to Top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="pointer-events-auto p-2.5 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border border-[#E8E4DC] rounded-full shadow-md transition-all duration-200 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Call Button */}
      <a
        href={`tel:${BUSINESS_CONFIG.phone}`}
        aria-label={`Call Punjab Furnitures at ${BUSINESS_CONFIG.phone}`}
        className="pointer-events-auto p-3.5 bg-[#1C1917] hover:bg-[#2C2825] text-white rounded-full shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center border border-white/10"
      >
        <Phone className="w-5 h-5 text-[#C5A880]" />
      </a>

      {/* Floating WhatsApp Action with Dismissible Message Bubble */}
      <div className="relative flex items-center gap-2">
        {showTooltip && (
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#E8E4DC] shadow-lg text-xs font-semibold text-stone-800 animate-in fade-in slide-in-from-right duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              aria-label="Dismiss message"
              className="text-stone-400 hover:text-stone-600 ml-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <a
          href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I am browsing your furniture website and would like some assistance.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with Punjab Furnitures on WhatsApp (${BUSINESS_CONFIG.whatsapp})`}
          className="pointer-events-auto p-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white rounded-full shadow-2xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
