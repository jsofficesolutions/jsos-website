import React from 'react';
import { ArrowRight, ExternalLink, Sparkles, Check, ChevronRight } from 'lucide-react';
import { PortfolioProject } from '../types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'apex',
    title: 'Apex Contracting & Roofing',
    category: 'Trades & Construction • Website + Live Quote Tool',
    tagline: 'From slow word-of-mouth reliance to 18+ high-margin quotes every month.',
    description:
      'Their previous WordPress build scored 52 on Google PageSpeed. We designed and engineered a custom platform with an instant roof & extension quote calculator, project gallery showcase, and local SEO structure. Jake and his team now run a predictable diary 6 weeks in advance.',
    pageSpeedBefore: 52,
    pageSpeedAfter: 98,
    keyMetric: '+210% Inbound Enquiries',
    turnaroundTime: '2.5 Weeks from brief to launch',
    features: [
      'Interactive 3-step instant roofing quote calculator',
      'Local Kent & Southeast Google Schema & SEO setup',
      'High-resolution before/after craftsmanship slider',
      'Direct WhatsApp and 1-tap phone enquiry routing',
    ],
    clientQuote:
      'Jordan delivered exactly what he said he would. The website paid for itself within the first ten days from a single extension lead.',
    clientAuthor: 'Mark Andrews, Managing Director',
    accentColor: '#581c87',
  },
  {
    id: 'vanguard',
    title: 'Vanguard Architectural Interiors',
    category: 'High-End Design • Showroom & Portfolio Platform',
    tagline: 'Positioning a premier interior specialist for multi-million pound residential briefs.',
    description:
      'A showroom-calibre website engineered to put bespoke craftsmanship front and centre. Built with dark minimal elegance, lightning-fast media compression, and friction-free consultation booking that pre-qualifies prospective clients.',
    pageSpeedBefore: 61,
    pageSpeedAfter: 97,
    keyMetric: '£420k Pipeline Generated in Q1',
    turnaroundTime: '3 Weeks turnaround',
    features: [
      'Interactive residential & commercial case studies',
      'VIP discovery call integration via Calendly',
      'Ultra-fast WebP responsive image pipeline',
      'Private brochure PDF download gated with lead capture',
    ],
    clientQuote:
      'Our website finally looks like the luxury standard of work we do. Clients comment on the slick design before we even meet them.',
    clientAuthor: 'Eleanor Vance, Principal Designer',
    accentColor: '#3b0764',
  },
  {
    id: 'meridian',
    title: 'Meridian Commercial Solutions',
    category: 'Professional Services • Advisory Platform & Client Portal',
    tagline: 'Transforming a dated brochure site into an automated inbound growth engine.',
    description:
      'Meridian needed to stand out against London conglomerates. JSOS built an authority-commanding platform featuring transparent package pricing, interactive assessment tools, and automated calendar scheduling.',
    pageSpeedBefore: 48,
    pageSpeedAfter: 99,
    keyMetric: '3.4x Discovery Call Bookings',
    turnaroundTime: '2 Weeks turnaround',
    features: [
      'Interactive corporate advisory assessment wizard',
      'Automated email notification and CRM webhook sync',
      'GDPR compliant client portal links',
      'Google PageSpeed score 99/100 across mobile and desktop',
    ],
    clientQuote:
      'No fluff, no endless committee meetings. Jordan designed the platform, wrote clear copy, and got us live on time and on budget.',
    clientAuthor: 'David Chen, Co-Founder',
    accentColor: '#6b21a8',
  },
];

interface RecentBuildsProps {
  onSelectProject: (project: PortfolioProject) => void;
}

export const RecentBuilds: React.FC<RecentBuildsProps> = ({ onSelectProject }) => {
  const scrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <p className="label">Recent builds</p>
        <h2>
          Websites doing their job, <em>right now</em>
        </h2>

        <div className="workgrid">
          {portfolioProjects.map((project, idx) => (
            <div
              key={project.id}
              className="workcard group cursor-pointer"
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectProject(project);
              }}
            >
              {/* CSS/SVG Browser Window Mockup */}
              <div className="relative aspect-16/10 bg-zinc-950 overflow-hidden border-b border-zinc-200">
                {/* Browser Top Bar */}
                <div className="h-7 bg-zinc-900 flex items-center justify-between px-3 border-b border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono tracking-wider bg-zinc-800/80 px-3 py-0.5 rounded-full truncate max-w-[200px]">
                    {project.title.toLowerCase().replace(/\s+/g, '')}.co.uk
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/50">
                      {project.pageSpeedAfter}
                    </span>
                  </div>
                </div>

                {/* Mockup Preview Interior */}
                <div className="p-5 h-[calc(100%-28px)] flex flex-col justify-between bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 group-hover:scale-102 transition-transform duration-500">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/70 border border-purple-800/60 px-2 py-0.5 rounded">
                        {project.keyMetric}
                      </span>
                      <span className="text-[10px] text-zinc-400">PageSpeed {project.pageSpeedAfter}/100</span>
                    </div>
                    <h4 className="text-white font-bold text-lg mt-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{project.tagline}</p>
                  </div>

                  {/* Mock Mini Layout Elements */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                        Bespoke Copy
                      </span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                        Quote Engine
                      </span>
                    </div>
                    <span className="text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Case Study
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="workcard__body">
                <p className="workcard__meta">{project.category}</p>
                <h3 className="text-zinc-950 group-hover:text-purple-900 transition-colors">
                  {project.title}
                </h3>
                <p>{project.description}</p>
                <div className="workcard__more">
                  <span>View full case study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
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
