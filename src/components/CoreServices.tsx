import React from 'react';
import { Layout, ShoppingBag, MapPin, ArrowRight } from 'lucide-react';

interface CoreServicesProps {
  onSelectTier?: (tier: string) => void;
}

export const CoreServices: React.FC<CoreServicesProps> = ({ onSelectTier }) => {
  const handleScrollToPricing = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string, tierName: string) => {
    e.preventDefault();
    if (onSelectTier) {
      onSelectTier(tierName);
    }
    const targetId = anchor.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const packagesEl = document.getElementById('packages');
      if (packagesEl) {
        packagesEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const services = [
    {
      id: 'single-page',
      tierName: 'Tier 01: Single-Page Launchpad (£499)',
      icon: Layout,
      pill: (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-850 text-zinc-300 border border-zinc-700/80 shrink-0">
          From £499
        </span>
      ),
      title: 'High-Speed Single-Page Website',
      description:
        'A sleek, high-converting one-page platform hand-coded for 100/100 Google PageSpeed scores, sub-second loads, and rapid 5–7 day turnaround.',
      features: ['Astro + Tailwind', '100% Mobile First', 'Contact & WhatsApp Form'],
      anchor: '#pricing-single',
      linkLabel: 'Explore Single-Page Tier',
    },
    {
      id: 'multi-page',
      tierName: 'Tier 02: Multi-Page Business Suite (£799)',
      icon: ShoppingBag,
      pill: (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800/80 shrink-0">
          Most Popular
        </span>
      ),
      title: 'Multi-Page Business Website',
      description:
        'Up to 5–6 custom pages with dedicated service pages, local area coverage, and optional online payments, deposits, or booking integrations.',
      features: ['5–6 Custom Pages', 'Payments & Deposits', 'Areas Covered Breakdown'],
      anchor: '#pricing-multipage',
      linkLabel: 'Explore Multi-Page Suite',
    },
    {
      id: 'custom-scale',
      tierName: 'Tier 03: Custom Systems & Scale (£1,199)',
      icon: MapPin,
      pill: (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80 shrink-0">
          From £1,199
        </span>
      ),
      title: 'Custom Systems & High Capacity',
      description:
        'Engineered for larger multi-page architectures (8+ pages), interactive quote estimators, client portals, and bespoke business workflows.',
      features: ['8+ Custom Pages', 'Interactive Quote Tools', 'Priority Developer Turnaround'],
      anchor: '#pricing-custom',
      linkLabel: 'Explore Custom Tier',
    },
  ];

  return (
    <section id="solutions" className="pt-8 pb-20 md:pt-12 md:pb-28 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Refinement */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-purple-400 font-semibold tracking-wider text-xs uppercase mb-3">
            CORE SERVICES
          </p>
          <h2 className="text-zinc-100 font-bold text-3xl sm:text-4xl tracking-tight">
            Engineered for speed, built for local conversion
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything your small business needs to turn local searchers into paying customers—without the agency bloat or premium price tags.
          </p>
        </div>

        {/* 3 Refined Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isMiddleCard = service.id === 'ecommerce';

            return (
              <div
                key={service.id}
                className={`${
                  isMiddleCard
                    ? 'border-purple-500/30 relative hover:border-purple-500/60 shadow-purple-950/20'
                    : 'border-zinc-800/80 hover:border-purple-500/40 shadow-black/20'
                } bg-zinc-900/50 border rounded-2xl p-7 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/30 transition-all duration-300 shadow-lg group`}
              >
                {/* Subtle top glow highlight for middle card */}
                {isMiddleCard && (
                  <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent pointer-events-none" />
                )}

                <div>
                  {/* 1. Top Row Alignment: Icon and pill share exact vertical center line */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:scale-105 transition-all shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {service.pill}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Body Copy */}
                  <p className="text-zinc-300 text-base leading-relaxed">
                    {service.description}
                  </p>

                  {/* 3. Feature Pills Layout */}
                  <div className="flex flex-wrap gap-2 my-6">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs font-semibold text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 px-3 py-1.5 rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Bottom Link Interaction without divider line */}
                <a
                  href={service.anchor}
                  onClick={(e) => handleScrollToPricing(e, service.anchor, service.tierName)}
                  className="text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-purple-400 inline-flex items-center gap-2 transition-colors mt-auto pt-4"
                >
                  <span>{service.linkLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
