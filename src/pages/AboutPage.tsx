import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';
import { useCart } from '../context/CartContext';
import showroomImg from '../assets/images/furniture_showroom_craft_1790252305357.jpg';
import heroImg from '../assets/images/hero_punjab_furniture_1790252286120.jpg';
import diningImg from '../assets/images/product_wood_dining_1790252329249.jpg';
import { MapPin, Clock, Phone, MessageCircle, CheckCircle, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
            Showroom Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#1C1917] mb-6">
            About Punjab Furnitures
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Punjab Furnitures is a furniture showroom in Saharanpur offering a wide selection of furniture for modern homes and spaces.
          </p>
        </div>

        {/* Feature Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative rounded-xl overflow-hidden border border-[#E8E4DC] shadow-lg">
            <img
              src={showroomImg}
              alt="Punjab Furnitures Showroom Saharanpur"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <span className="font-semibold block text-sm">Dehradun Road Showroom</span>
                <span>Near Sapna Cinema, Khanalampura, Saharanpur</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block">
              Our Showroom Focus
            </span>

            <h2 className="text-3xl font-display font-bold text-[#1C1917]">
              Quality-Focused Furniture Crafted for Longevity
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Located on Dehradun Road near Sapna Cinema in Saharanpur, Punjab Furnitures serves homeowners, interior designers, and businesses seeking furniture that balances timeless aesthetic appeal with durable utility.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Saharanpur is celebrated as the wood carving capital of India. We take pride in bridging this renowned local artisanal woodworking expertise with clean, contemporary silhouettes tailored to modern apartment layouts, independent houses, and workspace interiors.
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E4DC]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Extensive Variety</h4>
                  <p className="text-xs text-stone-500">Sofas, beds, storage, dining tables, and accent seating.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#78350F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">Attentive Support</h4>
                  <p className="text-xs text-stone-500">Honest guidance on wood finishes, dimensions, and fabric maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-8 sm:p-12 mb-20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1C1917] mb-2">
              What Defines Our Showroom
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Clear standards that ensure every purchase brings lasting comfort to your family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-lg bg-[#FAF9F5] border border-[#E8E4DC]">
              <span className="text-2xl font-display font-bold text-[#78350F] block mb-2 font-mono">01.</span>
              <h4 className="text-base font-bold text-stone-900 mb-2">Wide Selection</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                A rich showroom display allowing customers to evaluate multiple designs, fabric shades, and bed frame configurations in person.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FAF9F5] border border-[#E8E4DC]">
              <span className="text-2xl font-display font-bold text-[#78350F] block mb-2 font-mono">02.</span>
              <h4 className="text-base font-bold text-stone-900 mb-2">Seasoned Timber</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Emphasis on seasoned Teak, Sheesham, and sturdy hardwoods selected to withstand humidity shifts across Indian seasons.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FAF9F5] border border-[#E8E4DC]">
              <span className="text-2xl font-display font-bold text-[#78350F] block mb-2 font-mono">03.</span>
              <h4 className="text-base font-bold text-stone-900 mb-2">Custom Enquiries</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct consultation for clients requiring specific room dimensions, hydraulic storage modifications, or matching dining chairs.
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#FAF9F5] border border-[#E8E4DC]">
              <span className="text-2xl font-display font-bold text-[#78350F] block mb-2 font-mono">04.</span>
              <h4 className="text-base font-bold text-stone-900 mb-2">Showroom Accessibility</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Open 7 days a week until 9:00 PM on Dehradun Road, making evening family visits and weekend selections effortless.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery / Space Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          <div className="rounded-lg overflow-hidden border border-[#E8E4DC] relative aspect-[16/9]">
            <img
              src={heroImg}
              alt="Living Room Suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 text-white">
              <span className="text-xs font-medium">Contemporary Living Room Sets</span>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#E8E4DC] relative aspect-[16/9]">
            <img
              src={diningImg}
              alt="Dining Room Suite"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 text-white">
              <span className="text-xs font-medium">Solid Teak Dining Ensembles</span>
            </div>
          </div>
        </div>

        {/* Action Box */}
        <div className="bg-[#1C1917] text-white rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3">
            Visit Our Saharanpur Showroom
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mb-8 max-w-lg mx-auto">
            Experience the craftsmanship in person. Open daily until 9 PM at Dehradun Road, Near Sapna Cinema, Khanalampura.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-[#C5A880] text-[#1C1917] font-semibold text-xs rounded hover:bg-[#B3956B] transition-colors cursor-pointer"
            >
              Get Directions & Timing
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#25D366] text-white font-semibold text-xs rounded hover:bg-[#20BE5A] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
