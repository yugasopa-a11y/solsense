"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Dashboard } from "@/components/dashboard";
import { SignalModal } from "@/components/ui/signal-modal";
import { ToastContainer } from "@/components/ui/toast";
import { Signal } from "@/lib/types";
import { generateSignal } from "@/lib/mockData";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; signal: Signal }>>([]);

  // Simulate real-time signals when wallet is connected
  useEffect(() => {
    if (!walletAddress) return;

    const interval = setInterval(() => {
      // Random chance to show a toast notification
      if (Math.random() > 0.5) {
        const signal = generateSignal([]);
        setToasts(prev => [...prev, { id: `toast-${Date.now()}`, signal }]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [walletAddress]);

  // Auto-dismiss toasts after 8 seconds
  useEffect(() => {
    if (toasts.length === 0) return;

    const timeout = setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 8000);

    return () => clearTimeout(timeout);
  }, [toasts]);

  const handleDismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleStartAnalysis = useCallback((address: string) => {
    setWalletAddress(address);
  }, []);

  const handleSignalClick = useCallback((signal: Signal) => {
    setSelectedSignal(signal);
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <Navbar
        onConnectWallet={() => {}}
        isConnected={!!walletAddress}
      />

      <AnimatePresence mode="wait">
        {walletAddress ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard
              walletAddress={walletAddress}
              onSignalClick={handleSignalClick}
            />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onStartAnalysis={handleStartAnalysis} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signal Detail Modal */}
      <SignalModal
        signal={selectedSignal}
        onClose={() => setSelectedSignal(null)}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </main>
  );
}
