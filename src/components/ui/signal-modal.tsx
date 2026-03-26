"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Signal } from "@/lib/types";
import { X, TrendingUp, Volume2, Shield } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/mockData";

interface SignalModalProps {
  signal: Signal | null;
  onClose: () => void;
}

export function SignalModal({ signal, onClose }: SignalModalProps) {
  if (!signal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-lg rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: "rgba(13,13,20,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{
              background: signal.type === "BUY"
                ? "linear-gradient(90deg, #10b981, #6366f1)"
                : signal.type === "SELL"
                ? "linear-gradient(90deg, #ef4444, #6366f1)"
                : "linear-gradient(90deg, #f59e0b, #6366f1)"
            }}
          />
          <div className="flex items-start justify-between mb-4">
            <div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold ring-1",
                  signal.type === "BUY" &&
                    "bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 ring-emerald-500/40",
                  signal.type === "SELL" &&
                    "bg-red-500/20 text-red-300 ring-red-500/40",
                  signal.type === "HOLD" &&
                    "bg-amber-500/20 text-amber-300 ring-amber-500/40"
                )}
              >
                {signal.type} SIGNAL
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">{signal.token}</h3>
              <p className="text-sm text-neutral-400">{signal.ticker}</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-600 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <p className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-widest">
              AI Reasoning
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {signal.reason}
            </p>
          </div>

          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <p className="text-xs font-semibold text-neutral-400 mb-2 uppercase tracking-widest">
              Price Action
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-500">Current Price</p>
                <p className="text-lg font-bold text-white">
                  {signal.price ? formatCurrency(signal.price) : "$0.00"}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-500">24h Change</p>
                <p className={cn(
                  "text-lg font-bold",
                  (signal.change24h ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                  {signal.change24h ? `${signal.change24h >= 0 ? "+" : ""}${signal.change24h.toFixed(1)}%` : "0%"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-xs text-neutral-500">Confidence</p>
              <p className="text-lg font-bold text-white mt-1">{signal.confidence}%</p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-xs text-neutral-500">24h Vol</p>
              <p className="text-lg font-bold text-white mt-1">
                {signal.volume24h ? formatNumber(signal.volume24h) : "0"}
              </p>
            </div>
            <div
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-xs text-neutral-500">Rug Risk</p>
              <p className={cn(
                "text-lg font-bold mt-1",
                signal.rugRisk === "Low" && "text-emerald-400",
                signal.rugRisk === "Medium" && "text-amber-400",
                signal.rugRisk === "High" && "text-red-400"
              )}>
                {signal.rugRisk || "Low"}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
