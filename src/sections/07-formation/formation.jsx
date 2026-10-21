'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formationData } from './formation.data';

export function Formation() {
  return (
    <section
      id="formation"
      aria-label="Formation et cursus universitaire"
      className="relative w-full bg-background text-foreground py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 select-none overflow-hidden"
    >
      {/* Section Header: Matching 'Profil.' Typographic Style Exactly (cleared below floating menu) */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 pt-10 sm:pt-14 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none font-sans">
            {formationData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2.5 font-normal font-sans">
            {formationData.subtitle}
          </p>
        </motion.div>
      </div>

      {/* 3 Formations: Simple, Clean & Human Typography without Code/Monospace Style */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 space-y-8 sm:space-y-10">
        {formationData.formations.map((f, idx) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.12 + idx * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative pb-8 sm:pb-10 border-b border-border/40 transition-all duration-300 hover:pl-2"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 sm:gap-6">
              {/* Left: Diplôme, Filière & École */}
              <div className="space-y-1.5 sm:space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight font-sans group-hover:text-primary transition-colors">
                  {f.diplome}
                </h3>

                <p className="text-sm sm:text-base text-foreground/80 font-normal font-sans">
                  {f.filiere}
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground font-normal font-sans">
                  {f.ecole}
                </p>
              </div>

              {/* Right: Date in natural, simple sans-serif typography */}
              <div className="md:text-right flex-shrink-0 pt-0.5">
                <span className="text-xs sm:text-sm text-muted-foreground font-sans font-normal">
                  {f.periode}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
