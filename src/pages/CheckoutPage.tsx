import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CustomerOrderInfo, PurchaseRecord } from '../types';
import { createCartWhatsAppOrderLink } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';
import { ShieldCheck, Truck, MessageCircle, CreditCard, Banknote, CheckCircle2, ArrowLeft, AlertCircle, Package, Crown, Tag, Check } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    deliveryCharge,
    cartTotal,
    clearCart,
    setActivePage
  } = useCart();

  const [formData, setFormData] = useState<CustomerOrderInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Saharanpur',
    state: 'Uttar Pradesh',
    pincode: '247001',
    deliveryNotes: '',
    paymentMethod: 'whatsapp'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Loyalty Voucher Discount State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Auto-prefill from customer profile if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('punjab_furnitures_customer_profile');
      if (stored) {
        const profile = JSON.parse(stored);
        setFormData(prev => ({
          ...prev,
          fullName: prev.fullName || profile.fullName || '',
          phone: prev.phone || profile.phone || '',
          email: prev.email || profile.email || '',
          address: prev.address || profile.address || '',
          city: profile.city || prev.city,
          state: profile.state || prev.state,
          pincode: profile.pincode || prev.pincode
        }));
      }

      // Check if user has redeemed vouchers
      const redeemedStored = localStorage.getItem('punjab_furnitures_redeemed_vouchers');
      if (redeemedStored) {
        const vouchers = JSON.parse(redeemedStored);
        if (Array.isArray(vouchers) && vouchers.length > 0 && !appliedCoupon) {
          setCouponCode(vouchers[0]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleApplyCoupon = () => {
    const clean = couponCode.trim().toUpperCase();
    setCouponError(null);

    if (!clean) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (clean === 'PUNJAB500') {
      if (cartSubtotal < 10000) {
        setCouponError('PUNJAB500 requires minimum order value of ₹10,000.');
        return;
      }
      setAppliedDiscount(500);
      setAppliedCoupon('PUNJAB500');
    } else if (clean === 'VIRASAT1200') {
      if (cartSubtotal < 25000) {
        setCouponError('VIRASAT1200 requires minimum order value of ₹25,000.');
        return;
      }
      setAppliedDiscount(1200);
      setAppliedCoupon('VIRASAT1200');
    } else if (clean === 'FREESETUP' || clean === 'WOODCARE') {
      setAppliedDiscount(300);
      setAppliedCoupon(clean);
    } else {
      setCouponError('Invalid coupon code. Check active vouchers in your Account & Loyalty tab.');
    }
  };

  const finalTotal = Math.max(0, cartTotal - appliedDiscount);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = `PF-${Date.now().toString().slice(-6)}`;
    setPlacedOrderId(orderId);

    // Calculate loyalty points: 1 point per 100 spent
    const pointsCalculated = Math.round(finalTotal / 100);
    setEarnedPoints(pointsCalculated);

    const fullRecord: PurchaseRecord = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0]
      })),
      total: finalTotal,
      pointsEarned: pointsCalculated,
      status: 'Confirmed',
      customerName: formData.fullName,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod === 'whatsapp' 
        ? 'WhatsApp Order' 
        : (formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Gateway'),
      deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
    };

    // Save order in recent orders list for tracking and account purchase history
    try {
      const existingRecent = localStorage.getItem('punjab_furnitures_recent_orders');
      const listRecent = existingRecent ? JSON.parse(existingRecent) : [];
      const newEntry = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        itemsCount: cart.length,
        total: finalTotal,
        fullName: formData.fullName,
        phone: formData.phone
      };
      localStorage.setItem('punjab_furnitures_recent_orders', JSON.stringify([newEntry, ...listRecent.slice(0, 5)]));

      // Save to account purchase history
      const existingAccountOrders = localStorage.getItem('punjab_furnitures_account_orders');
      const listAccount = existingAccountOrders ? JSON.parse(existingAccountOrders) : [];
      localStorage.setItem('punjab_furnitures_account_orders', JSON.stringify([fullRecord, ...listAccount]));

      // Credit loyalty points to balance
      const currentPoints = parseInt(localStorage.getItem('punjab_furnitures_loyalty_points') || '750', 10);
      localStorage.setItem('punjab_furnitures_loyalty_points', (currentPoints + pointsCalculated).toString());
    } catch {
      // Ignore localStorage errors
    }

    // If WhatsApp Order or Pay at Store, create WhatsApp deep link
    const whatsappLink = createCartWhatsAppOrderLink(cart, finalTotal, formData);

    if (formData.paymentMethod === 'whatsapp' || formData.paymentMethod === 'cod') {
      window.open(whatsappLink, '_blank');
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-8 sm:p-10 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#78350F] font-bold block mb-1">
              Order Received
            </span>
            <h1 className="text-3xl font-display font-bold text-stone-900 mb-2">
              Thank You For Your Order!
            </h1>
            <p className="text-xs text-stone-500 font-mono mb-4">
              Order Reference: <strong className="text-stone-900">{placedOrderId}</strong>
            </p>

            {/* Loyalty Points Earned Banner */}
            <div className="p-4 bg-gradient-to-r from-[#1C1917] to-[#2E2823] rounded-lg text-white mb-6 text-left flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880] shrink-0">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#E5C158] uppercase tracking-wider">
                    Punjab Privilege Club Rewards
                  </div>
                  <div className="text-sm font-semibold">
                    +{earnedPoints} Loyalty Points Credited to Your Account!
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActivePage('account')}
                className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#B3956B] text-[#1C1917] text-xs font-bold rounded transition-colors whitespace-nowrap cursor-pointer"
              >
                View Account
              </button>
            </div>

            <div className="p-4 bg-[#FAF9F5] rounded-lg border border-[#E8E4DC] text-xs text-stone-700 mb-6 text-left space-y-2">
              <div className="font-semibold text-stone-900">Next Steps:</div>
              <div>1. Our showroom team on Dehradun Road will verify product availability.</div>
              <div>2. You will receive a direct call / WhatsApp confirmation on <strong>{formData.phone}</strong>.</div>
              <div>3. Delivery & assembly schedule will be coordinated to your address.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setActivePage('shop')}
                className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>

              <button
                onClick={() => setActivePage('account')}
                className="px-5 py-2.5 bg-[#FAF2EB] border border-[#78350F]/30 text-[#78350F] hover:bg-[#78350F] hover:text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>My Account & Points</span>
              </button>

              <button
                onClick={() => setActivePage('tracking')}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>Track this Order</span>
              </button>

              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello Punjab Furnitures, I placed order #${placedOrderId} on your website. Please check status.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded hover:bg-[#20BE5A] transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Showroom on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (cart.length === 0) {
    return (
      <div className="bg-[#FAF9F5] min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-8 shadow-sm">
            <h2 className="text-xl font-bold font-display text-stone-900 mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Please add furniture items to your bag before proceeding to checkout.
            </p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-5 py-2.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors cursor-pointer"
            >
              Browse Furniture Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-stone-500">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-1 hover:text-stone-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>
          <span>/</span>
          <span className="text-[#78350F] font-semibold">Secure Checkout</span>
        </div>

        <h1 className="text-3xl font-display font-bold text-[#1C1917] mb-8">
          Checkout & Order Confirmation
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customer Information & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Customer Details Card */}
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-6 shadow-sm">
              <h2 className="text-base font-bold text-stone-900 mb-4 pb-2 border-b border-[#E8E4DC] flex items-center justify-between">
                <span>1. Customer & Delivery Address</span>
                <span className="text-xs font-normal text-stone-500">Saharanpur & All India Inquiries</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className={`w-full text-xs p-2.5 rounded border bg-[#FAF9F5] focus:outline-none ${
                      errors.fullName ? 'border-rose-500' : 'border-[#E8E4DC] focus:border-[#78350F]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className={`w-full text-xs p-2.5 rounded border bg-[#FAF9F5] focus:outline-none ${
                      errors.phone ? 'border-rose-500' : 'border-[#E8E4DC] focus:border-[#78350F]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@example.com"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Complete Street Address / Landmark *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Flat No., Road Name, Landmark"
                    className={`w-full text-xs p-2.5 rounded border bg-[#FAF9F5] focus:outline-none ${
                      errors.address ? 'border-rose-500' : 'border-[#E8E4DC] focus:border-[#78350F]'
                    }`}
                  />
                  {errors.address && <p className="text-[11px] text-rose-500 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Saharanpur"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Uttar Pradesh"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="247001"
                    className={`w-full text-xs p-2.5 rounded border bg-[#FAF9F5] focus:outline-none ${
                      errors.pincode ? 'border-rose-500' : 'border-[#E8E4DC] focus:border-[#78350F]'
                    }`}
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-500 mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={e => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    placeholder="e.g. 2nd floor, service lift available"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options Card */}
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-[#E8E4DC]">
                2. Payment Method
              </h2>

              {/* Option A: WhatsApp Order */}
              <label
                className={`flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                  formData.paymentMethod === 'whatsapp'
                    ? 'border-[#25D366] bg-emerald-50/40 ring-1 ring-[#25D366]'
                    : 'border-[#E8E4DC] hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'whatsapp'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                  className="mt-1 accent-[#25D366]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-xs font-bold text-stone-900">
                      WhatsApp Order Confirmation (Recommended)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Generates an official formatted WhatsApp order sent straight to 075000 90009. Our showroom team immediately locks stock and discusses payment options.
                  </p>
                </div>
              </label>

              {/* Option B: Pay at Store / COD */}
              <label
                className={`flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#78350F] bg-[#FAF2EB] ring-1 ring-[#78350F]'
                    : 'border-[#E8E4DC] hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="mt-1 accent-[#78350F]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#78350F]" />
                    <span className="text-xs font-bold text-stone-900">
                      Cash on Delivery / Pay at Store
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Inspect the furniture at our Dehradun Road showroom or pay when local delivery arrives in Saharanpur.
                  </p>
                </div>
              </label>

              {/* Option C: Online Payment Setup-Ready Placeholder */}
              <label
                className={`flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer ${
                  formData.paymentMethod === 'online_gateway'
                    ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                    : 'border-[#E8E4DC] hover:border-stone-400 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'online_gateway'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'online_gateway' })}
                  className="mt-1 accent-indigo-600"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-stone-900">
                      Online Gateway (Setup Ready Architecture)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Ready for Razorpay / UPI / Netbanking webhook integration. Select this to simulate integration or choose WhatsApp Order for direct instant processing.
                  </p>
                </div>
              </label>

              {formData.paymentMethod === 'online_gateway' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Setup-Ready Gateway Architecture:</strong> To connect production Razorpay, add your merchant Key ID in environment variables. In the meantime, clicking Place Order will safely register your cart and connect you with our showroom.
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E8E4DC] p-6 shadow-sm space-y-5 sticky top-28">
            <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-[#E8E4DC]">
              Order Summary ({cart.length} items)
            </h2>

            {/* Itemized List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="w-14 h-14 rounded bg-[#FAF9F5] border border-[#E8E4DC] overflow-hidden shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-stone-500">
                      Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </div>
                  </div>
                  <div className="font-mono font-bold text-stone-900 tabular-nums shrink-0">
                    {item.product.price > 0 ? `₹${(item.product.price * item.quantity).toLocaleString('en-IN')}` : 'Enquiry'}
                  </div>
                </div>
              ))}
            </div>

            {/* Loyalty Voucher Coupon Box */}
            <div className="pt-3 border-t border-[#E8E4DC]">
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5">
                <Tag className="w-3.5 h-3.5 text-[#78350F]" />
                <span>Privilege Club Coupon / Voucher</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. PUNJAB500"
                  className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded font-mono uppercase focus:outline-none focus:border-[#78350F]"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>
              )}

              {appliedCoupon && (
                <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-₹{appliedDiscount})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setAppliedDiscount(0);
                    }}
                    className="text-stone-400 hover:text-stone-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="pt-4 border-t border-[#E8E4DC] space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-mono font-medium tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privilege Voucher Discount</span>
                  <span className="font-mono tabular-nums">-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>Showroom Delivery (Saharanpur)</span>
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
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Loyalty points earn notice */}
              <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#78350F]" />
                  <span>Privilege Points to Earn:</span>
                </div>
                <strong className="font-bold">+{Math.round(finalTotal / 100)} Points</strong>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#78350F] hover:bg-[#552509] text-white text-xs font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>
                {formData.paymentMethod === 'whatsapp'
                  ? 'Confirm & Send Order on WhatsApp'
                  : 'Place Showroom Order'}
              </span>
            </button>

            <div className="text-[11px] text-stone-500 text-center">
              Direct assistance available anytime at <strong className="text-stone-800">075000 90009</strong>.
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
