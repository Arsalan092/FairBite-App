import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useGlobal();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold ${
              toast.type === 'warning'
                ? 'bg-amber-900 text-amber-100 border-amber-700'
                : toast.type === 'info'
                ? 'bg-[#57182A] text-[#F8F1E4] border-[#C9A227]/40'
                : 'bg-[#3B0A14] text-[#E8C468] border-[#C9A227]'
            }`}
          >
            {toast.type === 'warning' ? (
              <AlertTriangle size={16} className="text-amber-300 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info size={16} className="text-[#C9A227] shrink-0" />
            ) : (
              <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
            )}
            <span className="leading-snug">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
