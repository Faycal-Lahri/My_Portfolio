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
      {/* Section Header: Matching 'Profil.' Typographic Style Exactly */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 pt-10 sm:pt-14 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none font-sans">
            {certificationsData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2.5 font-normal font-sans">
            {certificationsData.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Certifications Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {certificationsData.certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: 0.05 + (idx % 3) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative bg-card text-card-foreground border border-border/60 hover:border-foreground/25 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            <div>
              {/* Header: Issuer Logo & Date */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Transparent Logo Container */}
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-border/40 flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className={`max-w-full max-h-full object-contain ${
                        cert.invertInDark ? 'dark:invert' : ''
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground/90 tracking-tight truncate font-sans">
                    {cert.issuer}
                  </span>
                </div>

                <span className="text-xs text-muted-foreground font-sans flex-shrink-0">
                  {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug tracking-tight font-sans mb-3 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              {/* Credential ID if present */}
              {cert.credentialId && (
                <p className="text-xs text-muted-foreground font-sans font-normal mb-5">
                  ID : <span className="text-foreground/75">{cert.credentialId}</span>
                </p>
              )}
            </div>

            {/* Direct Verification Link */}
            {cert.url && (
              <div className="pt-4 border-t border-border/40 mt-auto">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors group/link"
                >
                  <span>Voir la certification</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
