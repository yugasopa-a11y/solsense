"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Signal } from "@/lib/types";
import { X } from "lucide-react";

interface SignalToastProps {
  signal: Signal;
  onDismiss: () => void;
}

export function SignalToast({ signal, onDismiss }: SignalToastProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "pointer-events-auto flex w-[380px] overflow-hidden rounded-2xl border p-4 shadow-lg backdrop-blur-xl",
          signal.type === "BUY" && "border-emerald-700/50 bg-emerald-950/80 shadow-emerald-900/30",
          signal.type === "SELL" && "border-red-700/50 bg-red-950/80 shadow-red-900/30",
          signal.type === "HOLD" && "border-amber-700/50 bg-amber-950/80 shadow-amber-900/30"
        )}
      >
        <span
          className={cn(
            "mr-3 mt-0.5 flex h-2.5 w-2.5 flex-shrink-0 rounded-full",
            signal.type === "BUY" &&
              "bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)] animate-pulse",
            signal.type === "SELL" &&
              "bg-red-400 shadow-[0_0_8px_2px_rgba(248,113,113,0.6)] animate-pulse",
            signal.type === "HOLD" &&
              "bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)] animate-pulse"
          )}
        />
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
            {signal.type} Signal
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">
            {signal.token} — {signal.confidence}% confidence
          </p>
          <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
            {signal.reason}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-3 self-start text-neutral-600 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; signal: Signal }>;
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
      {toasts.map((t) => (
        <SignalToast key={t.id} signal={t.signal} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}
