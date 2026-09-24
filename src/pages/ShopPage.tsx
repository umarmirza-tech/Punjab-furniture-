import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { CategoryId } from '../types';
import { Filter, SlidersHorizontal, Search, X, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useCart();

  // Local filter states
  const [priceRange, setPriceRange] = useState<'all' | 'under20k' | '20k-40k' | 'above40k'>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available materials from actual product data
  const materialsList = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.material) {
        if (p.material.toLowerCase().includes('teak')) set.add('Teak');
        if (p.material.toLowerCase().includes('sheesham')) set.add('Sheesham');
        if (p.material.toLowerCase().includes('linen') || p.material.toLowerCase().includes('chenille') || p.material.toLowerCase().includes('velvet')) set.add('Upholstered Fabric');
        if (p.material.toLowerCase().includes('mesh') || p.material.toLowerCase().includes('nylon')) set.add('Mesh & Metal');
      }
    });
    return Array.from(set);
  }, [products]);

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesMat = p.material ? p.material.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesCat && !matchesDesc && !matchesMat) {
          return false;
        }
      }

      // 3. Price filter
      if (priceRange === 'under20k' && (p.price > 20000 || p.price === 0)) return false;
      if (priceRange === '20k-40k' && (p.price < 20000 || p.price > 40000)) return false;
      if (priceRange === 'above40k' && p.price < 40000) return false;

      // 4. Rating filter
      if (minRating > 0 && p.rating < minRating) return false;

      // 5. Material filter
      if (selectedMaterial !== 'all') {
        if (!p.material || !p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
          return false;
        }
      }

      // 6. In stock filter
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    minRating,
    selectedMaterial,
    inStockOnly,
    sortBy
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setMinRating(0);
    setSelectedMaterial('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    searchQuery.trim() !== '',
    priceRange !== 'all',
    minRating > 0,
    selectedMaterial !== 'all',
    inStockOnly
  ].filter(Boolean).length;

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs text-stone-500 mb-1">
            <span>Punjab Furnitures</span>
            <span className="mx-2">/</span>
            <span className="text-[#78350F] font-semibold">Furniture Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#1C1917]">
            Shop All Furniture
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse handcrafted sofas, solid wood beds, dining tables, wardrobes, and custom orders in Saharanpur.
          </p>
        </div>

        {/* Search & Mobile Filter Bar */}
        <div className="bg-white p-4 rounded-lg border border-[#E8E4DC] shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or wood type (e.g. sofa, teak, bed)..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm border border-[#E8E4DC] rounded-md bg-[#FAF9F5] focus:outline-none focus:border-[#78350F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 border border-[#E8E4DC] rounded-md text-xs font-semibold text-stone-800 bg-[#FAF9F5] hover:bg-stone-200 transition-colors"
            >
              <Filter className="w-4 h-4 text-[#78350F]" />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 whitespace-nowrap hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 border border-[#E8E4DC] rounded-md bg-white text-stone-800 text-xs font-medium focus:outline-none focus:border-[#78350F]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Filters (Desktop & Mobile Dropdown) */}
          <aside
            className={`lg:block bg-white p-6 rounded-lg border border-[#E8E4DC] shadow-sm space-y-6 ${
              showMobileFilters ? 'block' : 'hidden'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#78350F]" />
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Filter Catalog
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#78350F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Filter 1: Category */}
            <div>
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                Category
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#FAF2EB] text-[#78350F] font-bold'
                      : 'text-stone-600 hover:bg-[#FAF9F5]'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[10px] text-stone-400">({products.length})</span>
                </button>

                {CATEGORIES.map(cat => {
                  const count = products.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#FAF2EB] text-[#78350F] font-bold'
                          : 'text-stone-600 hover:bg-[#FAF9F5]'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="font-mono text-[10px] text-stone-400">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Price Range */}
            <div className="pt-4 border-t border-[#E8E4DC]">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                Price Range
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'all'}
                    onChange={() => setPriceRange('all')}
                    className="accent-[#78350F]"
                  />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'under20k'}
                    onChange={() => setPriceRange('under20k')}
                    className="accent-[#78350F]"
                  />
                  <span>Under ₹20,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === '20k-40k'}
                    onChange={() => setPriceRange('20k-40k')}
                    className="accent-[#78350F]"
                  />
                  <span>₹20,000 – ₹40,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'above40k'}
                    onChange={() => setPriceRange('above40k')}
                    className="accent-[#78350F]"
                  />
                  <span>Above ₹40,000</span>
                </label>
              </div>
            </div>

            {/* Filter 3: Customer Rating */}
            <div className="pt-4 border-t border-[#E8E4DC]">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                Minimum Rating
              </h4>
              <div className="space-y-1.5 text-xs text-stone-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 0}
                    onChange={() => setMinRating(0)}
                    className="accent-[#78350F]"
                  />
                  <span>All Ratings</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 4.5}
                    onChange={() => setMinRating(4.5)}
                    className="accent-[#78350F]"
                  />
                  <span>4.5 ★ and Above</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === 4.0}
                    onChange={() => setMinRating(4.0)}
                    className="accent-[#78350F]"
                  />
                  <span>4.0 ★ and Above</span>
                </label>
              </div>
            </div>

            {/* Filter 4: Material */}
            {materialsList.length > 0 && (
              <div className="pt-4 border-t border-[#E8E4DC]">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3">
                  Material & Wood
                </h4>
                <div className="space-y-1.5 text-xs text-stone-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mat"
                      checked={selectedMaterial === 'all'}
                      onChange={() => setSelectedMaterial('all')}
                      className="accent-[#78350F]"
                    />
                    <span>All Materials</span>
                  </label>
                  {materialsList.map(mat => (
                    <label key={mat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mat"
                        checked={selectedMaterial === mat}
                        onChange={() => setSelectedMaterial(mat)}
                        className="accent-[#78350F]"
                      />
                      <span>{mat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Filter 5: Availability */}
            <div className="pt-4 border-t border-[#E8E4DC]">
              <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#78350F] rounded"
                />
                <span>In Stock at Saharanpur Showroom</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active Filters Pill Bar (Quiet unboxed text with separators) */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items</span>
                {selectedCategory !== 'all' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#78350F] font-semibold">Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                  </>
                )}
                {searchQuery && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Query: "{searchQuery}"</span>
                  </>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#78350F] hover:underline font-medium cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-[#E8E4DC] p-12 text-center">
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  No furniture matches your selected criteria
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
                  Try adjusting your filters, clearing search terms, or contact our showroom directly to enquire about custom-made pieces.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
