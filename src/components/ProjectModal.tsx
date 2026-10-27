import React from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onTriggerQuote: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onTriggerQuote,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="bg-[#0a0a0a] rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/15 relative text-white"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-black text-white relative overflow-hidden border-b border-white/15">
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-[#1e1b4b] border border-purple-500/40 px-2.5 py-1 rounded-none">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3 text-white">
              {project.title}
            </h3>
            <p className="text-zinc-300 text-sm mt-1">{project.tagline}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/15">
            <div>
              <span className="text-[11px] text-zinc-400 uppercase block font-semibold">PageSpeed</span>
              <span className="text-lg font-bold text-white">
                {project.pageSpeedBefore} &rarr; {project.pageSpeedAfter}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase block font-semibold">Key Result</span>
              <span className="text-lg font-bold text-purple-400">{project.keyMetric}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase block font-semibold">Delivery</span>
              <span className="text-xs font-semibold text-zinc-300 mt-1 block">
                {project.turnaroundTime}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#0a0a0a]">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              The Challenge &amp; Solution
            </h4>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
              Engineered Features
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-zinc-200 bg-black p-3 rounded-none border border-white/15"
                >
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Feedback */}
          <div className="p-5 rounded-none bg-black border border-white/15 text-zinc-200">
            <p className="italic text-sm leading-relaxed text-zinc-200">
              &ldquo;{project.clientQuote}&rdquo;
            </p>
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-purple-400">
              <span>{project.clientAuthor}</span>
              <span className="text-purple-300">Verified Client</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-400">
              Want a similar high-speed build for your business?
            </span>
            <button
              onClick={() => {
                onClose();
                onTriggerQuote();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-none bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Get a Fast Project Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
