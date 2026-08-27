import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Search, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';

export const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { restaurants, cart, addToCart, removeFromCart, setShowTransparencyModal } = useGlobal();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-[#F8F1E4]">
        <h2 className="text-2xl font-serif font-black text-[#3B0A14] mb-3">Restaurant Not Found</h2>
        <p className="text-xs text-[#6B5347] mb-6">The requested kitchen is currently unavailable.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#3B0A14] text-white px-6 py-3 rounded-2xl text-xs font-bold"
        >
          Back to Kitchens
        </button>
      </div>
    );
  }

  // Categories extracted from menu
  const menuCategories = ['All', ...Array.from(new Set(restaurant.menu.map(m => m.category)))];

  const filteredMenu = restaurant.menu.filter(item => {
    if (vegOnly && !item.veg) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchItem && !item.name.toLowerCase().includes(searchItem.toLowerCase()) && !item.description.toLowerCase().includes(searchItem.toLowerCase())) return false;
    return true;
  });

  const totalCartCount = cart.items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="pb-36 min-h-screen bg-[#F8F1E4] text-[#3B0A14]">
      {/* Cover Image & Quick Back Navigation */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#3B0A14] border-b border-[#3B0A14]/20">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85 contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A14] via-black/40 to-black/60" />

        {/* Floating Top Buttons */}
        <div className="absolute top-6 left-4 right-4 max-w-7xl mx-auto flex justify-between items-center z-10">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-[#F8F1E4] hover:bg-white text-[#3B0A14] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border border-[#3B0A14]/20"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => setShowTransparencyModal(true)}
            className="bg-[#3B0A14]/90 backdrop-blur-xs text-[#C9A227] border border-[#C9A227]/40 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
          >
            <ShieldCheck size={15} className="text-[#C9A227]" />
            <span>0% Markup Verified</span>
          </button>
        </div>

        {/* Banner badges on cover */}
        <div className="absolute bottom-16 left-4 sm:left-8 flex flex-wrap items-center gap-2">
          <span className="bg-[#3B0A14] text-[#F8F1E4] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow flex items-center gap-1 border border-[#C9A227]/40">
            <Clock size={12} className="text-[#C9A227]" /> {restaurant.deliveryTime}
          </span>
          <span className="bg-[#C9A227] text-[#3B0A14] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
            {restaurant.subscription} Kitchen
          </span>
        </div>
      </div>

      {/* Main Info Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#3B0A14]/15">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-[#3B0A14]/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#C9A227] font-serif italic text-sm">
                  Direct Kitchen Partner
                </span>
                {restaurant.isOpen ? (
                  <span className="bg-green-100 text-green-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" /> Accepting Orders
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Currently Closed
                  </span>
                )}
              </div>
              <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14] uppercase tracking-tight">
                {restaurant.name}
              </h1>
              <p className="text-xs text-[#6B5347] font-semibold mt-1">
                {restaurant.cuisine}
              </p>
            </div>

            {/* Rating pill */}
            <div className="bg-[#F8F1E4] border border-[#3B0A14]/15 p-3 rounded-2xl flex sm:flex-col items-center gap-2 sm:gap-0.5 text-center shrink-0">
              <div className="flex items-center gap-1 text-[#3B0A14] font-serif font-black text-xl">
                <Star size={18} className="text-[#C9A227] fill-[#C9A227]" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="text-[9px] text-[#6B5347] font-bold uppercase tracking-wider">
                {restaurant.reviewCount} Reviews
              </span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="mt-4 pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B5347]">
            <div className="flex items-center gap-1.5 font-semibold">
              <MapPin size={14} className="text-[#C9A227] shrink-0" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <Phone size={14} className="text-[#C9A227] shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
          </div>

          {/* Transparency Callout inside header */}
          <div className="mt-5 bg-[#3B0A14] text-[#F8F1E4] p-4 rounded-2xl flex items-center justify-between gap-4 border border-[#57182A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-black">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-[#C9A227]">Zero Aggregator Tariff</p>
                <p className="text-[11px] text-[#F8F1E4]/90">
                  Every dish is priced exactly identically to dining in person at their Bistupur tables.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Controls & Filters */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search menu items */}
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3B0A14]/40" />
              <input
                type="text"
                placeholder="Search dish in kitchen menu..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="w-full bg-white border border-[#3B0A14]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#3B0A14] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              />
            </div>

            {/* Veg toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  vegOnly
                    ? 'bg-green-800 text-white border-green-800'
                    : 'bg-white text-[#6B5347] border-[#3B0A14]/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Veg Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-md'
                    : 'bg-white text-[#6B5347] border border-[#3B0A14]/15 hover:border-[#C9A227]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-serif font-black text-2xl uppercase text-[#3B0A14]">
              {selectedCategory === 'All' ? 'Complete Menu' : selectedCategory} ({filteredMenu.length})
            </h3>
          </div>

          {filteredMenu.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-[#3B0A14]/15">
              <p className="text-xs font-bold text-[#6B5347]">No menu items matching your filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenu.map((item) => {
                const cartItem = cart.restaurant?.id === restaurant.id 
                  ? cart.items.find(i => i.id === item.id) 
                  : undefined;
                const aggregatorSimulatedPrice = Math.round(item.price * 1.25);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-4 sm:p-5 border border-[#3B0A14]/15 shadow-sm flex gap-4 justify-between"
                  >
                    {/* Item Text Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-3.5 h-3.5 border-2 rounded-xs flex items-center justify-center ${
                              item.veg ? 'border-green-600' : 'border-red-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.veg ? 'bg-green-600' : 'bg-red-600'
                              }`}
                            />
                          </span>

                          {item.popular && (
                            <span className="bg-amber-100 text-amber-900 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                              Bestseller
                            </span>
                          )}

                          <span className="text-[10px] text-neutral-400 font-semibold">
                            {item.category}
                          </span>
                        </div>

                        <h4 className="font-serif font-black text-base sm:text-lg text-[#3B0A14] leading-snug">
                          {item.name}
                        </h4>

                        <p className="text-xs text-[#6B5347] line-clamp-2 mt-1 font-medium">
                          {item.description}
                        </p>
                      </div>

                      {/* Pricing with Transparency Callout */}
                      <div className="mt-3 pt-2 border-t border-[#3B0A14]/10">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif font-black text-xl text-[#3B0A14]">
                            ₹{item.price}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-[#3B8C5A] font-black bg-[#3B8C5A]/10 px-2 py-0.5 rounded-full">
                            Dine-in Direct
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          Other apps: <span className="line-through">₹{aggregatorSimulatedPrice}</span>
                        </p>
                      </div>
                    </div>

                    {/* Image & Add Button */}
                    <div className="flex flex-col items-center justify-between shrink-0 w-28 sm:w-32">
                      <div className="relative w-28 sm:w-32 h-24 rounded-2xl overflow-hidden shadow-inner bg-[#3B0A14]">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover contrast-[105%]"
                        />
                      </div>

                      {/* Quantity Controller / Add button */}
                      <div className="w-full mt-2">
                        {cartItem ? (
                          <div className="flex items-center justify-between bg-[#3B0A14] text-white rounded-full p-1 shadow-md">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="text-xs font-black text-[#C9A227]">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(restaurant, item)}
                              className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(restaurant, item)}
                            className="w-full bg-[#F8F1E4] hover:bg-[#3B0A14] hover:text-[#F8F1E4] text-[#3B0A14] py-2 rounded-full text-xs font-black uppercase tracking-wider border border-[#3B0A14]/20 shadow-xs transition-colors cursor-pointer"
                          >
                            Add +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {totalCartCount > 0 && cart.restaurant && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-40"
          >
            <div
              onClick={() => navigate('/cart')}
              className="bg-[#3B0A14] text-[#F8F1E4] p-4 rounded-3xl shadow-2xl flex items-center justify-between border-2 border-[#C9A227] cursor-pointer hover:bg-[#240610] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-black text-sm">
                  {totalCartCount}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#E8C468]">
                    {cart.restaurant.name}
                  </p>
                  <p className="font-serif font-black text-lg">
                    ₹{cart.subtotal}{' '}
                    <span className="text-[10px] font-normal text-white/70">
                      (0% Markup)
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#C9A227] text-[#3B0A14] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow">
                <span>Go to Checkout</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
