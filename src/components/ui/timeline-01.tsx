"use client";

import React from "react";
import Timeline, { TimelineItemProps } from "@/components/ui/timeline-01-utils/timeline";
import { motion } from "framer-motion";

export const timelineData: TimelineItemProps[] = [
  {
    title: "Caravane humanitaire — 2026",
    description:
      "Participation à une caravane humanitaire en faveur d’une école locale à Douar Takechtamt (Maroc | 2026). Cette initiative collective visait à soutenir la communauté locale et à contribuer à l’amélioration des conditions éducatives.",
    date: "2026",
    image: "/images/activites/caravane-2026.jpg",
  },
  {
    title: "Finaliste — IS4BI 2025",
    description:
      "Participation à la finale IS4BI 2025 (IGA Maârif | Mai 2025), un événement consacré à l’innovation et à la présentation de projets. Cette expérience m’a permis de mettre en valeur le travail réalisé, de présenter un projet dans un cadre compétitif et de renforcer mes compétences en communication.\n\nDistinction : deuxième place au niveau de l'IGA.",
    date: "Mai 2025",
    image: "/images/activites/codex-formation.jpg",
  },
  {
    title: "Président et fondateur — Club IGA CodeX",
    description:
      "Fondateur et président du club informatique IGA CodeX (IGA Casablanca | 2024–2025), créé pour promouvoir les nouvelles technologies, encourager le partage des connaissances et développer la communauté informatique au sein de l’école.\n\nOrganisation de la première formation du club consacrée à l’intelligence artificielle, au Machine Learning et au Deep Learning, réunissant les étudiants autour de l’apprentissage et de la découverte des technologies émergentes.",
    date: "2024–2025",
    image: "/images/activites/is4bi-finaliste.jpg",
  },
  {
    title: "Caravane humanitaire — 2025",
    description:
      "Participation à une action humanitaire organisée avec les étudiants de l’IGA dans le village d’Aït Ikhlef, aux environs de Marrakech (2025). Cette initiative a été l’occasion de contribuer à une action solidaire au service de la communauté locale.",
    date: "2025",
    image: "/images/activites/caravane-2025.jpg",
  },
];

const TimelineBlock01 = () => {
  return (
    <section id="activites" aria-label="Engagement et activités parascolaires" className="overflow-hidden bg-background text-foreground select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Block with authentic Section Title Style */}
        <div className="border-x border-b border-border px-6 py-10 md:px-10 md:py-14 lg:px-16 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl space-y-2.5"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-foreground font-sans">
              Engagement.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
              Initiatives associatives, leadership d&apos;équipes, compétitions d&apos;innovation et actions solidaires sur le terrain.
            </p>
          </motion.div>
        </div>

        {/* Timeline Body: Exact 21st.dev / ShadcnSpace grid structure */}
        <div className="md:border-x border-r border-border">
          <Timeline items={timelineData} />
        </div>

        {/* Bottom Border Spacer */}
        <div className="border-x border-t border-border h-18 md:h-28" />
      </div>
    </section>
  );
};

export default TimelineBlock01;
