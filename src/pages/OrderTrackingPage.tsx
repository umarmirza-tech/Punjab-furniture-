import React from 'react';
import { OrderTrackingCard } from '../components/OrderTrackingCard';
import { SpecialCTA } from '../components/SpecialCTA';
import { BUSINESS_CONFIG } from '../config/business';
import { Truck, MessageCircle, Clock, MapPin, Crown, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderTrackingPage: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="text-xs text-stone-500 mb-2">
            <span>Punjab Furnitures</span>
            <span className="mx-2">/</span>
            <span className="text-[#78350F] font-semibold">Customer Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#1C1917] mb-3">
            Track Your Order
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed">
            Enter your order reference number to check stage progression and receive direct WhatsApp status updates, dispatch manifests, and photos from our Saharanpur workshop.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 p-2 px-3 bg-[#FAF2EB] border border-[#78350F]/20 rounded-full text-xs text-[#78350F]">
            <Crown className="w-3.5 h-3.5 text-[#78350F]" />
            <span>Looking for past invoices & reward points?</span>
            <button
              onClick={() => setActivePage('account')}
              className="font-bold underline hover:text-[#5E290B] flex items-center gap-0.5 cursor-pointer"
            >
              <span>View Customer Account</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Main Tracking Component */}
        <OrderTrackingCard className="mb-12" />

        {/* Support Callout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border border-[#E8E4DC] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF2EB] text-[#78350F] flex items-center justify-center mb-3">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">WhatsApp Live Tracking</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Message <strong className="text-stone-900 font-mono">{BUSINESS_CONFIG.whatsapp}</strong> with your order number for real-time warehouse pictures and dispatch details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E4DC] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF2EB] text-[#78350F] flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">Local & Regional Delivery</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Safe transit with specialized protective foam padding for wooden pieces, dining sets, and upholstered sofas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8E4DC] shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#FAF2EB] text-[#78350F] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1">Showroom Hours</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Open 7 days a week until <strong className="text-stone-900">{BUSINESS_CONFIG.timing.closesAt}</strong> at {BUSINESS_CONFIG.address.full}.
            </p>
          </div>
        </div>

      </div>

      <SpecialCTA />
    </div>
  );
};
