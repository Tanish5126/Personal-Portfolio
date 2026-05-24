import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",      href: "home" },
  { label: "About",     href: "about" },
  { label: "Skills",    href: "skills" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Contact",   href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll-spy ── */
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.getElementById(href)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${64}px 0px -60% 0px`, threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        <span className="navbar__logo" onClick={() => scrollTo("home")}>
          Tanish<span>.</span>
        </span>

        {/* Desktop + mobile nav */}
        <ul className={`navbar__links${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                onClick={() => scrollTo(href)}
                className={active === href ? "active" : ""}
                aria-current={active === href ? "page" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`navbar__toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}