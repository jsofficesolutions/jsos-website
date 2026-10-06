import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const HonestyCheck: React.FC = () => {
  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec sec--dark">
      <div className="wrap">
        <p className="label">A quick honesty check</p>
        <h2>This might be right for you if…</h2>

        <ul className="ticks">
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              You've had <b>quiet weeks where staff, rent and overheads still went out</b>
            </span>
          </li>
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              You're relying too heavily on <b>unpredictable word of mouth or directory fees</b>
            </span>
          </li>
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              Your current site gets clicks but <b>the phone doesn't ring and inbox stays quiet</b>
            </span>
          </li>
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              You've got the <b>crew, the skills and the capacity</b> — you just need the bookings to match
            </span>
          </li>
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              You want someone to <b>take care of the whole project</b> (words, design, SEO) while you work
            </span>
          </li>
          <li>
            <Check className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <span>
              You're ready to <b>invest £1,695+</b> in getting it built properly
            </span>
          </li>
        </ul>

        <p className="lede mt-8">
          Sound like you? Find out what it would cost in under 60 seconds.
        </p>

        <div className="mt-8">
          <a href="#calculator" onClick={scrollToCalculator} className="btn btn--purple">
            <span>Get my instant quote</span>
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </a>
        </div>
      </div>
    </section>
  );
};
