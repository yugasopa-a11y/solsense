"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Signal } from "@/lib/types";

interface SignalCardsProps {
  signals: Signal[];
  onSignalClick?: (signal: Signal) => void;
}

export function SignalCards({ signals, onSignalClick }: SignalCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-2">
      {signals.map((signal, idx) => (
        <div
          key={signal.id}
          className="group relative block cursor-pointer p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onSignalClick?.(signal)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-2xl bg-slate-800/80"
                layoutId="signalHoverBg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "relative z-10 rounded-2xl border p-4 flex items-center justify-between gap-4",
              signal.type === "BUY" && "border-emerald-800/60 bg-emerald-950/30",
              signal.type === "SELL" && "border-red-800/60 bg-red-950/30",
              signal.type === "HOLD" && "border-amber-800/60 bg-amber-950/30"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold",
                  signal.type === "BUY" && "bg-emerald-500/20 text-emerald-300",
                  signal.type === "SELL" && "bg-red-500/20 text-red-300",
                  signal.type === "HOLD" && "bg-amber-500/20 text-amber-300"
                )}
              >
                {signal.ticker.slice(0, 3)}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{signal.token}</div>
                <div className="text-xs text-neutral-400">{signal.ticker}</div>
              </div>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                signal.type === "BUY" &&
                  "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40",
                signal.type === "SELL" &&
                  "bg-red-500/20 text-red-300 ring-1 ring-red-500/40",
                signal.type === "HOLD" &&
                  "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40"
              )}
            >
              {signal.type}
            </span>
            <div className="text-right">
              <div className="text-xs text-neutral-400">Confidence</div>
              <div className="text-sm font-semibold text-white">
                {signal.confidence}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
