import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Award, 
  Package, 
  User, 
  Sparkles, 
  Gift, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Flame,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';
import { PurchaseRecord, CustomerProfile, LoyaltyRewardVoucher } from '../types';

const INITIAL_PROFILE: CustomerProfile = {
  fullName: 'Vikram Sharma',
  phone: '98765 43210',
  email: 'vikram.sharma@example.com',
  address: 'Court Road, Near Civil Lines',
  city: 'Saharanpur',
  state: 'Uttar Pradesh',
  pincode: '247001',
  memberSince: 'Oct 2023',
  favoriteStyle: 'Solid Sheesham & Teak Wood'
};

const DEFAULT_ORDERS: PurchaseRecord[] = [
  {
    orderId: 'PF-928104',
    date: '18 Sep 2024',
    items: [
      {
        productId: 'dining-1',
        productName: 'Royal Solid Sheesham 6-Seater Dining Table Set',
        quantity: 1,
        price: 42500,
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80'
      }
    ],
    total: 42500,
    pointsEarned: 425,
    status: 'Delivered',
    customerName: 'Vikram Sharma',
    phone: '98765 43210',
    paymentMethod: 'Showroom WhatsApp Order',
    deliveryAddress: 'Court Road, Saharanpur, UP - 247001'
  },
  {
    orderId: 'PF-841923',
    date: '02 Jun 2024',
    items: [
      {
        productId: 'sofa-1',
        productName: 'Maharaja Handcrafted Teak Wood 3+1+1 Sofa Set',
        quantity: 1,
        price: 58000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
      },
      {
        productId: 'coffee-1',
        productName: 'Artisan Carved Sheesham Coffee Table',
        quantity: 1,
        price: 9500,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80'
      }
    ],
    total: 67500,
    pointsEarned: 675,
    status: 'Delivered',
    customerName: 'Vikram Sharma',
    phone: '98765 43210',
    paymentMethod: 'Showroom Advance & Delivery',
    deliveryAddress: 'Court Road, Saharanpur, UP - 247001'
  }
];

const AVAILABLE_VOUCHERS: LoyaltyRewardVoucher[] = [
  {
    id: 'voucher-500',
    title: '₹500 Showroom Discount',
    description: 'Valid on any furniture order above ₹15,000 at showroom or website.',
    pointsCost: 500,
    couponCode: 'PUNJAB500',
    discountValue: 500,
    type: 'voucher'
  },
  {
    id: 'voucher-1200',
    title: '₹1,200 Luxury Living Discount',
    description: 'Valid on living room sofas, wardrobes, and bedroom sets.',
    pointsCost: 1000,
    couponCode: 'VIRASAT1200',
    discountValue: 1200,
    type: 'voucher'
  },
  {
    id: 'voucher-polish',
    title: 'Wood Polish & Care Kit',
    description: 'Complimentary natural beeswax & teak polish kit with your next order.',
    pointsCost: 350,
    couponCode: 'WOODCARE',
    discountValue: 350,
    type: 'gift'
  },
  {
    id: 'voucher-whiteglove',
    title: 'Free White-Glove Installation',
    description: 'Free room placement and assembly service across Khatta Kheri & nearby areas.',
    pointsCost: 300,
    couponCode: 'FREESETUP',
    discountValue: 300,
    type: 'service'
  }
];

