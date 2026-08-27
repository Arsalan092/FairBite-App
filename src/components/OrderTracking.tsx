import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Store, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Receipt
} from 'lucide-react';
import { motion } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';
import { OrderStatus } from '../types';

export const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, setShowTransparencyModal, showToast } = useGlobal();

  const order = orders.find(o => o.id === id) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F1E4] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif font-black text-2xl text-[#3B0A14] mb-2">Order Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-[#3B0A14] text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const stages: { key: OrderStatus; label: string; time: string; desc: string }[] = [
    { key: 'placed', label: 'Order Placed', time: order.time || '8:50 PM', desc: 'Received directly by kitchen POS' },
    { key: 'accepted', label: 'Accepted by Kitchen', time: '8:52 PM', desc: 'Chef confirmed recipe preparation' },
    { key: 'preparing', label: 'Cooking & Packaging', time: '8:58 PM', desc: 'Fresh ingredients on the fire' },
    { key: 'out_for_delivery', label: 'Out for Delivery', time: '9:12 PM', desc: 'Rider assigned with thermal bag' },
    { key: 'delivered', label: 'Delivered', time: '9:25 PM', desc: 'Handed over at your doorstep' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed': return 0;
      case 'accepted': return 1;
      case 'preparing': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(order.status);

  const simulateNextStep = () => {
    if (order.status === 'placed') updateOrderStatus(order.id, 'accepted');
    else if (order.status === 'accepted') updateOrderStatus(order.id, 'preparing');
    else if (order.status === 'preparing') updateOrderStatus(order.id, 'out_for_delivery');
    else if (order.status === 'out_for_delivery') updateOrderStatus(order.id, 'delivered');
  };

  return (
    <div className="min-h-screen bg-[#3B0A14] text-[#F8F1E4] pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#57182A]">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-center">
          <span className="text-[9px] text-[#C9A227] font-serif italic block">
            Direct Kitchen Tracker
          </span>
          <h2 className="font-serif font-black text-xl uppercase tracking-tight text-[#F8F1E4]">
            Order #{order.id}
          </h2>
        </div>

        <button
          onClick={simulateNextStep}
          className="bg-[#C9A227] text-[#3B0A14] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-[#E8C468] transition-colors cursor-pointer flex items-center gap-1.5 shadow"
          title="Demo: advance order status"
        >
          <RefreshCw size={12} />
          <span>Advance</span>
        </button>
      </div>

      {/* Main Curved Tracking Container */}
      <div className="max-w-2xl mx-auto bg-[#F8F1E4] rounded-t-3xl min-h-[85vh] p-6 sm:p-8 text-[#3B0A14] shadow-2xl border-t border-[#C9A227]/30">
        {/* Estimated Time Hero */}
        <div className="text-center pb-8 border-b border-[#3B0A14]/10">
          <div className="inline-block p-5 bg-white rounded-full border border-[#3B0A14]/15 shadow-inner mb-4">
            {order.status === 'delivered' ? (
              <CheckCircle2 size={40} className="text-[#3B8C5A]" />
            ) : (
              <Clock size={40} className="text-[#3B0A14] animate-pulse" />
            )}
          </div>

          <p className="text-[9px] font-black uppercase text-[#C9A227] tracking-widest mb-1">
            {order.status === 'delivered' ? 'Order Finalized' : 'Estimated Arrival'}
          </p>
          <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14] uppercase tracking-tight">
            {order.status === 'delivered' ? 'Delivered with Zero Markup' : order.estimatedTime || '25-35 Minutes'}
          </h3>
          <p className="text-xs text-[#6B5347] font-semibold mt-1">
            Directly from <strong className="text-[#3B0A14] font-bold">{order.restaurantName}</strong>
          </p>
        </div>

        {/* Live Step Progression Timeline */}
        <div className="my-8 relative pl-2 space-y-5">
          <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-[#3B0A14]/15" />

          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div key={stage.key} className="flex items-start gap-4 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isCompleted
                      ? 'bg-[#3B8C5A] border-[#3B8C5A] text-white shadow-sm'
                      : 'bg-white border-[#3B0A14]/20 text-[#6B5347]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="text-[10px] font-black">{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 bg-white p-4 rounded-2xl border border-[#3B0A14]/15 shadow-xs">
                  <div className="flex justify-between items-baseline">
                    <h4
                      className={`font-serif text-sm uppercase ${
                        isCurrent ? 'text-[#3B0A14] font-black' : isCompleted ? 'text-[#3B0A14] font-bold' : 'text-neutral-400 font-semibold'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <span className="text-[9px] font-mono text-[#6B5347]">{stage.time}</span>
                  </div>
                  <p className="text-xs text-[#6B5347] mt-0.5 font-medium">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rider Info Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#3B0A14]/15 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-serif font-black text-lg">
              <Truck size={20} />
            </div>

            <div className="flex-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347]">
                Dedicated Kitchen Rider
              </p>
              <h4 className="font-serif font-black text-base text-[#3B0A14]">
                {order.driverName || 'Ravi Shankar'}
              </h4>
              <p className="text-[10px] text-[#6B5347] font-semibold">
                Honda Activa (JH-05-AB-4412) • 4.9 ★ (1,240 Deliveries)
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${order.driverPhone || '+919431188762'}`}
                className="w-9 h-9 rounded-full bg-[#F8F1E4] text-[#3B0A14] hover:bg-[#C9A227] border border-[#3B0A14]/15 flex items-center justify-center transition-colors"
                title="Call Rider"
              >
                <Phone size={15} />
              </a>
              <button
                onClick={() => showToast(`SMS dispatch opened with rider ${order.driverName || 'Ravi Shankar'} (+91 94311 02931)`, 'info')}
                className="w-9 h-9 rounded-full bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] flex items-center justify-center transition-colors cursor-pointer"
                title="Message Rider"
              >
                <MessageSquare size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Order Receipt Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-[#3B0A14]/15 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#3B0A14]/10">
            <h4 className="font-serif font-black text-base uppercase text-[#3B0A14]">
              Receipt Summary
            </h4>
            <span className="text-[10px] font-mono text-[#6B5347] uppercase">
              {order.items.length} dishes
            </span>
          </div>

          <div className="space-y-2.5">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs font-medium">
                <span className="text-[#3B0A14]">
                  {item.quantity}× {item.name}
                </span>
                <span className="font-serif font-bold text-[#3B0A14]">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#3B0A14]/10 pt-3 space-y-1.5 text-xs text-[#6B5347]">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-serif">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Direct Rider Fee</span>
              <span className="font-serif">₹{order.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Taxes (5%)</span>
              <span className="font-serif">₹{order.taxes}</span>
            </div>
            <div className="flex justify-between font-black text-base text-[#3B0A14] pt-2 border-t border-[#3B0A14]/10">
              <span className="font-serif uppercase">Total Paid</span>
              <span className="font-serif text-lg">₹{order.total}</span>
            </div>
          </div>

          {/* Savings pill */}
          <div className="bg-[#3B8C5A]/10 border border-[#3B8C5A]/30 p-3 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#3B8C5A] font-bold uppercase tracking-wider text-[10px]">
              <ShieldCheck size={16} />
              <span>Platform Savings</span>
            </div>
            <span className="font-serif font-black text-[#3B8C5A]">
              +₹{order.platformMarkupSaved} Saved
            </span>
          </div>
        </div>

        {/* Home Action */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95 cursor-pointer"
          >
            <span>Back to Dining Directory</span>
            <ChevronRight size={16} className="text-[#C9A227]" />
          </button>
        </div>
      </div>
    </div>
  );
};
