import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Phone, Menu, X, Clock, MapPin, MessageCircle, Package, Crown, User } from 'lucide-react';
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
    { label: 'Loyalty Club', page: 'account' },
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
      <div className="bg-[#1C1917] text-[#D6D0C5] text-xs py-2 px-3 sm:px-4 border-b border-[#2C2825]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <Clock className="w-3.5 h-3.5" />
              <span>Showroom Open Today until {BUSINESS_CONFIG.timing.closesAt}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{BUSINESS_CONFIG.address.full}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
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
            <span className="text-stone-600 hidden md:inline">|</span>
            <button
              onClick={() => handleNavClick('account')}
              className="hidden md:flex items-center gap-1 text-[#C5A880] hover:text-white transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Privilege Rewards</span>
            </button>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <span className="text-stone-300 hidden sm:inline">
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[72px] sm:h-20 py-2 sm:py-0 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Zone 1: Brand Wordmark in Display Face - spacious, unclipped, responsive */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus-visible:outline-none"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold tracking-tight text-[#1C1917] group-hover:text-[#78350F] transition-colors uppercase whitespace-nowrap block leading-tight">
                Punjab Furnitures
              </span>
              <span className="block text-[9px] sm:text-[10.5px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#78350F] font-semibold mt-0.5 leading-normal pb-0.5">
                Khatta Kheri • Est. Quality
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
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

          {/* Zone 3: Actions (Search, Wishlist, Cart, Account, WhatsApp) */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search furniture catalog"
              className="p-1.5 sm:p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setActivePage('wishlist')}
              aria-label="View Wishlist"
              className="relative p-1.5 sm:p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#78350F] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className="relative p-1.5 sm:p-2 text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#78350F] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account & Loyalty Rewards Trigger */}
            <button
              onClick={() => setActivePage('account')}
              aria-label="Customer Account & Rewards"
              title="Virasat Privilege Club & Account"
              className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer relative ${
                activePage === 'account' ? 'text-[#78350F] bg-[#EFECE4]' : 'text-stone-700 hover:text-[#1C1917] hover:bg-[#F2EFE8]'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Direct WhatsApp Callout Button */}
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I would like to enquire about furniture available at your Khatta Kheri showroom.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BE5A] text-white px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-md text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-1.5 sm:p-2 text-stone-800 hover:bg-[#F2EFE8] rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF9F5] border-b border-[#E8E4DC] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map(link => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                    activePage === link.page
                      ? 'bg-[#EFECE4] text-[#78350F] font-semibold'
                      : 'text-stone-800 hover:bg-[#F4F1EA]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.page === 'account' && (
                    <span className="text-[10px] bg-[#C5A880]/25 text-[#78350F] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                      Rewards
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-3 border-t border-[#E8E4DC] flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('account')}
                  className="flex items-center justify-center gap-2 bg-[#1C1917] text-[#C5A880] py-2.5 rounded-md font-semibold text-xs uppercase tracking-wider"
                >
                  <Crown className="w-4 h-4 text-[#C5A880]" />
                  <span>Punjab Privilege Club & Rewards</span>
                </button>

                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I am contacting you from your website.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-md font-semibold text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({BUSINESS_CONFIG.whatsapp})</span>
                </a>

                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="flex items-center justify-center gap-2 bg-[#F4F1EA] text-stone-800 border border-[#E0DCD3] py-2.5 rounded-md font-medium text-xs"
                >
                  <Phone className="w-4 h-4 text-[#78350F]" />
                  <span>Call Showroom ({BUSINESS_CONFIG.phone})</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
