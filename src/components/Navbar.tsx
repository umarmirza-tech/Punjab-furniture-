import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Phone, Menu, X, Clock, MapPin, MessageCircle, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';
import { ActivePage } from '../types';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const {
    activePage,
    setActivePage,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'About Us', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'Track Order', page: 'tracking' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Subtle Info Bar */}
      <div className="bg-[#1C1917] text-[#D6D0C5] text-xs py-2 px-4 border-b border-[#2C2825]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <Clock className="w-3.5 h-3.5" />
              <span>Showroom Open Today until {BUSINESS_CONFIG.timing.closesAt}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{BUSINESS_CONFIG.address.street}, Saharanpur</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${BUSINESS_CONFIG.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-mono tabular-nums">{BUSINESS_CONFIG.phone}</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <button
              onClick={() => handleNavClick('tracking')}
              className="hidden sm:flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Track Order</span>
            </button>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-300">
              Google Rating: <strong className="text-white font-medium">4.0 ★</strong> (43 reviews)
            </span>
            {onOpenAdmin && (
              <>
                <span className="text-stone-600 hidden sm:inline">|</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-400 hover:text-[#C5A880] text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer"
                >
                  Admin / Catalog
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand Wordmark in Display Face */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <span className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#1C1917] group-hover:text-[#78350F] transition-colors uppercase">
                Punjab Furnitures
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#78350F] font-medium -mt-1">
                Saharanpur • Est. Quality
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-sm font-medium transition-all relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#78350F] font-semibold'
                      : 'text-stone-700 hover:text-[#1C1917]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#78350F] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Wishlist, Cart, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search furniture catalog"
              className="p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setActivePage('wishlist')}
              aria-label="View Wishlist"
              className="relative p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#78350F] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="relative p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#78350F] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Callout Button */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I would like to enquire about furniture available at your Saharanpur showroom.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BE5A] text-white px-3.5 py-2 rounded-md text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-stone-800 hover:bg-[#F2EFE8] rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E8E4DC] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left px-3 py-2 text-base font-medium rounded-md transition-colors cursor-pointer ${
                    activePage === link.page
                      ? 'bg-[#EFECE4] text-[#78350F] font-semibold'
                      : 'text-stone-800 hover:bg-[#F4F1EA]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-[#E8E4DC] flex flex-col gap-2">
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I am contacting you from your website.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-md font-semibold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (075000 90009)</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 bg-[#1C1917] text-white py-2.5 rounded-md font-medium text-sm"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Call Showroom (075000 90009)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
