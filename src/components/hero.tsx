"use client";

import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { MovingBorder } from "@/components/ui/moving-border";
import { Wallet } from "lucide-react";

interface HeroProps {
  onStartAnalysis: (walletAddress: string) => void;
}

export function Hero({ onStartAnalysis }: HeroProps) {
  const [walletAddress, setWalletAddress] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setIsAnalyzing(true);
      setTimeout(() => {
        onStartAnalysis(walletAddress.trim());
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen px-4"
      style={{ background: "#0a0a0f" }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.4), transparent)",
          animation: "spotlight 2s ease 0.75s 1 forwards"
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-4xl">
        {/* Typewriter headline */}
        <TypewriterEffect
          words={[
            { text: "Your" },
            { text: "Solana" },
            { text: "Portfolio." },
            { text: "Amplified", className: "text-indigo-500" },
            { text: "by" },
            { text: "AI.", className: "text-indigo-500" }
          ]}
          className="text-4xl md:text-6xl font-bold"
        />

        {/* Subtitle */}
        <p className="text-neutral-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Real-time AI signals from social media, on-chain data, and trending memecoins.
          Enter your wallet and let SolSense do the rest.
        </p>

        {/* Wallet input form */}
        <form onSubmit={handleSubmit} className="w-full max-w-lg mt-4">
          <div className="relative">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your Solana wallet address..."
              className="w-full rounded-lg border p-4 text-white placeholder:text-neutral-600 outline-none transition-all"
              style={{
                background: "rgba(0,0,0,0.5)",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: "1px"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(99,102,241,0.6)";
                e.target.style.boxShadow = "0 0 20px rgba(99,102,241,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
            <Wallet
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
              style={{ transform: "translateY(-50%)" }}
            />
          </div>

          <MovingBorder duration={2000} className="mt-4 mx-auto" containerClassName="w-fit">
            <button
              type="submit"
              disabled={isAnalyzing || !walletAddress.trim()}
              className="bg-slate-900/80 text-white px-8 py-3 rounded-[1.75rem] text-sm font-semibold backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                  Analyzing...
                </>
              ) : (
                "Start Analyzing"
              )}
            </button>
          </MovingBorder>
        </form>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
          {[
            {
              title: "AI Signals",
              description: "Real-time BUY/SELL/HOLD signals",
              gradient: "rgba(99,102,241,0.15)"
            },
            {
              title: "Social Crawling",
              description: "Twitter, Reddit, Telegram insights",
              gradient: "rgba(139,92,246,0.15)"
            },
            {
              title: "On-Chain Data",
              description: "Whale movements & rug detection",
              gradient: "rgba(16,185,129,0.15)"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="rounded-xl p-5 text-center transition-transform hover:scale-105"
              style={{
                background: feature.gradient,
                border: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-neutral-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <BackgroundBeams />
    </div>
  );
}
