import React, { useState } from 'react';
import { Phone, ArrowRight, Menu, X, Calendar } from 'lucide-react';

interface NavigationProps {
  onOpenScheduleAudit: () => void;
  onOpenFAQ: () => void;
  currentPage?: 'home' | 'packages';
  onNavigatePage?: (page: 'home' | 'packages') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenScheduleAudit,
  onOpenFAQ,
  currentPage = 'home',
  onNavigatePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (targetId?: string, isFaq?: boolean, pageTarget?: 'home' | 'packages') => {
    setMobileMenuOpen(false);

    if (pageTarget) {
      if (onNavigatePage) {
        onNavigatePage(pageTarget);
      }
      return;
    }

    if (isFaq) {
      onOpenFAQ();
      return;
    }

    if (targetId) {
      if (currentPage !== 'home' && onNavigatePage) {
        onNavigatePage('home');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Simplified Logo Lockup: Just transparent icon and JSOS */}
        <button
          onClick={() => handleNavClick(undefined, false, 'home')}
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-purple-500 rounded-lg py-1 cursor-pointer bg-transparent border-0 text-left"
          title="JSOS Home"
        >
          {/* Transparent icon, no border */}
          <div className="flex items-center tracking-tight font-black text-lg transition-transform group-hover:scale-105 select-none">
            <span className="text-purple-400">JS</span>
            <span className="text-white">OS</span>
          </div>
        </button>

        {/* Center: Navigation Links (Solutions, Packages, Our Work, FAQ, Contact) */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-semibold text-zinc-200">
          <button
            onClick={() => handleNavClick('solutions')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1"
          >
            Solutions
          </button>
          <button
            onClick={() => handleNavClick(undefined, false, 'packages')}
            className={`transition-colors cursor-pointer py-1 ${
              currentPage === 'packages' ? 'text-purple-400 font-bold' : 'hover:text-purple-400'
            }`}
          >
            Packages
          </button>
          <button
            onClick={() => handleNavClick('work')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1"
          >
            Our Work
          </button>
          <button
            onClick={() => handleNavClick(undefined, true)}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-purple-400 transition-colors cursor-pointer py-1"
          >
            Contact
          </button>
        </nav>

        {/* Top Right: Phone number & De-emphasized Ghost CTA */}
        <div className="hidden sm:flex items-center gap-3.5">
          <a
            href="tel:07983145311"
            className="flex items-center gap-2 text-sm sm:text-base font-bold text-zinc-200 hover:text-white px-4 py-2 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800/80 transition-all tracking-wide shadow-xs"
            aria-label="Call 07983 145311"
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>07983 145311</span>
          </a>

          {/* Ghost button (transparent background with purple border) */}
          <button
            onClick={onOpenScheduleAudit}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full bg-transparent text-purple-300 border border-purple-500/60 hover:bg-purple-950/40 hover:text-white hover:border-purple-400 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Schedule Audit</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:07983145311"
            className="p-2 text-zinc-300 hover:text-white rounded-full border border-zinc-800 bg-zinc-900 sm:hidden"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4 text-purple-400" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 py-6 shadow-2xl animate-fadeIn space-y-4">
          <div className="flex flex-col gap-3 font-semibold text-zinc-200 text-base">
            <button
              onClick={() => handleNavClick(undefined, false, 'home')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => handleNavClick(undefined, false, 'packages')}
              className={`text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors ${
                currentPage === 'packages' ? 'text-purple-400 font-bold' : ''
              }`}
            >
              Packages &amp; Pricing
            </button>
            <button
              onClick={() => handleNavClick('work')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors"
            >
              Our Work
            </button>
            <button
              onClick={() => handleNavClick(undefined, true)}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded-lg hover:bg-zinc-900 hover:text-purple-400 transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <a
              href="tel:07983145311"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-zinc-800 font-bold text-sm text-zinc-200 bg-zinc-900"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              <span>07983 145311</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleAudit();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-transparent text-purple-300 border border-purple-500/60 font-bold text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Schedule Audit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
