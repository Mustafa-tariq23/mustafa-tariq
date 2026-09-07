/* Signal / Afterimage — Project Dossier & Case Study */
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Code2,
  ExternalLink,
  Github,
  Layers,
  Mail,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Terminal,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { getProjectById, projects, Project } from "@/data/projects";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);

  const project: Project | undefined = useMemo(() => {
    return getProjectById(params?.id || "");
  }, [params?.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params?.id]);

  const currentIndex = useMemo(() => {
    return projects.findIndex((p) => p.id === project?.id);
  }, [project]);

  const nextProject = useMemo(() => {
    if (currentIndex === -1) return null;
    const nextIdx = (currentIndex + 1) % projects.length;
    return projects[nextIdx];
  }, [currentIndex]);

  const prevProject = useMemo(() => {
    if (currentIndex === -1) return null;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    return projects[prevIdx];
  }, [currentIndex]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0c0f] text-[#f0ede5] flex flex-col items-center justify-center p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[#ffb16b] mb-3">Project Not Found</p>
        <h1 className="text-3xl font-semibold mb-6">Looking for a project?</h1>
        <Link href="/#work" className="hero-cta-btn inline-flex items-center gap-2">
          <ArrowLeft size={14} />
          <span>Return to Selected Work</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-[#f0ede5] selection:bg-[#ffb16b] selection:text-[#0a0c0f]">
      {/* ── Top Navigation Bar ────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0c0f]/85 backdrop-blur-xl border-b border-[#f0ede5]/10 px-5 sm:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <Link
            href="/#profile"
            className="flex items-center gap-2 group shrink-0"
            title="Mustafa Tariq, Home"
          >
            <img
              src="/logo.png"
              alt="Mustafa Tariq Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-contain border border-white/15 shadow-[0_0_12px_rgba(255,177,107,0.25)] transition-transform group-hover:scale-105"
            />
            <span className="hidden sm:inline-block font-sans font-medium text-sm text-[#f0ede5] tracking-tight">
              Mustafa Tariq
            </span>
          </Link>
          <span className="text-white/20">/</span>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-[#f0ede5]/75 hover:text-[#ffb16b] transition-colors"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>SELECTED WORK</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleShare}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#f0ede5]/60 hover:text-[#f0ede5] transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
            title="Copy share link"
          >
            <Share2 size={12} />
            <span>{copied ? "Link Copied!" : "Share"}</span>
          </button>

          <a
            href="/#contact"
            className="hero-cta-btn !text-xs !py-1.5 !px-3.5"
          >
            <span>Get in touch</span>
            <span className="hero-cta-arrow">↗</span>
          </a>
        </div>
      </header>

      {/* ── Main Case Study Column ─────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-24">
        {/* Breadcrumb & Index Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#ffb16b] mb-4">
            <span>{project.index}</span>
            <span className="text-white/30">/</span>
            <span>{project.metric}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f0ede5] mb-4 leading-[1.05]">
            {project.name}
          </h1>
          <p className="text-base sm:text-xl text-[#a0aab4] max-w-3xl leading-relaxed font-normal">
            {project.summary}
          </p>
        </motion.div>

        {/* Project Metadata Strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 my-8 border-y border-white/10"
        >
          <div>
            <span className="block text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider mb-1">
              Role
            </span>
            <strong className="text-xs sm:text-sm font-medium text-[#f0ede5]">
              {project.role}
            </strong>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider mb-1">
              Timeline
            </span>
            <strong className="text-xs sm:text-sm font-medium text-[#f0ede5]">
              {project.year}
            </strong>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider mb-1">
              Category
            </span>
            <strong className="text-xs sm:text-sm font-medium text-[#f0ede5]">
              {project.type}
            </strong>
          </div>
          <div>
            <span className="block text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider mb-1">
              Core Tech
            </span>
            <strong className="text-xs sm:text-sm font-medium text-[#ffb16b]">
              {project.stack.split("·")[0]?.trim()} & {project.stack.split("·")[1]?.trim()}
            </strong>
          </div>
        </motion.div>

        {/* ── Featured Video Walkthrough Player ──────────────────────── */}
        {project.loomEmbedUrl ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="my-10"
          >
            <div className="bg-[#10141a] border border-white/15 rounded-xl p-3 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb16b] shadow-[0_0_10px_#ffb16b]" />
                  <span className="text-xs font-mono tracking-wider uppercase text-[#ffb16b] font-medium">
                    Video Walkthrough Demo
                  </span>
                </div>
                {project.loomUrl && (
                  <a
                    href={project.loomUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#f0ede5]/80 hover:text-[#ffb16b] transition-colors"
                  >
                    <span>Open in Loom</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {/* Responsive 16:9 Video Frame */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner border border-white/10">
                <iframe
                  src={project.loomEmbedUrl}
                  title={`${project.name} Walkthrough Demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 text-[11px] font-mono text-[#7a8ea0]">
                <span>Recorded demonstration highlighting system workflows and core architecture</span>
                <span>Mustafa Tariq · Lead Engineer</span>
              </div>
            </div>
          </motion.section>
        ) : (
          <div className="my-8 p-6 rounded-xl bg-[#10141a] border border-white/10 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-mono text-[#a0aab4] m-0">
              Interactive case study & architectural overview. Video walkthrough currently in milestone review.
            </p>
          </div>
        )}

        {/* ── Case Study In-Depth Dossier ────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 my-14">
          {/* Left / Narrative (8 cols) */}
          <div className="md:col-span-8 space-y-10">
            {/* The Challenge */}
            <div>
              <p className="section-kicker">Problem & Context</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f0ede5] mb-3">
                The Engineering Challenge
              </h2>
              <p className="text-[#a0aab4] leading-relaxed text-sm sm:text-base">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div>
              <p className="section-kicker">Architecture & Delivery</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f0ede5] mb-3">
                Architectural Approach
              </h2>
              <p className="text-[#a0aab4] leading-relaxed text-sm sm:text-base mb-4">
                {project.solution}
              </p>
              <p className="text-[#a0aab4] leading-relaxed text-sm sm:text-base">
                {project.detail}
              </p>
            </div>

            {/* Key Highlights */}
            <div>
              <p className="section-kicker">Impact & Key Deliverables</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f0ede5] mb-4">
                What Was Engineered
              </h2>
              <div className="space-y-3">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#ffb16b]/15 text-[#ffb16b] flex items-center justify-center">
                      <Check size={12} />
                    </span>
                    <span className="text-sm text-[#e0e5eb] leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Sidebar Specs (4 cols) */}
          <div className="md:col-span-4 space-y-8">
            {/* Tech Stack Capsule */}
            <div className="p-5 rounded-xl bg-[#10141a] border border-white/10 space-y-4">
              <span className="block text-xs font-mono uppercase tracking-wider text-[#ffb16b] font-medium">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/10 text-[#d0d7de]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Repository & External Links */}
            <div className="p-5 rounded-xl bg-[#10141a] border border-white/10 space-y-3">
              <span className="block text-xs font-mono uppercase tracking-wider text-[#ffb16b] font-medium">
                Project Resources
              </span>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-[#f0ede5] transition-colors border border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <Github size={15} className="text-[#ffb16b]" />
                    <span>GitHub Profile & Code</span>
                  </span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              {project.loomUrl && (
                <a
                  href={project.loomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-[#f0ede5] transition-colors border border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <Play size={15} className="text-[#ffb16b]" />
                    <span>Open Loom Recording</span>
                  </span>
                  <ArrowUpRight size={13} />
                </a>
              )}
              <a
                href="mailto:mustafatariq2304@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-[#f0ede5] transition-colors border border-white/5"
              >
                <span className="flex items-center gap-2">
                  <Mail size={15} className="text-[#ffb16b]" />
                  <span>Discuss This Project</span>
                </span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Overview Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#12161f] to-[#0d1015] border border-[#ffb16b]/20 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffb16b]">
                Verified Production Work
              </span>
              <p className="text-xs text-[#a0aab4] leading-relaxed m-0">
                Delivered by Mustafa Tariq with focus on system legibility, type safety, and real user constraints.
              </p>
            </div>
          </div>
        </section>

        {/* ── Project Navigation (Previous / Next) ──────────────────── */}
        <div className="pt-10 mt-14 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevProject ? (
            <Link
              href={`/project/${prevProject.id}`}
              className="group flex flex-col text-left hover:text-[#ffb16b] transition-colors w-full sm:w-auto"
            >
              <span className="text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                <span>Previous Project ({prevProject.index})</span>
              </span>
              <strong className="text-base font-medium text-[#f0ede5] group-hover:text-[#ffb16b] transition-colors">
                {prevProject.name}
              </strong>
            </Link>
          ) : <div />}

          <Link
            href="/#work"
            className="px-4 py-2 rounded-full border border-white/15 text-xs font-mono text-[#f0ede5] hover:bg-white/10 transition-colors"
          >
            All Projects Grid
          </Link>

          {nextProject ? (
            <Link
              href={`/project/${nextProject.id}`}
              className="group flex flex-col text-right hover:text-[#ffb16b] transition-colors w-full sm:w-auto"
            >
              <span className="text-[11px] font-mono text-[#7a8ea0] uppercase tracking-wider flex items-center justify-end gap-1">
                <span>Next Project ({nextProject.index})</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <strong className="text-base font-medium text-[#f0ede5] group-hover:text-[#ffb16b] transition-colors">
                {nextProject.name}
              </strong>
            </Link>
          ) : <div />}
        </div>
      </main>

      {/* ── Minimalist Dossier Footer ─────────────────────────────── */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs font-mono text-[#7a8ea0] flex items-center justify-center gap-2.5">
        <img
          src="/logo.png"
          alt="Mustafa Tariq Logo"
          className="w-5 h-5 rounded-md object-contain border border-white/10 shadow-[0_0_8px_rgba(255,177,107,0.2)] shrink-0"
        />
        <span>Mustafa Tariq / Software Engineer · Signal / Afterimage</span>
      </footer>
    </div>
  );
}
