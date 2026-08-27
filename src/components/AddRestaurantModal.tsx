import React, { useState } from 'react';
import { X, Store, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';
import { Restaurant } from '../types';

interface AddRestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRestaurantModal: React.FC<AddRestaurantModalProps> = ({ isOpen, onClose }) => {
  const { addNewRestaurant } = useGlobal();

  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [location, setLocation] = useState('Bistupur, Jamshedpur');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [subscription, setSubscription] = useState<'Starter' | 'Growth' | 'Premium'>('Growth');
  const [deliveryTime, setDeliveryTime] = useState('25-30 min');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !cuisine) return;

    const newRestaurant: Omit<Restaurant, 'id'> = {
      name,
      cuisine,
      rating: 4.8,
      reviewCount: 1,
      deliveryTime,
      image: image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      distance: '1.8 km',
      subscription,
      location,
      address: address || `${location}, Jamshedpur`,
      phone: phone || '+91 98000 00000',
      featured: true,
      isOpen: true,
      monthlyRevenue: 0,
      commissionSaved: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      menu: [
        {
          id: `m_${Date.now()}_1`,
          name: `${name} Signature Special`,
          price: 320,
          description: 'House specialty crafted with chef secret spices and authentic ingredients.',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
          category: 'Main Course',
          veg: false,
          available: true,
          popular: true
        },
        {
          id: `m_${Date.now()}_2`,
          name: 'Crispy Herbal Platter',
          price: 220,
          description: 'Crunchy golden appetizers served with homemade mint and tamarind dips.',
          image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600',
          category: 'Starters',
          veg: true,
          available: true
        }
      ]
    };

    addNewRestaurant(newRestaurant);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-neutral-200 text-[#2A0D16] my-8"
        >
          <div className="flex justify-between items-center pb-4 border-b border-neutral-100 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#3B0A14] text-[#E8C468] flex items-center justify-center font-bold">
                <Store size={18} />
              </div>
              <h3 className="font-serif font-black text-xl text-[#3B0A14]">
                Onboard Restaurant Partner
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#3B0A14] block mb-1">Restaurant / Brand Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Copper Chimney"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
              />
            </div>

            <div>
              <label className="font-bold text-[#3B0A14] block mb-1">Cuisines / Specialties *</label>
              <input
                type="text"
                required
                placeholder="e.g. Awadhi, Biryani, Mughlai"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#3B0A14] block mb-1">Neighborhood Area</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none"
                >
                  <option value="Bistupur, Jamshedpur">Bistupur</option>
                  <option value="Sakchi, Jamshedpur">Sakchi</option>
                  <option value="Sonari, Jamshedpur">Sonari</option>
                  <option value="Circuit House, Jamshedpur">Circuit House</option>
                  <option value="Kadma, Jamshedpur">Kadma</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#3B0A14] block mb-1">Subscription Tier</label>
                <select
                  value={subscription}
                  onChange={(e) => setSubscription(e.target.value as any)}
                  className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none"
                >
                  <option value="Starter">Starter (₹999/mo)</option>
                  <option value="Growth">Growth (₹2,499/mo)</option>
                  <option value="Premium">Premium (₹4,999/mo)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#3B0A14] block mb-1">Full Street Address</label>
              <input
                type="text"
                placeholder="Plot 10, Main Road, Bistupur"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#3B0A14] block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
                />
              </div>
              <div>
                <label className="font-bold text-[#3B0A14] block mb-1">Avg Delivery Time</label>
                <input
                  type="text"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full bg-[#F8F1E4] border border-neutral-300 rounded-xl p-2.5 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-neutral-300 text-[#6B5347] font-bold text-xs hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#3B0A14] text-[#F8F1E4] font-bold text-xs hover:bg-[#240610] transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Check size={14} className="text-[#C9A227]" />
                <span>Onboard Partner</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
