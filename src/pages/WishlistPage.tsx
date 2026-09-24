import React from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setActivePage, openProductDetails } = useCart();

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs text-stone-500 mb-1">
            <span>Punjab Furnitures</span>
            <span className="mx-2">/</span>
            <span className="text-[#78350F] font-semibold">Saved Pieces</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917]">
            Your Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Keep track of favorite pieces while planning your room layouts or visiting our Saharanpur showroom.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-[#FAF2EB] text-[#78350F] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-display font-bold text-stone-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Explore our handcrafted sofas, beds, wardrobes, and dining tables, then click the heart icon to save items here.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              Explore Shop Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-[#E8E4DC] overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-[#F7F5F0]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Remove from wishlist"
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-600 shadow-sm hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#78350F] uppercase tracking-wider block mb-1">
                      {product.categoryName}
                    </span>
                    <h3
                      onClick={() => openProductDetails(product)}
                      className="text-sm font-semibold text-stone-900 hover:text-[#78350F] cursor-pointer truncate mb-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#F2EFE8]">
                    <div className="font-mono text-base font-bold text-stone-900 mb-3 tabular-nums">
                      {product.price > 0 ? `₹${product.price.toLocaleString('en-IN')}` : 'Enquiry'}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2 px-2 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => openProductDetails(product)}
                        className="w-full py-2 px-2 border border-[#E8E4DC] hover:border-stone-400 text-stone-800 text-xs font-semibold rounded flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
