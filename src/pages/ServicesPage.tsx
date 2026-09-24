import React, { useState } from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { Ruler, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const ServicesPage: React.FC = () => {
  const [roomType, setRoomType] = useState('Living Room');
  const [woodPref, setWoodPref] = useState('Teak Wood');
  const [dimensions, setDimensions] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleCustomEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Hello Punjab Furnitures,`,
      ``,
      `I would like to submit a Custom Furniture Enquiry:`,
      `Room / Furniture Type: ${roomType}`,
      `Preferred Wood / Finish: ${woodPref}`,
      dimensions ? `Estimated Dimensions: ${dimensions}` : null,
      notes ? `Requirements: ${notes}` : null,
      ``,
      `Customer Details:`,
      `Name: ${clientName || 'Showroom Visitor'}`,
      `Phone: ${clientPhone || 'Shared on WhatsApp'}`,
      ``,
      `Please provide guidance on design options, lead time, and quotation.`
    ].filter(Boolean);

    const url = `https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Services Overview */}
        <ServicesSection />

        {/* Custom Furniture Enquiry Module */}
        <div className="mt-16 bg-white rounded-xl border border-[#E8E4DC] p-8 sm:p-12 shadow-sm max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
              Made-to-Order Woodwork
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1C1917] mb-2">
              Enquire About Custom Furniture
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Need custom headboard heights, specific dining table dimensions, or matched wood finishes? Fill this quick brief to connect with our Saharanpur workshop on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleCustomEnquiry} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Furniture / Space Type
                </label>
                <select
                  value={roomType}
                  onChange={e => setRoomType(e.target.value)}
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                >
                  <option value="Living Room Sofa / Sectional">Living Room Sofa / Sectional</option>
                  <option value="Solid Wood Bed / Hydraulic Storage">Solid Wood Bed / Hydraulic Storage</option>
                  <option value="Dining Table & Chairs">Dining Table & Chairs</option>
                  <option value="Modular Wooden Wardrobe">Modular Wooden Wardrobe</option>
                  <option value="TV Unit & Media Console">TV Unit & Media Console</option>
                  <option value="Temple / Mandir Unit">Handcrafted Mandir Unit</option>
                  <option value="Office Executive Table">Office Executive Table</option>
                  <option value="Other Bespoke Requirement">Other Bespoke Requirement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Preferred Wood / Material
                </label>
                <select
                  value={woodPref}
                  onChange={e => setWoodPref(e.target.value)}
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                >
                  <option value="Solid Teak Wood (Sagwan)">Solid Teak Wood (Sagwan)</option>
                  <option value="Solid Sheesham Wood (Rosewood)">Solid Sheesham Wood (Rosewood)</option>
                  <option value="Mango Wood">Mango Wood</option>
                  <option value="Commercial Hardwood / Plywood">Commercial Hardwood / Plywood</option>
                  <option value="Open to Recommendation">Open to Recommendation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Approximate Dimensions (Optional)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={e => setDimensions(e.target.value)}
                  placeholder="e.g. 7ft x 6ft wall area, or 6-seater size"
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="e.g. Amit Kumar"
                  className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Specific Design Details or Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Mention desired polish color (dark walnut, natural honey), fabric texture, or special hardware..."
                className="w-full text-xs p-3 rounded-md border border-[#E8E4DC] bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-stone-500">
                Directly forwards to our showroom manager on WhatsApp (075000 90009).
              </span>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20BE5A] text-white text-xs font-semibold rounded-md shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Custom Enquiry on WhatsApp</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
