"use client";

import { team } from "@/data/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type TeamMember = (typeof team)[number];

function getMemberImage(member: TeamMember) {
  if ("image" in member && typeof member.image === "string") {
    return member.image;
  }

  return undefined;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const memberCount = team.length;

  const visibleMembers = useMemo(() => {
    if (!memberCount) return [];

    const positions = [
      { offset: -2, position: "far-left" },
      { offset: -1, position: "left" },
      { offset: 0, position: "center" },
      { offset: 1, position: "right" },
      { offset: 2, position: "far-right" },
    ] as const;

    return positions.map(({ offset, position }) => {
      const index = (activeIndex + offset + memberCount) % memberCount;

      return {
        member: team[index],
        position,
        index,
      };
    });
  }, [activeIndex, memberCount]);

  useEffect(() => {
    if (memberCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % memberCount);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [memberCount]);

  const move = (direction: -1 | 1) => {
    if (memberCount <= 1) return;

    setActiveIndex(
      (current) => (current + direction + memberCount) % memberCount,
    );
  };

  if (!memberCount) return null;

  return (
    <section className="section team-section" id="team">
      <div className="container">
        <div className="team-heading">
          <h2>Our Team</h2>
        </div>

        <div className="team-carousel">
          <div className="team-carousel-status">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(memberCount).padStart(2, "0")}
          </div>

          <div className="team-carousel-stage" aria-live="polite">
            {visibleMembers.map(({ member, position, index }) => {
              const image = getMemberImage(member);

              return (
                <article
                  className="team-carousel-card"
                  data-position={position}
                  key={`${member.name}-${index}`}
                  aria-hidden={position !== "center"}
                >
                  <div className="team-card-visual">
                    <div className="team-card-grid" aria-hidden="true" />

                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="team-card-photo"
                      />
                    ) : (
                      <div className="team-card-placeholder" aria-hidden="true">
                        <span>{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>

                  <div className="team-card-copy">
          
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-role">{member.role}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {memberCount > 1 && (
            <div className="team-carousel-controls">
              <button
                type="button"
                className="team-carousel-button"
                onClick={() => move(-1)}
                aria-label="Previous team member"
              >
                <ChevronLeft aria-hidden="true" />
              </button>

              <div className="team-carousel-dots" aria-label="Team members">
                {team.map((member, index) => (
                  <button
                    type="button"
                    key={member.name}
                    className={`team-carousel-dot ${
                      index === activeIndex ? "active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show ${member.name}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                className="team-carousel-button"
                onClick={() => move(1)}
                aria-label="Next team member"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}