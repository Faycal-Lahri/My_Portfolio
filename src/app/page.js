import { Navigation } from '@/sections/01-navigation/navigation';
import { Hero } from '@/sections/02-hero/hero';
import { Profile } from '@/sections/03-profile/profile';
import { Timeline } from '@/sections/04-timeline/timeline';
import { Experiences } from '@/sections/05-experiences/experiences';
import { ProjetsAcademiques } from '@/sections/06-projets-academiques/projets';
import { Formation } from '@/sections/07-formation/formation';
import { Certifications } from '@/sections/08-certifications/certifications';
import { ActivitesParascolaires } from '@/sections/09-activites-parascolaires/activites';
import { ContactFooter } from '@/sections/10-footer-contact/contact-footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink antialiased">
      {/* Section 01 : Menu & Navigation */}
      <Navigation />

      <main id="main-content" className="flex-1">
        {/* Section 02 : Hero Section */}
        <Hero />

        {/* Section 03 : Profile */}
        <Profile />

        {/* Section 04 : Timeline */}
        <Timeline />

        {/* Section 05 : Expériences Professionnelles */}
        <Experiences />

        {/* Section 06 : Projets Académiques & Personnels */}
        <ProjetsAcademiques />

        {/* Section 07 : Formation */}
        <Formation />

        {/* Section 08 : Certifications */}
        <Certifications />

        {/* Section 09 : Activités Parascolaires */}
        <ActivitesParascolaires />
      </main>

      {/* Section 10 : Contact & Footer */}
      <ContactFooter />
    </div>
  );
}
