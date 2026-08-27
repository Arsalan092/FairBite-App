import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  ArrowRight,
  Store,
  HelpCircle
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useGlobal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'diner',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message sent! Our Jamshedpur support team will respond shortly.', 'success');
  };

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            Direct Local Support
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Get in Touch with FairBite
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium">
            Based right here in Jamshedpur. Whether you're a customer with a question or a restaurant owner ready to list, we're here to help.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Col: Contact Info & Hub */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 space-y-6 shadow-lg">
              <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                Jamshedpur Hub Office
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#6B5347]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#3B0A14] block">Address</span>
                    <span>Boulevard Complex, Main Road, Bistupur, Jamshedpur, Jharkhand 831001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#3B0A14] block">Direct Hotline</span>
                    <span>+91 657 242 8890 / +91 98351 22890</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#3B0A14] block">Email Support</span>
                    <span>contact@fairbite.in / partners@fairbite.in</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="font-bold text-[#3B0A14] block">Dispatch & Support Hours</span>
                    <span>11:00 AM – 11:30 PM (7 Days a Week)</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Business Action */}
              <a
                href="https://wa.me/919835122890?text=Hi%20FairBite%20Team,%20I%20have%20an%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-4 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare size={16} />
                <span>Chat on WhatsApp Business</span>
              </a>
            </div>
          </div>

          {/* Right Col: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#3B0A14]/15 shadow-xl space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#3B8C5A]/15 text-[#3B8C5A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B5347] max-w-md mx-auto">
                    Thank you, <b>{formData.name}</b>. A member of our local team in Jamshedpur will reach out to you at <b>{formData.phone || formData.email}</b> within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-[#3B0A14] text-[#F8F1E4] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98350 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                        I Am A...
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                      >
                        <option value="diner">Customer / Food Lover</option>
                        <option value="restaurant">Restaurant Owner / Kitchen</option>
                        <option value="delivery">Delivery Rider / Partner</option>
                        <option value="other">General Partnership / Press</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Restaurant Onboarding Inquiry in Bistupur"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#3B0A14] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#3B0A14]/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#C9A227]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Send Message to Jamshedpur Office</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
