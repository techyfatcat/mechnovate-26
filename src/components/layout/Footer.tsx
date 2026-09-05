import Link from "next/link";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>MECHNOVATE ’26</span>
          </Link>
          <p className="footer-copy">
            Building ideas.<br />
            Building machines.<br />
            Building the future.
          </p>
        </div>

        <div>
          <h3>QUICK LINKS</h3>
          <Link href="/">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/team">Our Team</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h3>RESOURCES</h3>
          <span>Projects</span>
          <span>Workshops</span>
          <span>Blog</span>
          <span>Gallery</span>
        </div>

        <div>
          <h3>CONNECT</h3>
          <div className="social-row">
            <a href="#" aria-label="Instagram"><FaInstagram size={17} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={17} /></a>
            <a href="#" aria-label="GitHub"><FaGithub size={17} /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 Mechnovate. All rights reserved.</div>
    </footer>
  );
}
