import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenFAQ: () => void;
  onNavigatePackages?: () => void;
  onNavigateHome?: () => void;
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

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 text-sm">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand & Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-xl font-black text-white tracking-tight flex items-center">
                <span className="text-purple-400">JS</span>OS
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">
                JS Office Solutions
              </span>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Hand-coded custom websites and local SEO engineered for London &amp; Essex businesses. Sub-second performance, zero fluff, and direct 1-on-1 developer support.
            </p>

            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400" />
                <a href="tel:07983145311" className="hover:text-white font-semibold text-zinc-200">
                  07983 145311
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400" />
                <a href="mailto:jordan@jsos.uk" className="hover:text-white text-zinc-200">
                  jordan@jsos.uk
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-200">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>London &amp; Essex, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <button
                  onClick={() => scrollToId('solutions')}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300"
                >
                  Solutions &amp; Core Services
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
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300"
                >
                  Transparent Packages (£499+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToId('work')}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300"
                >
                  Featured Client Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFAQ}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300"
                >
                  Process, Add-Ons &amp; FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToId('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-zinc-300"
                >
                  Get a Fast Project Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Payment Icons Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Accepted Payment Methods
            </h4>
            <p className="text-xs text-zinc-400">
              Flexible payment options with 50/50 milestone splits and direct debit:
            </p>

            {/* Accepted Payments icons: VISA, MC, AMEX, GoCardless */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* VISA */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white font-black text-xs tracking-wider flex items-center gap-1 shadow-xs">
                <span className="text-[#2557d6] font-black italic">VISA</span>
              </div>

              {/* Mastercard (MC) */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-xs">
                <div className="flex -space-x-1.5 items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-90"></div>
                </div>
                <span className="text-[11px] font-semibold text-zinc-200">Mastercard</span>
              </div>

              {/* AMEX */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white font-bold text-xs tracking-wider flex items-center gap-1 shadow-xs">
                <span className="bg-[#006fcf] text-white px-1 py-0.5 rounded text-[10px] font-black tracking-tight">AMEX</span>
                <span className="text-[11px] text-zinc-200">Express</span>
              </div>

              {/* GoCardless */}
              <div className="px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00dd99]"></div>
                <span className="text-[11px] font-bold text-[#00dd99]">GoCardless</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] text-zinc-500 block">
                Direct UK family developer partnership &bull; No middleman margins
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>&copy; 2026 JS Office Solutions. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-zinc-200 transition-colors cursor-pointer"
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
