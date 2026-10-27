import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenFAQ?: () => void;
  onNavigatePackages?: () => void;
  onNavigateHome?: () => void;
  onOpenSecondaryDetails?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenFAQ,
  onNavigatePackages,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    if (onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFaqClick = () => {
    const faqEl = document.getElementById('faq');
    if (faqEl) {
      scrollToId('faq');
    } else if (onOpenFAQ) {
      onOpenFAQ();
    } else {
      scrollToId('faq');
    }
  };

  return (
    <footer className="bg-black text-zinc-300 border-t border-white/15 text-sm">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={scrollToTop}
              className="flex items-center group cursor-pointer bg-transparent border-0 text-left focus:outline-none p-0"
              title="JSOS Home"
            >
              <img
                src="/images/logo.svg"
                alt="JS Solutions"
                className="h-14 sm:h-16 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </button>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Fast, mobile-first websites built for London &amp; Essex trades and service businesses. You deal directly with Jordan &amp; Josh—fixed upfront prices, zero tech headaches, and 100% ownership.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-500" />
                <a href="tel:07983145311" className="hover:text-white font-semibold text-zinc-200">
                  07983 145311
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-500" />
                <a href="mailto:jordan@jsos.uk" className="hover:text-white text-zinc-200">
                  jordan@jsos.uk
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-200">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>London &amp; Essex, UK</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <button
                  onClick={() => scrollToId('work')}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300 text-left"
                >
                  Proven Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onNavigatePackages) {
                      onNavigatePackages();
                    } else {
                      scrollToId('packages');
                    }
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300 text-left"
                >
                  Packages &amp; Fixed Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={handleFaqClick}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300 text-left"
                >
                  Straight Answers (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToId('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300 text-left"
                >
                  Get Fixed Price
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Payment Icons Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Payment Infrastructure
            </h4>
            <p className="text-xs text-zinc-300">
              Transparent invoicing with 50/50 milestone splits and secure UK direct debit:
            </p>

            {/* Accepted Payments cards: sharp 1px border-white/15, rounded-none */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* VISA */}
              <div className="px-3 py-1.5 rounded-none bg-black border border-white/15 text-white font-black text-xs tracking-wider flex items-center">
                <span className="text-[#2557d6] font-black italic">VISA</span>
              </div>

              {/* Mastercard */}
              <div className="px-3 py-1.5 rounded-none bg-black border border-white/15 text-white font-bold text-xs tracking-wider flex items-center gap-1.5">
                <div className="flex -space-x-1.5 items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-90"></div>
                </div>
                <span className="text-xs font-semibold text-zinc-200">Mastercard</span>
              </div>

              {/* AMEX */}
              <div className="px-3 py-1.5 rounded-none bg-black border border-white/15 text-white font-bold text-xs tracking-wider flex items-center gap-1">
                <span className="bg-[#006fcf] text-white px-1 py-0.5 rounded-none text-[10px] font-black tracking-tight">AMEX</span>
                <span className="text-xs text-zinc-200">Express</span>
              </div>

              {/* GoCardless */}
              <div className="px-3 py-1.5 rounded-none bg-black border border-white/15 text-white font-bold text-xs tracking-wider flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00dd99]"></div>
                <span className="text-xs font-bold text-[#00dd99]">GoCardless</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-zinc-300 block">
                Direct 1-on-1 with Jordan &amp; Josh &bull; 50/50 payment split &bull; 100% yours once paid
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <p>&copy; 2026 JS Office Solutions. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer text-zinc-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer text-zinc-300"
            >
              Terms of Service
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors cursor-pointer font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
