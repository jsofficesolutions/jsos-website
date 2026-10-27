import React, { useState, useEffect } from 'react';
import {
  Check,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layout,
  Server,
  Zap,
  Layers,
  Clock,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Wrench,
  Lock,
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
  const [activeStep, setActiveStep] = useState<number>(0);

  // Selection states for custom build builder
  const [selectedPackage, setSelectedPackage] = useState<string>('Multi-Page');
  const [selectedCare, setSelectedCare] = useState<string>('Essential Care (£15/mo)');
  const [selectedBoltOns, setSelectedBoltOns] = useState<string[]>([]);

  // Direct Lead Form at bottom
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const toggleBoltOn = (boltOnName: string) => {
    setSelectedBoltOns((prev) =>
      prev.includes(boltOnName)
        ? prev.filter((item) => item !== boltOnName)
        : [...prev, boltOnName]
    );
  };

  // Dynamic Pricing Calculations
  const getPackagePriceNumber = (pkgName: string): number => {
    if (pkgName.includes('Single-Page')) return 499;
    if (pkgName.includes('Custom')) return 1199;
    return 799; // Default Multi-Page
  };

  const getCareMonthlyPriceNumber = (careName: string): number => {
    if (careName.includes('£99')) return 99;
    return 15; // Default Essential Care
  };

  const getBoltOnPriceNumber = (boltOnName: string): number => {
    if (boltOnName.includes('199')) return 199;
    return 99;
  };

  const packagePrice = getPackagePriceNumber(selectedPackage);
  const monthlyPrice = getCareMonthlyPriceNumber(selectedCare);
  const boltOnsTotal = selectedBoltOns.reduce((acc, curr) => acc + getBoltOnPriceNumber(curr), 0);
  const oneOffTotal = packagePrice + boltOnsTotal;
  const depositAmount = Math.round(oneOffTotal / 2);
  const remainingAmount = oneOffTotal - depositAmount;

  const [stepProgress, setStepProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const step1El = document.getElementById('step-1');
      const step2El = document.getElementById('step-2');
      const step3El = document.getElementById('step-3');
      const step4El = document.getElementById('quote-summary');

      const scrollPos = window.scrollY + 320;

      if (step4El && scrollPos >= step4El.offsetTop) {
        setActiveStep(4);
      } else if (step3El && scrollPos >= step3El.offsetTop) {
        setActiveStep(3);
      } else if (step2El && scrollPos >= step2El.offsetTop) {
        setActiveStep(2);
      } else if (step1El && scrollPos >= step1El.offsetTop) {
        setActiveStep(1);
      } else {
        setActiveStep(0);
      }

      // Calculate smooth filling percentage for vertical line between steps
      if (step1El && step4El) {
        const startTop = step1El.offsetTop - 200;
        const endTop = step4El.offsetTop + 100;
        const totalDistance = endTop - startTop;
        const currentDistance = Math.max(0, window.scrollY - startTop);
        const ratio = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
        setStepProgress(ratio);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFeatures = (id: string) => {
    setExpandedFeatures((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToStep = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tiers = [
    {
      id: 'tier-01',
      name: 'Single-Page',
      price: '£499',
      popular: false,
      ctaText: 'Choose Single-Page (£499)',
      coreFeatures: [
        'Everything on one clear, easy-to-scroll page',
        'Loads instantly on all phones and computers',
        'We write all your words and headlines for you',
        'Direct WhatsApp & phone call buttons for fast leads',
        'You own 100% of your website and web address',
      ],
      extraFeatures: [
        'Contact form sending messages straight to your inbox',
        'Set up to show on Google when locals search for your trade',
        'Looks sharp on all iPhones, Androids, and tablets',
        'No ongoing website builder or software subscriptions',
      ],
    },
    {
      id: 'tier-02',
      highlightTag: 'Most Popular',
      name: 'Multi-Page',
      price: '£799',
      popular: true,
      ctaText: 'Choose Multi-Page (£799)',
      coreFeatures: [
        'Up to 5–6 separate pages for each service you offer',
        'Dedicated "Areas We Cover" section to win local work',
        'Photo gallery showcasing your past jobs and reviews',
        'Take customer deposits, card payments or bookings',
        'Work directly 1-on-1 with Jordan & Josh (no middlemen)',
      ],
      extraFeatures: [
        'Loads instantly with 100/100 speed test scores',
        'Google Maps & local business profile verification setup',
        'Simple login so you can add photos or change prices anytime',
        'Short personalized video showing you how to edit anything',
        'Full ownership of all files, images, and text',
      ],
    },
    {
      id: 'tier-03',
      name: 'Custom Suite',
      price: '£1,199',
      popular: false,
      ctaText: 'Choose Custom Suite (£1,199)',
      coreFeatures: [
        '8+ custom pages built around your exact business needs',
        'Instant online price calculator or quote tool for clients',
        'Full online shop or private customer login area',
        'Automatic customer text/email alerts when they enquire',
        'Priority build schedule with direct weekly progress calls',
      ],
      extraFeatures: [
        'Targeted Google rankings across multiple towns and areas',
        'Private admin screen to manage leads and customers',
        'Custom forms for client file uploads and quotes',
        'Full database and code ownership with zero monthly lock-in',
      ],
    },
  ];

  const faqs = [
    {
      q: 'Are these truly fixed prices or will there be surprise extras?',
      a: 'The price you see is the exact fixed price you pay. We never charge hourly extras or hidden setup fees.',
    },
    {
      q: 'How fast will our website be designed, built and live?',
      a: 'Single-page sites are live in 5–7 days, Multi-Page in 7–10 days, and Custom Suites in 10–14 days. You deal directly with Jordan & Josh from start to finish.',
    },
    {
      q: 'Do I own 100% of the website, code, and content?',
      a: 'Yes, completely. Once the final invoice is paid, you own 100% of your domain, website code, text, and photos with zero lock-in.',
    },
    {
      q: 'What do I need to prepare before we start?',
      a: 'Roughly 20 minutes of your time. Send us job photos and a quick voice note explaining your services—we write all the words and build the entire site.',
    },
    {
      q: 'What are the ongoing monthly costs after launch?',
      a: 'Zero forced monthly fees. You can host it yourself for £0/month, or use our £15/month Essential Care for fast UK hosting and daily backups on a rolling agreement.',
    },
    {
      q: 'How does payment work?',
      a: 'You pay a 50% deposit to lock in your build slot. The final 50% is only payable after you test and approve the finished website on your phone.',
    },
  ];

  return (
    <div className="bg-black text-white flex flex-col selection:bg-purple-600 selection:text-white relative">
      {/* Minimal Vertical Journey Progress Stepper (Left-docked) */}
      <div
        className={`fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-3 transition-all duration-500 pointer-events-auto ${
          activeStep > 0
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <div className="p-3.5 rounded-none bg-black border border-white/15 shadow-2xl relative w-full">
          {/* Continuous vertical track & fill line */}
          <div className="absolute left-[26px] lg:left-[26px] top-6 bottom-6 w-0.5 bg-zinc-800 -z-0">
            <div
              className="w-full bg-purple-600 transition-all duration-300"
              style={{
                height: `${Math.round(stepProgress * 100)}%`,
              }}
            />
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            {[
              { step: 1, id: 'step-1', name: 'Core Package' },
              { step: 2, id: 'step-2', name: 'Ongoing Care' },
              { step: 3, id: 'step-3', name: 'Bolt-Ons' },
              { step: 4, id: 'quote-summary', name: 'Get Quote' },
            ].map((item) => {
              const isCompleted = activeStep > item.step;
              const isCurrent = activeStep === item.step;

              return (
                <button
                  key={item.step}
                  onClick={() => scrollToStep(item.id)}
                  className="group flex items-center gap-3 cursor-pointer text-left w-full focus:outline-none"
                >
                  {/* Step Dot / Number Indicator */}
                  <div
                    className={`w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
                      isCurrent
                        ? 'bg-purple-600 text-white'
                        : isCompleted
                        ? 'bg-[#1a1a1a] text-purple-300 border border-purple-500/60'
                        : 'bg-[#0e0e0e] text-zinc-500 border border-white/10 group-hover:text-zinc-300 group-hover:border-white/20'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 text-purple-300 stroke-[3]" /> : item.step}
                  </div>

                  {/* Step Name Label */}
                  <div className="hidden lg:block whitespace-nowrap pr-2">
                    <span
                      className={`text-[11px] uppercase tracking-wider font-bold block transition-colors ${
                        isCurrent
                          ? 'text-white'
                          : isCompleted
                          ? 'text-purple-300/80'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Running Live Total in Left Stepper */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Live Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-white">£{oneOffTotal}</span>
              <span className="text-[10px] text-purple-300 font-semibold">+£{monthlyPrice}/mo</span>
            </div>
            <button
              onClick={() => scrollToStep('quote-summary')}
              className="mt-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition-colors text-left cursor-pointer"
            >
              Review Quote →
            </button>
          </div>
        </div>

        {/* Site Purple Bold Tile: UNSURE? Call: 07983 145311 */}
        <a
          href="tel:07983145311"
          aria-label="Call 07983 145311"
          className="w-full p-3 rounded-none bg-purple-600 hover:bg-purple-500 text-white transition-colors group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-none bg-black/30 text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="hidden lg:block whitespace-nowrap text-left pr-1 leading-snug">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              UNSURE?
            </span>
            <span className="text-xs font-bold text-white tracking-tight block">
              07983 145311
            </span>
          </div>
        </a>
      </div>

      {/* 1. HERO GUIDE */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-black border-b border-white/15 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">

          {/* Clean Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Build Your Fixed-Price Package.
          </h1>

          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto">
            Choose your core package, ongoing care, and any optional bolt-ons with zero hidden fees or technical jargon.
          </p>

          {/* 3 Step Quick Overview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

            {/* Step 1: Package Foundation */}
            <div
              onClick={() => scrollToStep('step-1')}
              className="group cursor-pointer p-6 bg-[#0a0a0a] border border-white/15 hover:border-purple-600 transition-colors flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-none bg-black border border-white/15 flex items-center justify-center mb-3 text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
                1. Pick a Package
              </h2>
              <p className="text-xs text-zinc-400">
                From £499 • Fixed price
              </p>
            </div>

            {/* Step 2: Ongoing Care */}
            <div
              onClick={() => scrollToStep('step-2')}
              className="group cursor-pointer p-6 bg-[#0a0a0a] border border-white/15 hover:border-purple-600 transition-colors flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-none bg-black border border-white/15 flex items-center justify-center mb-3 text-purple-400">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
                2. Choose Ongoing Care
              </h2>
              <p className="text-xs text-zinc-400">
                From £15/mo • Cancel anytime
              </p>
            </div>

            {/* Step 3: Bolt-ons */}
            <div
              onClick={() => scrollToStep('step-3')}
              className="group cursor-pointer p-6 bg-[#0a0a0a] border border-white/15 hover:border-purple-600 transition-colors flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-none bg-black border border-white/15 flex items-center justify-center mb-3 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
                3. Add Bolt-Ons
              </h2>
              <p className="text-xs text-zinc-400">
                Optional extras • Skip anytime
              </p>
            </div>

          </div>

          {/* Gentle Scroll Cue Arrow */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <button
              onClick={() => scrollToStep('step-1')}
              aria-label="Scroll to step 1"
              className="group flex flex-col items-center gap-1.5 text-zinc-400 hover:text-purple-400 transition-colors cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 group-hover:text-purple-300 transition-colors">
                Start Step 1
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-zinc-400 group-hover:text-purple-400 transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* STEP 1 SECTION: PICK YOUR CORE PACKAGE */}
      <section id="step-1" className="py-20 md:py-28 bg-[#0a0a0a] border-b border-white/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 1 Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Step 01 of 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Pick Your Core Package
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              Click any package below to start your quote. Every build comes with professional copywriting, blazing phone speed, and 100% full code ownership.
            </p>
          </div>

          {/* 3 Core Package Cards matching user's layout in dark industrial luxury home page styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier) => {
              const isSelected = selectedPackage === tier.name;
              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  onClick={() => setSelectedPackage(tier.name)}
                  className={`rounded-none p-8 flex flex-col justify-between transition-colors relative cursor-pointer ${
                    isSelected
                      ? 'bg-black border-2 border-purple-600 shadow-2xl shadow-purple-950/30'
                      : 'bg-black border border-white/15 hover:border-purple-600/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-none shadow-md z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>SELECTED PACKAGE</span>
                    </div>
                  )}

                  <div>
                    {/* Package Title */}
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                      {tier.name}
                    </h3>

                    {/* Price Lockup */}
                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-white/10">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        {tier.price}
                      </span>
                      <span className="text-xs uppercase font-semibold text-zinc-400">
                        ALL-IN FIXED
                      </span>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        INCLUDES:
                      </span>
                      {tier.coreFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Expandable Inclusions Dropdown */}
                      {expandedFeatures[tier.id] && (
                        <div className="pt-3 space-y-3 border-t border-white/10 mt-3 animate-fadeIn">
                          {tier.extraFeatures.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(tier.id);
                        }}
                        className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>{expandedFeatures[tier.id] ? 'Show less' : `+ ${tier.extraFeatures.length} more included features`}</span>
                        {expandedFeatures[tier.id] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Selection Action Button */}
                  <div className="pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(tier.name);
                        scrollToStep('step-2');
                      }}
                      className={`w-full py-3.5 px-6 rounded-none font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-[#141414] hover:bg-zinc-800 text-white border border-white/15'
                      }`}
                    >
                      <span>{isSelected ? '✓ SELECTED (NEXT: CARE) →' : `SELECT ${tier.name.toUpperCase()} →`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Comparison Table Toggle */}
          <div className="mt-12 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setShowFullMatrix(!showFullMatrix)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-black border border-white/15 hover:border-purple-600 text-zinc-200 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>{showFullMatrix ? 'HIDE TECHNICAL COMPARISON TABLE' : 'VIEW FULL TECHNICAL COMPARISON TABLE'}</span>
              {showFullMatrix ? (
                <ChevronUp className="w-4 h-4 text-purple-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-purple-400" />
              )}
            </button>

            {showFullMatrix && (
              <div className="w-full mt-10 overflow-x-auto rounded-none border border-white/15 bg-black p-4 sm:p-6 animate-fadeIn">
                <table className="w-full text-left text-sm sm:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 text-zinc-300 uppercase text-xs font-bold tracking-wider">
                      <th className="py-4 px-4 sm:px-6 font-semibold">Everything Included</th>
                      <th className="py-4 px-4 sm:px-6 text-center font-semibold text-zinc-300">Single-Page (£499)</th>
                      <th className="py-4 px-4 sm:px-6 text-center font-semibold text-purple-300 bg-purple-950/40">
                        Multi-Page (£799)
                      </th>
                      <th className="py-4 px-4 sm:px-6 text-center font-semibold text-zinc-300">Custom Suite (£1,199)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                    {/* Structure */}
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Number of Dedicated Pages</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-300">1 Focused Page</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-semibold bg-purple-950/20">Up to 5–6 Pages</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-semibold">8+ Custom Pages</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Target Turnaround Time</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-300">5–7 Working Days</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-semibold bg-purple-950/20">7–12 Working Days</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-semibold">10–18 Working Days</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Professional Copywriting &amp; Headlines Written For You</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Instant Page Load Guarantee (Google 90+ Score)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">100% Mobile &amp; Tablet Responsive Design</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Direct WhatsApp &amp; Phone Call Buttons</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Direct Email Lead Contact Form</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">100% Full Code &amp; Domain Ownership (No Lock-In)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">100% Yours</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">100% Yours</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">100% Yours</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Local Google Business &amp; Search Setup</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-300">Core Setup</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Full Google Maps &amp; Ranking Setup</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Multi-Town Google Ranking Setup</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Separate Service Breakdown Pages</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Dedicated service pages</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ In-depth breakdown for every service</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">"Areas We Cover" Regional SEO Section</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Multi-Location Pages</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Past Work Showcase &amp; Customer Review Section</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-300">Basic Section</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Photo gallery of past jobs</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Showcase for photos &amp; reviews</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Online Deposits, Card Payments or Appointment Booking</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Card payments &amp; online booking</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Custom shop catalogue or client area</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Simple Admin Login to Add Photos or Change Prices</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Custom business dashboard</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Personalized Video Walkthrough (How to Edit Anytime)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included + Onboarding</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Direct 1-on-1 Developer Access (Jordan &amp; Josh)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-300 font-bold bg-purple-950/20">✓ Included</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Priority Weekly Calls</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Interactive Instant Price Calculator for Customers</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">Available as Bolt-On (+£199)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included Bespoke</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Private Customer Login Area or Online Shop Catalogue</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">Available as Bolt-On (+£199)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold">✓ Included Bespoke</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/60 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-white">Instant WhatsApp / Text Alerts for New Leads</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">—</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-zinc-600">Available as Bolt-On (+£99)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-purple-400 font-bold rounded-b-2xl">✓ Included Bespoke</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STEP 2 SECTION: PICK YOUR ONGOING CARE */}
      <section id="step-2" className="py-20 md:py-28 bg-[#0a0a0a] border-b border-white/15 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 2 Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Step 02 of 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Pick Your Ongoing Care
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              Managed ultra-fast UK cloud hosting with SSL and backups. Simple monthly rolling agreements with zero contract lock-in — pause or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Hosting Option 1: £15 */}
            {(() => {
              const isSelected = selectedCare === 'Essential Care (£15/mo)';
              const planId = 'care-01';
              return (
                <div
                  id={planId}
                  onClick={() => setSelectedCare('Essential Care (£15/mo)')}
                  className={`rounded-none p-8 flex flex-col justify-between transition-colors relative cursor-pointer ${
                    isSelected
                      ? 'bg-black border-2 border-purple-600 shadow-2xl shadow-purple-950/30'
                      : 'bg-black border border-white/15 hover:border-purple-600/60'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-none shadow-md z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>SELECTED PLAN</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                      Essential Care
                    </h3>

                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-white/10">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        £15
                      </span>
                      <span className="text-xs uppercase font-semibold text-zinc-400">
                        /MO • ROLLING MONTHLY
                      </span>
                    </div>

                    {/* 5 Core Deliverables */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        INCLUDES:
                      </span>
                      {[
                        'Keeps your site online 24/7 on fast UK servers',
                        'Loads instantly on all mobile phones & 4G/5G',
                        'Free Google-trusted SSL padlock security',
                        'Daily automated cloud backups of your website',
                        'Rolling monthly agreement — cancel anytime with zero fees',
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Expandable Dropdown */}
                      {expandedFeatures[planId] && (
                        <div className="pt-3 space-y-3 border-t border-white/10 mt-3 animate-fadeIn">
                          {[
                            'Direct WhatsApp and phone developer support',
                            'No contract tie-in or cancellation penalties',
                            'Automatic DNS maintenance and domain routing',
                          ].map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(planId);
                        }}
                        className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>{expandedFeatures[planId] ? 'Show less' : '+ 3 more included features'}</span>
                        {expandedFeatures[planId] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Selection Button */}
                  <div className="pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCare('Essential Care (£15/mo)');
                        scrollToStep('step-3');
                      }}
                      className={`w-full py-3.5 px-6 rounded-none font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-[#141414] hover:bg-zinc-800 text-white border border-white/15'
                      }`}
                    >
                      <span>{isSelected ? '✓ SELECTED (NEXT: BOLT-ONS) →' : 'SELECT ESSENTIAL CARE →'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Hosting Option 2: £99 */}
            {(() => {
              const isSelected = selectedCare === 'Growth Care (£99/mo)';
              const planId = 'care-02';
              return (
                <div
                  id={planId}
                  onClick={() => setSelectedCare('Growth Care (£99/mo)')}
                  className={`rounded-none p-8 flex flex-col justify-between transition-colors relative cursor-pointer ${
                    isSelected
                      ? 'bg-black border-2 border-purple-600 shadow-2xl shadow-purple-950/30'
                      : 'bg-black border border-white/15 hover:border-purple-600/60'
                  }`}
                >
                  {!isSelected && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-zinc-300 border border-white/15 font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-none shadow-md z-10 whitespace-nowrap text-center">
                      DONE-FOR-YOU
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-none shadow-md z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>SELECTED PLAN</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                      Growth Care
                    </h3>

                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-white/10">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        £99
                      </span>
                      <span className="text-xs uppercase font-semibold text-zinc-400">
                        /MO • ROLLING MONTHLY
                      </span>
                    </div>

                    {/* 5 Core Deliverables */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        INCLUDES:
                      </span>
                      {[
                        'Includes everything in the £15/mo hosting tier',
                        'We upload your new project photos and client reviews',
                        'Monthly Google Maps & Business Profile checkups',
                        'Quick edits whenever your prices or services change',
                        'Rolling monthly agreement — cancel or pause anytime',
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Expandable Dropdown */}
                      {expandedFeatures[planId] && (
                        <div className="pt-3 space-y-3 border-t border-white/10 mt-3 animate-fadeIn">
                          {[
                            'Priority same-day responses directly from Jordan & Josh',
                            'Monthly review to ensure you stay ahead of local competitors',
                            'Zero hourly change fees or surprise charges',
                          ].map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(planId);
                        }}
                        className="mt-3 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <span>{expandedFeatures[planId] ? 'Show less' : '+ 3 more included features'}</span>
                        {expandedFeatures[planId] ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Selection Button */}
                  <div className="pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCare('Growth Care (£99/mo)');
                        scrollToStep('step-3');
                      }}
                      className={`w-full py-3.5 px-6 rounded-none font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-[#141414] hover:bg-zinc-800 text-white border border-white/15'
                      }`}
                    >
                      <span>{isSelected ? '✓ SELECTED (NEXT: BOLT-ONS) →' : 'SELECT GROWTH CARE →'}</span>
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* STEP 3 SECTION: ADD OPTIONAL BOLT-ONS */}
      <section id="step-3" className="py-20 md:py-28 bg-[#0a0a0a] border-b border-white/15 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 3 Header */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Step 03 of 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Add Optional Bolt-Ons
            </h2>
            <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
              Customize your build with extra conversion power or interactive tools. Completely optional — simple flat rates with zero retainers.
            </p>
          </div>

          {/* Friendly Skip Banner */}
          <div className="mb-8 p-4 sm:p-5 rounded-none bg-black border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Check className="w-4 h-4 text-purple-400 stroke-[3] shrink-0" />
              <span className="text-sm text-zinc-300 font-medium">
                No extras needed? Your core package already includes everything to launch.
              </span>
            </div>
            <button
              onClick={() => scrollToStep('quote-summary')}
              className="w-full sm:w-auto py-2.5 px-5 rounded-none bg-[#141414] hover:bg-zinc-800 border border-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              Skip straight to Quote →
            </button>
          </div>

          {/* 2 Clean Rate Columns (£99 vs £199) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Column 1: £99 */}
            <div className="p-8 bg-black border border-white/15">
              <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                    Quick Upgrades
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Essential Extras
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-3xl sm:text-4xl font-bold text-white">+£99</span>
                  <span className="text-[11px] text-zinc-400 block uppercase font-medium">EACH • FLAT FEE</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    name: 'Direct WhatsApp & Text Alerts (+£99)',
                    title: 'Direct WhatsApp & Text Alerts',
                    desc: 'Instant notifications sent to your mobile phone so you never miss a new customer lead.',
                  },
                  {
                    name: 'Local Town Google Pages (+£99)',
                    title: 'Local Town Google Pages',
                    desc: 'Extra pages built to rank in neighbouring towns so nearby customers find you first.',
                  },
                  {
                    name: 'Visitor Stats & Click Maps (+£99)',
                    title: 'Visitor Stats & Click Maps',
                    desc: 'See how many people visit your website each week and which buttons they tap most.',
                  },
                ].map((item) => {
                  const isChecked = selectedBoltOns.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleBoltOn(item.name)}
                      className={`p-4 rounded-none border transition-colors cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-[#141414] border-purple-600'
                          : 'bg-black border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-none flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-purple-600 text-white'
                            : 'border border-white/30 bg-black'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white block text-sm">
                          {item.title}
                        </span>
                        <span className="text-xs text-zinc-400 leading-relaxed block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: £199 */}
            <div className="p-8 bg-black border border-white/15">
              <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                    Custom Features
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Interactive Tools
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-3xl sm:text-4xl font-bold text-white">+£199</span>
                  <span className="text-[11px] text-zinc-400 block uppercase font-medium">EACH • FLAT FEE</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    name: 'Instant Online Price Calculator (+£199)',
                    title: 'Instant Online Price Calculator',
                    desc: 'Lets customers choose their job specs and get an instant estimate before they call you.',
                  },
                  {
                    name: 'Card Payments & Online Booking (+£199)',
                    title: 'Card Payments & Online Booking',
                    desc: 'Allow customers to choose appointment dates and pay deposits by card or phone.',
                  },
                  {
                    name: 'Client Login Area or Online Store (+£199)',
                    title: 'Client Login Area or Online Store',
                    desc: 'A private area for clients to view quotes and documents, or an online product shop.',
                  },
                ].map((item) => {
                  const isChecked = selectedBoltOns.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleBoltOn(item.name)}
                      className={`p-4 rounded-none border transition-colors cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-[#141414] border-purple-600'
                          : 'bg-black border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-none flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? 'bg-purple-600 text-white'
                            : 'border border-white/30 bg-black'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white block text-sm">
                          {item.title}
                        </span>
                        <span className="text-xs text-zinc-400 leading-relaxed block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quick jump to your package summary */}
          <div className="mt-12 text-center">
            <button
              onClick={() => scrollToStep('quote-summary')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Review Your Selected Build &amp; Send →</span>
            </button>
          </div>
        </div>
      </section>

      {/* STEP 4 / SUMMARY SECTION: INSTANT QUOTE */}
      <section id="quote-summary" className="py-20 md:py-28 bg-[#0a0a0a] border-b border-white/15 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Ready to Build
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Get Your Instant Quote
            </h2>
            <p className="mt-3 text-zinc-300 text-base leading-relaxed">
              We've pre-filled your selections below. Send them directly to Jordan &amp; Josh to check availability and lock in your build date.
            </p>
          </div>

          <div className="bg-black border border-white/15 rounded-none p-7 sm:p-10 shadow-xl">
            
            {/* Minimalist Live Selection & Total Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Selected Build
                </span>
                <p className="text-xl font-bold text-white tracking-tight">
                  {selectedPackage} Website
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  {selectedCare} • {selectedBoltOns.length > 0 ? `${selectedBoltOns.length} extra${selectedBoltOns.length > 1 ? 's' : ''}` : 'Standard setup'}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    £{oneOffTotal}
                  </span>
                  <span className="text-xs font-semibold uppercase text-zinc-400">fixed</span>
                </div>
                <span className="text-xs text-purple-300 font-medium block mt-1">
                  + £{monthlyPrice}/mo care • 50% deposit (£{depositAmount}) to start
                </span>
              </div>
            </div>

            {/* Submission Form or Success Message */}
            {isFormSubmitted ? (
              <div className="text-center py-10 animate-fadeIn">
                <div className="w-14 h-14 rounded-none bg-purple-600/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quote Request Sent!</h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-md mx-auto mb-6">
                  Jordan &amp; Josh have received your specifications and will review and reply within a couple of hours.
                </p>
                <button
                  onClick={() => setIsFormSubmitted(false)}
                  className="text-xs uppercase tracking-wider text-purple-400 hover:text-purple-300 font-bold underline cursor-pointer"
                >
                  Edit or send another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsFormSubmitting(true);
                  setTimeout(() => {
                    setIsFormSubmitting(false);
                    setIsFormSubmitted(true);
                  }, 600);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dave Miller"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-[#0a0a0a] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 07983 123456"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-[#0a0a0a] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. dave@millerplumbing.co.uk"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-[#0a0a0a] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    Project Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a little bit about your trade, town, or goal..."
                    value={leadForm.notes}
                    onChange={(e) => setLeadForm({ ...leadForm, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-[#0a0a0a] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-600 transition-colors text-sm resize-none"
                  />
                </div>

                {/* Single Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full py-3.5 px-6 rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isFormSubmitting ? 'Sending Quote Details...' : 'Send Fast Quote Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* WhatsApp Alternative */}
                {(() => {
                  const waText = encodeURIComponent(
                    `Hi Jordan & Josh, I've configured a website quote on your packages page!\n\n` +
                    `• Package: ${selectedPackage} (£${packagePrice})\n` +
                    `• Care: ${selectedCare}\n` +
                    (selectedBoltOns.length > 0 ? `• Bolt-Ons: ${selectedBoltOns.join(', ')}\n` : '') +
                    `• Total: £${oneOffTotal} (50% Deposit: £${depositAmount})\n` +
                    `• Hosting: £${monthlyPrice}/mo\n` +
                    (leadForm.name ? `• Name: ${leadForm.name}\n` : '') +
                    (leadForm.notes ? `• Details: ${leadForm.notes}\n` : '') +
                    `\nCan you let me know your current availability?`
                  );

                  return (
                    <div className="text-center pt-2">
                      <a
                        href={`https://wa.me/447983145311?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Or send directly via WhatsApp</span>
                      </a>
                    </div>
                  );
                })()}

                <p className="text-center text-[11px] text-zinc-500 pt-3 border-t border-white/10">
                  Zero spam • Direct reply from Jordan &amp; Josh • 100% fixed pricing guarantee
                </p>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 md:py-28 bg-black border-b border-white/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-300 text-base sm:text-lg">
              Straight answers on deposits, code ownership, turnaround times, and hosting.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/15 rounded-none overflow-hidden bg-[#0a0a0a] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 font-bold text-base sm:text-lg text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/60"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-purple-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-zinc-300 border-t border-white/10 bg-black leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center p-6 rounded-none bg-[#0a0a0a] border border-white/15">
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

      {/* 5. BOTTOM ACTION STRIP */}
      <section className="py-20 md:py-28 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to lock in your build?
          </h2>
          <p className="mt-3 text-zinc-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We limit active builds to two projects at a time to ensure rapid turnaround and direct developer attention.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectTierAndQuote('Tier 02: Multi-Page Business Suite (£799)')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Your Fast Quote Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh,%20I'd%20like%20to%20discuss%20a%20website%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-none bg-black hover:bg-zinc-900 text-white border border-white/20 hover:border-white/30 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
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
