import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { FloatingActions } from './components/FloatingActions';
import { AdminProductManager } from './components/AdminProductManager';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';

const AppContent: React.FC = () => {
  const { activePage, setActivePage } = useCart();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'contact':
        return <ContactPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-stone-900 selection:bg-[#78350F] selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Showroom Footer */}
      <Footer />

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <ProductDetailsModal />
      <FloatingActions />
      <AdminProductManager isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
