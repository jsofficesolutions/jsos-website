import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="bg-black rounded-none max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/15 relative p-6 sm:p-8 text-white"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-purple-400">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            JS Office Solutions Legal
          </span>
        </div>

        {type === 'privacy' ? (
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
            <h3 className="text-xl font-bold text-white">Privacy &amp; Data Protection</h3>
            <p>
              At JS Office Solutions (JSOS), we take your privacy seriously. We only collect information you provide directly in our project quote forms and audit bookings (such as name, email address, and phone number) to deliver bespoke quotes and communicate regarding your project.
            </p>
            <p>
              <b className="text-white">No Third-Party Selling:</b> We never sell, rent, or distribute your contact details to third-party telemarketers or advertisers.
            </p>
            <p>
              <b className="text-white">Data Retention:</b> Your project details are stored securely. You may request deletion of your information at any time by emailing{' '}
              <a href="mailto:jordan@jsos.uk" className="text-purple-400 underline font-medium">
                jordan@jsos.uk
              </a>.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
            <h3 className="text-xl font-bold text-white">Terms of Service &amp; Fixed Pricing</h3>
            <p>
              <b className="text-white">Fixed Price Guarantee:</b> Packages are scoped upfront at fixed rates (Standard Brochure at £499, E-Commerce at £799, Growth &amp; Local SEO at £1,299) unless custom bespoke web software is explicitly agreed in writing.
            </p>
            <p>
              <b className="text-white">Milestone Payment Terms:</b> A 50% deposit is payable upon contract initiation and wireframe approval, and the remaining 50% balance upon final staging approval and domain go-live.
            </p>
            <p>
              <b className="text-white">Ownership:</b> Upon full payment, the client retains 100% intellectual property ownership of the website codebase, design, and uploaded media assets.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-white/15 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-none bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold uppercase tracking-wider text-white border border-white/20 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
