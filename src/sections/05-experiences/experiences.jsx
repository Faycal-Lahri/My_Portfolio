'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ScrollTimeline from '@/components/ui/scroll-timeline';
import { experiencesData } from './experiences.data';

export function Experiences() {
  return (
    <section
      id="experiences"
      aria-label="Expériences professionnelles de Fayçal Lahri"
      className="relative w-full bg-background text-foreground py-16 sm:py-24 px-6 sm:px-10 lg:px-16 transition-colors duration-300 overflow-hidden"
    >
      {/* Section Header: Matching 'Profil.' Typographic Style Exactly (no pill badge) */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 pt-1 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none font-sans">
            {experiencesData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 font-normal font-sans">
            {experiencesData.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Interactive Open Scroll Timeline with Company Logos & Reverse Chronological Order */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10">
        <ScrollTimeline milestones={experiencesData.experiences} />
      </div>
    </section>
  );
}
