import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LeadCaptureData } from '../types';

interface ConversionZoneProps {
  selectedTier?: string;
  onTierChange?: (tier: string) => void;
}

export const ConversionZone: React.FC<ConversionZoneProps> = ({
  selectedTier = 'Standard Brochure (£499)',
  onTierChange,
}) => {
  const [formData, setFormData] = useState<LeadCaptureData>({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    serviceTier: selectedTier,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync if selectedTier prop updates externally
  React.useEffect(() => {
    if (selectedTier) {
      setFormData((prev) => ({ ...prev, serviceTier: selectedTier }));
    }
  }, [selectedTier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    // Simulate instantaneous fast quote capture
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Ready to upgrade your online presence?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Hand-coded custom websites and local SEO from £499. Fill out the form below to get a fast project quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact & Guarantees (Single Clean Glass Card) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-7 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">
                  Speak directly with the developers
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                  Jordan or Josh review every request personally and respond within 2 business hours with a fixed quote and delivery timeline.
                </p>

                {/* Direct Contact Info */}
                <div className="space-y-4 pb-6 border-b border-zinc-800/60">
                  <a
                    href="tel:07983145311"
                    className="flex items-center gap-3.5 text-white hover:text-purple-300 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-purple-400 group-hover:border-purple-500/50 group-hover:scale-105 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Direct Phone</span>
                      <span className="text-base font-bold text-white tracking-wide">07983 145311</span>
                    </div>
                  </a>

                  <a
                    href="mailto:jordan@jsos.uk"
                    className="flex items-center gap-3.5 text-white hover:text-purple-300 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-purple-400 group-hover:border-purple-500/50 group-hover:scale-105 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Direct Email</span>
                      <span className="text-base font-bold text-white">jordan@jsos.uk</span>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5 text-zinc-300">
                    <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Service Territory</span>
                      <span className="text-sm font-semibold text-zinc-200">London &amp; Essex, United Kingdom</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="pt-6 space-y-3 text-xs sm:text-sm text-zinc-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Fixed price contract before starting (zero scope creep)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Live staging demo review before final balance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Sub-second page speeds scored directly on Google</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actual Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-7 sm:p-10 shadow-2xl relative backdrop-blur-sm">
              
              {isSubmitted ? (
                <div className="text-center py-10 space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Quote Request Received!</h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <b>{formData.name}</b>. Jordan or Josh has received your project details for the <b>{formData.serviceTier}</b> and will review your requirements and respond within 2 hours.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/447983145311?text=Hi%20Jordan%20and%20Josh,%20I%20just%20submitted%20a%20project%20quote%20request%20for%20${encodeURIComponent(
                        formData.name
                      )}%20(${encodeURIComponent(formData.serviceTier || '')})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Ping Jordan &amp; Josh on WhatsApp Now</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          projectDetails: '',
                          serviceTier: selectedTier,
                        });
                      }}
                      className="text-xs text-zinc-400 hover:text-white underline py-2 cursor-pointer"
                    >
                      Submit another brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-zinc-800 pb-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Get a Fast Project Quote</h3>
                    <p className="text-sm text-zinc-300 mt-1">Takes 30 seconds. No obligation, no spam.</p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-sm font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. David Miller"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. david@example.co.uk"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Package Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 07983 145311"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Package Tier
                      </label>
                      <select
                        name="serviceTier"
                        value={formData.serviceTier}
                        onChange={handleChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-base text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      >
                        {formData.serviceTier &&
                          ![
                            'Tier 01: Single-Page Launchpad (£499)',
                            'Tier 02: Multi-Page Business Suite (£799)',
                            'Tier 03: Custom Systems & Scale (£1,199)',
                            'Custom / Other Requirement',
                          ].includes(formData.serviceTier) && (
                            <option value={formData.serviceTier}>
                              {formData.serviceTier}
                            </option>
                          )}
                        <option value="Tier 01: Single-Page Launchpad (£499)">Tier 01: Single-Page Launchpad (£499)</option>
                        <option value="Tier 02: Multi-Page Business Suite (£799)">Tier 02: Multi-Page Business Suite (£799)</option>
                        <option value="Tier 03: Custom Systems & Scale (£1,199)">Tier 03: Custom Systems &amp; Scale (£1,199)</option>
                        <option value="Custom / Other Requirement">Custom / Other Requirement</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="projectDetails"
                      rows={3}
                      value={formData.projectDetails}
                      onChange={handleChange}
                      placeholder="Briefly describe your business, current website URL (if any), and what you're looking to achieve..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-y"
                    ></textarea>
                  </div>

                  {/* Submit Button with WhatsApp Chat button next to it */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 h-14 px-6 rounded-full bg-purple-700 hover:bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-900/50 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending Request...' : 'Get My Fast Project Quote'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="https://wa.me/447983145311?text=Hi%20Jordan,%20I'd%20like%20to%20get%20a%20fast%20quote%20for%20my%20website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto h-14 px-7 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-md shrink-0"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-zinc-400 text-center sm:text-left mt-2">
                    🔒 100% confidential. No telemarketers or third-party sharing. Fixed price quote returned directly by Jordan or Josh.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
