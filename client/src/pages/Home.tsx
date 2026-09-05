/* Signal / Afterimage — Unified Portfolio Home */
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  Code2,
  Container,
  Database,
  Download,
  ExternalLink,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Minus,
  Phone,
  Play,
  Server,
  Sparkles,
  Terminal,
  Video,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import MainframeHero from "@/components/MainframeHero";

const resumeUrl = "/manus-storage/Mustafa_Tariq_0333a636.pdf";

// ── Data ─────────────────────────────────────────────────────────
const capabilities = [
  { label: "Frontend",   detail: "React · Next.js · TypeScript" },
  { label: "Backend",    detail: "FastAPI · Node.js · REST" },
  { label: "Data",       detail: "PostgreSQL · MySQL · MongoDB" },
  { label: "AI systems", detail: "OpenAI · Claude · Transformers" },
  { label: "Delivery",   detail: "Docker · AWS EC2 · Nginx" },
];

const stackItems = [
  { name: "React",       icon: <Code2 size={15} /> },
  { name: "Next.js",     icon: <Layers size={15} /> },
  { name: "TypeScript",  icon: <Terminal size={15} /> },
  { name: "FastAPI",     icon: <Zap size={15} /> },
  { name: "Node.js",     icon: <Server size={15} /> },
  { name: "PostgreSQL",  icon: <Database size={15} /> },
  { name: "MongoDB",     icon: <Database size={15} /> },
  { name: "Docker",      icon: <Container size={15} /> },
  { name: "AWS EC2",     icon: <Server size={15} /> },
  { name: "Nginx",       icon: <Server size={15} /> },
  { name: "OpenAI",      icon: <Sparkles size={15} /> },
  { name: "Claude",      icon: <Sparkles size={15} /> },
];

const roles = [
  {
    year: "2025—26",
    title: "Full Stack Engineer",
    company: "Enxsys",
    place: "Lahore, PK",
    description:
      "Owned full lifecycle delivery for production-grade Next.js / React and FastAPI applications built for an international client.",
    notes: ["Relational PostgreSQL schemas", "JWT authentication", "AWS · Docker · Nginx deployments"],
  },
  {
    year: "2024",
    title: "Full Stack Development Intern",
    company: "Enxsys",
    place: "Lahore, PK",
    description:
      "Contributed across React frontends, FastAPI APIs, relational data design, integration work, and LLM-assisted debugging.",
    notes: ["React + FastAPI delivery", "System integration", "Performance optimization"],
  },
  {
    year: "2023",
    title: "Frontend Development Intern",
    company: "EpochClan",
    place: "Lahore, PK",
    description:
      "Delivered 10+ production React UI components with REST API integration and participated in code review workflows.",
    notes: ["Reusable component systems", "REST API integration", "Documented coding standards"],
  },
];

const projects = [
  {
    index: "01",
    name: "Vulnerability Benchmark System",
    type: "Final Year Project",
    stack: "Next.js · FastAPI · Python · Hugging Face",
    summary:
      "An AI-powered code security tool with a model evaluation layer designed to measure detection accuracy across vulnerability classes.",
    detail:
      "Owned the full development lifecycle: requirements, data preparation, LoRA-style CodeT5 fine-tuning, evaluation suites, and deployment via a Next.js frontend with a FastAPI inference backend.",
    metric: "AI / Security",
    // 🔗 Loom walkthrough link - replace with your Loom video URL:
    loomUrl: "https://www.loom.com/share/placeholder-vulnerability-benchmark-demo",
    demoUrl: "https://github.com/mustafatariq2304",
  },
  {
    index: "02",
    name: "Perks",
    type: "Lead Management SaaS",
    stack: "Next.js · FastAPI · Stripe",
    summary:
      "A multi-feature SaaS platform grounded in reusable frontend components, relational models, and payment infrastructure.",
    detail:
      "Designed REST API architecture and relational data models, then implemented end-to-end Stripe payments with reusable, documented frontend components.",
    metric: "SaaS / Payments",
    // 🔗 Loom walkthrough link - replace with your Loom video URL:
    loomUrl: "https://www.loom.com/share/placeholder-perks-saas-demo",
    demoUrl: "https://github.com/mustafatariq2304",
  },
  {
    index: "03",
    name: "Daniel's Believe",
    type: "eCommerce Platform · Germany",
    stack: "Next.js · FastAPI · PostgreSQL · Stripe",
    summary:
      "A live full-stack commerce platform supporting 100+ product variations with a documented frontend and complete backend.",
    detail:
      "Delivered the product experience, FastAPI services, PostgreSQL data layer, and Stripe integration for a real-world platform serving live users.",
    metric: "Commerce / Scale",
    // 🔗 Loom walkthrough link - replace with your Loom video URL:
    loomUrl: "https://www.loom.com/share/placeholder-daniels-believe-demo",
    demoUrl: "https://github.com/mustafatariq2304",
  },
  {
    index: "04",
    name: "HR & Fleet Management System",
    type: "Internal Operations · KSA",
    stack: "Next.js · FastAPI · Firebase",
    summary:
      "An integrated internal system spanning employee management, vehicle tracking, attendance, and salary operations.",
    detail:
      "Translated client requirements into technical specifications and delivered a connected internal operations system around people, vehicles, and payroll workflows.",
    metric: "Operations / Systems",
    // 🔗 Loom walkthrough link - replace with your Loom video URL:
    loomUrl: "https://www.loom.com/share/placeholder-hr-fleet-management-demo",
    demoUrl: "https://github.com/mustafatariq2304",
  },
];

