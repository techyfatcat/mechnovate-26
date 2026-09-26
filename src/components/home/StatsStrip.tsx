"use client";

import Image from "next/image";

const sponsors = Array.from(
  { length: 11 },
  (_, index) => `/images/image${index + 1}.png`
);

export function SponsorsMarquee() {
  const marqueeSponsors = [...sponsors, ...sponsors];

  return (
    <section className="sponsors-wrap">
      <div className="container">
        <div className="sponsors-marquee">
          <span className="sponsors-label">Sponsored by</span>

          <div className="sponsors-track-viewport">
            <div className="sponsors-track">
              {marqueeSponsors.map((src, index) => (
                <div
                  className="sponsor-item"
                  key={`${src}-${index}`}
                  aria-hidden={index >= sponsors.length}
                >
                  <Image
                    src={src}
                    alt={index < sponsors.length ? `Sponsor ${index + 1}` : ""}
                    width={140}
                    height={50}
                    className="sponsor-logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
