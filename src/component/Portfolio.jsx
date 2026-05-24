import { useState } from "react";
import Navbar from "./Navbar";
import "./Portfolio.css";

/* ── Data ─────────────────────────────────────────────── */
const profile = {
  name:     "Tanish Gawade",
  initials: "T",
  role:     "CS Student & Aspiring Web Developer",
  location: "Navi Mumbai, India",
  email:    "tanishgawade06@gmail.com",
  github:   "github.com/Tanish5126",
  linkedin: "www.linkedin.com/in/tanish-gawade-28074237b/",
  bio1:
    "I'm a first-year Computer Science student at ITM Skills University, Navi Mumbai, passionate about building things for the web. I started coding with C++ and quickly fell in love with frontend development — turning ideas into real, working interfaces is what gets me excited every day.",
  bio2:
    "I'm currently sharpening my skills in React and JavaScript while working on personal projects to build my portfolio. I believe in learning by doing, and I'm always looking for opportunities to grow, collaborate, and contribute.",
  highlights: [
    "1st year B.Tech CS student at ITM Skills University",
    "Built multiple frontend projects using HTML, CSS and JavaScript",
    "Currently learning React and component-based architecture",
    "Strong foundation in C++ and problem solving",
  ],
  info: [
    { key: "Location",     val: "Navi Mumbai, India" },
    { key: "Experience",   val: "Student — 1st Year" },
    { key: "Availability", val: "Open to internships" },
    { key: "Languages",    val: "English, Hindi, Marathi" },
    { key: "Education",    val: "B.Tech CS, ITM Skills University" },
  ],
  stats: [
    { num: "1st",  label: "Year B.Tech" },
    { num: "5+",   label: "Projects" },
    { num: "6",    label: "Technologies" },
    { num: "100%", label: "Curious" },
  ],
  skillCategories: [
    {
      title: "Frontend",
      skills: [
        { name: "HTML",       pct: 85 },
        { name: "CSS",        pct: 80 },
        { name: "JavaScript", pct: 70 },
        { name: "React",      pct: 55 },
      ],
    },
    {
      title: "Programming",
      skills: [
        { name: "C++",             pct: 75 },
        { name: "Problem Solving", pct: 70 },
        { name: "Data Structures", pct: 55 },
        { name: "Algorithms",      pct: 50 },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git & GitHub", pct: 75 },
        { name: "VS Code",      pct: 90 },
        { name: "Terminal/CLI", pct: 60 },
        { name: "Figma",        pct: 40 },
      ],
    },
    {
      title: "Currently Learning",
      skills: [
        { name: "React Advanced", pct: 45 },
        { name: "Node.js",        pct: 30 },
        { name: "TypeScript",     pct: 25 },
        { name: "Databases",      pct: 30 },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Online Car Showroom",
      category: "Web",
      year: "2026",
      description: "A stunning, fully responsive automobile brand website showcasing McLaren supercars with immersive video backgrounds, 3D animations, and modern UI design.",
      stack: ["React", "CSS", "JavaScript"],
      status: "Live",
      link: "https://axion-motors-html-css-project-git-main-tanish-gawades-projects.vercel.app",
    },
    {
      id: 2,
      name: "Supply-Chain Management System",
      category: "Web",
      year: "2026",
      description: "A fully responsive, multi-page SaaS web application for warehouse managers and retail store operators to track inventory, manage stock transfers, monitor low-stock alerts, and view supplier details.",
      stack: ["HTML", "CSS", "JavaScript", "API"],
      status: "Live",
      link: "https://fresh-fleet-grocery-supply-chain-ma.vercel.app/",
    },
    {
      id: 3,
      name: "Expense Tracker",
      category: "Web",
      year: "2025",
      description: "The system allows users to add expenses, view monthly summaries, visualize spending patterns, and check category-wise budgets using a structured and modular approach.",
      stack: ["Python" , "Numpy" , "Pandas"],
      status: "Not live",
      link: "https://github.com/Tanish5126/Expense-Manager",
    },
   
  ],
};

/* ── Helpers ─────────────────────────────────────────── */
function badgeClass(status) {
  if (status === "Live")        return "project-badge project-badge--live";
  if (status === "Open Source") return "project-badge project-badge--open";
  return "project-badge project-badge--beta";
}

/* ── Icons (inline SVG, stroke-based) ─────────────────── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  github:   "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  arrow:    "M5 12h14 M12 5l7 7-7 7",
};

/* ══════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════ */

function HomeSection() {
  return (
    <section id="home">
      <div className="section home__grid">
        {/* Left */}
        <div>
          <p className="home__eyebrow">Open to internships</p>
          <h1 className="home__name">
            Tanish <br /><span>Gawade</span>
          </h1>
          <p className="home__title">{profile.role}</p>
          <p className="home__desc">{profile.bio1}</p>
          <div className="home__actions">
            <a href="#contact" className="btn btn--primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Get in touch
            </a>
            <a href="#portfolio" className="btn btn--outline"
              onClick={(e) => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }}>
              View work
            </a>
          </div>
        </div>

        {/* Right card */}
        <div className="home__card">
          <div className="home__avatar">{profile.initials}</div>
          <div className="home__card-name">{profile.name}</div>
          <div className="home__card-role">CS Student · Web Developer</div>
          <div className="home__stats">
            {profile.stats.map((s) => (
              <div key={s.label} className="home__stat">
                <div className="home__stat-num">{s.num}</div>
                <div className="home__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ background: "var(--stone-50)" }}>
      <div className="section">
        <span className="section__tag">About me</span>
        <h2 className="section__heading">Learning with <em>purpose</em></h2>
        <div className="about__inner">
          <div>
            <p className="about__body">{profile.bio1}</p>
            <p className="about__body" style={{ marginTop: "1rem" }}>{profile.bio2}</p>
            <div className="about__highlights">
              {profile.highlights.map((h) => (
                <div key={h} className="about__highlight">
                  <span className="about__highlight-dot" />
                  <span className="about__highlight-text">{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about__right">
            <div className="about__info-card">
              <div className="about__info-title">Quick Info</div>
              {profile.info.map((r) => (
                <div key={r.key} className="about__info-row">
                  <span className="about__info-key">{r.key}</span>
                  <span className="about__info-val">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills">
      <div className="section">
        <span className="section__tag">What I know</span>
        <h2 className="section__heading">Skills &amp; <em>Stack</em></h2>
        <div className="skills__grid">
          {profile.skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category">
              <div className="skill-category__title">{cat.title}</div>
              <div className="skill-category__list">
                {cat.skills.map((sk) => (
                  <div key={sk.name} className="skill-item">
                    <span>{sk.name}</span>
                    <div className="skill-item__bar">
                      <div className="skill-item__fill" style={{ width: `${sk.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(profile.projects.map((p) => p.category))];
  const visible = filter === "All"
    ? profile.projects
    : profile.projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" style={{ background: "var(--stone-50)" }}>
      <div className="section">
        <span className="section__tag">Selected work</span>
        <h2 className="section__heading">My <em>Projects</em></h2>

        <div className="portfolio__filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill${filter === cat ? " active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {visible.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card__header">
                <span className="project-card__year">{project.year}</span>
                <span className={badgeClass(project.status)}>{project.status}</span>
              </div>
              <h3 className="project-card__name">{project.name}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__stack">
                {project.stack.map((t) => (
                  <span key={t} className="stack-pill">{t}</span>
                ))}
              </div>
              <a href={project.link} className="project-card__link" target="_blank" rel="noreferrer">
                View project <Icon d={ICONS.arrow} size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact">
      <div className="section">
        <span className="section__tag">Let's talk</span>
        <h2 className="section__heading">Get in <em>Touch</em></h2>

        <div className="contact__inner">
          {/* Left */}
          <div>
            <p className="contact__lead">
              I'm always open to internship opportunities, collaborations on
              student projects, or just a chat about tech. Feel free to reach out!
            </p>
            <div className="contact__links">
              {[
                { icon: ICONS.mail,     label: profile.email,    href: `mailto:${profile.email}` },
                { icon: ICONS.github,   label: profile.github,   href: `https://${profile.github}` },
                { icon: ICONS.linkedin, label: profile.linkedin, href: `https://${profile.linkedin}` },
                { icon: ICONS.location, label: profile.location, href: "#" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} className="contact__link-row" target="_blank" rel="noreferrer">
                  <span className="contact__link-icon">
                    <Icon d={icon} size={15} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          {sent ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--stone-50)", border: "1px solid var(--stone-100)",
              borderRadius: 4, padding: "3rem", textAlign: "center", flexDirection: "column", gap: "1rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--stone-900)" }}>
                Message sent ✦
              </div>
              <p style={{ fontSize: 14, color: "var(--stone-500)" }}>
                Thanks for reaching out — I'll get back to you soon!
              </p>
              <button className="btn btn--outline" style={{ marginTop: "0.5rem" }}
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label" htmlFor="name">Name</label>
                <input id="name" name="name" className="form-input"
                  placeholder="Your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-input"
                  placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="form-textarea"
                  rows={5} placeholder="Tell me about your project or opportunity…"
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn--primary" style={{ alignSelf: "flex-start" }}>
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <HomeSection />
        <div className="divider" />
        <AboutSection />
        <div className="divider" />
        <SkillsSection />
        <div className="divider" />
        <PortfolioSection />
        <div className="divider" />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="site-footer__left">Tanish<span>.</span></div>
        <div className="site-footer__right">© {new Date().getFullYear()} — All rights reserved</div>
      </footer>
    </>
  );
}