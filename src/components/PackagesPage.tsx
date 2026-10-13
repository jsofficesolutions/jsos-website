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
    <div className="bg-zinc-950 text-zinc-100 flex flex-col selection:bg-purple-600 selection:text-white relative">
      {/* Minimal Vertical Journey Progress Stepper (Left-docked) */}
      <div
        className={`fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-start gap-4 transition-all duration-500 pointer-events-auto ${
          activeStep > 0
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
      >
        <div className="p-3.5 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 shadow-2xl relative w-full">
          {/* Continuous vertical track & fill line */}
          <div className="absolute left-[26px] lg:left-[26px] top-6 bottom-6 w-0.5 bg-zinc-800 -z-0">
            <div
              className="w-full bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-500 transition-all duration-300 rounded-full"
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
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
                      isCurrent
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/80 scale-110 ring-2 ring-purple-400'
                        : isCompleted
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/60 shadow-sm'
                        : 'bg-zinc-900 text-zinc-500 border border-zinc-800 group-hover:text-zinc-300 group-hover:border-zinc-700'
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
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Live Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-white">£{oneOffTotal}</span>
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
          className="w-full p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white shadow-xl shadow-purple-950/60 ring-2 ring-purple-400/50 hover:ring-purple-300 transition-all duration-200 group flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <PhoneCall className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="hidden lg:block whitespace-nowrap text-left pr-1 leading-snug">
            <span className="text-xs font-black uppercase tracking-wider text-white block">
              UNSURE?
            </span>
            <span className="text-xs font-black text-white tracking-tight block">
              07983 145311
            </span>
          </div>
        </a>
      </div>

      {/* 1. VISUAL STEP-BY-STEP HERO GUIDE */}
      <section className="pt-16 pb-20 md:pt-20 md:pb-24 bg-zinc-950 relative overflow-hidden flex flex-col justify-between">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[520px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">

          {/* Clean Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight">
            How it works
          </h1>

          {/* Pink/Purple Subtitle Badge */}
          <div className="mt-4 flex items-center justify-center gap-2.5 text-base sm:text-lg font-bold text-pink-400 tracking-wide">
            <Clock className="w-5 h-5 text-pink-400" />
            <span>Ready in 1 Week or Less</span>
          </div>

          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            A simple 3-step journey to choose your package, hosting, and optional extras with zero technical jargon.
          </p>

          {/* 3 Balanced Centered Steps */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 text-center">

            {/* Step 1: Package Foundation */}
            <div
              onClick={() => scrollToStep('step-1')}
              className="group cursor-pointer flex flex-col items-center luxury-step-1"
            >
              {/* Soft Circular Icon Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-purple-500/15 via-purple-500/10 to-transparent border border-purple-500/25 group-hover:border-purple-400/70 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-xl shadow-purple-950/35 mb-5 relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-0.5 shadow-md">
                  <div className="w-full h-full bg-zinc-950/80 rounded-[14px] flex items-center justify-center">
                    <Layers className="w-6 h-6 text-purple-200" />
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5 group-hover:text-purple-300 transition-colors">
                1. Pick a Package
              </h2>
              <p className="text-sm text-zinc-400 font-medium">
                From £499 • Fixed price
              </p>
            </div>

            {/* Step 2: Ongoing Care */}
            <div
              onClick={() => scrollToStep('step-2')}
              className="group cursor-pointer flex flex-col items-center luxury-step-2"
            >
              {/* Soft Circular Icon Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-pink-500/15 via-purple-500/10 to-transparent border border-pink-500/25 group-hover:border-pink-400/70 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-xl shadow-purple-950/35 mb-5 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-zinc-950/80 rounded-full flex items-center justify-center">
                    <Server className="w-6 h-6 text-pink-200" />
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5 group-hover:text-pink-300 transition-colors">
                2. Choose Ongoing Care
              </h2>
              <p className="text-sm text-zinc-400 font-medium">
                From £15/mo • Cancel anytime
              </p>
            </div>

            {/* Step 3: Bolt-ons */}
            <div
              onClick={() => scrollToStep('step-3')}
              className="group cursor-pointer flex flex-col items-center luxury-step-3"
            >
              {/* Soft Circular Icon Container */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-purple-500/15 via-indigo-500/10 to-transparent border border-purple-500/25 group-hover:border-purple-400/70 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-xl shadow-purple-950/35 mb-5 relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-400 p-0.5 shadow-md">
                  <div className="w-full h-full bg-zinc-950/80 rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-pink-200" />
                  </div>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1.5 group-hover:text-purple-300 transition-colors">
                3. Add Bolt-Ons
              </h2>
              <p className="text-sm text-zinc-400 font-medium">
                Optional extras • Skip anytime
              </p>
            </div>

          </div>

          {/* Gentle Scroll Cue Arrow */}
          <div className="mt-12 sm:mt-14 flex flex-col items-center justify-center">
            <button
              onClick={() => scrollToStep('step-1')}
              aria-label="Scroll to step 1"
              className="group flex flex-col items-center gap-1.5 text-zinc-500 hover:text-purple-400 transition-colors cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-purple-300 transition-colors">
                Start Step 1
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce text-zinc-400 group-hover:text-purple-400 transition-colors" />
            </button>
          </div>
        </div>
      </section>

      {/* STEP 1 SECTION: PICK YOUR CORE PACKAGE */}
      <section id="step-1" className="py-16 md:py-24 bg-zinc-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 1 Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-widest block mb-2">
              Step 01 of 03
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Pick Your Core Package
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
              Click any package below to start your quote. Every build comes with professional copywriting, blazing phone speed, and 100% full code ownership.
            </p>
          </div>

          {/* 3 Core Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
            {tiers.map((tier) => {
              const isSelected = selectedPackage === tier.name;
              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  onClick={() => setSelectedPackage(tier.name)}
                  className={`rounded-3xl p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-950/70 via-zinc-900/95 to-zinc-900/95 text-white border-2 border-purple-500 shadow-2xl shadow-purple-950/50 relative md:-translate-y-2'
                      : 'bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-800/80 hover:border-zinc-700 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {tier.popular && !isSelected && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-300 border border-zinc-700 font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center">
                      {tier.highlightTag || 'Recommended'}
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Package</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4">
                      {tier.name}
                    </h3>

                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-zinc-800/80">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        {tier.price}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-purple-300' : 'text-zinc-400'
                        }`}
                      >
                        all-in fixed
                      </span>
                    </div>

                    {/* 5 Key Services / Features */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        Includes:
                      </span>
                      {tier.coreFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-purple-400" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Tempting Expandable Inclusions Dropdown */}
                      {expandedFeatures[tier.id] && (
                        <div className="pt-3 space-y-3 border-t border-zinc-800/60 mt-3 animate-fadeIn">
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(tier.id);
                        }}
                        className="mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
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
                  <div className="pt-6 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(tier.name);
                        scrollToStep('step-2');
                      }}
                      className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-purple-950/80 ring-2 ring-purple-400'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      <span>{isSelected ? '✓ Selected (Next: Care)' : `Select ${tier.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Comparison Table Toggle */}
          <div className="mt-14 flex flex-col items-center">
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
              <div className="w-full mt-10 overflow-x-auto rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-2 sm:p-4 shadow-2xl animate-fadeIn">
                <table className="w-full text-left text-sm sm:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-300 uppercase text-xs font-bold tracking-wider">
                      <th className="py-4 px-4 sm:px-6 font-semibold">Everything Included</th>
                      <th className="py-4 px-4 sm:px-6 text-center font-semibold text-zinc-300">Single-Page (£499)</th>
                      <th className="py-4 px-4 sm:px-6 text-center font-semibold text-purple-300 bg-purple-950/40 rounded-t-2xl">
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
      <section id="step-2" className="py-16 md:py-24 bg-zinc-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 2 Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-widest block mb-2">
              Step 02 of 03
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Pick Your Ongoing Care
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
              Managed ultra-fast UK cloud hosting with SSL and backups. Simple monthly rolling agreements with zero contract lock-in — pause or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Hosting Option 1: £15 */}
            {(() => {
              const isSelected = selectedCare === 'Essential Care (£15/mo)';
              const planId = 'care-01';
              return (
                <div
                  id={planId}
                  onClick={() => setSelectedCare('Essential Care (£15/mo)')}
                  className={`rounded-3xl p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-950/70 via-zinc-900/95 to-zinc-900/95 text-white border-2 border-purple-500 shadow-2xl shadow-purple-950/50 relative md:-translate-y-2'
                      : 'bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-800/80 hover:border-zinc-700 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Plan</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4">
                      Essential Care
                    </h3>

                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-zinc-800/80">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        £15
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-purple-300' : 'text-zinc-400'
                        }`}
                      >
                        /mo • rolling monthly
                      </span>
                    </div>

                    {/* 5 Core Deliverables */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        Includes:
                      </span>
                      {[
                        'Keeps your site online 24/7 on fast UK servers',
                        'Loads instantly on all mobile phones & 4G/5G',
                        'Free Google-trusted SSL padlock security',
                        'Daily automated cloud backups of your website',
                        'Rolling monthly agreement — cancel anytime with zero fees',
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-purple-400" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Tempting Expandable Dropdown */}
                      {expandedFeatures[planId] && (
                        <div className="pt-3 space-y-3 border-t border-zinc-800/60 mt-3 animate-fadeIn">
                          {[
                            'Direct WhatsApp and phone developer support',
                            'No contract tie-in or cancellation penalties',
                            'Automatic DNS maintenance and domain routing',
                          ].map((feat, idx) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(planId);
                        }}
                        className="mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
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
                  <div className="pt-6 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCare('Essential Care (£15/mo)');
                        scrollToStep('step-3');
                      }}
                      className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-purple-950/80 ring-2 ring-purple-400'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      <span>{isSelected ? '✓ Selected (Next: Bolt-Ons)' : 'Select Essential Care'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
                  className={`rounded-3xl p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-950/70 via-zinc-900/95 to-zinc-900/95 text-white border-2 border-purple-500 shadow-2xl shadow-purple-950/50 relative md:-translate-y-2'
                      : 'bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-800/80 hover:border-zinc-700 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {!isSelected && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-300 border border-zinc-700 font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center">
                      Done-For-You
                    </div>
                  )}

                  {isSelected && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Selected Plan</span>
                    </div>
                  )}

                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4">
                      Growth Care
                    </h3>

                    <div className="mb-6 flex items-baseline gap-2 pb-6 border-b border-zinc-800/80">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                        £99
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isSelected ? 'text-purple-300' : 'text-zinc-400'
                        }`}
                      >
                        /mo • rolling monthly
                      </span>
                    </div>

                    {/* 5 Core Deliverables */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        Includes:
                      </span>
                      {[
                        'Includes everything in the £15/mo hosting tier',
                        'We upload your new project photos and client reviews',
                        'Monthly Google Maps & Business Profile checkups',
                        'Quick edits whenever your prices or services change',
                        'Rolling monthly agreement — cancel or pause anytime',
                      ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-purple-400" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}

                      {/* Tempting Expandable Dropdown */}
                      {expandedFeatures[planId] && (
                        <div className="pt-3 space-y-3 border-t border-zinc-800/60 mt-3 animate-fadeIn">
                          {[
                            'Priority same-day responses directly from Jordan & Josh',
                            'Monthly review to ensure you stay ahead of local competitors',
                            'Zero hourly change fees or surprise charges',
                          ].map((feat, idx) => (
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
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatures(planId);
                        }}
                        className="mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 cursor-pointer pt-1"
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
                  <div className="pt-6 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCare('Growth Care (£99/mo)');
                        scrollToStep('step-3');
                      }}
                      className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-purple-950/80 ring-2 ring-purple-400'
                          : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                      }`}
                    >
                      <span>{isSelected ? '✓ Selected (Next: Bolt-Ons)' : 'Select Growth Care'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* STEP 3 SECTION: ADD OPTIONAL BOLT-ONS */}
      <section id="step-3" className="py-16 md:py-24 bg-zinc-950 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Step 3 Header */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-widest block mb-2">
              Step 03 of 03
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Add Optional Bolt-Ons
            </h2>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
              Customize your build with extra conversion power or interactive tools. Completely optional — simple flat rates with zero retainers.
            </p>
          </div>

          {/* Friendly Skip Banner */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-sm text-zinc-300 font-medium">
                No extras needed? Your core package already includes everything to launch.
              </span>
            </div>
            <button
              onClick={() => scrollToStep('quote-summary')}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              Skip straight to Quote →
            </button>
          </div>

          {/* 2 Clean Rate Columns (£99 vs £199) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Column 1: £99 */}
            <div className="p-8 sm:p-9 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
              <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-zinc-800/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                    Quick Upgrades
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Essential Extras
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-3xl sm:text-4xl font-black text-white">+£99</span>
                  <span className="text-[11px] text-zinc-400 block font-medium">each • flat fee</span>
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
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-purple-950/40 border-purple-500/80 shadow-md'
                          : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? 'bg-purple-600 text-white'
                            : 'border border-zinc-700 bg-zinc-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white block text-sm sm:text-base">
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
            <div className="p-8 sm:p-9 rounded-3xl bg-zinc-900/40 border border-purple-500/40 relative">
              <div className="flex items-baseline justify-between gap-4 pb-6 border-b border-zinc-800/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
                    Custom Features
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Interactive Tools
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-3xl sm:text-4xl font-black text-white">+£199</span>
                  <span className="text-[11px] text-purple-300/80 block font-medium">each • flat fee</span>
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
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'bg-purple-950/40 border-purple-500/80 shadow-md'
                          : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? 'bg-purple-600 text-white'
                            : 'border border-zinc-700 bg-zinc-800'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-white block text-sm sm:text-base">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-purple-950/50 cursor-pointer"
            >
              <span>Review Your Selected Build &amp; Send →</span>
            </button>
          </div>
        </div>
      </section>

      {/* STEP 4 / SUMMARY SECTION: INSTANT QUOTE */}
      <section id="quote-summary" className="py-20 md:py-28 bg-zinc-950 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest block mb-2">
              Ready to Build
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Get Your Instant Quote
            </h2>
            <p className="mt-3 text-zinc-400 text-base leading-relaxed">
              We've pre-filled your selections below. Send them directly to Jordan &amp; Josh to check availability and lock in your build date.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-7 sm:p-10 backdrop-blur-sm shadow-xl">
            
            {/* Minimalist Live Selection & Total Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-zinc-800/80 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-1">
                  Selected Build
                </span>
                <p className="text-lg font-bold text-white tracking-tight">
                  {selectedPackage} Website
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  {selectedCare} • {selectedBoltOns.length > 0 ? `${selectedBoltOns.length} extra${selectedBoltOns.length > 1 ? 's' : ''}` : 'Standard setup'}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
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
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Quote Request Sent!</h3>
                <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-6">
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
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
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
                      className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                  />
                </div>

                {/* Single Primary Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-purple-950/60 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isFormSubmitting ? 'Sending Quote Details...' : 'Send Fast Quote Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtle WhatsApp Alternative */}
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

                <p className="text-center text-[11px] text-zinc-500 pt-3 border-t border-zinc-800/60">
                  Zero spam • Direct reply from Jordan &amp; Josh • 100% fixed pricing guarantee
                </p>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-purple-400 text-xs sm:text-sm font-bold uppercase tracking-widest block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-zinc-400 text-base sm:text-lg">
              Straight answers on deposits, code ownership, turnaround times, and hosting.
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

          <div className="mt-12 text-center p-7 rounded-2xl bg-zinc-900/30 border border-zinc-800">
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-purple-950/20 to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Ready to lock in your build?
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
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
