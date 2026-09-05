import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-icon"><Rocket size={35} strokeWidth={1.2} /></div>
          <div>
            <p className="cta-kicker">READY TO BUILD THE FUTURE?</p>
            <p>Be a part of the innovation. Be Mechnovate.</p>
          </div>
          <Link href="/events" className="btn btn-outline">JOIN US TODAY <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
