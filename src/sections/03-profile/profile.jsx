'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from 'next-themes';

// Animated Grid Background matching Image 4
// - White & Grey if Dark Mode ("mode sombre")
// - Black & Grey if Light Mode ("mode claire")
// - Placed at z-0 with subtle soft blur so it's clearly visible behind content
function AnimatedGridBackground() {
  const canvasRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const mousePosRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Tile metrics matching Image 4 (rounded squares with clear gaps)
    const tileSize = 50;
    const gap = 8;
    const radius = 12;
    const isDark = resolvedTheme === 'dark';

    const render = (time) => {
      if (width === 0 || height === 0) {
        resize();
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / (tileSize + gap)) + 1;
      const rows = Math.ceil(height / (tileSize + gap)) + 1;
      const mouse = mousePosRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (tileSize + gap);
          const y = r * (tileSize + gap);

          // Diagonal fluid wave flowing across grid (Image 4 homage)
          const diagonalDist = (c * 0.72 + r * 0.48);
          const wave = Math.sin(time * 0.0016 - diagonalDist * 0.38);
          const secondary = Math.cos(time * 0.001 + (c - r) * 0.22) * 0.22;
          const normalized = Math.min(1, Math.max(0, (wave + secondary + 1) / 2)); // 0 to 1

          // Interactive mouse proximity boost
          const distToMouse = Math.hypot(x + tileSize / 2 - mouse.x, y + tileSize / 2 - mouse.y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 220);

          if (isDark) {
            // Mode Sombre: White and Grey rounded squares
            const shade = Math.floor(35 + normalized * 185 + mouseInfluence * 40);
            const alpha = 0.2 + normalized * 0.45 + mouseInfluence * 0.25;

            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade + 6}, ${alpha})`;
            ctx.beginPath();
            ctx.roundRect(x, y, tileSize, tileSize, radius);
            ctx.fill();

            // Subtle border definition
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 + normalized * 0.16})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            // Mode Claire: Black and Grey rounded squares
            const shade = Math.floor(190 - normalized * 140 - mouseInfluence * 30);
            const alpha = 0.18 + normalized * 0.38 + mouseInfluence * 0.22;

            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
            ctx.beginPath();
            ctx.roundRect(x, y, tileSize, tileSize, radius);
            ctx.fill();

            // Subtle border definition
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.08 + normalized * 0.18})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [resolvedTheme]);

  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full blur-[2.5px] scale-[1.02] transform-gpu opacity-95 transition-opacity duration-300"
      />
    </div>
  );
}

export function Profile() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const stats = [
    { value: '7+', label: 'Projets réalisés', sub: 'Full-Stack & IA' },
    { value: '8+', label: 'Certifications', sub: 'Accréditations vérifiables' },
    { value: '4', label: 'Expériences & stages', sub: 'DXC, Eurafric...' },
    { value: '1', label: 'Club fondé', sub: 'IGA CodeX' },
  ];

  return (
    <section
      ref={containerRef}
      id="profile"
      aria-label="Profil de Fayçal Lahri"
      className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between bg-background text-foreground overflow-hidden p-6 sm:p-10 lg:px-16 lg:py-12 select-none transition-colors duration-300"
    >
      {/* Animated Grid Background: Visible at z-0 with soft blur */}
      <AnimatedGridBackground />

      {/* Top Header: Simple 'Profil.' headline */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 pt-1">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none"
        >
          Profil.
        </motion.h2>
      </div>

      {/* Main Content Grid: High-Contrast, Crystal Clear Editorial Text + Continuous Animated Stats */}
      <div className="w-full max-w-[1240px] mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10 py-2">

        {/* Left Column: Clear High-Contrast Editorial Text with Solid Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 flex flex-col space-y-4 text-left p-6 sm:p-8 rounded-2xl bg-white/90 dark:bg-zinc-950/85 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-xl dark:shadow-2xl"
        >
          <p className="text-base sm:text-lg lg:text-[19px] font-semibold text-zinc-900 dark:text-white leading-relaxed">
            Je suis étudiant ingénieur en informatique à l’IGA Casablanca, passionné par le développement full-stack, l’intelligence artificielle appliquée et l’automatisation des processus.
          </p>

          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
            Grâce à mes expériences chez <strong className="text-zinc-950 dark:text-white font-bold">DXC Technology Morocco</strong> et <strong className="text-zinc-950 dark:text-white font-bold">Eurafric Information</strong>, j’ai travaillé sur des solutions concrètes combinant développement web, intégration d’API, sécurité et automatisation (assistant intelligent IA, plateforme de gestion des stages, console Backoffice OPV).
          </p>

          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-200 leading-relaxed">
            J’utilise notamment <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">Java</span>, <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">React</span>, <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">Spring Boot</span>, <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">Laravel</span>, <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">MySQL</span> et <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/15 px-2 py-0.5 rounded-md border border-zinc-300 dark:border-white/20 inline-block mx-0.5">n8n</span> pour créer des solutions numériques utiles et robustes.
          </p>

          <div className="pt-3 border-t border-zinc-200 dark:border-white/15 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            Fondateur du club <span className="font-bold text-zinc-900 dark:text-white">IGA CodeX</span>
          </div>
        </motion.div>

        {/* Right Column: 4 Improved Monochrome Stats Cards (No yellow, clean Apple aesthetics) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? {
                    opacity: 1,
                    y: [0, -6, 0],
                    boxShadow: [
                      '0 4px 20px -2px rgba(0,0,0,0.05)',
                      '0 12px 28px -4px rgba(0,0,0,0.12)',
                      '0 4px 20px -2px rgba(0,0,0,0.05)',
                    ],
                  }
                  : {}
              }
              transition={{
                opacity: { duration: 0.5, delay: 0.2 + idx * 0.1 },
                y: {
                  duration: 3.6 + idx * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                },
                boxShadow: {
                  duration: 3.6 + idx * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.2,
                },
              }}
              whileHover={{ y: -6, scale: 1.025, transition: { duration: 0.2 } }}
              className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-zinc-950/90 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/15 transition-all shadow-lg min-h-[155px] sm:min-h-[170px]"
            >
              {/* Top Row: Big Metric + Minimal Monochrome Icon Badge */}
              <div className="flex items-center justify-between">
                <motion.span
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{
                    duration: 3.2 + idx * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.2,
                  }}
                  className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-zinc-950 dark:text-white font-sans leading-none inline-block"
                >
                  {stat.value}
                </motion.span>

                {/* Minimalist Monochrome Icon Badge (Replaced yellow dot) */}
                <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 shadow-xs">
                  {idx === 0 && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  )}
                  {idx === 3 && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Bottom: Clear Label & Elegant Subtitle */}
              <div className="mt-3">
                <p className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white tracking-tight leading-snug mb-0.5">
                  {stat.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal leading-normal">
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
