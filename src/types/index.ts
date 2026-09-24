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
  | 'tracking';
