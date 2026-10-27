import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTier?: string;
  initialPackage?: string;
}

const CALLBACK_TIMES = [
  'Morning (09:00 - 12:00)',
  'Afternoon (12:00 - 15:00)',
  'Late Afternoon (15:00 - 17:30)',
  'Evening (17:30 - 19:30)',
  'Anytime ASAP',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefillTier,
  initialPackage,
}) => {
  const defaultPackage = initialPackage || prefillTier || 'Multi-Page (£799)';
  const [selectedCallbackTime, setSelectedCallbackTime] = useState(CALLBACK_TIMES[4]);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [packageNeeded, setPackageNeeded] = useState(defaultPackage);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (initialPackage || prefillTier) {
      setPackageNeeded(initialPackage || prefillTier || 'Multi-Page (£799)');
    }
  }, [initialPackage, prefillTier]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="bg-[#0a0a0a] rounded-none max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/15 relative text-white"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-black text-white border-b border-white/15">
          <div className="flex items-center justify-between mb-4">
            <img
              src="/images/logo.svg"
              alt="JS Solutions"
              className="h-10 sm:h-12 w-auto max-w-[200px] object-contain"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-[#1e1b4b] border border-purple-500/40 px-2.5 py-1 rounded-none inline-block">
              Fast 2-Hour Response
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get Your Fixed-Price Quote
          </h3>
          <p className="text-zinc-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Deal directly with Jordan &amp; Josh. Tell us your trade and what you need—we’ll call or WhatsApp you back within 2 hours with a straight answer and a fixed price.
          </p>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-none bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white">Quote Request Received!</h4>
            <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
              Thanks <b>{name}</b>. Jordan or Josh will review your details for <b>{business || 'your business'}</b> and get back to you on <b>{phone}</b> within 2 hours.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-none bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Mobile Number (For Call / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07983 145311"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Trade or Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Electrical Services"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Selected Package / What You Need
                </label>
                <input
                  type="text"
                  placeholder="e.g. Multi-Page (£799) or describe what you need"
                  value={packageNeeded}
                  onChange={(e) => setPackageNeeded(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded-none px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Callback Time Preferences */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Best time for a quick 10-minute callback (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CALLBACK_TIMES.map((timeOption) => (
                    <button
                      key={timeOption}
                      type="button"
                      onClick={() => setSelectedCallbackTime(timeOption)}
                      className={`py-2 px-3 rounded-none border text-left text-xs font-medium transition-colors cursor-pointer ${
                        selectedCallbackTime === timeOption
                          ? 'border-purple-500 bg-[#1e1b4b] text-white font-bold'
                          : 'border-white/15 hover:border-white/30 text-zinc-400 bg-black'
                      }`}
                    >
                      {timeOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Fixed Quote &amp; Callback</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <p className="text-[12px] text-zinc-400 text-center mt-3 font-medium">
                Direct 1-on-1 with Jordan &amp; Josh &bull; Fixed upfront price &bull; Zero sales pressure
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
