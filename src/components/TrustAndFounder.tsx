import React from 'react';
import { ArrowRight, Star, ShieldCheck, Mail, Phone } from 'lucide-react';

export const TrustAndFounder: React.FC = () => {
  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec">
      <div className="wrap">
        <p className="label">Don&apos;t take our word for it</p>
        <h2>
          What business owners say after <em>we rebuilt</em> their site
        </h2>

        <div className="quotes">
          <div className="quote">
            <p className="quote__stars">★★★★★</p>
            <p>
              &ldquo;I worked with Jordan on our website, local SEO, and online quote tool, and the impact has been brilliant. He made our company look genuinely premium, solved our mobile speed issues, and took our Google visibility right to the top of our service area. He is very easy to deal with, keeps you updated while you&apos;re out on jobs, and doesn&apos;t baffle you with buzzwords. Inbound leads are up over 200% — well worth the investment.&rdquo;
            </p>
            <div className="quote__who">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                JH
              </div>
              <div>
                <b>Jake Hillyard</b>
                <small className="block">Managing Director &bull; Apex Contracting Southeast Ltd</small>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Bio Card */}
        <div className="personal">
          {/* Stylized Founder Card Container */}
          <div className="personal-avatar relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-purple-950/40"></div>
            <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-900/70 border border-purple-400/40 flex items-center justify-center mb-3 text-purple-200 font-extrabold text-xl shadow-inner">
                JS
              </div>
              <span className="font-bold text-sm tracking-wide text-white">Jordan Stevens</span>
              <span className="text-[11px] text-purple-300 font-medium tracking-wider uppercase mt-0.5">
                Founder, JSOS
              </span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-zinc-400 border-t border-zinc-800/80 pt-1.5">
              JS Office Solutions
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-950 mb-2">Hi, I&apos;m Jordan Stevens</h3>
            <p>
              I run JS Office Solutions (JSOS). After years in high-performance digital product development and direct-response web strategy, I founded JSOS to build websites for trades, contractors, and regional companies that actually generate revenue — not just sit on the internet like neglected digital brochures.
            </p>
            <p>
              When you work with JSOS, you deal with me directly from strategy and wireframes to copywriting, launch, and ongoing care. No account managers, no offshored tickets, and no jargon. Just honest, high-performing websites built to make your phone ring.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-zinc-600">
              <span className="flex items-center gap-1.5 text-purple-900 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                Fixed price guarantee (£1,695)
              </span>
              <span className="flex items-center gap-1.5 text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
                <Phone className="w-3.5 h-3.5 text-zinc-600" />
                Direct founder phone access
              </span>
            </div>
          </div>
        </div>

        <div className="cta-row" style={{ marginTop: '56px', paddingTop: '8px' }}>
          <a href="#calculator" onClick={scrollToCalculator} className="btn btn--purple">
            <span>Get my instant quote</span>
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </a>
        </div>
      </div>
    </section>
  );
};
