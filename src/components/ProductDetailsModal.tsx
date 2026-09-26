import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, MessageCircle, Check, ArrowRight, ShieldCheck, Truck, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createProductWhatsAppLink } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';

export const ProductDetailsModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage
  } = useCart();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors.length > 0 ? selectedProduct.colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  const isFavorite = isInWishlist(selectedProduct.id);
  const currentImage = selectedProduct.images[activeImageIndex] || selectedProduct.images[0];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setSelectedProduct(null);
    setActivePage('checkout');
  };

  const whatsappUrl = createProductWhatsAppLink(
    selectedProduct,
    quantity,
    undefined,
    selectedColor,
    selectedSize
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#E8E4DC] my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC] bg-[#FAF9F5]">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-medium text-[#78350F] uppercase tracking-wider">
              {selectedProduct.categoryName}
            </span>
            <span aria-hidden="true">·</span>
            <span>SKU: {selectedProduct.id}</span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            aria-label="Close product details"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-[#EAE6DE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F7F5F0] border border-[#E8E4DC]">
              <img
                src={currentImage}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(selectedProduct)}
                aria-label="Toggle wishlist"
                className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 text-stone-700 hover:bg-white hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-md overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#78350F] ring-1 ring-[#78350F]'
                        : 'border-[#E8E4DC] hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Showroom Visit Callout */}
            <div className="p-3.5 bg-[#FAF9F5] border border-[#E8E4DC] rounded-lg text-xs text-stone-600 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#78350F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">Inspect in Person at Our Showroom</strong>
                <span>{BUSINESS_CONFIG.address.full}. Open until {BUSINESS_CONFIG.timing.closesAt}.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Rating & reviews */}
              <div className="flex items-center gap-2 mb-2 text-xs">
                <div className="flex items-center text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="text-stone-900">{selectedProduct.rating}</span>
                </div>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">{selectedProduct.reviewsCount} customer reviews</span>
                <span className="text-stone-400">·</span>
                <span className="text-emerald-700 font-medium">In Stock at Showroom</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1C1917] mb-2 leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                {selectedProduct.price > 0 ? (
                  <>
                    <span className="text-3xl font-bold font-mono text-[#1C1917] tabular-nums">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <>
                        <span className="text-base text-stone-400 line-through font-mono tabular-nums">
                          ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-[#78350F] bg-[#FAF2EB] px-2 py-0.5 rounded border border-[#78350F]/20">
                          Save {selectedProduct.discountPercent}%
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-xl font-semibold text-[#78350F]">
                    Quotation on Request
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                {selectedProduct.longDescription || selectedProduct.description}
              </p>

              {/* Specifications / Dimensions */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#FAF9F5] rounded-lg border border-[#E8E4DC] text-xs mb-6">
                {selectedProduct.material && (
                  <div>
                    <span className="text-stone-400 block mb-0.5">Wood / Material</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.material}</span>
                  </div>
                )}
                {selectedProduct.dimensions && (
                  <div>
                    <span className="text-stone-400 block mb-0.5">Dimensions</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.dimensions}</span>
                  </div>
                )}
                {selectedProduct.finish && (
                  <div>
                    <span className="text-stone-400 block mb-0.5">Finish</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.finish}</span>
                  </div>
                )}
                <div>
                  <span className="text-stone-400 block mb-0.5">Availability</span>
                  <span className="font-semibold text-emerald-700">Ready for Dispatch / Pickup</span>
                </div>
              </div>

              {/* Color Options */}
              {selectedProduct.colors.length > 0 && (
                <div className="mb-5">
                  <label className="text-xs font-semibold text-stone-800 block mb-2">
                    Select Finish / Shade: <span className="font-normal text-stone-600">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'border-[#78350F] bg-[#FAF2EB] text-[#78350F] font-semibold ring-1 ring-[#78350F]'
                            : 'border-[#E8E4DC] hover:border-stone-400 text-stone-700 bg-white'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes / Variants */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="text-xs font-semibold text-stone-800 block mb-2">
                    Configuration / Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded border text-xs transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-[#78350F] bg-[#FAF2EB] text-[#78350F] font-semibold ring-1 ring-[#78350F]'
                            : 'border-[#E8E4DC] hover:border-stone-400 text-stone-700 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold text-stone-800">Quantity</span>
                <div className="flex items-center border border-[#E8E4DC] rounded bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-[#FAF9F5] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E4DC]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 px-4 bg-[#1C1917] hover:bg-[#2C2825] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 bg-[#78350F] hover:bg-[#60290B] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire & Order on WhatsApp</span>
              </a>

              {/* Why Choose Us (Prompt Section 6) */}
              <div className="mt-6 pt-5 border-t border-[#E8E4DC]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-800 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#78350F]" />
                  <span>Why Choose Punjab Furnitures?</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Quality-focused furniture selection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Multiple contemporary & classic designs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Local Saharanpur showroom support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Custom furniture enquiries supported</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Easy customer communication via direct WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
