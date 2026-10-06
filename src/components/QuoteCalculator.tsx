import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react';
import { QuoteFormData, QuoteEstimate } from '../types';

interface QuoteCalculatorProps {
  onOpenBookingWithQuote: (data: QuoteFormData, estimate: QuoteEstimate) => void;
}

const TRADES = [
  'Roofing & Exterior Works',
  'Building & Extensions',
  'Plumbing, Heating & HVAC',
  'Electrical & Renewables',
  'Landscaping & Groundworks',
  'Professional & Corporate Services',
  'Another trade or business',
];

const TIMESCALES = [
  'ASAP (2–3 weeks)',
  '1–2 months',
  '3+ months',
];

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onOpenBookingWithQuote }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<QuoteFormData>({
    trade: '',
    timescale: '',
    prompt_reason: '',
    name: '',
    business: '',
    email: '',
    phone: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);

  const totalSteps = 4;

  const handleSelectRadio = (name: 'trade' | 'timescale', value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
    // Smooth auto-advance like reference site
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 240);
  };

  const handleNext = () => {
    if (currentStep === 0 && !formData.trade) {
      setFormError('Please select your trade or industry.');
      return;
    }
    if (currentStep === 1 && !formData.timescale) {
      setFormError('Please select a timescale.');
      return;
    }
    setFormError(null);
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setFormError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const calculateEstimate = (): QuoteEstimate => {
    const base = 1695;
    const uplift = 1.15;
    const high = Math.round((base * uplift) / 50) * 50;

    const tradeTitle = formData.trade && formData.trade !== 'Another trade or business'
      ? formData.trade.toLowerCase()
      : 'business';

    const items = [
      `Up to 6-page bespoke website, custom-designed around your ${tradeTitle} business and high-margin enquiries`,
      'All copywriting written for you by a specialist conversion writer — no homework for you',
      'Your project and team photos professionally curated, compressed, and displayed to do your work justice',
      'Full Technical SEO setup: metadata, schema markup, Google Business Profile integration, and sitemap submitted',
      'Mobile-first architecture with 90+ Google PageSpeed performance, click-to-call, and fast contact forms',
      'Strategy, UX design, build, and launch fully managed by Jordan while you stay on site',
      `Target delivery: ${formData.timescale === 'ASAP (2–3 weeks)' ? 'Rapid 2-week fast-track launch' : 'Delivered within 3–4 weeks from initial briefing'}`,
    ];

    return {
      low: base,
      high,
      rangeText: `£${base.toLocaleString('en-GB')}–£${high.toLocaleString('en-GB')}`,
      items,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.business.trim() || !formData.email.trim()) {
      setFormError('Please fill in your name, business name, and a valid email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const calculated = calculateEstimate();
    setEstimate(calculated);

    // Persist in localStorage/sessionStorage for visitor convenience
    try {
      sessionStorage.setItem(
        'jsosQuote',
        JSON.stringify({
          ...formData,
          ...calculated,
          timestamp: Date.now(),
        })
      );
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const isCurrentStepValid = () => {
    if (currentStep === 0) return Boolean(formData.trade);
    if (currentStep === 1) return Boolean(formData.timescale);
    return true;
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <section className="sec sec--tint" id="calculator">
      <div className="wrap wrap--narrow">
        <p className="label">Instant quote</p>
        <h2>
          Get your <em>instant quote</em>
        </h2>
        <p className="lede">
          Every website built by JS Office Solutions is custom-tailored for your business — up to six pages with words written properly, photos optimized, fast mobile speeds, and Google SEO setup. Four quick questions and your quote is on screen in under 60 seconds.
        </p>

        {!isSubmitted ? (
          <form className="calc" onSubmit={handleSubmit} noValidate>
            <div className="progressmeta">
              <span>
                {currentStep === totalSteps - 1 ? (
                  <>Last step &mdash; your details</>
                ) : (
                  <>
                    Question <b>{currentStep + 1}</b> of {totalSteps}
                  </>
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>

            <div className="progress">
              <div
                className="progress__fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* STEP 1: Trade / Industry */}
            {currentStep === 0 && (
              <div className="step is-active">
                <div className="q">
                  <p className="q__label">What&apos;s your trade or business?</p>
                  <div className="opts">
                    {TRADES.map((trade) => (
                      <label key={trade} className="opt">
                        <input
                          type="radio"
                          name="trade"
                          value={trade}
                          checked={formData.trade === trade}
                          onChange={() => handleSelectRadio('trade', trade)}
                        />
                        <span>{trade}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Timescale */}
            {currentStep === 1 && (
              <div className="step is-active">
                <div className="q">
                  <p className="q__label">When do you need it launched?</p>
                  <div className="opts">
                    {TIMESCALES.map((time) => (
                      <label key={time} className="opt">
                        <input
                          type="radio"
                          name="timescale"
                          value={time}
                          checked={formData.timescale === time}
                          onChange={() => handleSelectRadio('timescale', time)}
                        />
                        <span>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Prompt reason */}
            {currentStep === 2 && (
              <div className="step is-active">
                <div className="q">
                  <p className="q__label">
                    What&apos;s prompted you to look for a new website?
                    <small>Optional, but it helps Jordan tailor your strategy</small>
                  </p>
                  <textarea
                    rows={4}
                    maxLength={600}
                    placeholder="e.g. Current website looks dated, not generating enquiries, rebrand, or starting fresh..."
                    value={formData.prompt_reason}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, prompt_reason: e.target.value }))
                    }
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Contact details */}
            {currentStep === 3 && (
              <div className="step is-active">
                <div className="q">
                  <p className="q__label">Where should we send your quote breakdown?</p>
                  <div className="contactgrid">
                    <div>
                      <label htmlFor="quote-name">Your Name *</label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        placeholder="e.g. Jordan Stevens"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-business">Business Name *</label>
                      <input
                        id="quote-business"
                        type="text"
                        required
                        placeholder="e.g. JS Office Solutions"
                        value={formData.business}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, business: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-email">Email Address *</label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        placeholder="name@company.co.uk"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-phone">
                        Phone Number (Optional)
                        <small className="block font-normal text-zinc-500 mt-1 lowercase">
                          Jordan will give you a quick friendly call to run through your quote — no pushy sales.
                        </small>
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        placeholder="07412 893201"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formError && (
              <div className="flex items-center gap-2 err">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="navrow">
              {currentStep > 0 ? (
                <button
                  type="button"
                  className="btn btn--ghost flex items-center gap-2 cursor-pointer"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  className="btn cursor-pointer"
                  disabled={!isCurrentStepValid()}
                  onClick={handleNext}
                >
                  <span>Next &rarr;</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn--purple flex items-center gap-2 cursor-pointer"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Calculating Quote…' : 'Show me my quote'}</span>
                  <ArrowRight className="w-4 h-4 text-purple-200" />
                </button>
              )}
            </div>

            <p className="calcnote">
              Your quote appears instantly on screen. No obligation, and we never share your details with third parties.
            </p>
          </form>
        ) : (
          /* RESULT DISPLAY */
          <div className="result animate-fadeIn">
            <div className="result__price">
              <small>Your Instant Working Estimate</small>
              <b>{estimate?.rangeText || '£1,695–£1,950'}</b>
              <p>
                This is a working estimate based on what you&apos;ve selected. The final price depends on your project specifications — some come in under, some need custom integrations. Either way, you receive a guaranteed fixed price before anything starts, with a 50/50 payment split.
              </p>
              <p className="result__monthly">
                Plus £59/month hosting and care — covers high-speed hosting, security monitoring, daily backups, small content changes, and Jordan on the end of the phone whenever you need.
              </p>
              <p className="text-xs text-purple-300 mt-2 font-medium">
                Ongoing SEO and Google Business Profile management is available on our Get Found plan from £395/month once live.
              </p>

              {estimate && (
                <div className="result__summary">
                  <small>What this estimate includes</small>
                  <ul>
                    {estimate.items.map((item, idx) => (
                      <li key={idx}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="result__cta">
              <h3>Want to talk it through with Jordan?</h3>
              <p>
                Book a free 20-minute website discovery consultation. We will discuss what you need, outline our recommendations, and confirm whether we&apos;re a great fit. No hard sell — you already have the numbers.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() =>
                    estimate && onOpenBookingWithQuote(formData, estimate)
                  }
                  className="btn btn--purple cursor-pointer shadow-md"
                >
                  <span>Book my free consultation</span>
                  <ArrowRight className="w-4 h-4 text-purple-200" />
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(0);
                  }}
                  className="btn btn--ghost text-xs cursor-pointer"
                >
                  Adjust Answers
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
