"use client";

const sponsors = [
  "Orbital Dynamics",
  "Vertex Robotics",
  "Ironclad Motors",
  "Nova Systems",
  "Apex Fabrication",
  "Quantum Gears",
  "Circuit & Steel",
  "Helios Industries",
];

export function SponsorsMarquee() {
  return (
    <section className="sponsors-wrap">
      <div className="container">
        <div className="sponsors-marquee">
          <span className="sponsors-label">Sponsored by</span>

          <div className="sponsors-track-viewport">
            <div className="sponsors-track">
              {[...sponsors, ...sponsors].map((name, i) => (
                <span className="sponsor-item" key={`${name}-${i}`}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}