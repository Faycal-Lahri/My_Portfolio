import { ArrowUpRight } from 'lucide-react';
import { certificationsData } from './certifications.data';

export function Certifications() {
  return (
    <section 
      id="certifications" 
      aria-label="Certifications professionnelles"
      className="w-full bg-background text-foreground py-[80px] sm:py-[100px]"
    >
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[15px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {certificationsData.eyebrow}
          </p>
          <h2 className="text-[34px] sm:text-[40px] font-semibold text-foreground leading-[1.1] max-w-[700px] mx-auto">
            {certificationsData.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground border border-border rounded-lg p-6 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span>{cert.date}</span>
                </div>

                <h3 className="text-[18px] font-semibold text-foreground leading-snug mb-2">
                  {cert.title}
                </h3>

                {cert.id && (
                  <p className="text-[12px] text-muted-foreground mb-4">
                    Identifiant : <span className="font-mono text-foreground">{cert.id}</span>
                  </p>
                )}
              </div>

              {cert.url && (
                <div className="pt-3 border-t border-border">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="apple-btn inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground hover:underline group"
                  >
                    <span>Vérifier le certificat</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
