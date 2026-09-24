import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Package, Clock, CheckCircle2, Truck, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface OrderTrackingCardProps {
  initialOrderId?: string;
  className?: string;
}

interface SavedOrderSummary {
  orderId: string;
  date: string;
  itemsCount: number;
  total: number;
  fullName: string;
  phone: string;
}

export const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ initialOrderId = '', className = '' }) => {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [recentOrders, setRecentOrders] = useState<SavedOrderSummary[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('punjab_furnitures_recent_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentOrders(parsed);
          if (!orderId && parsed.length > 0) {
            setOrderId(parsed[0].orderId);
            setCustomerName(parsed[0].fullName || '');
            setCustomerPhone(parsed[0].phone || '');
          }
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setHasSearched(true);
  };

  const handleSelectRecent = (order: SavedOrderSummary) => {
    setOrderId(order.orderId);
    setCustomerName(order.fullName || '');
    setCustomerPhone(order.phone || '');
    setHasSearched(true);
  };

  // Generate the formatted WhatsApp tracking inquiry URL
  const generateWhatsAppUrl = () => {
    const cleanId = orderId.trim().toUpperCase();
    const lines = [
      `Hello Punjab Furnitures Showroom,`,
      ``,
      `I would like to get a live status update on my order:`,
      `📦 Order Reference ID: ${cleanId}`,
      customerName.trim() ? `👤 Customer Name: ${customerName.trim()}` : null,
      customerPhone.trim() ? `📞 Contact Phone: ${customerPhone.trim()}` : null,
      ``,
      `Please provide the current manufacturing, polishing, packaging, or dispatch status.`,
      `Thank you!`
    ].filter(Boolean);

    return `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const cleanOrderId = orderId.trim().toUpperCase();

  return (
    <div className={`bg-white rounded-xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm ${className}`}>
      
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[#E8E4DC]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78350F] block mb-1">
            Order Status & Showroom Updates
          </span>
          <h3 className="text-2xl font-display font-bold text-[#1C1917]">
            Track Your Furniture Order
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Enter your order reference ID (e.g. <span className="font-mono font-semibold text-stone-700">PF-849201</span>) to check status or request an instant update directly from our Saharanpur showroom on WhatsApp.
          </p>
        </div>

        <div className="hidden sm:flex w-12 h-12 rounded-lg bg-[#FAF2EB] text-[#78350F] items-center justify-center shrink-0">
          <Package className="w-6 h-6" />
        </div>
      </div>

      {/* Recent Orders Pills if available */}
      {recentOrders.length > 0 && (
        <div className="mb-6 p-3.5 bg-[#FAF9F5] rounded-lg border border-[#E8E4DC]">
          <span className="text-[11px] font-semibold text-stone-700 block mb-2">
            Recently Placed Orders from this device:
          </span>
          <div className="flex flex-wrap gap-2">
            {recentOrders.map(ro => (
              <button
                key={ro.orderId}
                type="button"
                onClick={() => handleSelectRecent(ro)}
                className={`text-xs px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                  orderId.trim().toUpperCase() === ro.orderId
                    ? 'bg-[#78350F] text-white border-[#78350F]'
                    : 'bg-white hover:bg-stone-100 text-stone-800 border-[#E8E4DC]'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span className="font-mono font-semibold">{ro.orderId}</span>
                <span className="text-[10px] opacity-75">({ro.date})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleTrackSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Order ID / Ref Number *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={orderId}
                onChange={e => {
                  setOrderId(e.target.value);
                  setHasSearched(false);
                }}
                placeholder="e.g. PF-123456"
                className="w-full text-xs font-mono uppercase p-2.5 pl-8 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Customer Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="e.g. Vikram Sharma"
              className="w-full text-xs p-2.5 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              Contact Phone (Optional)
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              placeholder="e.g. 09876543210"
              className="w-full text-xs p-2.5 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Check Status</span>
          </button>

          {orderId.trim() && (
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Status Update via WhatsApp (075000 90009)</span>
            </a>
          )}
        </div>
      </form>

      {/* Dynamic Status / Progress Module */}
      {orderId.trim() && (
        <div className="border border-[#E8E4DC] rounded-xl p-5 bg-[#FAF9F5] space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E4DC]">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block">
                Showroom Order Reference
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-bold text-stone-900">{cleanOrderId}</span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Active Showroom Inquiry
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-500">
              Showroom Support: <span className="font-mono font-semibold text-stone-900">{BUSINESS_CONFIG.phone}</span>
            </div>
          </div>

          {/* 4-Step Milestone Progress Bar */}
          <div>
            <span className="text-xs font-semibold text-stone-800 block mb-3">
              Standard Showroom Fulfillment Stages:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="p-3 bg-white rounded-lg border border-emerald-300 shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>1. Order Logged</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Order details logged in showroom queue.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3 bg-white rounded-lg border border-[#E8E4DC] shadow-xs">
                <div className="flex items-center gap-1.5 text-[#78350F] font-semibold text-xs mb-1">
                  <Package className="w-4 h-4" />
                  <span>2. Stock & Joinery</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Timber inspection & inventory verification.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3 bg-white rounded-lg border border-[#E8E4DC] shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  <span>3. Polish & Packaging</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Melamine coat, cushioning & foam wrapping.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3 bg-white rounded-lg border border-[#E8E4DC] shadow-xs">
                <div className="flex items-center gap-1.5 text-stone-700 font-semibold text-xs mb-1">
                  <Truck className="w-4 h-4" />
                  <span>4. Local Dispatch</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Coordinated door delivery & showroom pickup.
                </p>
              </div>
            </div>
          </div>

          {/* Action Box with WhatsApp Update */}
          <div className="bg-white p-4 rounded-lg border border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              <strong className="text-stone-900 block mb-0.5">Need Real-Time Photos or Driver Contact?</strong>
              <span>Our staff will immediately check the showroom ledger and send you photos of your packaged furniture.</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Request WhatsApp Status</span>
              </a>

              <a
                href={`tel:${BUSINESS_CONFIG.phone}`}
                className="px-3.5 py-2.5 bg-[#FAF9F5] border border-[#E8E4DC] hover:border-stone-400 text-stone-800 text-xs font-semibold rounded transition-colors flex items-center gap-1.5"
                title="Call showroom directly"
              >
                <Phone className="w-3.5 h-3.5 text-[#78350F]" />
                <span className="hidden md:inline">Call Showroom</span>
              </a>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="flex items-start gap-2 text-[11px] text-stone-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#78350F] shrink-0 mt-0.5" />
            <span>
              Orders are fulfilled directly by Punjab Furnitures, Dehradun Road, Near Sapna Cinema, Khanalampura, Saharanpur, UP - 247001. Timing: Open daily until {BUSINESS_CONFIG.timing.closesAt}.
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
