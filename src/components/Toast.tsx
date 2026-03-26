"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-8 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm min-w-[280px]",
              toast.type === "success" && "bg-green-500/10 border-green-500/30",
              toast.type === "error" && "bg-red-500/10 border-red-500/30",
              toast.type === "info" && "bg-cyan-500/10 border-cyan-500/30"
            )}
          >
            {toast.type === "success" && (
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            )}
            {toast.type === "error" && (
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            )}
            <span className="text-xs flex-1" style={{ color: "var(--text-primary)" }}>
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 hover:opacity-70 transition-opacity"
            >
              <X className="w-3 h-3" style={{ color: "var(--text-secondary)" }} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
