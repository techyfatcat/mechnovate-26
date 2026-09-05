import { team } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function TeamSection() {
  return (
    <section className="section team-section" id="team">
      <div className="container">
        <div className="team-heading">
          <SectionLabel>OUR TEAM</SectionLabel>
          <h2>The Minds Behind Mechnovate</h2>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="team-avatar" aria-hidden="true"><span /></div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
