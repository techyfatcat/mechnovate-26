import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventsSection } from "@/components/events/EventsSection";

export default function EventsPage() {
  return (
    <>
      <Header />

      <main>
        <EventsSection />
      </main>

      <Footer />
    </>
  );
}