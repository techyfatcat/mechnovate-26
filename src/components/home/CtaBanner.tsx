import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-banner-v2">
          <div className="cta-icon-v2">
            <Rocket size={26} strokeWidth={1.3} />
          </div>
          <div className="cta-copy-v2">
            <p className="cta-label">STATUS: RECRUITING</p>
            <h3>Ready to build the future?</h3>
            <p>Be a part of the innovation. Be Mechnovate.</p>
          </div>
          <Link href="/events" className="btn btn-accent">
            JOIN US TODAY <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}