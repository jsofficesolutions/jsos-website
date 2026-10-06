import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';

interface SimplifiedPricingProps {
  onSelectTier: (tierName: string) => void;
  onOpenDeepDetails: () => void;
  onNavigatePackages?: () => void;
}

export const SimplifiedPricing: React.FC<SimplifiedPricingProps> = ({
  onSelectTier,
  onOpenDeepDetails,
  onNavigatePackages,
}) => {
  const tiers = [
    {
      id: 'pricing-single',
      badge: 'Tier 01',
      name: 'Single-Page Launchpad',
      price: '£499',
      oneSentence: 'Perfect for solo trades, startups, and local businesses wanting a high-speed, modern single-page website that immediately turns searchers into enquiries.',
      popular: false,
      ctaText: 'Choose Single-Page',
    },
    {
      id: 'pricing-multipage',
      badge: 'Tier 02',
      name: 'Multi-Page Business Suite',
      price: '£799',
      oneSentence: 'Everything an established local business needs: up to 5–6 custom pages, dedicated service breakdowns, and optional online payments, deposits, or bookings.',
      popular: true,
      ctaText: 'Choose Multi-Page',
    },
    {
      id: 'pricing-custom',
      badge: 'Tier 03',
      name: 'Custom Systems & Scale',
      price: '£1,199',
      oneSentence: 'Engineered for larger architectures (8+ pages), interactive quote tools, customer booking portals, full product catalogs, and bespoke workflows.',
      popular: false,
      ctaText: 'Choose Custom Suite',
    },
  ];

  const handleChoose = (tierName: string) => {
    onSelectTier(tierName);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="py-20 md:py-28 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
            Transparent Upfront Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Fixed prices. Zero surprise fees.
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            Straightforward packages with no hidden retainers or confusing agency tiers.
          </p>
        </div>

        {/* 3 clean pricing columns: Just Tier Name, Price, one core sentence of who it's for, and CTA button */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              id={tier.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 scroll-mt-24 ${
                tier.popular
                  ? 'bg-gradient-to-b from-purple-950/60 via-zinc-900/90 to-zinc-900/90 text-white border-2 border-purple-500 shadow-2xl shadow-purple-950/40 relative md:-translate-y-2 pt-9'
                  : 'bg-zinc-900/50 backdrop-blur-sm text-white border border-zinc-800/80 hover:border-zinc-700 shadow-xl hover:shadow-2xl'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-600 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap text-center">
                  Recommended For Growth
                </div>
              )}

              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                    tier.popular ? 'text-purple-300' : 'text-purple-400'
                  }`}
                >
                  {tier.badge}
                </span>

                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  {tier.name}
                </h3>

                <div className="mt-5 mb-5 flex items-baseline gap-2">
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

                {/* One core sentence of who it's for */}
                <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                  {tier.oneSentence}
                </p>
              </div>

              {/* CTA button */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <button
                  onClick={() => handleChoose(tier.name)}
                  className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    tier.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-purple-900/60'
                      : 'bg-zinc-800 hover:bg-purple-900 text-zinc-100 hover:text-white border border-zinc-700'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle, minimal footnote */}
        <p className="mt-8 text-center text-sm text-zinc-400 font-medium">
          All packages include launch deployment. Ongoing managed UK cloud hosting from <span className="text-zinc-200 font-semibold">£15/mo</span> with zero lock-in.
        </p>

        {/* Minimal Centered Secondary Prompt */}
        <div className="mt-12 text-center flex flex-col items-center">
          <p className="text-sm text-zinc-300 font-medium mb-3">
            Want to see full feature breakdowns, comparison matrix and add-ons?
          </p>
          <button
            onClick={() => {
              if (onNavigatePackages) {
                onNavigatePackages();
              } else {
                onOpenDeepDetails();
              }
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-purple-500/60 text-zinc-200 hover:text-white font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-md"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Explore Full Packages &amp; Pricing Page</span>
          </button>
        </div>
      </div>
    </section>
  );
};
