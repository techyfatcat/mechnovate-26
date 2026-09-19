import { Header } from "@/components/layout/Header";
import { Hero } from "./Hero";
import { SponsorsMarquee } from "./StatsStrip";
import { AboutSection } from "./AboutSection";
import { DisciplinesSection } from "./DisciplinesSection";
import { TeamSection } from "./TeamSection";
import { Footer } from "@/components/layout/Footer";

export function HomePage() {
  return (
    <>
    <Header />
      <main>
        <Hero />
        <SponsorsMarquee />
        <AboutSection />
        <DisciplinesSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
