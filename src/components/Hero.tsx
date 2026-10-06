import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Hero: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Dynamic tilt state combining scroll base perspective + interactive mouse hover tilt
  const stateRef = useRef({
    scrollProgress: 0,
    mouseTargetX: 0,
    mouseTargetY: 0,
    currentMouseX: 0,
    currentMouseY: 0,
    isHovering: false,
  });

  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      phone.style.transform = 'none';
      return;
    }

    let animationFrameId: number;

    const updateScrollProgress = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;

      const maxScroll = 550;
      stateRef.current.scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    const render = () => {
      const s = stateRef.current;

      // Silky damping lerp: 0.045 creates a luxurious, smooth float without snapping
      s.currentMouseX += (s.mouseTargetX - s.currentMouseX) * 0.045;
      s.currentMouseY += (s.mouseTargetY - s.currentMouseY) * 0.045;

      // Base scroll orientation: straightens smoothly as user scrolls down
      const baseRotX = 18 * (1 - s.scrollProgress);
      const baseRotY = -18 * (1 - s.scrollProgress);
      const baseRotZ = 4 * (1 - s.scrollProgress);

      // Subtle, elegant cursor tracking
      const finalRotX = baseRotX + s.currentMouseY;
      const finalRotY = baseRotY + s.currentMouseX;
      const finalRotZ = baseRotZ + (s.currentMouseX * 0.08);

      if (phoneRef.current) {
        phoneRef.current.style.transform = `perspective(1000px) rotateX(${finalRotX.toFixed(2)}deg) rotateY(${finalRotY.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    updateScrollProgress();
    animationFrameId = requestAnimationFrame(render);

    const handleScroll = () => {
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = phoneRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Center point of the phone
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalised position from -1 to 1 relative to center
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // Gentle, elegant tilt angle range (up to 8 deg maximum)
    const maxTilt = 8;
    stateRef.current.mouseTargetX = Math.max(-1, Math.min(1, normalizedX)) * maxTilt;
    stateRef.current.mouseTargetY = -Math.max(-1, Math.min(1, normalizedY)) * maxTilt;
    stateRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    // Smoothly return to neutral perspective
    stateRef.current.mouseTargetX = 0;
    stateRef.current.mouseTargetY = 0;
    stateRef.current.isHovering = false;
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-16 pb-10 lg:pt-24 lg:pb-14 overflow-hidden bg-zinc-950"
      id="top"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[400px] bg-purple-600/10 blur-[130px] -z-10 rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: Value Proposition & Conversion Zone (7 cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* 1. Headline (H1): leading-[1.15] mb-6 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.15] mb-6">
              <span className="text-zinc-100 block">Custom Web Design</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 block">
                for Small Businesses in London &amp; Essex
              </span>
            </h1>

            {/* 2. Sub-headline (P): mb-8 max-w-lg */}
            <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-xl font-normal mb-8">
              High-speed, affordable custom websites engineered to turn local searches into paying customers. Built with sub-second speeds to give your small business an immediate edge over the competition.
            </p>

            {/* 3. Call-to-Action Group: gap-4 mb-5 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-5 w-full sm:w-auto">
              {/* Primary Action: Solid brand purple button */}
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-purple-700 hover:bg-purple-600 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-purple-950/60 hover:shadow-purple-900/80 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Fast Project Quote</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </a>

              {/* Secondary Action: De-escalated soft ghost button */}
              <a
                href="https://wa.me/447983145311?text=Hi%20Jordan%20%26%20Josh,%20I'd%20like%20to%20get%20a%20fast%20quote%20for%20my%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/70 hover:bg-zinc-800/80 text-zinc-200 hover:text-white text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* 4. Client / Social Proof Bar */}
            <div className="mt-10 lg:mt-14 w-full max-w-xl">
              <span className="text-xs sm:text-sm tracking-wider uppercase text-zinc-400 font-bold mb-4 block">
                TRUSTED BY LOCAL BUSINESSES &amp; TRADES
              </span>

              {/* 4 Client Marks with gap-8 and intentional ~65% opacity */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="opacity-65 hover:opacity-100 transition-opacity">
                  <span className="font-serif italic font-bold text-base text-zinc-200 tracking-wide block">
                    SB Floristry
                  </span>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-wider">Boutique</span>
                </div>

                <div className="opacity-65 hover:opacity-100 transition-opacity">
                  <span className="font-sans font-black text-sm text-zinc-200 tracking-wider uppercase block">
                    Parkers
                  </span>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-wider">Commercial</span>
                </div>

                <div className="opacity-65 hover:opacity-100 transition-opacity">
                  <span className="font-sans font-extrabold text-sm text-zinc-200 tracking-tight block">
                    VISTA PURE
                  </span>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-wider">Exterior</span>
                </div>

                <div className="opacity-65 hover:opacity-100 transition-opacity">
                  <span className="font-sans font-bold text-sm text-zinc-200 tracking-wide block">
                    Apex Build
                  </span>
                  <span className="text-[10px] text-zinc-400 block uppercase font-mono tracking-wider">London</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Phone with Dynamic Scroll Perspective & Magnetic Cursor Tilt */}
          <div 
            className="lg:col-span-5 relative flex justify-center items-center lg:justify-end pt-4 pb-12 overflow-visible cursor-grab active:cursor-grabbing"
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -top-12 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-10 w-96 h-96 bg-purple-600/25 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

            {/* Interactive 3D Phone Chassis */}
            <div 
              id="hero-3d-phone"
              ref={phoneRef}
              className="relative w-[300px] sm:w-[350px] transform-gpu will-change-transform rounded-t-[48px] rounded-b-none border-t-[10px] border-x-[10px] border-b-0 border-zinc-900 bg-zinc-950 shadow-2xl shadow-purple-950/70 ring-1 ring-white/10 overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateX(18deg) rotateY(-18deg) rotateZ(4deg)',
                transformStyle: 'preserve-3d',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
            >
              {/* Notch / Dynamic Speaker Bar */}
              <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 w-36 mx-auto rounded-b-2xl z-20 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1"></div>
              </div>

              {/* Viewport: Screen Recording Video / Fallback Placeholder with Unlock Wake-up */}
              <div className="w-full aspect-[9/15] bg-black flex items-center justify-center relative overflow-hidden">
                
                {/* Video element: fades in from pitch-black when loaded to simulate screen unlocking */}
                <video 
                  src="/videos/sb-floristry.mp4" 
                  preload="metadata"
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  aria-hidden="true"
                  tabIndex={-1}
                  className={`w-full h-full object-cover object-top select-none absolute inset-0 transition-opacity duration-1000 ease-out ${
                    isVideoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  onError={() => {
                    setHasVideo(false);
                    setIsVideoReady(false);
                  }}
                  onLoadedData={() => {
                    setHasVideo(true);
                    // Small delay to simulate the screen waking up cleanly
                    setTimeout(() => setIsVideoReady(true), 150);
                  }}
                  onCanPlay={() => {
                    setHasVideo(true);
                    setTimeout(() => setIsVideoReady(true), 150);
                  }}
                />

                {/* Initial Screen Wake / Lock overlay */}
                <div 
                  className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-10 ${
                    isVideoReady ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                {/* Fallback placeholder if video fails or is missing */}
                {!hasVideo && (
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center text-center p-6 select-none z-0">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3 shadow-inner">
                      🎥
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-300">hero-scroll-preview.mp4</span>
                    <span className="text-[10px] text-zinc-500 mt-1 max-w-[200px]">
                      Screen recording or screenshot
                    </span>
                    <span className="mt-4 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-[10px] font-mono text-purple-300">
                      Awaiting video upload
                    </span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
