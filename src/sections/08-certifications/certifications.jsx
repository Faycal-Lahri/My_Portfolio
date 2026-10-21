'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { certificationsData } from './certifications.data';

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications professionnelles"
      className="relative w-full bg-background text-foreground py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 select-none overflow-hidden"
    >
      {/* Subtle Ambient Background Shade */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[350px] sm:h-[450px] bg-primary/[0.03] dark:bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-500/[0.02] dark:bg-blue-400/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Section Header: Matching 'Profil.' Typographic Style Exactly */}
      <div className="w-full max-w-[1280px] mx-auto relative z-10 pt-10 sm:pt-14 mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none font-sans">
            {certificationsData.title}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground mt-2.5 font-normal font-sans"
          >
            {certificationsData.subtitle}
          </motion.p>
        </motion.div>
      </div>

      {/* Certifications Grid: 4 per line on desktop, 3 on tablet, 2 on phone */}
      <div className="w-full max-w-[1280px] mx-auto relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4.5">
        {certificationsData.certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{
              duration: 0.35,
              delay: 0.02 + (idx % 4) * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative rounded-xl sm:rounded-2xl p-3.5 sm:p-4 md:p-4.5 flex flex-col justify-between transition-all duration-300 select-none
              bg-card text-card-foreground border border-border/60
              hover:bg-neutral-950 hover:text-white hover:border-neutral-950 hover:shadow-xl
              dark:hover:bg-white dark:hover:text-black dark:hover:border-white dark:hover:shadow-[0_12px_35px_rgba(255,255,255,0.18)]"
          >
            <div>
              {/* Header: Crisp Logo Badge & Issuance Date */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Authentic Brand Logo Badge Container */}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-neutral-200/80 dark:border-neutral-700/60 group-hover:dark:border-neutral-300/90 flex items-center justify-center p-1 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="max-w-full max-h-full object-contain select-none"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold tracking-tight truncate font-sans transition-colors duration-300 text-foreground/90 group-hover:text-white group-hover:dark:text-neutral-950">
                    {cert.issuer}
                  </span>
                </div>

                <span className="text-[10px] sm:text-[11px] font-sans flex-shrink-0 transition-colors duration-300 text-muted-foreground group-hover:text-neutral-400 group-hover:dark:text-neutral-600">
                  {cert.date}
                </span>
              </div>

              {/* Title: Inverts smoothly on hover */}
              <h3 className="text-xs sm:text-sm font-bold leading-snug tracking-tight font-sans mb-1.5 line-clamp-2 transition-colors duration-300 text-foreground group-hover:text-white group-hover:dark:text-black">
                {cert.title}
              </h3>

              {/* Credential ID if present */}
              {cert.credentialId && (
                <p className="text-[10px] sm:text-[11px] font-sans font-normal mb-3 truncate transition-colors duration-300 text-muted-foreground group-hover:text-neutral-400 group-hover:dark:text-neutral-600">
                  ID : <span className="transition-colors duration-300 text-foreground/75 group-hover:text-white group-hover:dark:text-black font-medium">{cert.credentialId}</span>
                </p>
              )}
            </div>

            {/* Direct Verification Link with fluid hover icon translation */}
            {cert.url && (
              <div className="pt-2.5 border-t mt-auto transition-colors duration-300 border-border/40 group-hover:border-neutral-800 group-hover:dark:border-neutral-200">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold transition-colors duration-300 text-foreground/90 group-hover:text-white group-hover:dark:text-black group/link"
                >
                  <span>Voir la certif</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
