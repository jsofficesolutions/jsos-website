import React, { useState } from 'react';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PackagesPage } from './components/PackagesPage';
import { ConsultationModal } from './components/ConsultationModal';
import { ProjectModal } from './components/ProjectModal';
import { LegalModal } from './components/LegalModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { HeroPhone } from './components/HeroPhone';
import { CaseStudy } from './types';

const RECENT_BUILDS: CaseStudy[] = [
  {
    id: 'parkers-commercial',
    title: "Parker's Commercial",
    category: 'COMMERCIAL CONTRACTS • 12-DAY BUILD',
    tagline: 'Authority-commanding corporate hub for London & Essex commercial facilities.',
    description:
      'Built to win multi-site commercial cleaning contracts across London & Essex instead of one-off domestic jobs.',
    pageSpeedBefore: 48,
    pageSpeedAfter: 100,
    keyMetric: '100/100 Google Speed Score',
    keyResult: '100/100 Google Speed Score',
    turnaroundTime: '12 Days Turnaround',
    url: 'https://parkerscommercial.co.uk',
    imageSrc: '/images/parkers-commercial-desktop.webp',
    features: [
      '100/100 Google speed score — loads instantly on mobile',
      'Direct site-survey booking form routed straight to the director',
      'Positioned to win £10k+ annual commercial facility contracts',
    ],
    clientQuote:
      'Corporate clients comment on how crisp and fast the website is before our first meeting. It established immediate trust.',
    clientAuthor: 'Marcus Parker, Director',
    accentColor: '#1e1b4b',
  },
  {
    id: 'vistapure',
    title: 'VistaPure Exterior Cleaning',
    category: 'EXTERIOR TRADE • 8-DAY BUILD',
    tagline: 'Dominating local Essex search rankings for high-margin exterior cleaning contracts.',
    description:
      'Engineered to turn local Essex Google searches into same-day phone calls and WhatsApp driveway quotes.',
    pageSpeedBefore: 52,
    pageSpeedAfter: 99,
    keyMetric: '#1 Google Maps 3-Pack',
    keyResult: '#1 Google Maps 3-Pack',
    turnaroundTime: '8 Days Turnaround',
    url: 'https://vistapure.co.uk',
    imageSrc: '/images/vistapure-desktop.webp',
    features: [
      '#1 in the local Google Maps 3-Pack for target service areas',
      'Sticky 1-tap WhatsApp and phone call bar on mobile',
      'Before-and-after job galleries that prove quality in seconds',
    ],
    clientQuote:
      'We jumped straight into the top 3 on Google Maps. The phone has not stopped ringing with driveway and commercial cleaning enquiries.',
    clientAuthor: 'Darren Cole, Operations Lead',
    accentColor: '#065f46',
  },
  {
    id: 'sb-floristry',
    title: 'SB Floristry',
    category: 'LOCAL RETAIL & DELIVERY • 10-DAY BUILD',
    tagline: 'High-conversion bespoke boutique with recurring subscription orders.',
    description:
      'Replaced slow Instagram DMs and a clunky template with a fast mobile shop that tripled online flower orders.',
    pageSpeedBefore: 54,
    pageSpeedAfter: 99,
    keyMetric: '3x Direct Online Orders',
    keyResult: '3x Direct Online Orders',
    turnaroundTime: '10 Days Turnaround',
    url: 'https://sbfloristry.co.uk',
    imageSrc: '/images/sbfloristry-desktop.webp',
    features: [
      '3x more direct online orders within the first 30 days',
      '1-tap Apple Pay and Google Pay mobile checkout',
      'Custom subscription ordering with zero monthly platform commission',
    ],
    clientQuote:
      'Online flower orders tripled within the first month. Our customers constantly praise how quick and beautiful the ordering experience is on mobile.',
    clientAuthor: 'Sophie Bennett, Founder',
    accentColor: '#701a75',
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'packages'>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [selectedServiceTier, setSelectedServiceTier] = useState<string>('Multi-Page (£799)');

  const navigateToPackages = () => {
    setCurrentPage('packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuoteWithPackage = (tierName?: string) => {
    if (tierName) {
      setSelectedServiceTier(tierName);
    }
    setIsConsultationOpen(true);
  };

  const handleTriggerQuoteFromModal = () => {
    setSelectedProject(null);
    setIsConsultationOpen(true);
  };

  const scrollToFaq = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-purple-600 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navigation
        onOpenConsultation={() => openQuoteWithPackage()}
        onOpenScheduleAudit={() => openQuoteWithPackage()}
        onOpenFAQ={scrollToFaq}
        currentView={currentPage}
        currentPage={currentPage}
        onNavigateHome={navigateHome}
        onNavigatePackages={navigateToPackages}
        onNavigatePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {currentPage === 'packages' ? (
          <PackagesPage
            onSelectTierAndQuote={(tier) => {
              openQuoteWithPackage(tier);
            }}
            onOpenScheduleAudit={() => openQuoteWithPackage()}
            onNavigateHome={navigateHome}
          />
        ) : (
          <>
            {/* 1. HERO SECTION */}
            <section className="bg-black pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/15 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  
                  {/* Left Column: Direct-Response Copy */}
                  <div className="lg:col-span-7 space-y-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                      Websites Built to Bring You More Calls, Quotes, and Paid Work.
                    </h1>

                    <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-xl">
                      Fast, mobile-first websites for London &amp; Essex trades. Live in 7 days from £499 fixed.
                    </p>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        onClick={navigateToPackages}
                        className="rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base px-7 py-3.5 transition-colors text-center cursor-pointer"
                      >
                        See Fixed-Price Packages
                      </button>

                      <a
                        href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh%2C%20I%27m%20interested%20in%20a%20fixed-price%20website."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-none bg-[#0a0a0a] hover:bg-zinc-900 border border-white/20 text-white font-semibold text-base px-7 py-3.5 transition-colors flex items-center justify-center gap-2.5 text-center"
                      >
                        <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                        <span>WhatsApp Jordan &amp; Josh</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Interactive 3D Phone Preview */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <HeroPhone />
                  </div>

                </div>
              </div>
            </section>

            {/* 2. PROOF / PORTFOLIO SECTION */}
            <section id="work" className="bg-[#0a0a0a] py-24 md:py-32 border-b border-white/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14">
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                    Real Builds. Real Commercial Results.
                  </h2>
                  <p className="text-lg text-zinc-300 max-w-2xl">
                    Tap any project below to inspect the live website and test how fast it loads on your phone.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {RECENT_BUILDS.map((build) => (
                    <div
                      key={build.id}
                      className="bg-black border border-white/15 hover:border-purple-600 rounded-none transition-colors flex flex-col justify-between p-6 sm:p-8"
                    >
                      <div>
                        <div className="uppercase text-xs font-bold tracking-wider text-zinc-300 mb-2">
                          {build.category}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {build.title}
                        </h3>
                        <p className="text-zinc-200 text-sm leading-relaxed mb-6">
                          {build.description}
                        </p>

                        <div className="space-y-2.5 mb-8 border-t border-white/10 pt-4">
                          {build.features.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
                        <button
                          onClick={() => setSelectedProject(build)}
                          className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>See Build Breakdown &rarr;</span>
                        </button>

                        {build.url && (
                          <a
                            href={build.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs uppercase font-semibold tracking-wider text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1"
                          >
                            <span>Inspect Live Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. THE MECHANISM SECTION */}
            <section className="bg-black py-24 md:py-32 border-b border-white/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14">
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                    Why Our Sites Pay For Themselves.
                  </h2>
                  <p className="text-lg text-zinc-300 max-w-2xl">
                    Most web designers build digital brochures that sit there doing nothing. We build lead-capture engines.
                  </p>
                </div>

                {/* 2x2 1px Architectural Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/15">
                  {/* Cell 01 */}
                  <div className="p-8 sm:p-10 border-r border-b border-white/15">
                    <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3">
                      01 / 3-SECOND CLARITY
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      Instant Local Trust
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      Customers see what you do, the exact towns you cover, and real photos of your work within 3 seconds of landing.
                    </p>
                  </div>

                  {/* Cell 02 */}
                  <div className="p-8 sm:p-10 border-r border-b border-white/15">
                    <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3">
                      02 / MORE ENQUIRIES
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      1-Tap Call &amp; WhatsApp
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      No buried contact pages. Call and WhatsApp buttons follow the customer down the screen so they can hire you with one thumb tap.
                    </p>
                  </div>

                  {/* Cell 03 */}
                  <div className="p-8 sm:p-10 border-r border-b border-white/15">
                    <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3">
                      03 / LOCAL GOOGLE RANKINGS
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      Built for Local Searches
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      Structured with dedicated service and town headings so your business shows up when locals search for your trade.
                    </p>
                  </div>

                  {/* Cell 04 */}
                  <div className="p-8 sm:p-10 border-r border-b border-white/15">
                    <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3">
                      04 / ZERO HEADACHES
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      We Write All The Words
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      Don’t waste your Sunday trying to write website text. Tell us what jobs you want more of—we write, build, and launch everything.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. OFFER ALIGNMENT / PRICING LEDGER */}
            <section id="pricing" className="bg-[#0a0a0a] py-24 md:py-32 border-b border-white/15">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                      Fixed Upfront Pricing. Zero Surprises.
                    </h2>
                    <p className="text-lg text-zinc-300 max-w-2xl">
                      Pay 50% to book your build slot, and the final 50% only when your website is finished and approved.
                    </p>
                  </div>

                  <button
                    onClick={navigateToPackages}
                    className="text-sm uppercase font-semibold tracking-wider text-purple-400 hover:text-purple-300 inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
                  >
                    <span>Use Interactive Quote Builder &rarr;</span>
                  </button>
                </div>

                {/* 3-Column Pricing Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Tier 1 */}
                  <div className="bg-black border border-white/15 p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-zinc-300 mb-2">
                        SINGLE-PAGE BUILD &bull; LIVE IN 5–7 DAYS
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Single-Page
                      </h3>
                      <div className="my-4">
                        <span className="text-4xl font-black text-white">£499</span>
                        <span className="text-xs uppercase font-semibold tracking-wider text-zinc-400 ml-2">all-in fixed</span>
                      </div>
                      <p className="text-zinc-300 text-sm mb-6">
                        For solo trades and new businesses needing a sharp, credible base that turns searches into calls.
                      </p>

                      <div className="space-y-3 mb-8 border-t border-white/15 pt-6 text-sm text-zinc-200">
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Everything on one clear, high-converting page</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>We write all your headlines and service copy for you</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Sticky tap-to-call, WhatsApp &amp; fast email quote form</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>100% ownership of your website and domain name</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openQuoteWithPackage('Single-Page (£499)')}
                      className="w-full rounded-none bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
                    >
                      Choose Single-Page (£499)
                    </button>
                  </div>

                  {/* Tier 2 (Most Popular) */}
                  <div className="bg-black border-2 border-purple-600 p-8 flex flex-col justify-between relative shadow-2xl">
                    <div className="absolute -top-3 left-8 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                      MOST POPULAR WITH TRADES &bull; LIVE IN 7–10 DAYS
                    </div>

                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-2">
                        FLAGSHIP ENGINE
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Multi-Page
                      </h3>
                      <div className="my-4">
                        <span className="text-4xl font-black text-white">£799</span>
                        <span className="text-xs uppercase font-semibold tracking-wider text-zinc-400 ml-2">all-in fixed</span>
                      </div>
                      <p className="text-zinc-300 text-sm mb-6">
                        For established trades wanting separate pages for each service and town to dominate local Google searches.
                      </p>

                      <div className="space-y-3 mb-8 border-t border-white/15 pt-6 text-sm text-zinc-200">
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Up to 6 custom pages (Services, Areas Covered, Gallery, Reviews)</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Local Google Maps &amp; service-area SEO setup included</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Take customer bookings, card deposits, or quote requests</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Simple login to upload new job photos or update prices anytime</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openQuoteWithPackage('Multi-Page (£799)')}
                      className="w-full rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
                    >
                      Choose Multi-Page (£799)
                    </button>
                  </div>

                  {/* Tier 3 */}
                  <div className="bg-black border border-white/15 p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-zinc-300 mb-2">
                        FULL SYSTEM &bull; LIVE IN 10–14 DAYS
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Custom Suite
                      </h3>
                      <div className="my-4">
                        <span className="text-4xl font-black text-white">£1,199</span>
                        <span className="text-xs uppercase font-semibold tracking-wider text-zinc-400 ml-2">all-in fixed</span>
                      </div>
                      <p className="text-zinc-300 text-sm mb-6">
                        For growing companies wanting automated quote calculators, multi-town SEO pages, or online payments.
                      </p>

                      <div className="space-y-3 mb-8 border-t border-white/15 pt-6 text-sm text-zinc-200">
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>8+ custom pages built to rank across multiple Essex/London towns</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Interactive instant price calculator or online shop included</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Automated text &amp; email alerts the second a lead enquires</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>Private admin screen to track and manage every customer quote</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => openQuoteWithPackage('Custom Suite (£1,199)')}
                      className="w-full rounded-none bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-white font-semibold text-sm uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
                    >
                      Choose Custom Suite (£1,199)
                    </button>
                  </div>
                </div>

                {/* Optional Care Bar */}
                <div className="mt-8 p-6 sm:p-8 bg-black border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-white">
                      Optional UK Hosting &amp; Ongoing Care — From £15/month
                    </div>
                    <p className="text-sm text-zinc-300 mt-1 max-w-2xl">
                      Fast UK servers, SSL padlock security, daily backups, and direct WhatsApp support from £15/mo (or £99/mo with unlimited photo/price updates). Rolling monthly—cancel anytime.
                    </p>
                  </div>

                  <button
                    onClick={navigateToPackages}
                    className="shrink-0 rounded-none bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-zinc-200 hover:text-white px-5 py-3 text-xs uppercase font-semibold tracking-wider cursor-pointer"
                  >
                    Customize Package &amp; Bolt-Ons &rarr;
                  </button>
                </div>
              </div>
            </section>

            {/* 5. FRICTIONLESS FAQ SECTION */}
            <section id="faq" className="bg-black py-24 md:py-32 border-b border-white/15">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14">
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                    Straight Answers.
                  </h2>
                  <p className="text-lg text-zinc-300">
                    No jargon. No agency runaround. Here is exactly how we work.
                  </p>
                </div>

                {/* 2-Column Ledger */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="border-t border-white/15 pt-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      How much of my time does this take?
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      About 20 minutes. Send us your rough job photos and a quick WhatsApp voice note or call explaining your services and target areas. Jordan &amp; Josh write all the text and build the entire site.
                    </p>
                  </div>

                  <div className="border-t border-white/15 pt-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      How does payment work?
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      50% deposit to lock in your build slot, and the final 50% only after you’ve checked the finished website on your phone and approved it to go live.
                    </p>
                  </div>

                  <div className="border-t border-white/15 pt-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Do I own 100% of the website?
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      Yes. The moment the final balance is paid, you own 100% of the code, domain name, text, and photos. You are never locked into a contract.
                    </p>
                  </div>

                  <div className="border-t border-white/15 pt-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Are there any mandatory monthly fees?
                    </h3>
                    <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                      None. You can host the website yourself for £0/month to us, or pick our £15/month Essential Care plan if you want us to handle fast UK hosting, security, and backups for you.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. FINAL CTA SECTION */}
            <section className="bg-[#0a0a0a] py-24 md:py-32">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  Ready for a Website That Actually Brings in Work?
                </h2>
                <p className="text-xl text-zinc-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Speak directly with Jordan &amp; Josh today. Tell us your trade and what you need—you’ll get a straight answer and a fixed price.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => openQuoteWithPackage()}
                    className="w-full sm:w-auto rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-lg px-8 py-4 transition-colors cursor-pointer"
                  >
                    Get Your Fixed Quote
                  </button>

                  <a
                    href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh%2C%20I%27m%20interested%20in%20a%20fixed-price%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto rounded-none bg-black hover:bg-zinc-900 border border-white/20 text-white font-semibold text-lg px-8 py-4 transition-colors flex items-center justify-center gap-2.5"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                    <span>WhatsApp 07983 145311</span>
                  </a>
                </div>

                <p className="mt-5 text-sm text-zinc-300 font-medium">
                  Direct reply within 2 hours &bull; Fixed upfront price &bull; Zero sales pressure
                </p>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenFAQ={scrollToFaq}
        onNavigatePackages={navigateToPackages}
        onNavigateHome={navigateHome}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefillTier={selectedServiceTier}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onTriggerQuote={handleTriggerQuoteFromModal}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
