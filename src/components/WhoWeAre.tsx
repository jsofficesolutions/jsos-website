import React from 'react';
import { ArrowRight, CheckCircle2, UserCheck, Zap, ShieldCheck, Phone } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-20 md:pt-28 pb-28 sm:pb-36 lg:pb-40 bg-zinc-950 relative overflow-hidden" id="about">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-950/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 1. Left Column: Personal Developer Profile Card */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-900/30 to-indigo-900/20 rounded-3xl blur-xl opacity-60" />

              {/* Card Container */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 relative overflow-hidden backdrop-blur-md">
                {/* Header: Authentic Profile Avatar + Info + UK Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/images/jordan-profile.jpg"
                      alt="Jordan & Josh"
                      className="w-14 h-14 rounded-2xl object-cover border border-purple-500/30 shadow-md shrink-0"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://ui-avatars.com/api/?name=Jordan+and+Josh&background=7c3aed&color=fff&size=128';
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-lg text-zinc-100">Jordan &amp; Josh</h4>
                      <p className="text-xs font-semibold text-purple-400 tracking-wide uppercase">
                        Lead Developers &amp; Founders
                      </p>
                    </div>
                  </div>

                  {/* UK Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Essex, UK
                  </span>
                </div>

                  {/* Developer Metrics Grid (Tangible Trust Stats) */}
                <div className="mt-6 space-y-3">
                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 flex items-start gap-3.5 text-sm text-zinc-300">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-zinc-100 block text-sm sm:text-base">100% Direct</span>
                      <span className="text-zinc-300 text-xs sm:text-sm leading-relaxed">Work directly with a dedicated two-man family team—no account managers or outsourced tickets.</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 flex items-start gap-3.5 text-sm text-zinc-300">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-zinc-100 block text-sm sm:text-base">Sub-Second</span>
                      <span className="text-zinc-300 text-xs sm:text-sm leading-relaxed">Pure Astro &amp; Tailwind static builds</span>
                    </div>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4 flex items-start gap-3.5 text-sm text-zinc-300">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-zinc-100 block text-sm sm:text-base">Total Ownership</span>
                      <span className="text-zinc-300 text-xs sm:text-sm leading-relaxed">You own 100% of domain, code &amp; assets</span>
                    </div>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="border-t border-zinc-800/80 pt-4 mt-6 flex justify-between items-center text-xs sm:text-sm text-zinc-400 font-mono">
                  <span>JS Office Solutions</span>
                  <span>Romford &amp; London</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right Column: Clear, Focused Value Proposition */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {/* Eyebrow */}
            <span className="text-purple-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 block">
              WHO WE ARE
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight mb-5">
              Built for local growth. Engineered for small business simplicity.
            </h2>

            {/* Body Copy */}
            <p className="text-zinc-300 text-base sm:text-lg lg:text-xl leading-relaxed font-normal mb-8">
              Traditional web agencies drown independent businesses in account managers, ticketing queues, and expensive retainers. We do the opposite. As a family-run team of two, Jordan and Josh work directly with you from first concept to live launch, with full code ownership and an easy drag-and-drop CMS to update your site anytime.
            </p>

            {/* Key Takeaways */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-base text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Direct WhatsApp &amp; phone line straight to Jordan or Josh</span>
              </div>
              <div className="flex items-start gap-3 text-base text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>Zero monthly platform hostage fees — you own 100% of your build</span>
              </div>
              <div className="flex items-start gap-3 text-base text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>1-on-1 video walkthroughs so your team edits text &amp; pricing with ease</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-full text-sm shadow-lg shadow-purple-900/30 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Get a Fast Project Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:07983145311"
                className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 text-zinc-300 font-medium px-5 py-3 rounded-full text-sm inline-flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <span>07983 145311</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
