'use client';

import { useState } from 'react';
import { Copy, Check, ArrowUpRight, ArrowDown, ArrowUp } from 'lucide-react';
import { contactData } from './contact.data';
import { DotMatrixText } from './dot-matrix-text';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      aria-label="Footer & Contact"
      className="w-full bg-background text-foreground border-t border-border/60 pt-20 sm:pt-28 pb-0 overflow-hidden transition-colors"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Metadata Row: Swiss Minimalist Architectural Grid (Inspired by Reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-6 sm:pb-8">
          
          {/* Col 1: Identity & Location */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.22em] mb-3">
              Identité
            </span>
            <div className="flex flex-col space-y-1">
              <span className="text-[13px] sm:text-[14px] font-semibold text-foreground uppercase tracking-wider">
                {contactData.name}
              </span>
              <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest">
                © {contactData.year} • {contactData.location}
              </span>
              <span className="text-[11px] text-muted-foreground/60 uppercase tracking-widest pt-0.5">
                Stage PFE 2027 • Ingénierie
              </span>
            </div>
          </div>

          {/* Col 2: Direct Contact Email */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.22em] mb-3">
              Contact
            </span>
            <div className="flex flex-col space-y-2">
              <a
                href={`mailto:${contactData.email}`}
                className="text-[13px] sm:text-[14px] font-medium text-foreground hover:text-muted-foreground transition-colors tracking-wide"
              >
                {contactData.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground transition-colors group text-left cursor-pointer pt-0.5"
                title="Copier l'adresse email"
                aria-label="Copier l'adresse email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Adresse copiée !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>Copier l'adresse email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Col 3: Networks & Profiles */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.22em] mb-3">
              Réseaux
            </span>
            <div className="flex flex-col space-y-2">
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider group"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Col 4: Curriculum Vitae (FR & EN) */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-[0.22em] mb-3">
              Curriculum Vitae
            </span>
            <div className="flex flex-col space-y-2">
              <a
                href={contactData.cvFrench}
                download="CV_Faycal_Lahri_FR.pdf"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider group"
              >
                <span>Télécharger CV (FR)</span>
                <ArrowDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
              </a>
              <a
                href={contactData.cvEnglish}
                download="CV_Faycal_Lahri_EN.pdf"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors uppercase tracking-wider group"
              >
                <span>Télécharger CV (EN)</span>
                <ArrowDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

        </div>

        {/* Full-width Divider Line & Back to Top (Positioned identical to reference image) */}
        <div className="w-full border-t border-border/70 pt-4 pb-2 flex items-center justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70 hover:text-foreground transition-colors group cursor-pointer"
          >
            <span>Retour en haut</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Dot-Matrix Canvas: Edge-to-Edge "faycal" Rising From Bottom (2/3 Visible) */}
      <div className="w-full px-0 mt-1 sm:mt-2">
        <DotMatrixText />
      </div>
    </footer>
  );
}
