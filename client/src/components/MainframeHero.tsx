import React, { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useVideoScrub } from "@/hooks/useVideoScrub";

const RESUME_URL = "/manus-storage/Mustafa_Tariq_0333a636.pdf";

interface MainframeHeroProps {
  sidebarOpen?: boolean;
}

export default function MainframeHero({ sidebarOpen = false }: MainframeHeroProps) {
  const canvasRef = useVideoScrub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      setMobileMenuOpen(false);
    }
  }, [sidebarOpen]);

  const typewriterText =
    "AI didn't replace me"
    + "\n"
    + "It just gave me a faster brain"
    + "\n"
    + "Same guy, better output.";

  const { displayed, done } = useTypewriter(typewriterText, 10, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("mustafatariq2304@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ── Background Canvas (Mouse-Scrub Controlled at 60fps) ──────── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "70% center",
        }}
      />

      {/* ── Fixed Navbar (z-index: 30) ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-30 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center select-none pointer-events-none">
        {/* Logo (left) - hides when sidebar opens to avoid overlap */}
        <div
          className={`flex flex-row items-center gap-2 sm:gap-3 shrink-0 transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "opacity-0 -translate-x-6 pointer-events-none invisible"
              : "opacity-100 translate-x-0 pointer-events-auto visible"
          }`}
        >
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[19px] sm:text-[22px] lg:text-[26px] tracking-tight text-black font-normal cursor-pointer"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mustafa Tariq®
          </a>
          <span
            className="text-[22px] sm:text-[26px] lg:text-[30px] text-black select-none leading-none cursor-default"
            style={{ letterSpacing: "-0.02em" }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop / Tablet Nav Links (center) - hides when sidebar opens */}
        <nav
          className={`hidden md:flex flex-row items-center text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px] text-black font-normal transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "opacity-0 -translate-y-4 pointer-events-none invisible"
              : "opacity-100 translate-y-0 pointer-events-auto visible"
          }`}
          aria-label="Hero navigation"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#about");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            About
          </a>
          <span className="cursor-default select-none">,&nbsp;</span>
          <a
            href="#capabilities"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#capabilities");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            Toolkit
          </a>
          <span className="cursor-default select-none">,&nbsp;</span>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#experience");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            Experience
          </a>
          <span className="cursor-default select-none">,&nbsp;</span>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#work");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            Projects
          </a>
        </nav>

        {/* Desktop / Tablet CTA (right) - ALWAYS VISIBLE, transforms into sleek frosted pill when scrolled */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0 pointer-events-auto">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#contact");
            }}
            className={`transition-all duration-300 cursor-pointer ${
              sidebarOpen
                ? "inline-flex items-center text-[13px] md:text-[14px] lg:text-[15px] font-medium text-[#f0ede5] bg-[#07090b]/85 hover:bg-[#07090b] border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg hover:border-white/40 hover:scale-105"
                : "text-[14px] md:text-[15px] lg:text-[17px] xl:text-[19px] text-black underline underline-offset-2 hover:opacity-60 font-normal"
            }`}
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Right: Get in touch + Hamburger (hero view) */}
        <div
          className={`md:hidden flex items-center gap-3.5 shrink-0 transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "opacity-0 pointer-events-none invisible"
              : "opacity-100 pointer-events-auto visible"
          }`}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#contact");
            }}
            className="text-[13px] sm:text-[14px] text-black underline underline-offset-2 hover:opacity-60 font-medium cursor-pointer"
          >
            Get in touch
          </a>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer z-20 focus:outline-none"
          >
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
                mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 origin-center ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Overlay (z-index: 9) ─────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-[9] flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300 md:hidden ${mobileMenuOpen && !sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#about");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          About
        </a>
        <a
          href="#capabilities"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#capabilities");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Toolkit
        </a>
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#experience");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Experience
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#work");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Projects
        </a>
        <a
          href={RESUME_URL}
          download="Mustafa-Tariq-Resume.pdf"
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Download CV ↗
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#contact");
          }}
          className="text-[32px] font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>

      {/* ── Hero Section (z-index: 1) ───────────────────────────────── */}
      <section
        id="profile"
        className={`relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden transition-all duration-350 ease-out ${
          sidebarOpen ? "md:pl-[200px] lg:pl-[240px]" : ""
        }`}
      >
        {/* Content Container (max-w-2xl, relative z-10) */}
        <div className="max-w-2xl relative z-10 transition-all duration-300">
          {/* 1. Sleek System Beacon & Intro Label from Resume */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.06] border border-black/10 backdrop-blur-md mb-3 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-black/75 font-medium">
                SOFTWARE ENGINEER || LAHORE, PK
              </span>
            </div>
            <p
              className="text-black/85 font-normal leading-relaxed tracking-tight m-0"
              style={{
                fontSize: "clamp(16px, 2.2vw, 21px)",
                color: "rgba(10, 12, 15, 0.85)",
              }}
            >
              Mustafa Tariq — AI-Enhanced Full-Stack Engineer
            </p>
          </div>

          {/* 2. Typewriter Headline */}
          <h1
            className="mb-6 font-medium tracking-tight whitespace-pre-line"
            style={{
              fontSize: "clamp(24px, 3.8vw, 38px)",
              lineHeight: 1.25,
              minHeight: "clamp(95px, 11vw, 145px)",
              color: "#0a0c0f",
              whiteSpace: "pre-line",
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[3px] h-[1em] bg-black align-middle ml-[3px] rounded-sm"
                style={{ animation: "blink 1s step-end infinite" }}
                aria-hidden="true"
              />
            )}
          </h1>

          {/* 3. Action Pill Buttons */}
          <div
            className="flex flex-wrap gap-2.5 items-center transition-all duration-500 ease-out"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* Pill 1: Projects */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#work");
              }}
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:!bg-black hover:!text-white"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0c0f",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <span>Featured Projects</span>
              <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">
                →
              </span>
            </a>

            {/* Pill 2: Experience */}
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#experience");
              }}
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:!bg-black hover:!text-white"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0c0f",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <span>Work Experience</span>
              <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">
                →
              </span>
            </a>

            {/* Pill 3: Toolkit */}
            <a
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#capabilities");
              }}
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:!bg-black hover:!text-white"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0c0f",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <span>Technical Stack</span>
              <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-xs">
                →
              </span>
            </a>

            {/* Pill 4: Download CV */}
            <a
              href={RESUME_URL}
              download="Mustafa-Tariq-Resume.pdf"
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:!bg-black hover:!text-white"
              style={{
                backgroundColor: "#ffffff",
                color: "#0a0c0f",
                border: "1px solid rgba(0, 0, 0, 0.12)",
              }}
            >
              <span>Download CV</span>
              <span className="opacity-50 group-hover:opacity-100 transition-opacity text-xs">
                ↓
              </span>
            </a>

            {/* Pill 5: Dark Email Anchor with Copy */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:!bg-neutral-800 active:scale-95 focus:outline-none"
              style={{
                backgroundColor: "#0a0c0f",
                color: "#ffffff",
                border: "1px solid #0a0c0f",
              }}
            >
              <span>
                Reach me:{" "}
                <span className="underline underline-offset-2 font-normal">
                  mustafatariq2304@gmail.com
                </span>
              </span>
              {copied ? (
                <span className="text-[11px] bg-emerald-500 text-white font-mono px-1.5 py-0.5 rounded ml-1">
                  ✓ Copied
                </span>
              ) : (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline-block opacity-70 group-hover:opacity-100 flex-shrink-0"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
