import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Smartphone,
  Info
} from 'lucide-react';

export type PaymentMethodType = 'upi' | 'card' | 'cod' | 'netbanking';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
  upiId: string;
  onChangeUpiId: (id: string) => void;
  amount: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  upiId,
  onChangeUpiId,
  amount
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#3B0A14]/15 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#3B0A14]/10">
        <div>
          <span className="text-[10px] font-black uppercase text-[#C9A227] tracking-widest font-mono block">
            Step 02 • Payment Method
          </span>
          <h4 className="font-serif font-black text-lg uppercase text-[#3B0A14]">
            Select Secure Checkout
          </h4>
        </div>

        <div className="flex items-center gap-1 text-[10px] font-bold text-[#3B8C5A] bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
          <Lock size={12} />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* Payment Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* UPI Option */}
        <button
          type="button"
          onClick={() => onSelectMethod('upi')}
          className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMethod === 'upi'
              ? 'border-[#3B0A14] bg-[#F8F1E4] shadow-xs'
              : 'border-[#3B0A14]/15 bg-white hover:border-[#C9A227]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Smartphone size={16} />
              </div>
              <div>
                <span className="font-serif font-black text-sm text-[#3B0A14] block">
                  UPI / QR Code
                </span>
                <span className="text-[10px] text-[#6B5347] font-medium">
                  GPay, PhonePe, Paytm
                </span>
              </div>
            </div>
            {selectedMethod === 'upi' && <CheckCircle2 size={18} className="text-[#3B8C5A]" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#3B8C5A] mt-2 block">
            Instant 0% Markup Verification
          </span>
        </button>

        {/* Cash On Delivery Option */}
        <button
          type="button"
          onClick={() => onSelectMethod('cod')}
          className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMethod === 'cod'
              ? 'border-[#3B0A14] bg-[#F8F1E4] shadow-xs'
              : 'border-[#3B0A14]/15 bg-white hover:border-[#C9A227]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Wallet size={16} />
              </div>
              <div>
                <span className="font-serif font-black text-sm text-[#3B0A14] block">
                  Cash on Delivery
                </span>
                <span className="text-[10px] text-[#6B5347] font-medium">
                  Pay cash or QR to rider
                </span>
              </div>
            </div>
            {selectedMethod === 'cod' && <CheckCircle2 size={18} className="text-[#3B8C5A]" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B5347] mt-2 block">
            Direct Handover at Doorstep
          </span>
        </button>

        {/* Credit / Debit Card */}
        <button
          type="button"
          onClick={() => onSelectMethod('card')}
          className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMethod === 'card'
              ? 'border-[#3B0A14] bg-[#F8F1E4] shadow-xs'
              : 'border-[#3B0A14]/15 bg-white hover:border-[#C9A227]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <CreditCard size={16} />
              </div>
              <div>
                <span className="font-serif font-black text-sm text-[#3B0A14] block">
                  Credit / Debit Card
                </span>
                <span className="text-[10px] text-[#6B5347] font-medium">
                  Visa, Mastercard, RuPay
                </span>
              </div>
            </div>
            {selectedMethod === 'card' && <CheckCircle2 size={18} className="text-[#3B8C5A]" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B5347] mt-2 block">
            Standard Bank Gateways
          </span>
        </button>

        {/* Net Banking */}
        <button
          type="button"
          onClick={() => onSelectMethod('netbanking')}
          className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
            selectedMethod === 'netbanking'
              ? 'border-[#3B0A14] bg-[#F8F1E4] shadow-xs'
              : 'border-[#3B0A14]/15 bg-white hover:border-[#C9A227]'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Building size={16} />
              </div>
              <div>
                <span className="font-serif font-black text-sm text-[#3B0A14] block">
                  Net Banking
                </span>
                <span className="text-[10px] text-[#6B5347] font-medium">
                  HDFC, ICICI, SBI, Axis
                </span>
              </div>
            </div>
            {selectedMethod === 'netbanking' && <CheckCircle2 size={18} className="text-[#3B8C5A]" />}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B5347] mt-2 block">
            Direct Bank Transfer
          </span>
        </button>
      </div>

      {/* Dynamic Input Details for Selected Method */}
      {selectedMethod === 'upi' && (
        <div className="p-4 bg-[#F8F1E4] rounded-2xl border border-[#3B0A14]/15 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
            Enter VPA / UPI ID or scan QR at delivery
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. mobile@okhdfcbank or yourname@upi"
              value={upiId}
              onChange={(e) => onChangeUpiId(e.target.value)}
              className="flex-1 bg-white border border-[#3B0A14]/20 rounded-xl px-3.5 py-2 text-xs text-[#3B0A14] font-mono focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
            />
            <button
              type="button"
              onClick={() => onChangeUpiId('arjun.sharma@okaxis')}
              className="bg-[#3B0A14] text-[#C9A227] px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#57182A] cursor-pointer shrink-0"
            >
              Autofill UPI
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6B5347]">
            <Info size={13} className="text-[#C9A227] shrink-0" />
            <span>You will receive a notification to verify ₹{amount} with 0% platform surcharge.</span>
          </div>
        </div>
      )}

      {selectedMethod === 'card' && (
        <div className="p-4 bg-[#F8F1E4] rounded-2xl border border-[#3B0A14]/15 space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="4532 •••• •••• 8901"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full bg-white border border-[#3B0A14]/20 rounded-xl px-3.5 py-2 text-xs text-[#3B0A14] font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-white border border-[#3B0A14]/20 rounded-xl px-3.5 py-2 text-xs text-[#3B0A14] font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                CVV / CVC
              </label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full bg-white border border-[#3B0A14]/20 rounded-xl px-3.5 py-2 text-xs text-[#3B0A14] font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-[#3B0A14] flex items-start gap-2.5">
          <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Pay <strong className="font-serif font-black text-sm">₹{amount}</strong> in exact cash or via QR to the dispatch rider upon delivery. No cash handling fees charged.
          </p>
        </div>
      )}
    </div>
  );
};
