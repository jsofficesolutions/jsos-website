import React, { useEffect, useRef, useState } from 'react';

export const HeroPhone: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
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

      // Silky damping lerp
      s.currentMouseX += (s.mouseTargetX - s.currentMouseX) * 0.045;
      s.currentMouseY += (s.mouseTargetY - s.currentMouseY) * 0.045;

      // Base scroll orientation: straightens smoothly as user scrolls down
      const baseRotX = 18 * (1 - s.scrollProgress);
      const baseRotY = -18 * (1 - s.scrollProgress);
      const baseRotZ = 4 * (1 - s.scrollProgress);

      // Subtle cursor tracking
      const finalRotX = baseRotX + s.currentMouseY;
      const finalRotY = baseRotY + s.currentMouseX;
      const finalRotZ = baseRotZ + s.currentMouseX * 0.08;

      if (phoneRef.current) {
        phoneRef.current.style.transform = `perspective(1000px) rotateX(${finalRotX.toFixed(
          2
        )}deg) rotateY(${finalRotY.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg)`;
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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    stateRef.current.mouseTargetX = Math.max(-1, Math.min(1, normalizedX)) * 12;
    stateRef.current.mouseTargetY = Math.max(-1, Math.min(1, -normalizedY)) * 12;
  };

  const handleMouseLeave = () => {
    stateRef.current.mouseTargetX = 0;
    stateRef.current.mouseTargetY = 0;
  };

  return (
    <div
      className="relative flex justify-center items-center lg:justify-end pt-4 pb-8 overflow-visible cursor-grab active:cursor-grabbing w-full"
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Backlight Glow */}
      <div className="absolute -top-12 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-10 w-80 sm:w-96 h-80 sm:h-96 bg-purple-600/25 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Interactive 3D Phone Chassis */}
      <div
        id="hero-3d-phone"
        ref={phoneRef}
        className="relative w-[280px] sm:w-[320px] md:w-[340px] transform-gpu will-change-transform rounded-t-[44px] rounded-b-none border-t-[10px] border-x-[10px] border-b-0 border-zinc-900 bg-zinc-950 shadow-2xl shadow-purple-950/70 ring-1 ring-white/15 overflow-hidden"
        style={{
          transform: 'perspective(1000px) rotateX(18deg) rotateY(-18deg) rotateZ(4deg)',
          transformStyle: 'preserve-3d',
          WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
        }}
      >
        {/* Notch / Speaker Bar */}
        <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 w-32 sm:w-36 mx-auto rounded-b-2xl z-20 flex items-center justify-center pointer-events-none">
          <div className="w-10 sm:w-12 h-1 bg-zinc-800 rounded-full mb-1" />
        </div>

        {/* Viewport Screen */}
        <div className="w-full aspect-[9/16] bg-black flex items-center justify-center relative overflow-hidden">
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
              <span className="text-xs font-mono font-medium text-zinc-300">sb-floristry.mp4</span>
              <span className="text-[10px] text-zinc-500 mt-1 max-w-[200px]">
                Screen recording preview
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
