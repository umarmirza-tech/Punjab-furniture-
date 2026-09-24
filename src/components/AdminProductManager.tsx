import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { X, Plus, Database, Check, Edit2, Download, Trash2, ShieldAlert } from 'lucide-react';
import sofaImg from '../assets/images/product_luxury_sofa_1790252317348.jpg';

interface AdminProductManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminProductManager: React.FC<AdminProductManagerProps> = ({ isOpen, onClose }) => {
  const { products, setProducts } = useCart();
  const [activeTab, setActiveTab] = useState<'catalog' | 'add' | 'architecture'>('catalog');

  // New product form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryId>('sofas');
  const [price, setPrice] = useState<number>(25000);
  const [originalPrice, setOriginalPrice] = useState<number>(30000);
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('Solid Wood');
  const [dimensions, setDimensions] = useState('72" x 36" x 30"');
  const [stock, setStock] = useState<number>(5);
  const [featured, setFeatured] = useState<boolean>(true);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const discount = originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const catName = CATEGORIES.find(c => c.id === category)?.name || 'Furniture';

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      category,
      categoryName: catName,
      description: description.trim(),
      longDescription: `${description.trim()} Handcrafted with premium joinery and inspected at our Saharanpur showroom.`,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercent: discount,
      images: [sofaImg],
      rating: 4.8,
      reviewsCount: 1,
      stock: Number(stock),
      inStock: Number(stock) > 0,
      colors: [
        { name: 'Natural Wood / Neutral', hex: '#8C5627' },
        { name: 'Dark Finish', hex: '#3E2714' }
      ],
      sizes: ['Standard Dimensions'],
      dimensions: dimensions.trim(),
      material: material.trim(),
      finish: 'Melamine Protective Satin Coat',
      featured,
      isNewArrival: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setProducts(prev => [newProd, ...prev]);
    setSuccessNotice(true);
    setName('');
    setDescription('');
    setTimeout(() => {
      setSuccessNotice(false);
      setActiveTab('catalog');
    }, 1500);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the local catalog?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `punjab_furnitures_catalog_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex justify-center items-start animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-[#E8E4DC] overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#1C1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h2 className="text-base font-bold font-display">
                Punjab Furnitures • Admin & Data Architecture
              </h2>
              <span className="text-[11px] text-stone-400">
                Manage live catalog, local persistence, or connect backend services
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 border-b border-[#E8E4DC] bg-[#FAF9F5] flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'catalog'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Catalog Inventory ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Furniture Item</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'architecture'
                ? 'border-[#78350F] text-[#78350F]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Backend & Payment Integration Guide
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: Catalog List */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  Products stored in state and synchronized to browser local storage.
                </span>
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E8E4DC] hover:border-stone-400 text-stone-800 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#78350F]" />
                  <span>Export JSON For Database</span>
                </button>
              </div>

              <div className="border border-[#E8E4DC] rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F5] border-b border-[#E8E4DC] text-stone-600 uppercase font-semibold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Product</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Price</th>
                      <th className="py-2.5 px-3">Stock</th>
                      <th className="py-2.5 px-3">Featured</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-[#FAF9F5]/60 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-stone-900">{p.name}</div>
                          <div className="text-[10px] text-stone-400 font-mono">{p.id}</div>
                        </td>
                        <td className="py-2.5 px-3 text-stone-600">{p.categoryName}</td>
                        <td className="py-2.5 px-3 font-mono font-medium text-stone-900">
                          {p.price > 0 ? `₹${p.price.toLocaleString('en-IN')}` : 'Enquiry'}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-stone-600">
                          {p.featured ? 'Yes ★' : 'No'}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1 text-stone-400 hover:text-rose-600 cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Add New Product */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="space-y-4">
              {successNotice && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Product successfully added to the catalog!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Modern Teak Armchair"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as CategoryId)}
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] bg-white focus:outline-none focus:border-[#78350F]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Selling Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Original Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Wood / Material
                  </label>
                  <input
                    type="text"
                    value={material}
                    onChange={e => setMaterial(e.target.value)}
                    placeholder="e.g. 100% Solid Seasoned Teak Wood"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={e => setDimensions(e.target.value)}
                    placeholder="e.g. 36W x 34D x 32H inches"
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Showroom Stock Units
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={e => setStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={e => setFeatured(e.target.checked)}
                      className="accent-[#78350F]"
                    />
                    <span>Showcase as Featured Piece on Homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe comfort, wood texture, joinery style, and ideal room placement..."
                  className="w-full text-xs p-2.5 rounded border border-[#E8E4DC] focus:outline-none focus:border-[#78350F]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#78350F] hover:bg-[#552509] text-white text-xs font-semibold rounded cursor-pointer"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Integration Blueprint & Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-xs text-stone-700">
              <div className="p-4 bg-[#FAF9F5] border border-[#E8E4DC] rounded-lg">
                <h3 className="text-sm font-bold text-stone-900 mb-2">
                  Database & Backend Integration Blueprint
                </h3>
                <p className="leading-relaxed mb-3">
                  The application is architected with a decoupled data layer (<code className="font-mono text-[11px] bg-stone-200 px-1 py-0.5 rounded">src/data/products.ts</code> and <code className="font-mono text-[11px] bg-stone-200 px-1 py-0.5 rounded">src/context/CartContext.tsx</code>). Connecting any cloud backend requires zero restructuring of components.
                </p>

                <div className="space-y-2 font-mono text-[11px] bg-[#1C1917] text-stone-200 p-3 rounded overflow-x-auto">
                  <div>// Step 1: Initialize Firestore or Supabase client in src/services/db.ts</div>
                  <div>// Step 2: Replace initial products state in CartContext with onSnapshot() or getDocs()</div>
                  <div>// Step 3: Orders collection receives structured CustomerOrderInfo + item payload</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                <h4 className="text-xs font-bold mb-1">Real Payment Gateway Integration (Razorpay / Stripe)</h4>
                <p className="text-[11px] leading-relaxed">
                  In <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">src/pages/CheckoutPage.tsx</code>, the payment method <code className="font-mono">online_gateway</code> is wired with clean form validation. Simply inject the Razorpay Checkout script and replace the temporary order generator with your merchant handler:
                </p>
                <div className="mt-2 font-mono text-[10px] bg-white p-2 rounded border border-emerald-300 text-stone-800">
                  {`const rzp = new window.Razorpay({ key: VITE_RAZORPAY_KEY, amount: cartTotal * 100, currency: 'INR', handler: (res) => handlePaymentSuccess(res) });`}
                </div>
              </div>

              <div className="p-4 bg-[#FAF2EB] border border-[#E8E4DC] rounded-lg">
                <h4 className="text-xs font-bold text-[#78350F] mb-1">Central Business Configuration</h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  All business information (phone, WhatsApp, closing time, address, ratings) lives centrally in <code className="font-mono font-bold text-stone-900">src/config/business.ts</code>. Changing that file updates the entire site synchronously.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF9F5] border-t border-[#E8E4DC] flex justify-between items-center text-xs">
          <span className="text-stone-500 font-mono">
            Punjab Furnitures • Production Build v1.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1C1917] text-white text-xs font-semibold rounded hover:bg-[#78350F] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