// Helper to convert standard Loom share URL into responsive embed URL
function getLoomEmbedUrl(url?: string) {
  if (!url) return "";
  if (url.includes("/share/")) {
    return url.replace("/share/", "/embed/");
  }
  return url;
}

const navItems = [
  { label: "Profile",    href: "#profile" },
  { label: "About",      href: "#about" },
  { label: "Toolkit",    href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

function smoothScroll(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Component ────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen]           = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [expandedRole, setExpandedRole]   = useState(0);
  const [activeSection, setActiveSection] = useState("profile");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  // Track scroll position to show/hide side-rail past hero
  useEffect(() => {
    const handleScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.35;
      setScrolledPastHero(past);
      if (!past) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      {/* Scan-line sweep on load */}
      <div className="signal-scan-line" aria-hidden="true" />

      {/* ── Mainframe Mouse-Scrub Hero Landing Section ────────── */}
      <MainframeHero sidebarOpen={scrolledPastHero || menuOpen} />

      {/* ── Portfolio Content (reveals as user scrolls down) ─── */}
      <div className="portfolio-content">
        {/* Mobile Header (active when scrolled past hero) */}
        <header className={`mobile-header ${scrolledPastHero ? "visible" : "hidden-hero"}`}>
          <a className="mark-lockup" href="#profile" aria-label="Mustafa Tariq, home">
            <span className="mark-box">
              <img src="/manus-storage/mt-monogram_1331e70c.png" alt="" />
            </span>
            <span className="mark-word">MUSTAFA TARIQ</span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smoothScroll("#contact");
              }}
              className="text-[12px] text-white/90 hover:text-white underline underline-offset-2 font-medium cursor-pointer"
            >
              Get in touch
            </a>
            <button
              className="mobile-menu-trigger"
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </header>

        {/* Side Rail (active when scrolled past hero) */}
        <aside className={`site-rail ${scrolledPastHero ? "visible" : "hidden-hero"} ${menuOpen ? "is-open" : ""}`}>
          <div className="rail-top">
            <a className="rail-mark" href="#profile" aria-label="Mustafa Tariq, home">
              <span className="mark-box">
                <img src="/manus-storage/mt-monogram_1331e70c.png" alt="" />
              </span>
              <span className="rail-name">Mustafa<br />Tariq</span>
            </a>
            <div className="rail-rule" />
            <div className="rail-caption">Software engineer<br />Lahore / PK</div>
          </div>

          <nav className="rail-nav" aria-label="Primary navigation">
            <span className="rail-nav-label">Index</span>
            {navItems.map((item, index) => (
              <a
                key={item.href}
                className={activeSection === item.href.slice(1) ? "active" : ""}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-number">0{index + 1}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="rail-bottom">
            <div className="availability">
              <span className="status-dot" />
              Open to building
            </div>
            <a className="rail-mail" href="mailto:mustafatariq2304@gmail.com">
              mustafatariq2304@gmail.com
            </a>
            <div className="rail-footer-line">
              <span>© {year}</span>
              <span>MT / 01</span>
            </div>
          </div>
        </aside>

        {/* ── Main Column ────────────────────────────────────────── */}
        <main className="main-column">

        {/* ─ Statement Band ────────────────────────────────────── */}
        <section className="statement-band page-section" aria-label="Positioning statement">
          <div className="band-label">The Through-Line</div>
          <div className="statement-copy">
            <p className="section-kicker">Position / Overview</p>
            <h2>Not just shipping features.<br /><em>Making the whole system legible.</em></h2>
          </div>
          <div className="statement-note">
            From a relational schema to the last button state, the details should agree.
          </div>
        </section>

        {/* ─ About ─────────────────────────────────────────────── */}
        <section className="about-section page-section" id="about">
          <div className="about-left">
            <p className="section-kicker">02 / About</p>
            <h2 style={{ marginBottom: "24px", fontSize: "clamp(2.2rem, 3.5vw, 3.8rem)", fontWeight: 600, letterSpacing: "-.07em", lineHeight: ".93" }}>
              Fresh thinking.<br />Production instincts.
            </h2>
            <p className="about-bio">
              I'm Mustafa Tariq — a final-year Software Engineering student at COMSATS University Islamabad
              completing a BS while already holding two years of professional experience shipping production
              systems for international clients.
            </p>
            <p className="about-bio" style={{ marginBottom: 0 }}>
              I work across the full stack: designing relational schemas, building FastAPI services, crafting
              React frontends, and deploying on AWS. I'm drawn to problems with real users, real constraints,
              and stakes worth caring about.
            </p>
          </div>
          <div className="about-right">
            <div className="about-stats">
              {[
                { value: "2+", label: "Years experience" },
                { value: "4+", label: "Live products shipped" },
                { value: "3+", label: "Companies contributed to" },
                { value: "10+", label: "Components built" },
              ].map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <span className="stat-value"><em>{stat.value}</em></span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─ Capability / Toolkit ──────────────────────────────── */}
        <section className="capability-section page-section" id="capabilities">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">03 / Toolkit</p>
              <h2>Range, with a point of view.</h2>
            </div>
            <p className="section-aside">
              A practical stack shaped by shipping production systems, not collecting badges.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map((cap, index) => (
              <motion.div
                className="capability-row"
                key={cap.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <span className="row-index">0{index + 1}</span>
                <span className="capability-label">{cap.label}</span>
                <span className="capability-detail">{cap.detail}</span>
                <ArrowUpRight className="row-arrow" size={15} />
              </motion.div>
            ))}
          </div>

          {/* Stack icon grid */}
          <div className="stack-section" style={{ paddingTop: "60px" }}>
            <p className="section-kicker" style={{ marginBottom: "4px" }}>Technologies</p>
            <div className="stack-grid">
              {stackItems.map((item, index) => (
                <motion.div
                  className="stack-item"
                  key={item.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <span className="stack-icon">{item.icon}</span>
                  <span className="stack-item-name">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─ Experience ────────────────────────────────────────── */}
        <section className="experience-section page-section" id="experience">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">04 / Experience</p>
              <h2>Closer to the metal.</h2>
            </div>
            <p className="section-aside">
              Three chapters of getting sharper at the boundary between product intent and running software.
            </p>
          </div>
          <div className="experience-list">
            {roles.map((role, index) => {
              const isOpen = expandedRole === index;
              return (
                <div
                  className={`experience-item ${isOpen ? "is-open" : ""}`}
                  key={role.company + role.year}
                >
                  <button
                    className="experience-trigger"
                    type="button"
                    onClick={() => setExpandedRole(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="role-year">{role.year}</span>
                    <span className="role-title">
                      <strong>{role.title}</strong>
                      <small>{role.company} / {role.place}</small>
                    </span>
                    <span className="role-toggle">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="experience-detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <p>{role.description}</p>
                        <div className="role-notes">
                          {role.notes.map((note) => (
                            <span key={note}>
                              <Check size={13} />
                              {note}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─ Work ──────────────────────────────────────────────── */}
        <section className="work-section page-section" id="work">
          <div className="section-heading-row work-heading">
            <div>
              <p className="section-kicker">05 / Selected work</p>
              <h2>Built for the messy middle.</h2>
            </div>
            <p className="section-aside">
              Products with enough moving parts to reward clear thinking.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.div
                className={`project-card project-card-${index + 1}`}
                key={project.name}
                role="button"
                tabIndex={0}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActiveProject(project);
                  }
                }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="project-card-top">
                  <span>{project.index}</span>
                  <span>{project.metric}</span>
                </div>
                <div className="project-card-body">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-card-bottom">
                  <span>{project.stack}</span>
                  <div className="flex items-center gap-2.5">
                    {project.loomUrl && (
                      <a
                        href={project.loomUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="card-loom-btn"
                        title="Watch Loom walkthrough demo"
                      >
                        <span className="loom-dot" />
                        <span>Loom Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    <span className="card-open-arrow">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─ Education ─────────────────────────────────────────── */}
        <section className="education-section page-section" id="education">
          <div className="education-index">
            <span>06</span>
            <Minus size={16} />
          </div>
          <div className="education-main">
            <p className="section-kicker">06 / Education</p>
            <h2>BS Software Engineering</h2>
            <p className="education-school">COMSATS University Islamabad · Lahore Campus</p>
          </div>
          <div className="education-meta">
            <span>2022—26</span>
            <span>OOP · DSA · Databases<br />Architecture · AI · ML</span>
          </div>
        </section>

        {/* ─ Contact ───────────────────────────────────────────── */}
        <section className="contact-section page-section" id="contact">
          <div className="contact-top">
            <p className="section-kicker">07 / Contact</p>
            <span className="contact-mark">Let's make the next system clearer.</span>
          </div>
          <div className="contact-main">
            <h2>Have a hard problem<br /><em>worth building?</em></h2>
            <a className="button button-copper" href="mailto:mustafatariq2304@gmail.com">
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-bottom">
            <div className="contact-details">
              <a href="mailto:mustafatariq2304@gmail.com">
                <Mail size={15} /> mustafatariq2304@gmail.com
              </a>
              <a href="tel:+923101414978">
                <Phone size={15} /> +92 310 1414978
              </a>
              <span>
                <MapPin size={15} /> Lahore, Pakistan
              </span>
            </div>
            <div className="social-links">
              <a href="mailto:mustafatariq2304@gmail.com" aria-label="Email Mustafa">
                <Mail size={16} />
              </a>
              <a
                href="https://github.com/mustafatariq2304"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/mustafatariq2304"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <span>Mustafa Tariq / Software Engineer</span>
          <span>Signal / Afterimage · {year}</span>
          <a href="#profile">
            Back to top <ChevronUp size={14} />
          </a>
        </footer>
      </main>
      </div>

      {/* ── Project Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.article
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeProject.name} project details`}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
              <p className="section-kicker">
                {activeProject.index} / {activeProject.metric}
              </p>
              <h2>{activeProject.name}</h2>
              <p className="modal-type">{activeProject.type}</p>
              <p className="modal-detail">{activeProject.detail}</p>
              <div className="modal-stack">
                <span>Stack</span>
                <strong>{activeProject.stack}</strong>
              </div>

              {/* Loom Walkthrough Video Embed */}
              {activeProject.loomUrl && (
                <div className="modal-loom-section">
                  <div className="modal-loom-header">
                    <div className="flex items-center gap-2">
                      <span className="loom-badge-pulse" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-orange-300">
                        Loom Walkthrough Demo
                      </span>
                    </div>
                    <a
                      href={activeProject.loomUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="modal-loom-btn"
                    >
                      <Play size={11} className="fill-current" />
                      <span>Open in Loom</span>
                      <ArrowUpRight size={11} />
                    </a>
                  </div>
                  <div className="modal-video-frame">
                    <iframe
                      src={getLoomEmbedUrl(activeProject.loomUrl)}
                      title={`${activeProject.name} Loom Video Walkthrough`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              <div className="modal-note">
                <span className="status-dot" />
                Demo links and detailed case-studies are updated per milestone.
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
