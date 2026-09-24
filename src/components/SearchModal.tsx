import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    openProductDetails,
    setSelectedCategory,
    setActivePage
  } = useCart();

  const [query, setQuery] = useState('');

  const suggestions = [
    'sofa',
    'bed',
    'wooden furniture',
    'wardrobe',
    'dining table',
    'teak',
    'coffee table',
    'chair'
  ];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.material && p.material.toLowerCase().includes(q))
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    setIsSearchOpen(false);
    openProductDetails(product);
  };

  const handleSuggestionClick = (s: string) => {
    setQuery(s);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:p-20 flex justify-center items-start animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E8E4DC] overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E8E4DC] flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#78350F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, beds, wooden dining tables, wardrobes..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 text-xs px-2 py-1 rounded bg-[#EAE6DE] cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-[#EAE6DE] rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions Pill Bar */}
        <div className="px-5 py-3 bg-[#F7F5F0] border-b border-[#E8E4DC] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#78350F]" /> Suggestions:
          </span>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => handleSuggestionClick(s)}
              className="px-2.5 py-1 bg-white hover:bg-white/80 border border-[#E2DDD5] rounded-md text-stone-700 hover:text-[#78350F] transition-colors whitespace-nowrap text-xs cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-stone-500">
              <p className="text-sm font-medium text-stone-700 mb-1">
                Looking for premium furniture for your home?
              </p>
              <p className="text-xs text-stone-500">
                Type above or click a suggestion like "sofa", "bed", or "dining table".
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-semibold text-stone-800 mb-1">
                No matching furniture found for "{query}"
              </p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                We also craft bespoke furniture tailored to custom dimensions. Contact our Saharanpur showroom on WhatsApp to discuss your requirements.
              </p>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSelectedCategory('all');
                  setActivePage('shop');
                }}
                className="px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors"
              >
                View Complete Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                Products Found ({filteredProducts.length})
              </div>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-[#E8E4DC] hover:bg-[#FAF9F5] transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded overflow-hidden bg-[#F7F5F0] shrink-0 border border-[#E8E4DC]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-[#78350F] uppercase tracking-wider block">
                      {product.categoryName}
                    </span>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#78350F] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-stone-900 block tabular-nums">
                      {product.price > 0 ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquiry'}
                    </span>
                    <span className="text-[11px] text-[#78350F] flex items-center justify-end gap-1 group-hover:translate-x-0.5 transition-transform">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF9F5] border-t border-[#E8E4DC] text-center">
          <button
            onClick={() => {
              setIsSearchOpen(false);
              setActivePage('shop');
            }}
            className="text-xs text-[#78350F] hover:underline font-medium cursor-pointer"
          >
            Explore all items in our Shop Catalog →
          </button>
        </div>
      </div>
    </div>
  );
};
