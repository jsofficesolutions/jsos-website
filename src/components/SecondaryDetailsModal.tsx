import React, { useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, Layers, HelpCircle, Workflow, PlusCircle, ArrowRight, Shield, TrendingUp, Server } from 'lucide-react';

interface SecondaryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTierAndClose: (tier: string) => void;
  initialTab?: 'faq' | 'workflow' | 'addons' | 'compare' | 'hosting';
}

export const SecondaryDetailsModal: React.FC<SecondaryDetailsModalProps> = ({
  isOpen,
  onClose,
  onSelectTierAndClose,
  initialTab = 'workflow',
}) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'addons' | 'compare' | 'faq' | 'hosting'>(initialTab);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How fast will my new website be live?',
      a: 'Standard brochure sites are typically coded and launched within 7 to 14 days. E-Commerce and multi-location SEO builds typically take 10 to 18 days. Because you deal directly with Jordan & Josh, there are no approval hierarchies or agency delays.',
    },
    {
      q: 'Can I easily update text, prices, and photos myself?',
      a: 'Yes. Every site includes a modern, intuitive CMS and a personalised 10-minute video walkthrough showing you exactly how to edit content, post case studies, or update prices whenever you like without breaking code.',
    },
    {
      q: 'Do I own 100% of my website and source code?',
      a: 'Completely. Unlike website builders or proprietary agency platforms that hold your assets hostage, you own 100% of your domain, code, text, and imagery. You can export or move anytime.',
    },
    {
      q: 'What if I already have an existing domain name and business email?',
      a: 'We handle the DNS migration seamlessly with zero downtime to your existing business email (e.g. Google Workspace, Microsoft 365, or cPanel).',
    },
    {
      q: 'Are there any hidden monthly hosting or license fees?',
      a: 'Zero hidden fees. We host and maintain every site on our ultra-fast UK Edge cloud network for £15/month on a rolling basis with no lock-in contracts. For businesses wanting proactive ongoing local SEO, Google Maps citation updates, and regular content additions, we offer optional growth retainers from £79/month.',
    },
    {
      q: 'How does payment work?',
      a: 'We require a 50% deposit to initiate your build and lock your calendar slot. The remaining 50% is only payable once your site is fully reviewed, tested, and ready to go live.',
    },
  ];

  const addons = [
    {
      name: 'Interactive Quote Calculator',
      price: '+£199',
      desc: 'Interactive step-by-step price estimator directly on your website to qualify leads before they call.',
    },
    {
      name: 'Multi-Location SEO Landing Pages',
      price: '+£249',
      desc: 'Targeted service pages for neighbouring towns (e.g. Chelmsford, Romford, Brentwood, Southend).',
    },
    {
      name: 'Direct WhatsApp API & SMS Routing',
      price: '+£99',
      desc: 'Instant lead notifications routed straight to your mobile so you can respond in under 2 minutes.',
    },
    {
      name: 'Custom Client Portal / Booking Engine',
      price: '+£349',
      desc: 'Secure client area with document upload, deposit booking, and calendar scheduling.',
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-purple-950/30 border border-zinc-800/80 relative flex flex-col text-white"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle ambient glow top right */}
        <div className="absolute top-0 right-10 w-72 h-44 bg-purple-600/10 blur-[90px] rounded-full pointer-events-none -z-0" />

        {/* Header */}
        <div className="p-6 sm:p-7 z-10 flex items-start justify-between border-b border-zinc-800/40">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
              JSOS Specifications &amp; Reference Hub
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Deep Package Details, Process &amp; FAQs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Segmented Pill Tab Bar */}
        <div className="px-6 pt-3 pb-3 border-b border-zinc-800/40 bg-zinc-950/80 overflow-x-auto">
          <div className="inline-flex p-1 bg-zinc-900/80 border border-zinc-800/60 rounded-2xl gap-1">
            <button
              onClick={() => setActiveTab('workflow')}
              className={`py-2 px-4 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'workflow'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              How We Work (3 Steps)
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`py-2 px-4 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'compare'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Full Package Comparison
            </button>
            <button
              onClick={() => setActiveTab('addons')}
              className={`py-2 px-4 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'addons'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Modular Add-Ons
            </button>
            <button
              onClick={() => setActiveTab('hosting')}
              className={`py-2 px-4 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'hosting'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Hosting &amp; Growth
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-4 text-xs font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'faq'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>
        </div>

        {/* Scrollable Content Area with custom sleek scrollbar */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* TAB 1: How We Work */}
          {activeTab === 'workflow' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Our Frictionless 3-Step Process</h4>
                <p className="text-zinc-400 text-sm">
                  We respect your time. You provide your goals and logo — Jordan and Josh handle copy, architecture, development, and launch.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center mb-4">
                    1
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">15-Min Brief &amp; Scope</h5>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    A quick call or WhatsApp questionnaire to understand your ideal client, target locations, and key service offerings. No long meetings.
                  </p>
                </div>

                <div className="bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center mb-4">
                    2
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">Bespoke Build &amp; Review</h5>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    Jordan and Josh write the persuasive copy and code your custom site using Astro &amp; Tailwind for sub-second speeds. You review a private live staging link.
                  </p>
                </div>

                <div className="bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-extrabold flex items-center justify-center mb-4">
                    3
                  </div>
                  <h5 className="font-bold text-white text-base mb-1">Go-Live &amp; Google Index</h5>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    We connect your custom domain, set up Google Search Console and Maps schema, and deliver your CMS video walkthrough.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Full Package Comparison */}
          {activeTab === 'compare' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Detailed Feature Matrix</h4>
                <p className="text-zinc-400 text-sm">
                  Compare all deliverables across our three transparent tiers.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-1">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800/60 text-zinc-400 uppercase text-[10px] font-bold tracking-wider">
                      <th className="py-3.5 px-4 font-semibold">Deliverable</th>
                      <th className="py-3.5 px-4 text-center font-semibold">Single-Page (£499)</th>
                      <th className="py-3.5 px-4 text-center font-semibold text-purple-300 bg-purple-950/40 rounded-t-xl">
                        Multi-Page (£799)
                      </th>
                      <th className="py-3.5 px-4 text-center font-semibold">Custom Suite (£1,199)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Sub-Second Load Guarantee (90+ PageSpeed)</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-bold bg-purple-950/25">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Page Architecture Scope</td>
                      <td className="py-3.5 px-4 text-center text-zinc-400">1 Focused Page</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-semibold bg-purple-950/25">Up to 6 Custom Pages</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-semibold">8+ Pages / Complex Scope</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Custom Copywriting &amp; Wireframing Polish</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-bold bg-purple-950/25">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Online Deposits, Payments &amp; Booking Setup</td>
                      <td className="py-3.5 px-4 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-bold bg-purple-950/25">✓ (Stripe/PayPal/Calendly)</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓ (Full Store / Portal)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Technical On-Page SEO &amp; Schema Setup</td>
                      <td className="py-3.5 px-4 text-center text-zinc-400">Foundational</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-semibold bg-purple-950/25">Local Business Schema</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-semibold">Advanced Schema Suite</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Direct WhatsApp Click-to-Chat &amp; Lead Routing</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-300 font-bold bg-purple-950/25 rounded-b-xl">✓</td>
                      <td className="py-3.5 px-4 text-center text-purple-400 font-bold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Modular Add-Ons */}
          {activeTab === 'addons' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Modular Power Add-Ons</h4>
                <p className="text-zinc-400 text-sm">
                  Add high-converting functionality to any tier whenever your business needs it.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addons.map((addon, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-white text-sm sm:text-base">{addon.name}</h5>
                      <span className="text-xs font-extrabold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800/80">
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{addon.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Hosting & Ongoing Growth */}
          {activeTab === 'hosting' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Managed Cloud Hosting &amp; Ongoing Growth</h4>
                <p className="text-zinc-400 text-sm">
                  We handle the infrastructure, security, and updates so you never have to touch a server or worry about downtime. Zero lock-in contracts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Plan 1 */}
                <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Server className="w-4 h-4 text-purple-400" />
                        Managed UK Cloud
                      </span>
                      <span className="text-xs font-black text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800/80">
                        £15/month
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                      Essential infrastructure to keep your site blazing fast, protected, and fully backed up.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Ultra-fast UK Edge CDN hosting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Automated SSL certificate renewals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Weekly automated off-site cloud backups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Direct developer support for basic updates</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Plan 2 */}
                <div className="p-6 rounded-2xl bg-purple-950/20 border border-purple-800/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                        Local Growth &amp; SEO Retainer
                      </span>
                      <span className="text-xs font-black text-purple-200 bg-purple-900/70 px-3 py-1 rounded-full border border-purple-700/60">
                        From £79/month
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                      For businesses that want proactive search updates, local citations, and regular new customer enquiries.
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Everything in Managed Cloud hosting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Monthly Google Maps 3-Pack citations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Monthly project photos &amp; reviews uploaded</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                        <span>Priority developer turnaround for changes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQs */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-fadeIn" id="faq">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Frequently Asked Questions</h4>
                <p className="text-zinc-400 text-sm">
                  Straight answers to everything you might be wondering about our builds.
                </p>
              </div>

              <div className="space-y-3 mt-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/60 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 font-bold text-sm sm:text-base text-zinc-100 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/60 bg-zinc-900/40 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-5 sm:p-6 bg-zinc-950/95 border-t border-zinc-800/40 flex flex-wrap items-center justify-between gap-4 z-10">
          <span className="text-xs text-zinc-400 font-medium">
            Have a bespoke question? Call Jordan &amp; Josh directly on{' '}
            <a href="tel:07983145311" className="text-white font-bold hover:text-purple-300 transition-colors">
              07983 145311
            </a>.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-950/50 cursor-pointer"
            >
              Get a Fast Project Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
