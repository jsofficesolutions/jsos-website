import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface NavigationProps {
  onOpenScheduleAudit?: () => void;
  onOpenConsultation?: () => void;
  onOpenFAQ?: () => void;
  currentPage?: 'home' | 'packages';
  currentView?: 'home' | 'packages';
  onNavigatePage?: (page: 'home' | 'packages') => void;
  onNavigatePackages?: () => void;
  onNavigateHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenScheduleAudit,
  onOpenConsultation,
  onOpenFAQ,
  currentPage = 'home',
  currentView,
  onNavigatePage,
  onNavigatePackages,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activePage = currentView || currentPage;

  const handleOpenQuote = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else if (onOpenScheduleAudit) {
      onOpenScheduleAudit();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPackages = () => {
    setMobileMenuOpen(false);
    if (onNavigatePackages) {
      onNavigatePackages();
    } else if (onNavigatePage) {
      onNavigatePage('packages');
    }
  };

  const goToHome = () => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else if (onNavigatePage) {
      onNavigatePage('home');
    }
  };

  const handleAnchorClick = (id: string) => {
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
      goToHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFaqClick = () => {
    setMobileMenuOpen(false);
    const faqEl = document.getElementById('faq');
    if (faqEl) {
      handleAnchorClick('faq');
    } else if (onOpenFAQ) {
      onOpenFAQ();
    } else {
      handleAnchorClick('faq');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <button
          onClick={goToHome}
          className="flex items-center group cursor-pointer bg-transparent border-0 text-left focus:outline-none py-1"
          title="JSOS Home"
        >
          <img
            src="/images/logo.svg"
            alt="JS Solutions"
            className="h-16 sm:h-20 w-auto max-w-[260px] sm:max-w-[320px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Center / Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              handleAnchorClick('work');
            }}
            className="text-zinc-200 hover:text-white transition-colors cursor-pointer py-1"
          >
            Proven Work
          </a>

          <button
            onClick={goToPackages}
            className={`transition-colors cursor-pointer py-1 ${
              activePage === 'packages'
                ? 'text-white font-bold border-b-2 border-purple-500'
                : 'text-zinc-200 hover:text-white'
            }`}
          >
            Fixed Pricing
          </button>

          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              handleFaqClick();
            }}
            className="text-zinc-200 hover:text-white transition-colors cursor-pointer py-1"
          >
            Straight Answers
          </a>
        </nav>

        {/* Desktop Primary CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:07983145311"
            className="text-xs font-semibold tracking-wider text-zinc-300 hover:text-white transition-colors"
          >
            07983 145311
          </a>

          <button
            onClick={handleOpenQuote}
            className="rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 transition-colors cursor-pointer border border-transparent hover:border-purple-400 focus:outline-none"
          >
            Get Fixed Price
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-200 hover:text-white rounded-none border border-white/15 bg-black cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/15 bg-black px-6 py-6 space-y-4">
          <div className="flex flex-col gap-3 font-semibold text-zinc-200 text-base">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleAnchorClick('work');
              }}
              className="py-2 text-zinc-200 hover:text-white border-b border-white/10"
            >
              Proven Work
            </a>

            <button
              onClick={goToPackages}
              className={`text-left py-2 border-b border-white/10 ${
                activePage === 'packages' ? 'text-white font-bold' : 'text-zinc-200 hover:text-white'
              }`}
            >
              Fixed Pricing
            </button>

            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleFaqClick();
              }}
              className="py-2 text-zinc-200 hover:text-white border-b border-white/10"
            >
              Straight Answers
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:07983145311"
              className="text-xs font-semibold tracking-wider text-zinc-300 text-center py-2"
            >
              07983 145311
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenQuote();
              }}
              className="w-full rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider py-3 cursor-pointer text-center"
            >
              Get Fixed Price
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
