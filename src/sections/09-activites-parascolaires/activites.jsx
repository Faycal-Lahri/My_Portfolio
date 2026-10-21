import { activitesData } from './activites.data';

export function ActivitesParascolaires() {
  return (
    <section 
      id="activites" 
      aria-label="Activités parascolaires et engagements"
      className="w-full bg-muted/20 text-foreground py-[80px] sm:py-[100px]"
    >
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-[15px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {activitesData.eyebrow}
          </p>
          <h2 className="text-[34px] sm:text-[40px] font-semibold text-foreground leading-[1.1] max-w-[700px] mx-auto">
            {activitesData.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activitesData.activities.map((act, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground border border-border rounded-lg p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground uppercase tracking-wider">
                    {act.tag}
                  </span>
                  <span>{act.period}</span>
                </div>

                <h3 className="text-[19px] font-semibold text-foreground leading-snug mb-1">
                  {act.title}
                </h3>
                <p className="text-[13px] font-medium text-muted-foreground mb-4">
                  {act.org}
                </p>

                <p className="text-[14px] text-muted-foreground leading-relaxed mb-6">
                  {act.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <ul className="space-y-2">
                  {act.achievements.map((item, aIdx) => (
                    <li key={aIdx} className="text-[13px] text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground mt-1">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
