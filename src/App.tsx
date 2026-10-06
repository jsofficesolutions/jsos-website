import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CoreServices } from './components/CoreServices';
import { WhoWeAre } from './components/WhoWeAre';
import { CaseStudies, featuredProjects } from './components/CaseStudies';
import { SimplifiedPricing } from './components/SimplifiedPricing';
import { SecondaryDetailsModal } from './components/SecondaryDetailsModal';
import { ConversionZone } from './components/ConversionZone';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { ProjectModal } from './components/ProjectModal';
import { LegalModal } from './components/LegalModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { PackagesPage } from './components/PackagesPage';
import { PortfolioProject } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'packages'>('home');
  const [isScheduleAuditOpen, setIsScheduleAuditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isDeepDetailsOpen, setIsDeepDetailsOpen] = useState(false);
  const [deepDetailsInitialTab, setDeepDetailsInitialTab] = useState<'workflow' | 'addons' | 'compare' | 'faq' | 'hosting'>('workflow');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [selectedServiceTier, setSelectedServiceTier] = useState<string>('Tier 02: Multi-Page Business Suite (£799)');

  const handleOpenScheduleAudit = () => {
    setIsScheduleAuditOpen(true);
  };

  const handleOpenFAQ = () => {
    setDeepDetailsInitialTab('faq');
    setIsDeepDetailsOpen(true);
  };

  const handleOpenDeepDetails = () => {
    setDeepDetailsInitialTab('workflow');
    setIsDeepDetailsOpen(true);
  };

  const handleSelectTier = (tierName: string) => {
    setSelectedServiceTier(tierName);
  };

  const handleSelectTierAndQuoteFromPackages = (tierName: string) => {
    setSelectedServiceTier(tierName);
    setCurrentPage('home');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigatePage = (page: 'home' | 'packages') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerQuoteFromModal = () => {
    setSelectedProject(null);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAllWork = () => {
    // Open the first case study or deep showcase
    setSelectedProject(featuredProjects[0]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* 1. Header & Navigation */}
      <Navigation
        onOpenScheduleAudit={handleOpenScheduleAudit}
        onOpenFAQ={handleOpenFAQ}
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
      />

      <main className="flex-1">
        {currentPage === 'packages' ? (
          <PackagesPage
            onSelectTierAndQuote={handleSelectTierAndQuoteFromPackages}
            onOpenScheduleAudit={handleOpenScheduleAudit}
            onNavigateHome={() => handleNavigatePage('home')}
          />
        ) : (
          <>
            {/* 2. The Hero Section (Above the Fold) */}
            <Hero />

            {/* 3. Core Services (Immediately Below the Fold) */}
            <CoreServices onSelectTier={handleSelectTier} />

            {/* 4. Who We Are (The JSOS Standard) */}
            <WhoWeAre />

            {/* 5. Persuasion & Social Proof (Case Studies) */}
            <CaseStudies
              onSelectProject={(project) => setSelectedProject(project)}
              onViewAllWork={handleViewAllWork}
            />

            {/* 6. Simplified Pricing (Clean 3-column, fluff-free) */}
            <SimplifiedPricing
              onSelectTier={handleSelectTier}
              onOpenDeepDetails={handleOpenDeepDetails}
              onNavigatePackages={() => handleNavigatePage('packages')}
            />

            {/* 7. Bottom Call to Action (The Conversion Zone with Embedded Form) */}
            <ConversionZone
              selectedTier={selectedServiceTier}
              onTierChange={setSelectedServiceTier}
            />
          </>
        )}
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenFAQ={handleOpenFAQ}
        onNavigatePackages={() => handleNavigatePage('packages')}
        onNavigateHome={() => handleNavigatePage('home')}
      />

      {/* Mobile Sticky Bar */}
      <div className="fixed sm:hidden bottom-3 left-3 right-3 z-40 bg-zinc-950/95 backdrop-blur-md text-white border border-zinc-800 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between">
        <span className="text-xs font-bold text-zinc-200 truncate pr-2">
          Websites from £499
        </span>
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh,%20I'd%20like%20to%20get%20a%20fast%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </a>
          <a
            href="#contact"
            className="text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-full"
          >
            Get Quote
          </a>
        </div>
      </div>

      {/* Modals */}
      <ConsultationModal
        isOpen={isScheduleAuditOpen}
        onClose={() => setIsScheduleAuditOpen(false)}
        prefillTier={selectedServiceTier}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onTriggerQuote={handleTriggerQuoteFromModal}
      />

      <SecondaryDetailsModal
        isOpen={isDeepDetailsOpen}
        onClose={() => setIsDeepDetailsOpen(false)}
        initialTab={deepDetailsInitialTab}
        onSelectTierAndClose={(tier) => {
          setSelectedServiceTier(tier);
          setIsDeepDetailsOpen(false);
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
