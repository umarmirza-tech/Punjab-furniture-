import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F5] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#78350F] font-semibold block mb-2">
            Showroom Collections
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#1C1917] mb-4">
            Product Categories
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Explore our curated furniture departments, from plush living room seating and solid wood beds to Saharanpur artisanal woodwork and bespoke commissions.
          </p>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};
