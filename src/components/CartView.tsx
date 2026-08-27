import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  MapPin, 
  Store, 
  Minus, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Clock,
  Sparkles,
  CreditCard,
  Lock,
  Tag
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { PaymentMethodSelector, PaymentMethodType } from './PaymentMethodSelector';

export const CartView: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    placeOrder, 
    deliveryAddress, 
    setShowTransparencyModal,
    showToast
  } = useGlobal();

  const [cookingNotes, setCookingNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [upiId, setUpiId] = useState('arjun.sharma@okaxis');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  if (!cart.restaurant || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F1E4] flex flex-col items-center justify-center p-6 text-center text-[#3B0A14]">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[#C9A227] mb-6 shadow-md border border-[#3B0A14]/15">
          <ShoppingBag size={36} />
        </div>
        <span className="text-[#C9A227] font-serif italic text-sm mb-1 block">
          Empty Table
        </span>
        <h2 className="text-3xl font-serif font-black uppercase text-[#3B0A14] mb-2 tracking-tight">
          Your Bag is Empty
        </h2>
        <p className="text-xs text-[#6B5347] max-w-sm mb-8 leading-relaxed font-medium">
          Explore authentic menus from Jamshedpur's finest direct kitchens and enjoy delivery with exact dine-in pricing.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-transform active:scale-95 shadow-xl cursor-pointer"
        >
          Discover Kitchens
        </button>
      </div>
    );
  }

  const deliveryFee = 25;
  const taxes = Math.round(cart.subtotal * 0.05);
  const aggregatorEstimatedMarkup = Math.round(cart.subtotal * 0.25);
  const total = cart.subtotal + deliveryFee + taxes;

  const handleCheckout = () => {
    setIsPlacing(true);
    setTimeout(() => {
      const orderId = placeOrder(cookingNotes);
      setIsPlacing(false);
      navigate(`/track/${orderId}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F8F1E4] pb-36 text-[#3B0A14]">
      {/* Header */}
      <header className="bg-[#3B0A14] text-[#F8F1E4] px-6 py-5 border-b border-[#57182A] shadow-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <span className="text-[#C9A227] font-serif italic text-xs block leading-none mb-0.5">
                01. Finalize Order
              </span>
              <h1 className="font-serif font-black text-2xl uppercase tracking-tight text-[#F8F1E4]">
                Order Checkout
              </h1>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-[#E8C468] hover:text-white uppercase tracking-wider flex items-center gap-1 font-bold cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Clear Bag</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Delivery Location Card */}
        <div className="bg-white rounded-3xl p-5 border border-[#3B0A14]/15 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F8F1E4] text-[#C9A227] flex items-center justify-center shrink-0 border border-[#3B0A14]/10">
            <MapPin size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347]">
              Delivery Destination
            </p>
            <h4 className="font-serif font-bold text-sm text-[#3B0A14] mt-0.5">
              {deliveryAddress}
            </h4>
            <p className="text-[11px] text-[#3B8C5A] font-bold mt-1 flex items-center gap-1">
              <Clock size={12} /> Standard delivery in {cart.restaurant.deliveryTime}
            </p>
          </div>
        </div>

        {/* Restaurant Header & Ordered Items */}
        <div className="bg-white rounded-3xl p-6 border border-[#3B0A14]/15 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#3B0A14]/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-serif font-black text-sm">
                {cart.restaurant.name[0]}
              </div>
              <div>
                <h3 className="font-serif font-black text-lg uppercase text-[#3B0A14]">
                  {cart.restaurant.name}
                </h3>
                <p className="text-[10px] text-[#6B5347] font-semibold">{cart.restaurant.location}</p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/restaurant/${cart.restaurant?.id}`)}
              className="text-xs font-bold uppercase tracking-wider text-[#C9A227] hover:underline"
            >
              + Add Dishes
            </button>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-xs shrink-0 ${
                      item.veg ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  />
                  <span className="font-bold text-[#3B0A14] truncate">{item.name}</span>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {/* Quantity control */}
                  <div className="flex items-center gap-2 bg-[#F8F1E4] border border-[#3B0A14]/15 rounded-full px-2.5 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#3B0A14] hover:text-[#C9A227] cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-black text-xs w-4 text-center text-[#3B0A14]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(cart.restaurant!, item)}
                      className="text-[#3B0A14] hover:text-[#C9A227] cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <span className="font-serif font-black text-sm text-[#3B0A14] w-16 text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cooking Instructions Input */}
          <div className="mt-6 pt-4 border-t border-dashed border-[#3B0A14]/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B5347] mb-2">
              <FileText size={13} className="text-[#C9A227]" />
              <span>Special Kitchen / Delivery Notes</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Less spicy, include extra chutney, ring bell once..."
              value={cookingNotes}
              onChange={(e) => setCookingNotes(e.target.value)}
              className="w-full bg-[#F8F1E4]/60 border border-[#3B0A14]/15 rounded-full px-4 py-2.5 text-xs text-[#3B0A14] placeholder:text-[#6B5347]/60 focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
            />
          </div>
        </div>

        {/* Promo Voucher Bar */}
        <div className="bg-white rounded-3xl p-5 border border-[#3B0A14]/15 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-1">
              <div className="w-8 h-8 rounded-full bg-[#F8F1E4] text-[#C9A227] flex items-center justify-center shrink-0">
                <Tag size={15} />
              </div>
              <input
                type="text"
                placeholder="Enter Voucher (Try: FAIRJAMSHEDPUR)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="w-full bg-transparent text-xs font-mono font-bold uppercase tracking-wider text-[#3B0A14] placeholder:text-[#6B5347]/50 focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                if (promoCode === 'FAIRJAMSHEDPUR' || promoCode === 'ZEROCOMMISSION') {
                  setAppliedPromo(promoCode);
                  showToast(`Voucher ${promoCode} applied! Delivery fee waived.`, 'success');
                } else if (promoCode.trim()) {
                  showToast('Invalid code. Try "FAIRJAMSHEDPUR"', 'warning');
                }
              }}
              className="bg-[#3B0A14] text-[#C9A227] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#57182A] cursor-pointer"
            >
              {appliedPromo ? 'Applied' : 'Apply'}
            </button>
          </div>
          {appliedPromo && (
            <p className="text-[11px] text-[#3B8C5A] font-bold mt-2 flex items-center gap-1">
              <CheckCircle2 size={13} /> {appliedPromo} applied! ₹25 Delivery waived.
            </p>
          )}
        </div>

        {/* Interactive Payment Method Selector */}
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onSelectMethod={(m) => setPaymentMethod(m)}
          upiId={upiId}
          onChangeUpiId={(id) => setUpiId(id)}
          amount={appliedPromo ? (cart.subtotal + taxes) : total}
        />

        {/* The FairBite Price Transparency Card */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 rounded-3xl shadow-xl border border-[#57182A] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#C9A227]" size={20} />
              <h4 className="font-serif font-black text-base uppercase text-[#F8F1E4]">
                The FairBite Promise
              </h4>
            </div>
            <button
              onClick={() => setShowTransparencyModal(true)}
              className="text-[10px] text-[#C9A227] underline font-bold uppercase tracking-wider cursor-pointer"
            >
              How we do this
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-white/70">
              <span>Standard App Inflated Markup (+25%)</span>
              <span className="line-through text-neutral-300 font-bold">
                ₹{aggregatorEstimatedMarkup}
              </span>
            </div>
            <div className="flex justify-between items-center text-white/70">
              <span>Standard Platform Commission Cut</span>
              <span className="line-through text-neutral-300 font-bold">
                ₹{Math.round(cart.subtotal * 0.28)} (28%)
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#57182A]">
              <span className="font-bold uppercase tracking-wider text-[#C9A227]">FairBite Platform Fee</span>
              <span className="bg-[#3B8C5A] text-white text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                ₹0 (0% Commission)
              </span>
            </div>
          </div>
        </div>

        {/* Final Bill Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-[#3B0A14]/15 shadow-sm space-y-3">
          <h4 className="font-serif font-black text-base uppercase text-[#3B0A14] mb-2">
            Bill Summary
          </h4>

          <div className="flex justify-between text-xs text-[#6B5347]">
            <span>Item Subtotal (Dine-in exact)</span>
            <span className="font-bold text-[#3B0A14]">₹{cart.subtotal}</span>
          </div>

          <div className="flex justify-between text-xs text-[#6B5347]">
            <span>Direct Delivery Fee (Paid to rider)</span>
            <span className="font-bold text-[#3B0A14]">
              {appliedPromo ? <span className="line-through text-neutral-400">₹{deliveryFee}</span> : `₹${deliveryFee}`}
            </span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-xs text-[#3B8C5A] font-bold">
              <span>Voucher Discount ({appliedPromo})</span>
              <span>-₹{deliveryFee}</span>
            </div>
          )}

          <div className="flex justify-between text-xs text-[#6B5347]">
            <span>Govt. GST & Taxes (5%)</span>
            <span className="font-bold text-[#3B0A14]">₹{taxes}</span>
          </div>

          <div className="h-px bg-[#3B0A14]/10 my-2" />

          <div className="flex justify-between items-center">
            <div>
              <span className="font-serif font-black text-lg text-[#3B0A14]">
                Total Amount
              </span>
              <p className="text-[10px] text-[#3B8C5A] font-bold">
                You saved ~₹{aggregatorEstimatedMarkup + (appliedPromo ? 25 : 0)} on this order!
              </p>
            </div>
            <span className="font-serif font-black text-2xl text-[#3B0A14]">
              ₹{appliedPromo ? (cart.subtotal + taxes) : total}
            </span>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F8F1E4]/95 backdrop-blur-md p-4 sm:p-5 border-t border-[#3B0A14]/15 shadow-2xl z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase font-bold text-[#6B5347] tracking-widest">
              Total to Pay ({paymentMethod.toUpperCase()})
            </p>
            <p className="font-serif font-black text-2xl text-[#3B0A14]">
              ₹{appliedPromo ? (cart.subtotal + taxes) : total}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isPlacing}
            className="flex-1 sm:flex-initial sm:min-w-[280px] bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] py-4 px-8 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isPlacing ? (
              <span>Transmitting to Kitchen POS...</span>
            ) : (
              <>
                <span>Pay ₹{appliedPromo ? (cart.subtotal + taxes) : total} & Place Order</span>
                <ArrowRight size={16} className="text-[#C9A227]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
