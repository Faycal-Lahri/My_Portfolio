'use client';

import { useState } from 'react';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';
import { contactData } from './contact.data';

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      {/* Contact Section: Clean Monochrome Callout Tile */}
      <section 
        id="contact" 
        aria-label="Contact et recrutement"
        className="w-full bg-background text-foreground py-[80px] sm:py-[100px]"
      >
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <p className="text-[15px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {contactData.eyebrow}
          </p>

          <h2 className="text-[34px] sm:text-[48px] font-semibold text-foreground leading-[1.08] tracking-[-0.28px] mb-4">
            {contactData.headline}
          </h2>

          <p className="text-[17px] sm:text-[21px] text-muted-foreground leading-[1.4] max-w-[680px] mx-auto mb-8">
            {contactData.lead}
          </p>

          {/* Action Buttons: Pure Black & White */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={`mailto:${contactData.email}`}
              className="apple-btn inline-flex items-center gap-2 bg-primary text-primary-foreground text-[16px] font-medium px-[26px] py-[12px] rounded-pill hover:opacity-90 transition-opacity shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>M'envoyer un email</span>
            </a>

            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn inline-flex items-center gap-1.5 bg-card text-card-foreground border border-border text-[16px] font-medium px-[22px] py-[12px] rounded-pill hover:bg-muted transition-colors"
            >
              <span>Profil LinkedIn</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick copy email interactive pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/60 border border-border rounded-pill text-[14px] text-muted-foreground">
            <span>{contactData.email}</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="ml-2 text-foreground hover:opacity-80 flex items-center gap-1 font-medium"
              aria-label="Copier l'email"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copié</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Official Minimalist Footer */}
      <footer className="w-full bg-muted/30 text-muted-foreground py-[64px] border-t border-border text-[12px] tracking-[-0.12px]">
        <div className="max-w-[1024px] mx-auto px-4">
          {/* Dense link columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-border">
            {contactData.footerNavigation.map((col, idx) => (
              <div key={idx}>
                <h4 className="text-[14px] font-semibold text-foreground mb-3 tracking-normal">
                  {col.heading}
                </h4>
                <ul className="space-y-1">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx} className="leading-[2.41]">
                      <a
                        href={link.href}
                        className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom legal and copyright row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-[12px]">
            <div>
              Copyright © {new Date().getFullYear()} Fayçal Lahri. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6">
              <span>Stage PFE 2027</span>
              <span>•</span>
              <a href="#hero" className="hover:text-foreground transition-colors">
                Retour en haut ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
