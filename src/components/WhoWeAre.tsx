import React from 'react';
import { ArrowRight, UserCheck, Zap, ShieldCheck, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhoWeAreProps {
  onOpenQuote?: () => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0a0a0a] border-b border-white/15 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* 1. Left Column: Developer Profile Card */}
          <div className="lg:col-span-5">
            <div className="bg-black border border-white/15 rounded-xl p-6 sm:p-8 shadow-xl">
              {/* Header: Authentic Profile Info + UK Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-13 h-13 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-lg shrink-0">
                    JS
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Jordan Stevens</h3>
                    <p className="text-xs font-semibold text-purple-400 tracking-wider uppercase">
                      Founder &amp; Lead Developer
                    </p>
                  </div>
                </div>

                {/* UK Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Essex &amp; London
                </span>
              </div>

              {/* Developer Tangible Stats */}
              <div className="mt-6 space-y-3">
                <div className="bg-zinc-950 border border-white/5 rounded-lg p-3.5 flex items-start gap-3 text-sm text-zinc-300">
                  <div className="p-2 rounded bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm">Direct 1-on-1 Access</span>
                    <span className="text-zinc-400 text-xs leading-relaxed">
                      You deal directly with me from initial wireframe to launch. No junior account managers or help desks.
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-white/5 rounded-lg p-3.5 flex items-start gap-3 text-sm text-zinc-300">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm">Sub-Second Mobile Load Times</span>
                    <span className="text-zinc-400 text-xs leading-relaxed">
                      Fast, lightweight code engineered for 95–100 Google Speed scores so mobile searchers never bounce.
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-white/5 rounded-lg p-3.5 flex items-start gap-3 text-sm text-zinc-300">
                  <div className="p-2 rounded bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block text-sm">Fixed-Price &amp; 100% Ownership</span>
                    <span className="text-zinc-400 text-xs leading-relaxed">
                      No surprise invoices or hostage fees. The code, domain, and assets are 100% yours once launched.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Column: Story & Philosophy */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-3">
              DIRECT FOUNDER COMMITMENT
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              No account managers. You work directly with the developer.
            </h2>

            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              <p>
                Traditional web agencies drown trades in account managers, ticketing queues, and £3,000 invoices for bloated WordPress templates that take months to launch and load like molasses.
              </p>
              <p>
                I founded JSOS to do the exact opposite. Every website is custom-coded, ultra-fast, and built around one core purpose: turning local searchers in Essex and London into paying customers.
              </p>
              <p className="text-zinc-200 font-medium">
                We agree on a fixed upfront price, split 50/50. I write your copy, build the site in 7 days, and you only pay the remainder once you&apos;ve tested it on your phone and approved it.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/447983145311?text=Hi%20Jordan%2C%20I%27m%20interested%20in%20a%20fixed-price%20website."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 py-3.5 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-300" />
                <span>WhatsApp Jordan Directly</span>
              </a>

              <a
                href="tel:07983145311"
                className="rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-200 font-semibold text-sm px-6 py-3.5 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>07983 145311</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
