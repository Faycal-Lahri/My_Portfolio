'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { projetsData } from './projets.data';

export function ProjetsAcademiques() {
  // Start with index 1 (Scholar Network - Green Cover) so Red is on left and White is on right, matching the reference screenshot exactly
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const containerRef = useRef(null);
  const rawProjects = projetsData.projets;
  const totalProjects = rawProjects.length;

  // Pointer & Drag physics state
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    lastX: 0,
    dragDistance: 0,
    pointerDownTime: 0,
  });

  // Navigate to next / previous
  const goTo = useCallback(
    (index) => {
      let next = index;
      if (next < 0) next = totalProjects - 1;
      if (next >= totalProjects) next = 0;
      setActiveIndex(next);
    },
    [totalProjects]
  );

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e) => {
    if (e.button && e.button !== 0) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const d = dragRef.current;
    d.isDragging = true;
    d.startX = clientX;
    d.lastX = clientX;
    d.dragDistance = 0;
    d.pointerDownTime = Date.now();
  };

  // Pointer Move
  const handlePointerMove = (e) => {
    const d = dragRef.current;
    if (!d.isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = d.startX - clientX;
    d.dragDistance = Math.abs(diff);

    // If dragged enough, trigger slide switch
    if (d.dragDistance > 55) {
      if (diff > 0) {
        goTo(activeIndex + 1);
      } else {
        goTo(activeIndex - 1);
      }
      d.isDragging = false;
    }
  };

  // Pointer Up
  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  // Global mouse listeners
  useEffect(() => {
    window.addEventListener('mouseup', handlePointerUp);
    return () => window.removeEventListener('mouseup', handlePointerUp);
  }, []);

  // Card click handling
  const handleCardClick = (project, idx, e) => {
    e.stopPropagation();
    // If not active card, bring to center first
    if (idx !== activeIndex) {
      setActiveIndex(idx);
      return;
    }

    // If already active card, open modal
    if (dragRef.current.dragDistance < 15) {
      setSelectedProject(project);
      setActiveImageIndex(0);
    }
  };

  // Keyboard navigation for modal & carousel
  useEffect(() => {
    const onKeyDown = (e) => {
      if (selectedProject) {
        if (e.key === 'Escape') setSelectedProject(null);
        if (e.key === 'ArrowRight') {
          setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
      } else {
        if (e.key === 'ArrowRight') goTo(activeIndex + 1);
        if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, activeIndex, goTo]);

  return (
    <section
      id="projets"
      aria-label="Projets réalisés"
      className="relative w-full bg-background text-foreground py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 select-none overflow-hidden no-scrollbar"
    >

      {/* Section Header: Matching 'Profil.' and 'Expériences.' Typographic Style Exactly (cleared below floating menu) */}
      <div className="w-full max-w-[1240px] mx-auto relative z-10 pt-10 sm:pt-14 mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none font-sans">
            {projetsData.title}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2.5 font-normal font-sans">
            {projetsData.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Showcase Container Matching Reference Screenshot Exactly (Clean rounded plinth without heavy bottom shadows) */}
      <div className="w-full max-w-[1240px] mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#f2f2f3] text-neutral-900 border border-neutral-300/70 py-8 sm:py-10 md:py-12 px-3 sm:px-6 md:px-10 relative overflow-hidden flex flex-col items-center justify-center">
        {/* 3D Coverflow Stage */}
        <div
          ref={containerRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px] cursor-grab active:cursor-grabbing overflow-hidden flex items-center justify-center touch-pan-y"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {rawProjects.map((project, idx) => {
              // Calculate distance offset from activeIndex (-2, -1, 0, 1, 2)
              let diff = idx - activeIndex;
              if (diff < -totalProjects / 2) diff += totalProjects;
              if (diff > totalProjects / 2) diff -= totalProjects;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              // Strictly ONLY 3 images visible at all times (Center, Left, Right)
              if (Math.abs(diff) > 1) {
                return null;
              }

              // Mathematical 3D Coverflow positioning matching reference screenshot
              let translateX = 0;
              let rotateY = 0;
              let translateZ = 0;
              let scale = 1;

              if (isCenter) {
                translateX = 0;
                rotateY = 0;
                translateZ = 0;
                scale = 1;
              } else if (isLeft) {
                // Left card angled inward towards center
                const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : typeof window !== 'undefined' && window.innerWidth < 1024 ? 175 : 205;
                translateX = -step;
                rotateY = 36;
                translateZ = -35;
                scale = 0.95;
              } else if (isRight) {
                // Right card angled inward towards center
                const step = typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : typeof window !== 'undefined' && window.innerWidth < 1024 ? 175 : 205;
                translateX = step;
                rotateY = -36;
                translateZ = -35;
                scale = 0.95;
              }

              return (
                <motion.div
                  key={project.id}
                  onClick={(e) => handleCardClick(project, idx, e)}
                  initial={false}
                  animate={{
                    x: translateX,
                    rotateY,
                    z: translateZ,
                    scale,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 28,
                    mass: 0.7,
                  }}
                  className="absolute left-1/2 top-1/2 -ml-[85px] sm:-ml-[105px] md:-ml-[120px] lg:-ml-[130px] -mt-[85px] sm:-mt-[105px] md:-mt-[120px] lg:-mt-[130px] w-[170px] sm:w-[210px] md:w-[240px] lg:w-[260px] h-[170px] sm:h-[210px] md:h-[240px] lg:h-[260px] rounded-[3px] overflow-hidden bg-black shadow-none cursor-pointer will-change-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: isCenter ? 30 : 20,
                  }}
                >
                  {/* Square Album Cover Image Frame */}
                  <img
                    src={project.coverImage || project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                    loading="eager"
                  />

                  {/* Subtle edge definition border without any shadow */}
                  <div className="pointer-events-none absolute inset-0 border border-black/10 rounded-[3px]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots (Centered inside showcase container matching reference screenshot) */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8 z-20">
          {rawProjects.map((_, dotIdx) => {
            const isActive = dotIdx === activeIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setActiveIndex(dotIdx)}
                aria-label={`Aller au projet ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-black scale-125'
                    : 'w-2 h-2 bg-neutral-400/80 hover:bg-neutral-600'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Human-written Bottom Caption */}
      <div className="max-w-2xl mx-auto px-4 mt-8 sm:mt-10 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground font-normal font-sans leading-relaxed">
          {projetsData.caption}
        </p>
      </div>

      {/* Interactive Project Modal with 5 Images Gallery + Full Architecture Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card text-card-foreground max-w-3xl w-full rounded-3xl border border-border overflow-hidden shadow-2xl relative my-auto"
            >
              {/* Top: 5-Images Interactive Gallery Carousel */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 bg-black overflow-hidden group">
                <img
                  src={selectedProject.images[activeImageIndex]}
                  alt={`${selectedProject.title} - vue ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-md shadow-lg"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Prev & Next Image Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-md opacity-80 hover:opacity-100 shadow-md"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all backdrop-blur-md opacity-80 hover:opacity-100 shadow-md"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter & Title Overlay */}
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10 pointer-events-none">
                  <div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
                      {selectedProject.org}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
                    {activeImageIndex + 1} / {selectedProject.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip (5 Images) */}
              <div className="flex items-center gap-2 p-3 bg-muted/30 border-b border-border overflow-x-auto">
                {selectedProject.images.map((img, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    type="button"
                    onClick={() => setActiveImageIndex(thumbIdx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      thumbIdx === activeImageIndex
                        ? 'ring-2 ring-primary scale-105 opacity-100'
                        : 'opacity-50 hover:opacity-85'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniature ${thumbIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Bottom Project Details */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[45vh] overflow-y-auto">
                {/* Summary */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Présentation du projet
                  </h4>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed font-normal">
                    {selectedProject.summary}
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
                    Points clés &amp; réalisations
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((point, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                        <span className="text-muted-foreground font-mono mt-0.5">–</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Technologies utilisées
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedProject.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-medium border border-border/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
