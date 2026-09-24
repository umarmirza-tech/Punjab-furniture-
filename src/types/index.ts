export type CategoryId = 
  | 'sofas'
  | 'beds'
  | 'wardrobes'
  | 'dining-tables'
  | 'chairs'
  | 'tv-units'
  | 'coffee-tables'
  | 'office-furniture'
  | 'wooden-furniture'
  | 'custom-furniture';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  inStock: boolean;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  dimensions?: string;
  material?: string;
  finish?: string;
  featured?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
  paymentMethod: 'cod' | 'whatsapp' | 'online_gateway';
}

export type ActivePage = 
  | 'home'
  | 'shop'
  | 'categories'
  | 'about'
  | 'services'
  | 'reviews'
  | 'contact'
  | 'checkout'
  | 'wishlist'
  | 'tracking'
  | 'account';

export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Royal Teak';

export interface PurchaseRecord {
  orderId: string;
  date: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
  total: number;
  pointsEarned: number;
  status: 'Confirmed' | 'Crafting' | 'Dispatched' | 'Delivered';
  customerName: string;
  phone: string;
  paymentMethod: string;
  deliveryAddress?: string;
}

export interface LoyaltyRewardVoucher {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  couponCode: string;
  discountValue: number;
  type: 'voucher' | 'service' | 'gift';
}

export interface CustomerProfile {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  memberSince: string;
  favoriteStyle?: string;
}
