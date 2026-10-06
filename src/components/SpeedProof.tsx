import React, { useState } from 'react';
import { Gauge, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

export const SpeedProof: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'score' | 'speed' | 'leads'>('score');

  return (
    <section id="speed" className="sec">
      <div className="wrap">
        <p className="label">Why speed matters</p>
        <h2>
          Our client sites go from <em>58 to 98+</em> on Google. Here's why that matters.
        </h2>

        <div className="stat">
          <div className="stat__num">
            58 <em>→</em> 98+
            <small>JSOS Mobile PageSpeed Benchmark</small>
          </div>
          <div>
            <p>
              Google scores every website out of 100 for how fast it loads on a smartphone, and it directly ranks faster websites higher — especially for high-intent local searches like &ldquo;builder near me&rdquo; or &ldquo;commercial services in London&rdquo;. Most business sites score in the 40s to 60s because they are weighed down with heavy plugins, bloated templates, and unoptimized assets.
            </p>
            <p>
              A slow site loses high-value customers before they even see your phone number. Over half of visitors leave if a page takes more than three seconds, and every single bounce is money handed to your competitor. When JSOS rebuilds your site, we optimize the entire architecture to hit 95&ndash;100 on Google PageSpeed, connect an interactive quote tool, and turn clicks into booked contracts.
            </p>
          </div>
        </div>

        {/* Interactive Comparison Dashboard */}
        <div className="mt-8 p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-zinc-200">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Live Performance Comparison
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMetric('score')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMetric === 'score'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                PageSpeed Score
              </button>
              <button
                onClick={() => setActiveMetric('speed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMetric === 'speed'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                Load Time
              </button>
              <button
                onClick={() => setActiveMetric('leads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeMetric === 'leads'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                Lead Conversion
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-zinc-200">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span className="font-semibold text-rose-600">Typical Agency / Template Site</span>
                <span className="text-zinc-400">Before JSOS</span>
              </div>
              {activeMetric === 'score' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-zinc-800">58/100</span>
                  <span className="text-xs font-medium text-rose-600">Poor mobile experience</span>
                </div>
              )}
              {activeMetric === 'speed' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-zinc-800">4.6s</span>
                  <span className="text-xs font-medium text-rose-600">53% visitor drop-off</span>
                </div>
              )}
              {activeMetric === 'leads' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-zinc-800">1.4%</span>
                  <span className="text-xs font-medium text-rose-600">Underperforming traffic</span>
                </div>
              )}
              <div className="w-full bg-zinc-100 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: activeMetric === 'score' ? '58%' : activeMetric === 'speed' ? '30%' : '20%',
                  }}
                ></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950 text-white border border-purple-800/80 shadow-md">
              <div className="flex items-center justify-between text-xs text-purple-200 mb-2">
                <span className="font-semibold text-purple-300">JSOS Bespoke Build</span>
                <span className="text-purple-400">After JSOS</span>
              </div>
              {activeMetric === 'score' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">98/100</span>
                  <span className="text-xs font-medium text-emerald-400">Top 1% of UK web speed</span>
                </div>
              )}
              {activeMetric === 'speed' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">0.8s</span>
                  <span className="text-xs font-medium text-emerald-400">Near-instant rendering</span>
                </div>
              )}
              {activeMetric === 'leads' && (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">5.8%</span>
                  <span className="text-xs font-medium text-emerald-400">+314% inbound enquiry boost</span>
                </div>
              )}
              <div className="w-full bg-purple-900/60 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: activeMetric === 'score' ? '98%' : activeMetric === 'speed' ? '92%' : '88%',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
