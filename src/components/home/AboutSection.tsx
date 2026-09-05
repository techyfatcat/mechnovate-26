import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutSection() {
  return (
    <section className="section about-section">
      <div className="container about-grid">
        <div className="about-copy">
          <SectionLabel>ABOUT US</SectionLabel>
          <h2>Engineering Ideas<br />Into Reality</h2>
          <p>
            Mechnovate is where curious minds come together to explore robotics, automation, and emerging technologies. We learn, build and compete to solve real-world problems.
          </p>
          <Link href="/events" className="btn btn-outline">KNOW MORE ABOUT US <ArrowRight size={16} /></Link>
        </div>

        <div className="about-art photo-frame">
          <div className="art-glow" />
          <div className="arm-art" aria-hidden="true">
            <div className="arm-joint joint-1" />
            <div className="arm-segment segment-1" />
            <div className="arm-joint joint-2" />
            <div className="arm-segment segment-2" />
            <div className="arm-joint joint-3" />
            <div className="arm-tool" />
          </div>
          <span className="hex hex-a" /><span className="hex hex-b" /><span className="hex hex-c" />
        </div>
      </div>
    </section>
  );
}
