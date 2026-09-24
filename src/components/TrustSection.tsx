import React from 'react';
import { Layers, ShieldCheck, Store, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const TrustSection: React.FC = () => {
  const cards = [
    {
      icon: Layers,
      title: "Wide Selection",
      description: "From living room sectionals and solid wood beds to dining sets and wardrobes, choose from an extensive range of styles and dimensions."
    },
    {
      icon: ShieldCheck,
      title: "Quality-Focused Products",
      description: "Carefully selected hardwoods, robust joinery, and resilient upholstery fabrics designed for everyday Indian household use."
    },
    {
      icon: Store,
      title: "Local Saharanpur Showroom",
      description: "Conveniently located on Dehradun Road near Sapna Cinema. Visit us in person to evaluate finishes, cushioning, and wood textures."
    },
    {
      icon: MessageSquare,
      title: "Easy Direct Enquiry",
      description: "No confusing automated call centers. Chat directly with showroom staff on WhatsApp (075000 90009) for instant photos and quotes."
    }
  ];

  return (
    <section className="py-20 bg-[#FAF9F5] border-t border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
            Built on Reliability & Craft
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917] mb-4">
            Furniture That Fits Your Space
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            We focus on genuine craftsmanship, honest materials, and direct communication to help you find the right pieces for your home.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-lg border border-[#E8E4DC] hover:border-[#D4CDBC] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FAF2EB] text-[#78350F] flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#1C1917] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
