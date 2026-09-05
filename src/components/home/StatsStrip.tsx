import { CalendarDays, Cog, Trophy, Users } from "lucide-react";
import { stats } from "@/data/home";

const icons = [Users, Cog, Trophy, CalendarDays];

export function StatsStrip() {
  return (
    <section className="stats-wrap">
      <div className="container">
        <div className="stats-strip">
          {stats.map((item, index) => {
            const Icon = icons[index];
            return (
              <div className="stat-item" key={item.label}>
                <Icon size={30} strokeWidth={1.5} />
                <div>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
