import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';
import { useCart } from '../context/CartContext';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { setSelectedCategory, setActivePage } = useCart();

  const handleExplore = () => {
    setSelectedCategory(category.id);
    setActivePage('shop');
  };

  return (
    <div
      onClick={handleExplore}
      className="group relative bg-white border border-[#E8E4DC] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      {/* Category Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F1EA]">
        <img
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Subtle count watermark */}
        <span className="absolute bottom-3 right-3 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded">
          {category.itemCount} Designs
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#78350F] block mb-1">
            {category.tagline}
          </span>
          <h3 className="text-xl font-display font-bold text-[#1C1917] group-hover:text-[#78350F] transition-colors mb-2">
            {category.name}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {category.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F2EFE8] flex items-center justify-between text-xs font-semibold text-[#78350F]">
          <span>Explore Category</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
