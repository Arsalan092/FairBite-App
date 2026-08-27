import React from 'react';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';

export const ConflictModal: React.FC = () => {
  const { conflictModal, resolveConflict, cart } = useGlobal();

  if (!conflictModal.isOpen || !conflictModal.newRestaurant) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-[28px] p-6 max-w-md w-full shadow-2xl border border-neutral-200 text-[#2A0D16]"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 mx-auto">
            <AlertCircle size={26} />
          </div>

          <h3 className="text-xl font-serif font-black text-center text-[#3B0A14] mb-2">
            Start New Order?
          </h3>
          <p className="text-xs text-[#6B5347] text-center leading-relaxed mb-6">
            Your cart contains items from <strong className="text-[#3B0A14]">{cart.restaurant?.name}</strong>. Would you like to clear the cart and add items from <strong className="text-[#3B0A14]">{conflictModal.newRestaurant.name}</strong> instead?
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => resolveConflict(false)}
              className="flex-1 py-3 rounded-xl text-xs font-bold border border-neutral-300 text-[#6B5347] hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Keep Current Cart
            </button>
            <button
              onClick={() => resolveConflict(true)}
              className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#3B0A14] text-white hover:bg-[#240610] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Switch & Add</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
