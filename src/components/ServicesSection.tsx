import React from 'react';
import { ShoppingBag, Ruler, Home, Building2, Store, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useCart } from '../context/CartContext';

export const ServicesSection: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useCart();

  const services = [
    {
      title: "Furniture Sales",
      subtitle: "Ready & Catalog Options",
      description: "Browse our extensive in-stock catalog of living room sofas, beds, wardrobes, dining sets, and entertainment units ready for quick local delivery.",
      icon: ShoppingBag,
      actionText: "Browse Collection",
      onClick: () => setActivePage('shop')
    },
    {
      title: "Custom Furniture Enquiry",
      subtitle: "Enquire About Custom Sizing",
      description: "Discuss bespoke dimensions, wood stain matching, and custom fabric upholstery for your unique floor plan with our Saharanpur showroom craftsmen.",
      icon: Ruler,
      actionText: "Enquire on WhatsApp",
      whatsapp: true
    },
    {
      title: "Home Furniture Solutions",
      subtitle: "Living, Bedroom & Dining",
      description: "Cohesive aesthetic furniture pieces designed to harmoniously furnish entire apartments, villas, and modern bungalows.",
      icon: Home,
      actionText: "View Categories",
      onClick: () => setActivePage('categories')
    },
    {
      title: "Office Furniture",
      subtitle: "Executive Desks & Seating",
      description: "Enquire about durable executive desks, conference tables, and ergonomic high-back seating suitable for professional offices and study rooms.",
      icon: Building2,
      actionText: "View Office Range",
      onClick: () => {
        setSelectedCategory('office-furniture');
        setActivePage('shop');
      }
    },
    {
      title: "Showroom Assistance",
      subtitle: "Personal Walkthrough",
      description: `Visit our ${BUSINESS_CONFIG.address.full} showroom to personally feel fabric textures, test mattress firming, and inspect solid wood joinery with guidance from our team.`,
      icon: Store,
      actionText: "Showroom Location",
      onClick: () => setActivePage('contact')
    },
    {
      title: "Product Enquiry via WhatsApp",
      subtitle: "Instant Photo & Video Sharing",
      description: `Can't visit today? Chat directly on ${BUSINESS_CONFIG.whatsapp} to receive high-definition photos, dimension sheets, and real-time product updates on your phone.`,
      icon: MessageCircle,
      actionText: `Chat on ${BUSINESS_CONFIG.whatsapp}`,
      whatsapp: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
              Showroom & Bespoke Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917]">
              Our Furniture Services
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Whether you require ready showroom delivery or custom wood finishing, our local team is here to guide your home transformation.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF9F5] border border-[#E8E4DC] rounded-lg p-7 hover:border-[#78350F] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-white border border-[#E8E4DC] text-[#78350F] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-stone-500 block mb-1">
                    {srv.subtitle}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#1C1917] mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E4DC]">
                  {srv.whatsapp ? (
                    <a
                      href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello Punjab Furnitures, I would like to enquire about your service: ${srv.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#128C7E] hover:text-[#075E54] transition-colors"
                    >
                      <span>{srv.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={srv.onClick}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78350F] hover:text-[#552509] transition-colors cursor-pointer"
                    >
                      <span>{srv.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
