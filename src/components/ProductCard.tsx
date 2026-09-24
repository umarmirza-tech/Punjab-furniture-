import React from 'react';
import { Heart, ShoppingBag, Eye, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { createProductWhatsAppLink } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetails
  } = useCart();

  const isFavorite = isInWishlist(product.id);
  const whatsappUrl = createProductWhatsAppLink(product, 1);

  return (
    <div className="group relative bg-white border border-[#E8E4DC] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4CDBC] flex flex-col h-full">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F5F0]">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="bg-[#78350F] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              {product.discountPercent}% OFF
            </span>
          ) : null}
          {product.isNewArrival && (
            <span className="bg-[#1C1917] text-[#C5A880] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md backdrop-blur-sm transition-all z-10 cursor-pointer ${
            isFavorite
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-stone-700 hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Trigger Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => openProductDetails(product)}
            className="px-3.5 py-2 bg-white/95 text-[#1C1917] hover:bg-white text-xs font-semibold rounded shadow-md flex items-center gap-1.5 transition-transform transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#78350F]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-600 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="tabular-nums text-xs">{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => openProductDetails(product)}
            className="text-base font-semibold text-[#1C1917] group-hover:text-[#78350F] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h4>

          {/* Short Description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          {/* Key Specs snippet if available */}
          {product.material && (
            <div className="text-[11px] text-stone-500 mb-3 truncate">
              <span className="font-medium text-stone-700">Material:</span> {product.material}
            </div>
          )}
        </div>

        {/* Price and Action Buttons */}
        <div className="pt-3 border-t border-[#F2EFE8]">
          <div className="flex items-baseline gap-2 mb-3">
            {product.price > 0 ? (
              <>
                <span className="text-lg font-bold text-[#1C1917] font-mono tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm font-semibold text-[#78350F]">
                Price on Enquiry
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full py-2 px-2 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 text-xs font-semibold rounded transition-all flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
