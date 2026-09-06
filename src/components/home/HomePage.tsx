import { Header } from "@/components/layout/Header";
import { Hero } from "./Hero";
import { StatsStrip } from "./StatsStrip";
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
        <StatsStrip />
        <AboutSection />
        <DisciplinesSection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
