import React from 'react';
import { ExternalLink } from 'lucide-react';
import { PortfolioProject } from '../types';

export interface CaseStudyProject extends PortfolioProject {
  url: string;
  pageSpeedBadge: string;
  imageSrc: string;
  imageAlt: string;
  imageFallback: string;
}

export const featuredProjects: CaseStudyProject[] = [
  {
    id: 'sb-floristry',
    title: 'SB Floristry',
    category: 'E-COMMERCE PLATFORM',
    keyMetric: '3x Direct Online Orders',
    keyResult: '3x Direct Online Orders',
    tagline: 'High-conversion bespoke Shopify boutique with recurring subscription bouquets.',
    description:
      'Replaced a slow template with a custom Astro store. Streamlined mobile checkout and local delivery booking tripled direct sales.',
    pageSpeedBefore: 54,
    pageSpeedAfter: 99,
    pageSpeedBadge: '99/100',
    turnaroundTime: '10 Days Turnaround',
    url: 'sbfloristry.co.uk',
    imageSrc: '/images/sbfloristry-desktop.webp',
    imageAlt: 'SB Floristry Storefront',
    imageFallback:
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80',
    features: [
      '1-click Express Apple Pay & Google Pay',
      'Custom bouquet subscription and date scheduler',
      'Zero checkout friction on mobile',
      'Local Essex delivery radius automation',
    ],
    clientQuote:
      'Online flower orders tripled within the first month. Our customers constantly praise how quick and beautiful the ordering experience is on mobile.',
    clientAuthor: 'Sophie Bennett, Founder',
    accentColor: '#701a75',
  },
  {
    id: 'parkers-commercial',
    title: 'Parkers Commercial',
    category: 'B2B LEAD GEN',
    keyMetric: '100/100 Google PageSpeed',
    keyResult: '100/100 Google PageSpeed',
    tagline: 'Authority-commanding corporate hub for London & Essex commercial contracts.',
    description:
      'High-speed corporate platform structured for facilities contracts with instant quote routing and zero load latency.',
    pageSpeedBefore: 48,
    pageSpeedAfter: 100,
    pageSpeedBadge: '100/100',
    turnaroundTime: '12 Days Turnaround',
    url: 'parkerscommercial.co.uk',
    imageSrc: '/images/parkers-commercial-desktop.webp',
    imageAlt: 'Parkers Commercial Lead Gen',
    imageFallback:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    features: [
      'Flawless 100/100 mobile Google PageSpeed score',
      'Instant commercial service inquiry workflow',
      'Enterprise security & GDPR compliance',
      'Direct routing to director inboxes',
    ],
    clientQuote:
      'Corporate clients comment on how crisp and fast the website is before our first meeting. It established immediate trust.',
    clientAuthor: 'Marcus Parker, Director',
    accentColor: '#1e1b4b',
  },
  {
    id: 'vista-pure',
    title: 'Vista Pure',
    category: 'LOCAL TRADE SEO',
    keyMetric: '#1 Google Maps 3-Pack',
    keyResult: '#1 Google Maps 3-Pack',
    tagline: 'Dominating local Essex search rankings for high-margin exterior cleaning jobs.',
    description:
      'Mobile-first platform optimized for local residential search, featuring direct WhatsApp quote capture and top regional ranking.',
    pageSpeedBefore: 52,
    pageSpeedAfter: 99,
    pageSpeedBadge: '99/100',
    turnaroundTime: '8 Days Turnaround',
    url: 'vistapure.co.uk',
    imageSrc: '/images/vistapure-desktop.webp',
    imageAlt: 'Vista Pure Exterior Cleaning',
    imageFallback:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=700&q=80',
    features: [
      '#1 Google Maps 3-Pack local SEO structure',
      '1-tap WhatsApp and phone quote triggers',
      'High-resolution before/after visual proof',
      'Sub-second edge caching for zero bounce',
    ],
    clientQuote:
      'We jumped straight into the top 3 on Google Maps. The phone has not stopped ringing with driveway and commercial cleaning enquiries.',
    clientAuthor: 'Darren Cole, Operations Lead',
    accentColor: '#065f46',
  },
];

interface CaseStudiesProps {
  onSelectProject: (project: PortfolioProject) => void;
  onViewAllWork: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  onSelectProject,
  onViewAllWork,
}) => {
  return (
    <section id="work" className="pt-16 sm:pt-20 lg:pt-24 pb-20 md:pb-28 bg-zinc-950 text-white relative">
      {/* Ambient Glow Anchor behind the header to signal section depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-purple-900/10 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Polish */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mt-6 mb-3">
            PERSUASION &amp; SOCIAL PROOF
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight mb-4">
            Proven results for real UK businesses
          </h2>
          <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
            No abstract theory. Here is how our custom Astro builds perform in the real world.
          </p>
        </div>

        {/* 2. 3 Visual Cards with Realistic Viewports & Screenshot Previews */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 hover:-translate-y-1 group"
            >
              <div>
                {/* Top Browser Bar */}
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-purple-400 hover:text-purple-300 bg-zinc-950 hover:bg-zinc-900 px-3 py-1.5 rounded-md border border-purple-900/50 hover:border-purple-500/60 transition-all shadow-sm group/link"
                    title={`Visit ${project.url}`}
                  >
                    <span>{project.url}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-400 group-hover/link:text-purple-300 transition-colors" />
                  </a>
                </div>

                {/* Key Result Stat */}
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400 block mt-3.5">
                  KEY RESULT
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-zinc-100 tracking-tight mb-4">
                  {project.keyMetric}
                </h4>

                {/* Website Screenshot Preview */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 mb-4 relative">
                  <img
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = project.imageFallback;
                    }}
                  />
                </div>

                {/* Project Meta & Body */}
                <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                  <span className="text-xs font-bold text-purple-400 tracking-wide uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {project.turnaroundTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-1 mb-2">
                  {project.title}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  if (onSelectProject) {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                className="w-full mt-5 py-3 rounded-xl bg-zinc-800/80 hover:bg-purple-600 text-zinc-100 hover:text-white text-xs sm:text-sm font-semibold text-center transition-all border border-zinc-700/60 inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Case Study →</span>
              </a>
            </div>
          ))}
        </div>

        {/* 3. Bottom Global CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAllWork}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-900/40 cursor-pointer"
          >
            <span>View All Client Work →</span>
          </button>
        </div>
      </div>
    </section>
  );
};
