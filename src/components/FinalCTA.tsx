import React from 'react';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="sec sec--dark">
      <div className="wrap finalcta">
        <p className="label">One minute, no obligation</p>
        <h2>
          Ready to stop the quiet days <em>costing</em> you?
        </h2>
        <p className="lede">
          Four quick questions and your fixed price quote is on screen. No pushy sales calls, and no technical homework for you.
        </p>
        <div className="mt-7">
          <a href="#calculator" onClick={scrollToCalculator} className="btn btn--purple">
            <span>Get my instant quote</span>
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </a>
        </div>
      </div>
    </section>
  );
};