export const AccountPage: React.FC = () => {
  const { setActivePage } = useCart();
  const [activeTab, setActiveTab] = useState<'loyalty' | 'orders' | 'profile' | 'benefits'>('loyalty');

  // Customer Profile State
  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const stored = localStorage.getItem('punjab_furnitures_customer_profile');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState<CustomerProfile>(profile);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<PurchaseRecord[]>(() => {
    try {
      const stored = localStorage.getItem('punjab_furnitures_account_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_ORDERS;
  });

  // Points State (starts with Welcome Bonus 500 + earned points from orders)
  const [points, setPoints] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('punjab_furnitures_loyalty_points');
      if (stored) return parseInt(stored, 10);
    } catch {
      // fallback
    }
    // Calculate 500 welcome bonus + 1 point per 100 spent on default orders
    const initialSum = DEFAULT_ORDERS.reduce((acc, curr) => acc + (curr.pointsEarned || 0), 500);
    return initialSum;
  });

  // Redeemed Vouchers State
  const [redeemedVouchers, setRedeemedVouchers] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('punjab_furnitures_redeemed_vouchers');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['PUNJAB500'];
  });

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [redeemSuccessMsg, setRedeemSuccessMsg] = useState<string | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<PurchaseRecord | null>(null);

  // Calculate Tier
  const getTier = (pts: number) => {
    if (pts >= 3500) return { name: 'Royal Teak Club', next: null, target: 3500, color: 'text-amber-300', bg: 'from-[#2A231C] to-[#120F0D]' };
    if (pts >= 1800) return { name: 'Gold Patron', next: 'Royal Teak Club', target: 3500, color: 'text-[#E5C158]', bg: 'from-[#251F19] to-[#191512]' };
    if (pts >= 700) return { name: 'Silver Member', next: 'Gold Patron', target: 1800, color: 'text-stone-200', bg: 'from-[#24211E] to-[#171412]' };
    return { name: 'Bronze Member', next: 'Silver Member', target: 700, color: 'text-[#D79A63]', bg: 'from-[#28221D] to-[#161311]' };
  };

  const currentTier = getTier(points);

  // Handle Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileFormData);
    try {
      localStorage.setItem('punjab_furnitures_customer_profile', JSON.stringify(profileFormData));
    } catch {
      // ignore
    }
    setIsEditingProfile(false);
    setProfileSaveSuccess(true);
    setTimeout(() => setProfileSaveSuccess(false), 3000);
  };

  // Handle Voucher Redemption
  const handleRedeem = (voucher: LoyaltyRewardVoucher) => {
    if (points < voucher.pointsCost) {
      alert(`You need ${voucher.pointsCost} points to redeem this voucher. Your current balance is ${points} points.`);
      return;
    }

    const newPoints = points - voucher.pointsCost;
    setPoints(newPoints);
    const updatedVouchers = Array.from(new Set([...redeemedVouchers, voucher.couponCode]));
    setRedeemedVouchers(updatedVouchers);

    try {
      localStorage.setItem('punjab_furnitures_loyalty_points', newPoints.toString());
      localStorage.setItem('punjab_furnitures_redeemed_vouchers', JSON.stringify(updatedVouchers));
    } catch {
      // ignore
    }

    setRedeemSuccessMsg(`Successfully redeemed! Code ${voucher.couponCode} is now active.`);
    setTimeout(() => setRedeemSuccessMsg(null), 4000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <button onClick={() => setActivePage('home')} className="hover:text-stone-900 transition-colors">
                Home
              </button>
              <span>/</span>
              <span className="text-stone-800 font-medium">Customer Account & Loyalty</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1C1917]">
              Punjab Privilege Club
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Track purchase history, claim rewards points, and access bespoke showroom privileges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello Punjab Furnitures, I am ${profile.fullName} (Privilege Club Member: ${currentTier.name}). I would like to inquire about my reward points balance (${points} pts) and showroom offers.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white px-4 py-2.5 rounded-md text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Loyalty Desk WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Top VIP Membership Card Banner */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${currentTier.bg} text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-stone-800 mb-8`}>
          {/* Subtle wood texture & ambient glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-[#78350F]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Card Left: Member Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  {currentTier.name}
                </span>
                <span className="text-xs text-stone-400">
                  Member ID: <strong className="text-stone-200 font-mono">PF-M-94812</strong>
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                  {profile.fullName}
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">
                  Member of Punjab Furnitures Privilege Family since {profile.memberSince} • Saharanpur Showroom
                </p>
              </div>

              {/* Tier Progress Bar */}
              <div className="pt-2 max-w-lg">
                <div className="flex justify-between text-xs text-stone-300 mb-1.5">
                  <span>Current Tier: <strong className="text-white">{currentTier.name}</strong></span>
                  {currentTier.next ? (
                    <span className="text-[#C5A880]">
                      {currentTier.target - points} pts to unlock {currentTier.next}
                    </span>
                  ) : (
                    <span className="text-amber-300 font-medium">★ Highest VIP Tier Achieved</span>
                  )}
                </div>
                <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden border border-stone-700">
                  <div
                    className="bg-gradient-to-r from-[#C5A880] to-[#E5C158] h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.round((points / currentTier.target) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                  Earn 1 Point for every ₹100 spent on solid wood & modern furniture. 1 Point = ₹1 redeemable.
                </p>
              </div>
            </div>

            {/* Card Right: Points Balance Box */}
            <div className="bg-black/35 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-wider mb-1">
                  <span>Available Balance</span>
                  <Award className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-[#E5C158] tabular-nums">
                    {points.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-stone-300 font-medium uppercase tracking-wider">
                    Points
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Estimated value: <strong className="text-white">₹{points.toLocaleString('en-IN')}</strong> on future showroom orders
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => setActiveTab('loyalty')}
                  className="flex-1 py-2 px-3 bg-[#C5A880] hover:bg-[#B3956B] text-[#1C1917] font-semibold text-xs rounded transition-colors text-center cursor-pointer"
                >
                  Redeem Rewards
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs rounded transition-colors cursor-pointer"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 gap-2 sm:gap-6 mb-8 overflow-x-auto pb-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`pb-3 px-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'loyalty'
                ? 'border-b-2 border-[#78350F] text-[#78350F] font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Loyalty Rewards & Vouchers</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#78350F] text-[#78350F] font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Purchase History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('benefits')}
            className={`pb-3 px-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'benefits'
                ? 'border-b-2 border-[#78350F] text-[#78350F] font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Showroom Privileges</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-2 flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#78350F] text-[#78350F] font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Delivery Profile & Address</span>
          </button>
        </div>

        {/* TAB 1: LOYALTY PROGRAM & REWARDS */}
        {activeTab === 'loyalty' && (
          <div className="space-y-10">
            {redeemSuccessMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{redeemSuccessMsg}</span>
              </div>
            )}

            {/* Section 1: How Points Work */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#78350F] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">1. Shop & Earn 1% Back</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Earn 1 reward point for every ₹100 spent across all furniture categories. Points are credited automatically upon order confirmation.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#78350F] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">2. Review & Referral Bonuses</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Earn 150 bonus points when you leave a Google review, and 250 points when a friend in Saharanpur orders using your reference.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#78350F] flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900">3. Instant Checkout Vouchers</h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Convert points into direct discount voucher codes or complimentary wood-care services at checkout or at the showroom counter.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Active Redeemed Vouchers */}
            {redeemedVouchers.length > 0 && (
              <div className="bg-[#FAF7F2] border border-[#E8E2D5] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#78350F] flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <span>My Active Discount Coupons ({redeemedVouchers.length})</span>
                  </h3>
                  <span className="text-xs text-stone-500">Apply these at checkout for instant deduction</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {redeemedVouchers.map(code => {
                    const match = AVAILABLE_VOUCHERS.find(v => v.couponCode === code);
                    return (
                      <div key={code} className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm flex items-center justify-between gap-3">
                        <div>
                          <div className="font-mono font-bold text-sm text-[#78350F] tracking-wider">
                            {code}
                          </div>
                          <div className="text-xs text-stone-600 mt-0.5">
                            {match ? match.title : 'Loyalty Reward Voucher'}
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyCode(code)}
                          className="px-3 py-1.5 bg-[#FAF9F5] hover:bg-[#F2EFE8] border border-stone-300 text-stone-800 text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedCode === code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-stone-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Section 3: Rewards Catalog */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-[#1C1917]">
                    Redeem Points for Exclusive Vouchers
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Select a voucher below to unlock your discount code.
                  </p>
                </div>
                <div className="text-xs text-stone-500">
                  Your Balance: <strong className="text-stone-900 font-semibold">{points} Points</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {AVAILABLE_VOUCHERS.map(voucher => {
                  const isRedeemed = redeemedVouchers.includes(voucher.couponCode);
                  const canAfford = points >= voucher.pointsCost;

                  return (
                    <div
                      key={voucher.id}
                      className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-[#78350F] border border-amber-100">
                            {voucher.pointsCost} Points
                          </span>
                          {isRedeemed && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              Active
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-semibold text-stone-900 text-sm">
                            {voucher.title}
                          </h4>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                            {voucher.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-stone-100">
                        {isRedeemed ? (
                          <button
                            onClick={() => handleCopyCode(voucher.couponCode)}
                            className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Active Code: {voucher.couponCode}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRedeem(voucher)}
                            disabled={!canAfford}
                            className={`w-full py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
                              canAfford
                                ? 'bg-[#78350F] hover:bg-[#5E290B] text-white shadow-sm'
                                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            {canAfford ? `Redeem (${voucher.pointsCost} pts)` : `Need ${voucher.pointsCost - points} more pts`}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action: Shop Now */}
            <div className="bg-gradient-to-r from-[#1C1917] to-[#2E2823] text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-display font-bold">
                  Ready to add to your home collection?
                </h3>
                <p className="text-xs text-stone-300 max-w-xl">
                  Explore our solid Sheesham beds, luxury sofa sets, and custom dining tables crafted in Saharanpur. Every purchase adds to your points.
                </p>
              </div>
              <button
                onClick={() => setActivePage('shop')}
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#B3956B] text-[#1C1917] font-semibold text-xs rounded-md shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                Browse Furniture Catalog
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PURCHASE HISTORY */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-display font-bold text-[#1C1917]">
                  Order & Purchase History
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  View past showroom invoices, tracking status, and reward points credited for each order.
                </p>
              </div>

              <button
                onClick={() => setActivePage('shop')}
                className="px-4 py-2 bg-[#78350F] text-white text-xs font-semibold rounded hover:bg-[#5E290B] transition-colors cursor-pointer"
              >
                Start New Order
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-stone-900">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Your purchase history will automatically appear here once you place an order on our website or at the Saharanpur showroom.
                </p>
                <button
                  onClick={() => setActivePage('shop')}
                  className="mt-4 px-5 py-2.5 bg-[#78350F] text-white text-xs font-semibold rounded hover:bg-[#5E290B] transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:border-stone-300 transition-colors"
                  >
                    {/* Order Header */}
                    <div className="bg-stone-50 px-5 py-3.5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Order ID</span>
                          <span className="font-mono font-bold text-stone-900">{order.orderId}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Date</span>
                          <span className="text-stone-800 font-medium">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Points Credited</span>
                          <span className="text-[#78350F] font-bold">+{order.pointsEarned} Pts</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block text-[10px] uppercase">Total Amount</span>
                          <span className="text-stone-900 font-bold">₹{order.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </span>

                        <button
                          onClick={() => setSelectedReceiptOrder(order)}
                          className="text-xs text-[#78350F] hover:underline font-medium cursor-pointer flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-5 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.productName}
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-md border border-stone-200 shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-stone-900 truncate">
                              {item.productName}
                            </h4>
                            <p className="text-xs text-stone-500 mt-0.5">
                              Qty: {item.quantity} • Unit Price: ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-stone-900">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Delivery address & WhatsApp check */}
                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
                        <div>
                          <span>Delivery Address: </span>
                          <strong className="text-stone-800">{order.deliveryAddress || 'Saharanpur Showroom Pickup / Home Delivery'}</strong>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActivePage('tracking');
                            }}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium transition-colors cursor-pointer"
                          >
                            Live Tracking
                          </button>

                          <a
                            href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello Punjab Furnitures, I am checking the status of my order #${order.orderId} for ₹${order.total.toLocaleString('en-IN')}. Please provide the latest update.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20BE5A] text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Status</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHOWROOM PRIVILEGES */}
        {activeTab === 'benefits' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-display font-bold text-[#1C1917]">
                Privilege Club Tier Privileges
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Every tier unlocks deeper discounts, master craftsmanship consultations, and priority delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Bronze */}
              <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative">
                <span className="text-xs font-bold text-[#D79A63] uppercase tracking-wider block mb-1">
                  Bronze Member
                </span>
                <div className="text-lg font-display font-bold text-stone-900 mb-3">
                  0 - 699 Points
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>1 Point for every ₹100 spent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>WhatsApp order tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Standard showroom warranty</span>
                  </li>
                </ul>
              </div>

              {/* Silver */}
              <div className="bg-white p-6 rounded-xl border-2 border-stone-400 shadow-sm relative">
                <div className="absolute top-3 right-3 bg-stone-100 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Current Tier
                </div>
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                  Silver Member
                </span>
                <div className="text-lg font-display font-bold text-stone-900 mb-3">
                  700 - 1,799 Points
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>All Bronze privileges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free White-Glove Saharanpur delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Complimentary annual wood polish kit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Priority seasonal festival delivery</span>
                  </li>
                </ul>
              </div>

              {/* Gold */}
              <div className="bg-white p-6 rounded-xl border-2 border-[#E5C158] shadow-sm relative">
                <span className="text-xs font-bold text-[#78350F] uppercase tracking-wider block mb-1">
                  Gold Patron
                </span>
                <div className="text-lg font-display font-bold text-stone-900 mb-3">
                  1,800 - 3,499 Points
                </div>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>All Silver privileges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>1.25x Points multiplier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free room assembly & packaging removal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct phone line to showroom director</span>
                  </li>
                </ul>
              </div>

              {/* Royal Teak */}
              <div className="bg-gradient-to-br from-[#1C1917] to-[#2E2823] text-white p-6 rounded-xl border border-stone-800 shadow-md relative">
                <span className="text-xs font-bold text-[#C5A880] uppercase tracking-wider block mb-1">
                  Royal Teak Club
                </span>
                <div className="text-lg font-display font-bold text-white mb-3">
                  3,500+ Points
                </div>
                <ul className="space-y-2 text-xs text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>1.5x Points multiplier</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>1-on-1 Bespoke Woodcraftsman consultation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>Lifetime wood termite protection guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>Exclusive VIP private showroom viewings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE & ADDRESS */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <div>
                <h2 className="text-lg font-display font-bold text-stone-900">
                  Customer Profile & Default Delivery Address
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Saved info will auto-populate your future furniture orders and WhatsApp receipts.
                </p>
              </div>

              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded transition-colors cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {profileSaveSuccess && (
              <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details saved successfully.</span>
              </div>
            )}

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.fullName}
                      onChange={e => setProfileFormData({ ...profileFormData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Mobile / WhatsApp Number</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.phone}
                      onChange={e => setProfileFormData({ ...profileFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileFormData.email}
                      onChange={e => setProfileFormData({ ...profileFormData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Preferred Furniture Style</label>
                    <input
                      type="text"
                      value={profileFormData.favoriteStyle || ''}
                      onChange={e => setProfileFormData({ ...profileFormData, favoriteStyle: e.target.value })}
                      placeholder="e.g. Solid Sheesham, Teak, Modern Luxury"
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Street Address / Landmark</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.address}
                    onChange={e => setProfileFormData({ ...profileFormData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.city}
                      onChange={e => setProfileFormData({ ...profileFormData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.state}
                      onChange={e => setProfileFormData({ ...profileFormData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.pincode}
                      onChange={e => setProfileFormData({ ...profileFormData, pincode: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded focus:border-[#78350F] focus:outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#78350F] text-white font-semibold rounded hover:bg-[#5E290B] transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileFormData(profile);
                      setIsEditingProfile(false);
                    }}
                    className="px-4 py-2.5 bg-stone-100 text-stone-700 font-medium rounded hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-500 block text-[10px] uppercase">Full Name</span>
                    <span className="font-semibold text-stone-900 text-sm">{profile.fullName}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-500 block text-[10px] uppercase">Phone / WhatsApp</span>
                    <span className="font-semibold text-stone-900 font-mono text-sm">{profile.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-500 block text-[10px] uppercase">Email</span>
                    <span className="text-stone-900">{profile.email || 'Not specified'}</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <span className="text-stone-500 block text-[10px] uppercase">Preferred Style</span>
                    <span className="text-stone-900">{profile.favoriteStyle || 'Solid Wood & Handcrafted'}</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg">
                  <span className="text-stone-500 block text-[10px] uppercase">Default Showroom Delivery Address</span>
                  <p className="text-stone-900 font-medium mt-1 leading-relaxed">
                    {profile.address}, {profile.city}, {profile.state} - {profile.pincode}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Showroom Receipt Modal */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="text-base font-display font-bold uppercase tracking-tight text-[#1C1917]">
                  Punjab Furnitures Showroom Receipt
                </h3>
                <p className="text-[11px] text-stone-500">
                  Saharanpur • Est. Quality • GST Invoice Copy
                </p>
              </div>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="text-stone-400 hover:text-stone-800 text-lg cursor-pointer font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Receipt Number:</span>
                <span className="font-mono font-bold text-stone-900">{selectedReceiptOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Date:</span>
                <span>{selectedReceiptOrder.date}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Customer:</span>
                <span className="font-semibold text-stone-900">{selectedReceiptOrder.customerName}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Payment Method:</span>
                <span>{selectedReceiptOrder.paymentMethod}</span>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-2">
                  Items Purchased
                </span>
                <div className="space-y-2">
                  {selectedReceiptOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-stone-800">
                      <span>{item.productName} × {item.quantity}</span>
                      <span className="font-mono font-semibold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                <span>Total Amount:</span>
                <span className="text-[#78350F]">₹{selectedReceiptOrder.total.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-amber-50 p-2.5 rounded text-[11px] text-amber-900 border border-amber-200 flex items-center justify-between">
                <span>Privilege Points Credited:</span>
                <strong className="font-bold">+{selectedReceiptOrder.pointsEarned} Points</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex gap-2">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Hello Punjab Furnitures, I am requesting a PDF copy of my receipt for order #${selectedReceiptOrder.orderId}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-[#25D366] text-white text-xs font-semibold rounded text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Request Official PDF on WhatsApp</span>
              </a>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="py-2 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
