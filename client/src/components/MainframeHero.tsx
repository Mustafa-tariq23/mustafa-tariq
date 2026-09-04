import React, { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useVideoScrub } from "@/hooks/useVideoScrub";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

export default function MainframeHero() {
  const videoRef = useVideoScrub();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const typewriterText =
    "Glad you stopped in. Good taste tends to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText, 38, 600);

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
      {/* ── Background Video (Mouse-Scrub Controlled) ───────────────── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 object-cover"
        style={{
          width: "100%",
          height: "100%",
          objectPosition: "70% center",
          pointerEvents: "none",
        }}
      />

      {/* ── Fixed Navbar (z-index: 10) ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center select-none">
        {/* Logo (left) */}
        <div className="flex flex-row items-center gap-3">
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[21px] sm:text-[26px] tracking-tight text-black font-normal cursor-pointer"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Mustafa Tariq
          </a>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none leading-none cursor-default"
            style={{ letterSpacing: "-0.02em" }}
            aria-hidden="true"
          >

          </span>
        </div>

        {/* Desktop Nav Links (center, hidden below md) */}
        <nav
          className="hidden md:flex flex-row items-center text-[23px] text-black font-normal"
          aria-label="Hero navigation"
        >
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#profile");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            profile
          </a>
          <span className="cursor-default select-none">,&nbsp;</span>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#about");
            }}
            className="hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            about
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
            experience
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
            work
          </a>
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#contact");
            }}
            className="text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity duration-200 cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger (visible below md) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer z-20 focus:outline-none"
        >
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`w-6 h-[2px] bg-black transition-all duration-300 origin-center ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
          />
        </button>
      </header>

      {/* ── Mobile Overlay (z-index: 9) ─────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-[9] flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300 md:hidden ${mobileMenuOpen
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
          Labs
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#work");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Studio
        </a>
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#experience");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Openings
        </a>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("#work");
          }}
          className="text-[32px] font-medium text-black hover:opacity-60 transition-opacity"
        >
          Shop
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
        className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      >
        {/* Content Container (max-w-xl, relative z-10) */}
        <div className="max-w-xl relative z-10">
          {/* 1. Blurred Intro Label */}
          <div
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black font-normal"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.3,
              filter: "blur(4px)",
            }}
            aria-hidden="true"
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe's Adaptive Response Interface Agent
          </div>

          {/* 2. Typewriter Text */}
          <p
            className="text-black mb-5 sm:mb-6 font-normal"
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              lineHeight: 1.35,
              minHeight: "54px",
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px]"
                style={{ animation: "blink 1s step-end infinite" }}
                aria-hidden="true"
              />
            )}
          </p>

          {/* 3. Action Pill Buttons */}
          <div
            className="flex flex-wrap gap-y-1 transition-all duration-400 ease-out"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {/* White Pill Button 1 */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Pitch us an idea
            </a>

            {/* White Pill Button 2 */}
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#experience");
              }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Come work here
            </a>

            {/* White Pill Button 3 */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Send a brief hello
            </a>

            {/* White Pill Button 4 */}
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#work");
              }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              See how we operate
            </a>

            {/* Outline Pill Button with Copy Icon */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              <span>
                Reach us:{" "}
                <span className="underline underline-offset-1">
                  hello@mainframe.co
                </span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block flex-shrink-0"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              {copied && (
                <span className="text-[11px] bg-black/80 text-white px-1.5 py-0.5 rounded ml-1 animate-pulse">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
