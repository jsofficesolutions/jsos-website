import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface AfterLaunchPlansProps {
  onOpenBooking: () => void;
}

export const AfterLaunchPlans: React.FC<AfterLaunchPlansProps> = ({ onOpenBooking }) => {
  return (
    <section id="support" className="sec sec--tint">
      <div className="wrap">
        <p className="label">After launch</p>
        <h2>
          We don't build it and <em>disappear</em>. We keep it working.
        </h2>
        <p className="lede">
          A website isn't finished on launch day. Every site we build runs on an active care plan so it stays lightning-fast, protected from security vulnerabilities, and consistently brings in high-paying contracts. We will agree the best tier on your discovery call.
        </p>

        <div className="grid3">
          {/* Plan 1 */}
          <div className="rcard flex flex-col justify-between">
            <div>
              <span className="rcard__tag">Included with every build</span>
              <h3>Monthly maintenance</h3>
              <span className="rcard__price">
                £59<small>/month</small>
              </span>
              <p>
                Ultra-fast UK cloud hosting, automated SSL, weekly offsite backups, core software security patches, uptime monitoring, plus up to three content or image adjustments every month. Direct phone and email access to Jordan whenever you need something updated.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Key Deliverables:
              </span>
              <ul className="text-xs text-zinc-600 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Daily automated cloud backups</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>99.9% uptime monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>3 content updates included/mo</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plan 2: Most Popular */}
          <div className="rcard border-purple-300 shadow-md relative flex flex-col justify-between bg-white ring-1 ring-purple-500/20">
            <div>
              <span className="rcard__tag bg-purple-700 text-white">Most popular</span>
              <h3>Get found</h3>
              <span className="rcard__price text-purple-900">
                £395<small>/month</small>
              </span>
              <p>
                For ambitious trades and regional firms that want to dominate page 1 when local clients search. Everything in Monthly Maintenance, plus ongoing Google Business Profile optimization, 1 targeted local SEO landing page or case study every month, and monthly transparent lead reporting.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-100">
              <span className="text-xs font-semibold text-purple-900 uppercase tracking-wider block mb-2">
                Key Deliverables:
              </span>
              <ul className="text-xs text-zinc-700 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Google Business Profile SEO & posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Monthly targeted local SEO page</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Search Console & ranking audits</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Plan 3 */}
          <div className="rcard flex flex-col justify-between">
            <div>
              <span className="rcard__tag bg-zinc-950 text-white">Full Growth Engine</span>
              <h3>Accelerator</h3>
              <span className="rcard__price">
                £995<small>/month</small>
              </span>
              <p>
                For when you need the diary packed with high-value contracts immediately. Everything in Get Found, plus full Google Ads (PPC) setup and weekly campaign optimization managed directly by Jordan to capture ready-to-buy clients at lowest cost-per-lead.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Key Deliverables:
              </span>
              <ul className="text-xs text-zinc-600 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Google Ads search campaign management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>High-intent negative keyword pruning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  <span>Call tracking & conversion audit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center sm:text-left">
          <button
            onClick={onOpenBooking}
            className="text-xs font-bold uppercase tracking-wider text-purple-900 hover:text-purple-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ask Jordan about growth plans on your call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
