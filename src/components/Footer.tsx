import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useCart } from '../context/CartContext';
import { ActivePage } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage } = useCart();

  const handleLink = (page: ActivePage) => {
    setActivePage(page);
  };

  return (
    <footer className="bg-[#141210] text-stone-300 border-t border-[#292524] text-xs">
      {/* Main Multi-Column Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-display font-bold text-white tracking-tight uppercase block">
              {BUSINESS_CONFIG.name}
            </span>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Punjab Furnitures is a trusted furniture showroom in Saharanpur offering a wide selection of furniture for modern homes and spaces, combining regional woodworking traditions with contemporary luxury.
            </p>

            <div className="pt-2 text-stone-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span className="leading-snug">{BUSINESS_CONFIG.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Open Everyday until {BUSINESS_CONFIG.timing.closesAt}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Furniture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Product Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Showroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom & Sales Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Google Reviews (4.0 ★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Customer
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => handleLink('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Browse Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('checkout')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('tracking')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Track Order / Status (WhatsApp)
                </button>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Store Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white">
              Direct Contact
            </h4>
            <p className="text-stone-400 text-xs">
              Call or message our showroom representative directly:
            </p>

            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="flex items-center gap-2 p-2.5 rounded bg-[#1F1C19] border border-[#2E2925] text-white hover:border-[#78350F] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span className="font-mono tabular-nums">{BUSINESS_CONFIG.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 rounded bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-400 hover:text-white hover:bg-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="border-t border-[#24201D] py-6 px-4 text-center text-[11px] text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 {BUSINESS_CONFIG.name}. All Rights Reserved.</span>
          <span>Dehradun Road, Near Sapna Cinema, Saharanpur, UP - 247001</span>
          <span className="text-stone-400 font-mono tabular-nums">075000 90009</span>
        </div>
      </div>
    </footer>
  );
};
