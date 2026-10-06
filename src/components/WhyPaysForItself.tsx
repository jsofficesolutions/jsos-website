import React from 'react';
import { ArrowRight } from 'lucide-react';

export const WhyPaysForItself: React.FC = () => {
  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why" className="sec sec--tint">
      <div className="wrap">
        <p className="label">Why it pays for itself</p>
        <h2>
          Every quiet day <em>costs</em> you. A proper website fixes that.
        </h2>
        <div className="grid3">
          <div className="rcard">
            <span className="rcard__rank">1</span>
            <h3>Fills the gaps in the diary</h3>
            <p>
              When the phone goes quiet, most businesses end up waiting on a referral or paying hefty commissions to lead aggregators. A site that shows up locally and turns visitors into qualified quotes keeps enquiries flowing during weeks you'd normally be scratching around.
            </p>
          </div>
          <div className="rcard">
            <span className="rcard__rank">2</span>
            <h3>Wins the profitable jobs</h3>
            <p>
              When an urgent client searches at 7am or over the weekend and can't find you, that high-ticket job goes to whoever they could find first. Your site ensures your business looks the most capable, professional, and trustworthy in your area.
            </p>
          </div>
          <div className="rcard">
            <span className="rcard__rank">3</span>
            <h3>One job pays for it</h3>
            <p>
              One decent job covers the build. Everything after that is profit you'd otherwise have missed. Quote estimators, click-to-call, and your real customer proof are built in so people convert immediately. And JSOS handles the whole thing while you run your day-to-day.
            </p>
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
