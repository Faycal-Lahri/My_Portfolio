'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export function Hero() {
  const { scrollY } = useScroll();
  const [showAutomating, setShowAutomating] = useState(false);

  // When scrolling down past 35px, replace 'Building Software' with 'Automating With AI'
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowAutomating(latest > 35);
  });

  const handleScrollToProfile = (e) => {
    e.preventDefault();
    const profileSection = document.getElementById('profile');
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="relative w-full h-[150vh] bg-background transition-colors duration-300">
      <section
        id="hero"
        aria-label="Présentation générale - Fayçal Lahri"
        className="sticky top-0 h-screen w-full flex flex-col justify-between bg-background text-foreground overflow-hidden p-6 sm:p-10 lg:px-16 lg:py-12 select-none transition-colors duration-300"
      >
        {/* 1. Top Bar: Clean 'Faycal.' brand with smooth drop-in animation */}
        <div className="w-full flex items-center justify-between z-20 pt-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-sans">
              Faycal.
            </span>
          </motion.div>
        </div>

        {/* 2. Main Hero Grid:
            - Left (col-span-3): Bio paragraph + Read More
            - Center (col-span-6): Much LARGER, 100% Round Yellow Circle + Fayçal Cutout
            - Right (col-span-3): Vertically Centered Text in place
                     Default: 'Building Software'
                     On Scroll: Replaced by 'Automating With AI' with smooth transition
        */}
        <div className="w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center z-10">

          {/* Left Column: Bio paragraph + Read More (animated slide-in on load) */}
          <motion.div
            initial={{ opacity: 0, x: -35, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-3 lg:order-1 lg:col-span-3 flex flex-col justify-end text-left space-y-4 max-w-[360px] xl:max-w-[400px]"
          >
            <p className="text-[15px] sm:text-base lg:text-[17px] text-muted-foreground leading-relaxed font-normal">
              Étudiant ingénieur à l'IGA Casablanca, filière Développement Logiciel et Technologies de l'Information, orienté full-stack, intelligence artificielle et automatisation.
            </p>
            <p className="text-xs sm:text-sm lg:text-[15px] text-muted-foreground/90 font-medium">
              En recherche active d'un stage PFE de 6 mois à partir de février/mars 2027.
            </p>

            <div className="pt-2">
              <a
                href="#profile"
                onClick={handleScrollToProfile}
                className="group inline-block text-base sm:text-lg font-bold text-foreground tracking-tight border-b-2 border-foreground pb-0.5 hover:opacity-75 transition-all cursor-pointer"
              >
                Read More
              </a>
            </div>
          </motion.div>

          {/* Center Column: BIGGER, Perfectly Circular Yellow Circle + Cutout Portrait */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center relative">
            <div className="relative aspect-square w-[340px] sm:w-[480px] lg:w-[540px] xl:w-[620px] flex items-center justify-center shrink-0">

              {/* Solid Vibrant Yellow Circle with spring bloom entrance */}
              <motion.div
                initial={{ scale: 0.65, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 18,
                  stiffness: 110,
                  duration: 0.95
                }}
                className="absolute inset-0 rounded-full bg-[#f5be18] shadow-2xl overflow-hidden flex items-end justify-center"
              >
                {/* Fayçal's authentic portrait cutout rising smoothly into the circle */}
                <motion.img
                  src="/images/faycal-cutout.png"
                  alt="Fayçal Lahri"
                  initial={{ opacity: 0, y: 90, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 120,
                    delay: 0.22,
                    duration: 1
                  }}
                  className="w-full h-full object-cover object-top select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Dead-Center In-Place Text Replacement
              - Initially: 'Building Software' sits dead-center vertically aligned with the circle
              - When scrolled: 'Building Software' animates out and is replaced by 'Automating With AI'
          */}
          <div className="order-2 lg:order-3 lg:col-span-3 flex items-center justify-center lg:justify-start select-none pl-0 lg:pl-2 min-h-[180px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              {!showAutomating ? (
                <motion.div
                  key="building-software"
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-0 text-left"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.92] text-foreground">
                    Building
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.92] text-foreground">
                    Software
                  </h1>
                </motion.div>
              ) : (
                <motion.div
                  key="automating-ai"
                  initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-0 text-left"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.92] text-foreground">
                    Automating
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter leading-[0.92] text-foreground flex items-center">
                    <span>With AI</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f5be18] ml-2 inline-block shadow-sm" />
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 3. Bottom Row spacing */}
        <div className="w-full h-4 z-20 pointer-events-none" />
      </section>
    </div>
  );
}
