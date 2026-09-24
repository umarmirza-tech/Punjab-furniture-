import React, { useState } from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ArrowUpRight, Navigation, Package } from 'lucide-react';
import { OrderTrackingCard } from '../components/OrderTrackingCard';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'tracking'>('contact');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const lines = [
      `Hello Punjab Furnitures,`,
      ``,
      `I am submitting a contact enquiry through your website:`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      subject ? `Subject: ${subject}` : null,
      `Message: ${message}`,
      ``,
      `Please contact me regarding this request.`
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
    
    setSentSuccess(true);
    // Also open WhatsApp directly for instant communication
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
            Visit Or Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#1C1917] mb-4">
            Contact & Support
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-8">
            We are conveniently situated on Dehradun Road, Saharanpur. Drop by our showroom to experience the quality firsthand or connect via phone and WhatsApp.
          </p>

          {/* Clean Segmented Tab Switcher */}
          <div className="inline-flex p-1 bg-[#EAE6DE] rounded-lg border border-[#DDD8CE]">
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-5 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'contact'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#78350F]" />
              <span>Showroom Contact & Inquiries</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-5 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'tracking'
                  ? 'bg-[#78350F] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Order Tracking (WhatsApp)</span>
            </button>
          </div>
        </div>

        {/* Tab 2: Order Tracking */}
        {activeTab === 'tracking' && (
          <div className="max-w-4xl mx-auto mb-16 animate-in fade-in duration-300">
            <OrderTrackingCard />
          </div>
        )}

        {/* Tab 1: 2-Column Info & Form Grid */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16 animate-in fade-in duration-300">
          
          {/* Left Column: Business Location Details & Fast CTAs */}
          <div className="space-y-6">
            
            {/* Showroom Details Card */}
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-7 shadow-sm space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78350F] block mb-1">
                  Showroom Address
                </span>
                <h3 className="text-2xl font-display font-bold text-[#1C1917] mb-2">
                  {BUSINESS_CONFIG.name}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                  <span>
                    {BUSINESS_CONFIG.address.street},<br />
                    {BUSINESS_CONFIG.address.locality},<br />
                    {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} - {BUSINESS_CONFIG.address.pincode}
                  </span>
                </p>
              </div>

              {/* Timing */}
              <div className="pt-4 border-t border-[#E8E4DC] flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                    Business Hours
                  </h4>
                  <p className="text-sm text-stone-700">
                    Open Everyday until <strong className="text-[#1C1917]">{BUSINESS_CONFIG.timing.closesAt}</strong>
                  </p>
                  <span className="text-xs text-stone-500 block mt-0.5">
                    {BUSINESS_CONFIG.timing.days}
                  </span>
                </div>
              </div>

              {/* Direct Phone & WhatsApp */}
              <div className="pt-4 border-t border-[#E8E4DC] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    Phone Inquiries
                  </span>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phone}`}
                    className="text-base font-mono font-bold text-[#1C1917] hover:text-[#78350F] transition-colors tabular-nums block"
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                    WhatsApp Chat
                  </span>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-mono font-bold text-emerald-700 hover:text-emerald-800 transition-colors tabular-nums block"
                  >
                    {BUSINESS_CONFIG.whatsapp}
                  </a>
                </div>
              </div>

              {/* 3 Prominent Quick Action Buttons */}
              <div className="pt-4 border-t border-[#E8E4DC] flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${BUSINESS_CONFIG.phone}`}
                  className="flex-1 py-3 px-4 bg-[#1C1917] hover:bg-[#78350F] text-white text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                  <span>Call Now</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent('Hello Punjab Furnitures, I would like to visit or enquire about your showroom.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white border border-[#E8E4DC] hover:border-stone-400 text-stone-800 text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#78350F]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Public Review Highlight Box */}
            <div className="bg-[#FAF2EB] border border-[#E8E4DC] rounded-xl p-5 text-xs text-stone-700">
              <span className="font-semibold text-[#78350F] block mb-1">
                Google Rating: 4.0 ★ (43 Verified Reviews)
              </span>
              <p className="italic">
                "There were multiple choice of products available and service was excellent."
              </p>
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-7 shadow-sm">
            <h3 className="text-xl font-display font-bold text-[#1C1917] mb-2">
              Send a Showroom Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Have questions regarding furniture models, pricing, or custom orders? Fill in your details below.
            </p>

            {sentSuccess && (
              <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your message has been initiated. Our team will assist you on WhatsApp and phone.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Vikramaditya"
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Phone Number (WhatsApp Preferred) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 09876543210"
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Topic of Enquiry
                </label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                >
                  <option value="Showroom Visit & In-Store Availability">Showroom Visit & In-Store Availability</option>
                  <option value="Sofa / Living Room Pricing">Sofa / Living Room Pricing</option>
                  <option value="Solid Wood Bed / Wardrobe Order">Solid Wood Bed / Wardrobe Order</option>
                  <option value="Dining Table Sets">Dining Table Sets</option>
                  <option value="Custom Woodworking / Dimensions">Custom Woodworking / Dimensions</option>
                  <option value="Delivery Schedule to Nearby Cities">Delivery Schedule to Nearby Cities</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us what furniture piece you are looking for..."
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#78350F] hover:bg-[#552509] text-white text-xs font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Showroom</span>
              </button>
            </form>
          </div>

        </div>
        )}

        {/* Google Maps Embed Component */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#E8E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F5]">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#78350F]" />
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Find Punjab Furnitures on Google Maps
                </h3>
                <span className="text-xs text-stone-500">
                  Dehradun Road, Near Sapna Cinema, Khanalampura, Saharanpur
                </span>
              </div>
            </div>

            <a
              href={BUSINESS_CONFIG.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors self-start sm:self-auto"
            >
              <span>Open in Google Maps App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Responsive Map Frame */}
          <div className="w-full h-80 sm:h-96 relative bg-[#EFECE4]">
            <iframe
              title="Punjab Furnitures Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent('Punjab Furnitures Dehradun Road Near Sapna Cinema Khanalampura Saharanpur Uttar Pradesh')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
