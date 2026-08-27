import React, { useState } from 'react';
import { X, User, Store, ShieldCheck, ArrowRight, CheckCircle2, Phone, KeyRound } from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const { user, switchRole, addToast } = useGlobal();
  const navigate = useNavigate();
  const [role, setRole] = useState<'customer' | 'restaurant' | 'admin'>('customer');
  const [phoneNumber, setPhoneNumber] = useState('9835012345');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('1234');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    addToast('OTP sent to +91 ' + phoneNumber + ' (Use 1234 for instant demo)', 'info');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      switchRole(role);
      addToast(`Signed in successfully as ${role === 'customer' ? 'Food Lover' : role === 'restaurant' ? 'Restaurant Kitchen' : 'Administrator'}!`, 'success');
      onClose();
      if (role === 'customer') navigate('/order');
      if (role === 'restaurant') navigate('/business');
      if (role === 'admin') navigate('/admin');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B0A14]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#F8F1E4] text-[#3B0A14] w-full max-w-md rounded-3xl shadow-2xl border-2 border-[#3B0A14]/20 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 relative flex items-start justify-between border-b-2 border-[#C9A227]">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#C9A227] text-[#3B0A14] text-[9px] uppercase font-black px-2 py-0.5 rounded-full tracking-widest mb-1.5">
              Secure Access
            </span>
            <h3 className="font-serif font-black text-2xl">
              Sign In to FairBite
            </h3>
            <p className="text-xs text-[#F8F1E4]/80 mt-1">
              One account for dine-in ordering, kitchen POS & admin.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F1E4] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Persona selector tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-white border border-[#3B0A14]/15 rounded-2xl">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`py-2 text-[11px] font-bold uppercase rounded-xl transition-all cursor-pointer ${
                role === 'customer'
                  ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-xs'
                  : 'text-[#6B5347] hover:text-[#3B0A14]'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('restaurant')}
              className={`py-2 text-[11px] font-bold uppercase rounded-xl transition-all cursor-pointer ${
                role === 'restaurant'
                  ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-xs'
                  : 'text-[#6B5347] hover:text-[#3B0A14]'
              }`}
            >
              Kitchen POS
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 text-[11px] font-bold uppercase rounded-xl transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-xs'
                  : 'text-[#6B5347] hover:text-[#3B0A14]'
              }`}
            >
              Admin
            </button>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-bold text-[#6B5347]">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white border border-[#3B0A14]/25 rounded-xl pl-12 pr-4 py-2.5 text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                    placeholder="98350 12345"
                  />
                </div>
                <p className="text-[11px] text-[#6B5347] mt-1">
                  We'll send a 4-digit verification code.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Send One-Time OTP</span>
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
                    Enter 4-digit OTP
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setOtpSent(false)} 
                    className="text-[11px] font-bold text-[#C9A227] hover:underline"
                  >
                    Change Phone
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white border-2 border-[#C9A227] rounded-xl px-4 py-2.5 text-center text-xl font-bold tracking-widest focus:outline-hidden"
                  placeholder="1234"
                />
                <p className="text-[11px] text-[#3B8C5A] font-bold mt-1 text-center">
                  Demo auto-filled: 1234
                </p>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isVerifying ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="bg-white p-3 rounded-2xl border border-[#3B0A14]/10 text-center text-[11px] text-[#6B5347]">
            By signing in, you agree to FairBite's transparent 0% markup charter.
          </div>
        </div>
      </div>
    </div>
  );
};
