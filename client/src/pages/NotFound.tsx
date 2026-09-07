import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0c0f] text-[#f0ede5] p-6 selection:bg-[#ffb16b] selection:text-[#0a0c0f]">
      <div className="max-w-md w-full text-center space-y-6 bg-[#10141a] border border-white/10 p-8 sm:p-10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Mustafa Tariq Logo"
            className="w-16 h-16 rounded-xl border border-white/15 shadow-[0_0_24px_rgba(255,177,107,0.35)] object-contain"
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#ffb16b]">
          404 / Route Not Located
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f0ede5]">
          Page Does Not Exist
        </h1>
        <p className="text-xs font-mono text-[#7a8ea0] leading-relaxed">
          The requested path is not catalogued in this portfolio system.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="hero-cta-btn inline-flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
