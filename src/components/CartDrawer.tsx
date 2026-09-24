import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createCartWhatsAppOrderLink } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    setActivePage
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  const whatsappCheckoutUrl = createCartWhatsAppOrderLink(cart, cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E8E4DC] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 bg-white border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#78350F]" />
              <h2 className="text-lg font-bold font-display text-[#1C1917]">
                Your Furniture Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-[#F2EFE8] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F2EFE8] flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-stone-800 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our handcrafted living, bedroom, and dining furniture to find the perfect match for your home.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('shop');
                  }}
                  className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                  className="bg-white p-4 rounded-lg border border-[#E8E4DC] flex gap-4 shadow-sm"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded bg-[#F7F5F0] overflow-hidden shrink-0 border border-[#F2EFE8]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="text-sm font-semibold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        aria-label="Remove item"
                        className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variant details */}
                    <div className="text-[11px] text-stone-500 mb-2 space-x-2">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E8E4DC] rounded bg-[#FAF9F5]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-sm font-bold text-stone-900 tabular-nums">
                        {item.product.price > 0
                          ? `₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
                          : 'Enquiry'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E4DC] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium tabular-nums">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    <span>Estimated Showroom Delivery</span>
                  </span>
                  <span className="font-mono tabular-nums">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E8E4DC] flex justify-between text-base font-bold text-stone-900">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Cart Order via WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs text-stone-500 hover:text-stone-800 transition-colors py-1 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
