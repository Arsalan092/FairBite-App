import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Utensils, 
  Bike, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: 'Starter' | 'Growth' | 'Premium';
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialPlan = 'Growth' 
}) => {
  const { addNewRestaurant, showToast } = useGlobal();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    phone: '',
    email: '',
    city: 'Jamshedpur',
    area: 'Bistupur',
    cuisine: 'North Indian & Mughlai',
    monthlyOrders: '200-500 orders/mo',
    fleetType: 'own-fleet',
    selectedPlan: initialPlan,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.restaurantName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Create new restaurant object and register on platform
      addNewRestaurant({
        name: formData.restaurantName.trim(),
        cuisine: formData.cuisine || 'North Indian & Mughlai',
        rating: 4.9,
        reviewCount: 1,
        deliveryTime: '20-30 min',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
        distance: '1.2 km',
        subscription: formData.selectedPlan as 'Starter' | 'Growth' | 'Premium',
        location: `${formData.area}, ${formData.city}`,
        address: `${formData.area}, ${formData.city}`,
        phone: formData.phone || '+91 98000 00000',
        featured: true,
        isOpen: true,
        monthlyRevenue: 0,
        commissionSaved: 0,
        joinedDate: new Date().toISOString().split('T')[0],
        menu: [
          {
            id: `m_${Date.now()}_1`,
            name: `${formData.restaurantName} Special Handi Biryani`,
            price: 290,
            description: 'Chef signature aromatic slow-cooked recipe with secret royal spices and raita.',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
            category: 'Main Course',
            veg: false,
            available: true,
            popular: true
          },
          {
            id: `m_${Date.now()}_2`,
            name: 'Paneer Makhani Butter Naan Combo',
            price: 240,
            description: 'Rich creamy tomato cottage cheese gravy served with 2 crispy butter tandoori naans.',
            image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
            category: 'Main Course',
            veg: true,
            available: true,
            popular: true
          },
          {
            id: `m_${Date.now()}_3`,
            name: 'Golden Crispy Starters Platter',
            price: 190,
            description: 'Crunchy golden appetizers with mint chutney, seasoned onions and spicy dip.',
            image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600',
            category: 'Starters',
            veg: true,
            available: true
          }
        ]
      });

      setIsSubmitting(false);
      setSubmitted(true);
      showToast(`"${formData.restaurantName}" has been successfully listed on FairBite!`, 'success');
    }, 600);
  };

  const handleClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B0A14]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#F8F1E4] text-[#3B0A14] w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#3B0A14]/20 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 sm:p-8 relative flex items-start justify-between border-b-2 border-[#C9A227]">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full tracking-widest mb-2">
              0% Commission Partner Onboarding
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-3xl leading-tight">
              List Your Restaurant on FairBite
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F1E4]/80 mt-1">
              Keep 100% of your food sales. Pay one flat monthly subscription.
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F1E4] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-[#3B8C5A]/15 text-[#3B8C5A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Application Submitted Successfully!
                </h3>
                <p className="text-sm text-[#6B5347] max-w-md mx-auto">
                  Thank you, <b>{formData.ownerName || 'Partner'}</b>! We have registered <b>{formData.restaurantName}</b> for our <b>{formData.selectedPlan} Plan (0% Commission)</b> in {formData.area}, {formData.city}.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#3B0A14]/15 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#6B5347]">Selected Plan:</span>
                  <span className="font-bold text-[#3B0A14]">{formData.selectedPlan} (Flat Monthly)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#6B5347]">Commission on Orders:</span>
                  <span className="font-bold text-[#3B8C5A]">₹0 (Zero Cut)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6B5347]">Next Step:</span>
                  <span className="font-bold text-[#3B0A14]">Our local team visits for menu digitisation</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Done & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-[#3B0A14]/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 1 ? 'bg-[#3B0A14] text-[#F8F1E4]' : 'bg-[#3B8C5A] text-white'
                  }`}>
                    {step > 1 ? '✓' : '1'}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">Restaurant Details</span>
                </div>
                <div className="w-12 h-0.5 bg-[#3B0A14]/15" />
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 2 ? 'bg-[#3B0A14] text-[#F8F1E4]' : 'bg-[#3B0A14]/20 text-[#3B0A14]'
                  }`}>
                    2
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider">Plan & Fleet</span>
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Restaurant Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Awadh Handi"
                        value={formData.restaurantName}
                        onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Owner / Manager Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98350 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="kitchen@restaurant.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Location / Area (Jamshedpur) *
                      </label>
                      <select
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      >
                        <option value="Bistupur">Bistupur</option>
                        <option value="Sakchi">Sakchi</option>
                        <option value="Kadma">Kadma</option>
                        <option value="Sonari">Sonari</option>
                        <option value="Telco">Telco</option>
                        <option value="Golmuri">Golmuri</option>
                        <option value="Adityapur">Adityapur</option>
                        <option value="Mango">Mango</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Primary Cuisine *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. North Indian, Biryani, Bakery"
                        value={formData.cuisine}
                        onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.restaurantName || !formData.ownerName || !formData.phone) {
                          showToast('Please fill in required fields (Name, Owner, Phone)', 'warning');
                          return;
                        }
                        setStep(2);
                      }}
                      className="bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <span>Continue to Plans</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-2">
                      Choose Your Flat Subscription Plan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { name: 'Starter', price: '₹999/mo', desc: 'Up to 150 orders/mo', badge: 'Single Outlet' },
                        { name: 'Growth', price: '₹2,499/mo', desc: 'Unlimited orders', badge: 'Most Popular' },
                        { name: 'Premium', price: '₹4,999/mo', desc: 'Multi-outlet + priority', badge: 'High Volume' },
                      ].map((p) => (
                        <div
                          key={p.name}
                          onClick={() => setFormData({ ...formData, selectedPlan: p.name as any })}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.selectedPlan === p.name
                              ? 'border-[#C9A227] bg-[#3B0A14] text-[#F8F1E4] shadow-md'
                              : 'border-[#3B0A14]/20 bg-white hover:border-[#3B0A14]'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-xs">{p.name}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                              formData.selectedPlan === p.name ? 'bg-[#C9A227] text-[#3B0A14]' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {p.badge}
                            </span>
                          </div>
                          <div className="font-serif font-black text-lg">{p.price}</div>
                          <div className={`text-[11px] mt-1 ${formData.selectedPlan === p.name ? 'text-[#F8F1E4]/80' : 'text-[#6B5347]'}`}>
                            {p.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Current Delivery Setup
                      </label>
                      <select
                        value={formData.fleetType}
                        onChange={(e) => setFormData({ ...formData, fleetType: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      >
                        <option value="own-fleet">We have our own delivery boys</option>
                        <option value="partial">We have 1-2 riders, need guidance</option>
                        <option value="none">No riders yet, want partner fleet network</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                        Estimated Daily Delivery Orders
                      </label>
                      <select
                        value={formData.monthlyOrders}
                        onChange={(e) => setFormData({ ...formData, monthlyOrders: e.target.value })}
                        className="w-full bg-white border border-[#3B0A14]/25 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      >
                        <option value="10-25">10 - 25 orders / day</option>
                        <option value="25-50">25 - 50 orders / day</option>
                        <option value="50-100">50 - 100 orders / day</option>
                        <option value="100+">100+ orders / day</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-[#C9A227]/15 p-4 rounded-2xl border border-[#C9A227]/40 flex items-start gap-3">
                    <ShieldCheck size={20} className="text-[#C9A227] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#3B0A14] leading-relaxed">
                      <b>The FairBite Promise</b>: 0% per-order commissions, direct customer settlements via UPI/Cash, and full ownership of your customer list. Cancel anytime with zero lock-in.
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold uppercase text-[#6B5347] hover:text-[#3B0A14] cursor-pointer"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <span>Submit Onboarding Application</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
