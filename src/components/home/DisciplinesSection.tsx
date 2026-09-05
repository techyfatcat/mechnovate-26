import { Cpu, Cog, PenTool, Rocket } from "lucide-react";
import { disciplines } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

const iconMap = {
  robotics: Rocket,
  automation: Cog,
  ai: Cpu,
  design: PenTool,
};

export function DisciplinesSection() {
  return (
    <section className="section disciplines-section">
      <div className="container">
        <div className="disciplines-heading">
          <SectionLabel>WHAT WE DO</SectionLabel>
        </div>
        <div className="discipline-grid">
          {disciplines.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article className="discipline-card" key={item.title}>
                <Icon size={31} strokeWidth={1.4} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
