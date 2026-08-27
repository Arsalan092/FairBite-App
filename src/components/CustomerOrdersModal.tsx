import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ArrowRight, 
  Store, 
  Receipt,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';
import { OrderStatus } from '../types';

interface CustomerOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerOrdersModal: React.FC<CustomerOrdersModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { orders } = useGlobal();

  if (!isOpen) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full animate-pulse">
            <Clock size={11} />
            <span>Order Placed</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 border border-blue-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
            <CheckCircle2 size={11} />
            <span>Kitchen Accepted</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 border border-purple-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping" />
            <span>Cooking in Kitchen</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
            <Truck size={11} />
            <span>Rider Out for Delivery</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 border border-neutral-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
            <CheckCircle2 size={11} className="text-green-600" />
            <span>Delivered</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#F8F1E4] text-[#3B0A14] w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-[#3B0A14]/20 overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Header */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] p-5 sm:p-6 flex items-center justify-between border-b-2 border-[#C9A227]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-bold">
                <Package size={20} />
              </div>
              <div>
                <h3 className="font-serif font-black text-xl text-[#F8F1E4] uppercase tracking-tight">
                  Your Orders & Live Tracking
                </h3>
                <p className="text-[10px] text-[#C9A227] font-bold uppercase tracking-widest">
                  Direct Kitchen Transparency • 0% Commission
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F1E4] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Orders List */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto text-[#C9A227] border border-[#3B0A14]/15">
                  <Receipt size={24} />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#3B0A14]">No Orders Placed Yet</h4>
                <p className="text-xs text-[#6B5347] max-w-xs mx-auto">
                  Browse restaurants in Jamshedpur and place your first order with 0% platform markup!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/');
                  }}
                  className="bg-[#3B0A14] text-[#F8F1E4] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#57182A] transition-colors"
                >
                  Explore Restaurants
                </button>
              </div>
            ) : (
              orders.map((order) => {
                const isActive = order.status !== 'delivered' && order.status !== 'cancelled';

                return (
                  <div
                    key={order.id}
                    className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                      isActive
                        ? 'border-2 border-[#C9A227] shadow-md ring-2 ring-[#C9A227]/20'
                        : 'border-[#3B0A14]/15 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-sm text-[#3B0A14]">
                            #{order.id}
                          </span>
                          <span className="text-[10px] text-[#6B5347] font-semibold">
                            • {order.date} ({order.time})
                          </span>
                        </div>
                        <h4 className="font-serif font-black text-base text-[#3B0A14] flex items-center gap-1.5 mt-0.5">
                          <Store size={15} className="text-[#C9A227]" />
                          <span>{order.restaurantName}</span>
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>

                    {/* Items preview */}
                    <div className="py-3 text-xs space-y-1.5 text-[#6B5347] border-b border-gray-100 font-medium">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>
                            {it.quantity}x {it.name}
                          </span>
                          <span className="font-mono text-[#3B0A14] font-semibold">
                            ₹{it.price * it.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / Tracking Action */}
                    <div className="pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6B5347] block">
                          Total Bill Paid:
                        </span>
                        <span className="font-serif font-black text-lg text-[#3B0A14]">
                          ₹{order.total}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          navigate(`/track/${order.id}`);
                        }}
                        className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow transition-all ${
                          isActive
                            ? 'bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] hover:scale-105'
                            : 'bg-[#F8F1E4] hover:bg-[#3B0A14] text-[#3B0A14] hover:text-white border border-[#3B0A14]/20'
                        }`}
                      >
                        <span>{isActive ? 'Track Live Order' : 'View Receipt'}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
