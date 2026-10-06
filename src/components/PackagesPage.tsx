import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Sparkles,
  Server,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layout,
  HelpCircle
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PackagesPageProps {
  onSelectTierAndQuote: (tierName: string) => void;
  onOpenScheduleAudit: () => void;
  onNavigateHome: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onSelectTierAndQuote,
  onOpenScheduleAudit,
  onNavigateHome,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  const [showFullMatrix, setShowFullMatrix] = useState<boolean>(false);

  const toggleFeatures = (id: string) => {
    setExpandedFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tiers = [
    {
      id: 'tier-01',
      badge: 'Tier 01',
      name: 'Single-Page Launchpad',
      price: '£499',
      turnaround: '5–7 Days Turnaround',
      idealFor: 'Solo trades, startups & local specialists',
      oneSentence:
        'A sleek, high-converting single-page website hand-coded for 100/100 PageSpeed scores and sub-second loads.',
      popular: false,
      ctaText: 'Choose Single-Page (£499)',
      coreFeatures: [
        'Single high-conversion focused page structure',
        'Sub-second Google PageSpeed guarantee (90+)',
        '100% mobile-first bespoke responsive layout',
        'Persuasive, conversion-focused copywriting included',
      ],
      extraFeatures: [
        'Direct WhatsApp click-to-chat & instant phone triggers',
        'Instant enquiry form with direct email alerts',
        'Foundational local SEO & Google Business metadata',
        'Full domain & source code ownership (no platform lock-in)',
      ],
    },
    {
      id: 'tier-02',
      badge: 'Tier 02',
      highlightTag: 'Most Popular',
      name: 'Multi-Page Business Suite',
      price: '£799',
      turnaround: '7–12 Days Turnaround',
      idealFor: 'Established local businesses & regional contractors',
      oneSentence:
        'Up to 5–6 custom pages with dedicated service breakdowns, regional service areas, and online booking / payments.',
      popular: true,
      ctaText: 'Choose Multi-Page (£799)',
      coreFeatures: [
        'Up to 5–6 custom designed & hand-coded pages',
        'Dedicated landing pages for each core service',
        'Online deposits, card payments or booking engine',
        'Rich Local Business Schema markup for Google Maps',
      ],
      extraFeatures: [
        'Sub-second Google PageSpeed guarantee (90+)',
        'Areas covered / regional Essex & London breakdown',
        'Project portfolio, client reviews & case study showcases',
        'Custom intuitive CMS + 1-on-1 video walkthrough',
        'Direct 1-on-1 developer access with Jordan & Josh',
      ],
    },
    {
      id: 'tier-03',
      badge: 'Tier 03',
      name: 'Custom Systems & Scale',
      price: '£1,199',
      turnaround: '10–18 Days Turnaround',
      idealFor: 'High-volume firms, e-commerce & bespoke operations',
      oneSentence:
        'Engineered for larger architectures (8+ pages), interactive quote tools, customer booking portals, and bespoke workflows.',
      popular: false,
      ctaText: 'Choose Custom Suite (£1,199)',
      coreFeatures: [
        '8+ custom pages with advanced architectural hierarchy',
        'Interactive step-by-step quote estimator or pricing tool',
        'Full e-commerce catalog or client login / booking portal',
        'Automated CRM webhook integration & email notifications',
      ],
      extraFeatures: [
        'Priority developer turnaround with weekly milestone reviews',
        'Advanced technical SEO suite with multi-location targeting',
        '100/100 Core Web Vitals optimization on edge servers',
        'Custom admin dashboard for live content management',
      ],
    },
  ];

  const addonCategories = [
    {
      title: 'Essential Enhancements',
      flatPrice: '+£99 each',
      badge: 'Quick Add-On',
      items: [
        {
          name: 'Direct WhatsApp API & SMS Routing',
          desc: 'Instant lead alerts pushed to your mobile so you can respond in under 2 minutes.',
        },
        {
          name: 'Multi-Location SEO Target Pages',
          desc: 'Targeted ranking landing pages for surrounding regional towns and service areas.',
        },
        {
          name: 'Google Analytics & Heatmap Setup',
          desc: 'Full GDPR-compliant visitor tracking and click heatmaps to monitor conversion behavior.',
        },
      ],
    },
    {
      title: 'Advanced Interactive Systems',
      flatPrice: '+£199 each',
      badge: 'Interactive Power',
      items: [
        {
          name: 'Interactive Quote Estimator',
          desc: 'Self-serve price calculator directly on your site to pre-qualify and filter enquiries.',
        },
        {
          name: 'Online Deposits & Booking Engine',
          desc: 'Secure calendar scheduling with card deposits or full payments via Stripe / Apple Pay.',
        },
        {
          name: 'Client Portal or Store Catalogue',
          desc: 'Secure customer area with file uploads, order accounts, or bespoke catalog flows.',
        },
      ],
    },
  ];

  const faqs = [
    {
      q: 'Are these truly fixed prices or will there be surprise extras?',
      a: 'The price you see is the exact all-in price you pay. There are no surprise hourly overages, licensing costs, or hidden setup fees. If you require optional bespoke add-ons, we agree them upfront before starting a single line of code.',
    },
    {
      q: 'How fast will our website be designed, built and live?',
      a: 'Single-page websites are typically delivered and launched within 5 to 7 days. Multi-Page Business Suites take 7 to 12 days, and Custom Scale builds take 10 to 18 days. You work directly with Jordan & Josh, which means zero corporate bureaucracy or account-manager bottlenecks.',
    },
    {
      q: 'Do I own 100% of the website, code, and content?',
      a: 'Yes, completely. Unlike platforms that lock you into monthly proprietary ecosystems, you own 100% of your domain, code, design, and assets. You can host wherever you want or keep it on our fast UK edge network.',
    },
    {
      q: 'What do I need to prepare before we start?',
      a: 'Very little! Just your logo (if you have one), your primary phone/email, and a brief chat about your target services and locations. We write the conversion copy and organize the layout so you can stay focused on your day-to-day business.',
    },
    {
      q: 'What are the ongoing monthly costs after launch?',
      a: 'Zero forced subscriptions. We provide managed ultra-fast UK Edge cloud hosting with SSL, daily offsite backups, and security maintenance for just £15/month on a rolling monthly basis. You can cancel or move anytime.',
    },
    {
      q: 'How does payment work?',
      a: 'We require a 50% deposit to secure your build window and begin copywriting and design. The remaining 50% is only payable once you have reviewed the live private staging link and given full sign-off.',
    },
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* 1. Sub-Header Hero (Minimal Journey Style) */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-zinc-950 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
            <button
              onClick={onNavigateHome}
              className="hover:text-purple-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-purple-400">Packages</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4">
            Transparent Upfront Pricing
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Fixed prices. Zero surprise fees.
          </h1>

          <p className="mt-5 text-zinc-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Straightforward packages hand-coded for speed, local search visibility, and frictionless customer conversion.
          </p>

          {/* Minimal Key Guarantee Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-zinc-200">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sub-Second PageSpeed
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              50% Deposit / 50% on Sign-Off
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Code &amp; Domain Ownership
            </span>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PRIMARY PACKAGE TIERS (One-page, spacious, clean) */}
      <section id="packages" className="py-20 md:py-28 bg-zinc-950 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
              Core Packages
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Choose the package that fits your stage
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              Every build is custom-engineered using modern static architecture. No bloated templates, no hostage platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                id={tier.id}
                className={`rounded-3xl p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? 'bg-gradient-to-b from-purple-950/60 via-zinc-900/90 to-zinc-900/90 text-white border-2 border-purple-500 shadow-2xl shadow-purple-950/40 relative md:-translate-y-2 pt-10'
                    : 'bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-800/80 hover:border-zinc-700 shadow-xl hover:shadow-2xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center">
                    {tier.highlightTag || 'Recommended For Growth'}
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-purple-300/90 font-medium mb-5">
                    Ideal for: {tier.idealFor}
                  </p>

                  <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-zinc-800/80">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                      {tier.price}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        tier.popular ? 'text-purple-300' : 'text-zinc-400'
                      }`}
                    >
                      all-in fixed
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-zinc-200 mb-8 font-normal">
                    {tier.oneSentence}
                  </p>

                  {/* Feature Checklist - Clean 4 core items + expandable toggle */}
                  <div className="space-y-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                      Key deliverables:
                    </span>
                    {tier.coreFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-purple-400" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {/* Expandable Extra Features */}
                    {expandedFeatures[tier.id] && (
                      <div className="pt-2 space-y-3 border-t border-zinc-800/60 mt-3 animate-fadeIn">
                        {tier.extraFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                            <div className="w-4 h-4 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-purple-400" />
                            </div>
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleFeatures(tier.id)}
                      className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                    >
                      <span>{expandedFeatures[tier.id] ? 'Show fewer details' : `+ ${tier.extraFeatures.length} more inclusions`}</span>
                      {expandedFeatures[tier.id] ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-zinc-800">
                  <button
                    onClick={() => onSelectTierAndQuote(tier.name)}
                    className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      tier.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900/60'
                        : 'bg-zinc-800 hover:bg-purple-900 text-zinc-100 hover:text-white border border-zinc-700'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="mt-3 text-center text-xs text-zinc-400 font-medium">
                    50% deposit to lock build slot • Zero lock-in
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action button & technical comparison table right below package cards */}
          <div className="mt-12 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowFullMatrix(!showFullMatrix)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-purple-500/60 text-zinc-200 hover:text-white font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-md"
            >
              <span>{showFullMatrix ? 'Hide technical comparison table' : 'View full technical comparison table'}</span>
              {showFullMatrix ? (
                <ChevronUp className="w-4 h-4 text-purple-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-400" />
              )}
            </button>

            {showFullMatrix && (
              <div className="w-full mt-10 overflow-x-auto rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-2 shadow-2xl animate-fadeIn">
                <table className="w-full text-left text-sm sm:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-300 uppercase text-xs font-bold tracking-wider">
                      <th className="py-4 px-5 font-semibold">Deliverable</th>
                      <th className="py-4 px-5 text-center font-semibold">Single-Page (£499)</th>
                      <th className="py-4 px-5 text-center font-semibold text-purple-300 bg-purple-950/40 rounded-t-2xl">
                        Multi-Page (£799)
                      </th>
                      <th className="py-4 px-5 text-center font-semibold">Custom Suite (£1,199)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Sub-Second Load Guarantee (90+ PageSpeed)</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Page Architecture Scope</td>
                      <td className="py-4 px-5 text-center text-zinc-300">1 Focused Page</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-semibold bg-purple-950/20">Up to 6 Custom Pages</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-semibold">8+ Custom Pages</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Target Turnaround Time</td>
                      <td className="py-4 px-5 text-center text-zinc-300">5–7 Working Days</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-semibold bg-purple-950/20">7–12 Working Days</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-semibold">10–18 Working Days</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Custom Copywriting Written For You</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Online Deposits &amp; Booking Scheduling</td>
                      <td className="py-4 px-5 text-center text-zinc-600">—</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20">✓ (Stripe/PayPal/Calendly)</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ (Custom Portal / Store)</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Areas Covered / Regional SEO Breakdown</td>
                      <td className="py-4 px-5 text-center text-zinc-600">—</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20">✓ Dedicated Section</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Multi-town Hub Pages</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Technical On-Page SEO &amp; Schema Setup</td>
                      <td className="py-4 px-5 text-center text-zinc-300">Foundational</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-semibold bg-purple-950/20">Local Business Schema</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-semibold">Advanced Entity Architecture</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Direct WhatsApp Click-to-Chat</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-4 px-5 font-medium text-white">Full Source Code &amp; Domain Ownership</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">100% Yours</td>
                      <td className="py-4 px-5 text-center text-purple-300 font-bold bg-purple-950/20 rounded-b-2xl">100% Yours</td>
                      <td className="py-4 px-5 text-center text-purple-400 font-bold">100% Yours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-8 text-center text-sm text-zinc-400 font-medium">
            All packages include launch deployment. Ongoing managed UK cloud hosting from <span className="text-zinc-200 font-semibold">£15/mo</span> with zero lock-in.
          </p>
        </div>
      </section>

      {/* 4. MODULAR ADD-ONS (Clean 3-column cards with generous spacing) */}
      <section className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
                Optional Customisations
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Modular Power Add-Ons
              </h2>
              <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed">
                Add high-converting functionality to any tier whenever your business needs it. No forced package bloat.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <button
                onClick={onOpenScheduleAudit}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              >
                <span>Need bespoke functionality? Ask Jordan &amp; Josh</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {addonCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-9 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800/80">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                        {cat.badge}
                      </span>
                      <h3 className="font-extrabold text-white text-xl sm:text-2xl">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="text-base sm:text-lg font-black text-purple-300 bg-purple-950/80 px-4 py-1.5 rounded-full border border-purple-800/80 shrink-0">
                      {cat.flatPrice}
                    </span>
                  </div>

                  <div className="space-y-4 my-6">
                    {cat.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 hover:border-zinc-700/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <h4 className="font-bold text-white text-sm sm:text-base mb-0.5">
                            {item.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => onSelectTierAndQuote(`Tier with ${item.name}`)}
                          className="shrink-0 text-xs font-semibold text-purple-400 hover:text-purple-300 self-start sm:self-center transition-colors cursor-pointer"
                        >
                          + Add to quote
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span>Available on any package build</span>
                  <span className="text-zinc-300">Simple flat fixed rate</span>
                </div>
              </div>
            ))}
          </div>

          {/* Included free CMS highlight banner */}
          <div className="mt-8 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Video Walkthrough &amp; CMS Training — Always Included Free
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  Every project includes a personalised 10-minute screencast showing you how to update photos, copy, and testimonials anytime.
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/60 shrink-0">
              £0 Free
            </span>
          </div>
        </div>
      </section>

      {/* 5. MANAGED HOSTING & ONGOING CARE (£15/mo) */}
      <section className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
              Infrastructure &amp; Care
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Zero Hostage Fees. Real UK Edge Performance.
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              We host on next-generation edge architecture from just £15/mo with rolling 30-day flexibility. No expensive lock-in retainers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
            {/* Card 1: Core Managed Cloud */}
            <div className="p-8 lg:p-9 rounded-3xl bg-zinc-900/50 border border-zinc-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-white">Managed UK Cloud</h3>
                      <p className="text-xs sm:text-sm text-zinc-400">Essential, rock-solid hosting</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white">£15</span>
                    <span className="text-xs sm:text-sm text-zinc-400">/mo</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  Runs your website on lightning-fast UK Edge CDN servers with automatic SSL updates, offsite backups, and DDoS mitigation.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Ultra-fast UK Edge CDN hosting (sub-second TTFB)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Automated SSL certificate renewal &amp; HTTP/3 protocol</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Weekly automated offsite cloud snapshot backups</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Direct email &amp; WhatsApp support for emergency queries</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Zero lock-in contract • Cancel or migrate anytime</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <span className="text-xs sm:text-sm font-semibold text-zinc-400 block">
                  Included with every website build on launch.
                </span>
              </div>
            </div>

            {/* Card 2: Growth Retainer */}
            <div className="p-8 lg:p-9 rounded-3xl bg-gradient-to-b from-purple-950/40 via-zinc-900/60 to-zinc-900/60 border border-purple-500/40 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg sm:text-xl text-white">Local Growth &amp; SEO Retainer</h3>
                      <p className="text-xs sm:text-sm text-purple-300">For ongoing regional dominance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white">£79</span>
                    <span className="text-xs sm:text-sm text-purple-300">/mo</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  For businesses wanting proactive Google Maps 3-pack citation updates, monthly project photos/reviews, and fresh local ranking pages.
                </p>

                <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Everything in Managed UK Cloud (£15/mo tier included)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Monthly Google Maps &amp; local business citation updates</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>New project gallery updates &amp; review uploads added for you</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Priority developer turnaround for copy or price adjustments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Monthly transparent Google Search Console ranking review</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-900/40">
                <span className="text-xs sm:text-sm font-semibold text-purple-300 block">
                  Optional add-on available after your website launch.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PACKAGE FAQS (Clean minimal accordion) */}
      <section className="py-20 md:py-28 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-purple-400 mb-3">
              Common Questions
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Package &amp; Pricing FAQs
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              Straight answers on deposits, ownership, timelines, and hosting.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 font-bold text-base sm:text-lg text-zinc-100 flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/80"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-purple-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-zinc-300 border-t border-zinc-800/60 bg-zinc-900/20 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
            <p className="text-sm sm:text-base text-zinc-300">
              Have a bespoke question? Call Jordan &amp; Josh directly on{' '}
              <a href="tel:07983145311" className="text-white font-bold hover:text-purple-300 underline underline-offset-4">
                07983 145311
              </a>{' '}
              or chat via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CONVERSION ACTION STRIP */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
            Ready to Begin?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Lock in your build window today
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We limit active builds to two projects at a time to ensure rapid turnaround and direct developer attention.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectTierAndQuote('Tier 02: Multi-Page Business Suite (£799)')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-purple-950/60 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Your Fast Quote Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh,%20I'd%20like%20to%20discuss%20a%20website%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
