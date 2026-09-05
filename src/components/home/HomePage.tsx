import { Header } from "@/components/layout/Header";
import { Hero } from "./Hero";
import { StatsStrip } from "./StatsStrip";
import { AboutSection } from "./AboutSection";
import { DisciplinesSection } from "./DisciplinesSection";
import { TeamSection } from "./TeamSection";
import { CtaBanner } from "./CtaBanner";
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
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
