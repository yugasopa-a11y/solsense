"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Wallet as WalletIcon, Zap, TrendingUp, Flame, BarChart3 } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { StatCard } from "@/components/ui/stat-card";
import { SignalCards } from "@/components/ui/signal-cards";
import { WalletAssets } from "@/components/ui/wallet-assets";
import { TrendingCoins } from "@/components/ui/trending-coins";
import { PortfolioChart } from "@/components/ui/portfolio-chart";
import { Wallet, Signal, TrendingToken, PortfolioHistory } from "@/lib/types";
import {
  generateMockWallet,
  generateSignal,
  generateTrendingTokens,
  generatePortfolioHistory,
  formatCurrency,
  formatPercent
} from "@/lib/mockData";

interface DashboardProps {
  walletAddress: string;
  onSignalClick?: (signal: Signal) => void;
}

export function Dashboard({ walletAddress, onSignalClick }: DashboardProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<PortfolioHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSignal, setNewSignal] = useState<Signal | null>(null);

  // Initialize data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const mockWallet = generateMockWallet(walletAddress);
      const mockSignals = Array(5).fill(null).map(() => generateSignal(mockWallet.tokens));
      const mockTrending = generateTrendingTokens();
      const mockHistory = generatePortfolioHistory(30);

      setWallet(mockWallet);
      setSignals(mockSignals);
      setTrendingTokens(mockTrending);
      setPortfolioHistory(mockHistory);
      setLoading(false);

      // Simulate new signals coming in
      const signalInterval = setInterval(() => {
        if (wallet) {
          const signal = generateSignal(wallet.tokens);
          setNewSignal(signal);
          setSignals(prev => [signal, ...prev.slice(0, 9)]);
          setTimeout(() => setNewSignal(null), 3000);
        }
      }, 15000);

      return () => clearInterval(signalInterval);
    }, 1200);

    return () => clearTimeout(timer);
  }, [walletAddress]);

  const todayPnL = wallet ? (wallet.totalValue * 0.026) : 0;
  const todayPnLPercent = 2.6;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0f" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-neutral-400 text-sm">Analyzing wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-32 px-4 md:px-8"
      style={{ background: "#0a0a0f" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Wallet header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <WalletIcon className="h-5 w-5 text-indigo-400" />
            <span className="text-sm text-neutral-400">Connected Wallet</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-mono">
            {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
          </h1>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Portfolio Value"
            value={formatCurrency(wallet?.totalValue ?? 0)}
            change="4.2%"
            changeType="up"
            icon={<WalletIcon className="h-5 w-5" />}
          />
          <StatCard
            label="Today's P&L"
            value={`+${formatCurrency(todayPnL)}`}
            change="2.6%"
            changeType="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <StatCard
            label="Active Signals"
            value={signals.length.toString()}
            change="3 new"
            changeType="up"
            icon={<Zap className="h-5 w-5" />}
          />
        </div>

        {/* Bento Grid Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Live AI Signals - spans 2 columns */}
          <div className="md:col-span-2 rounded-xl border overflow-hidden" style={{
            background: "#0d0d14",
            borderColor: "rgba(99,102,241,0.3)"
          }}>
            <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg" style={{ background: "rgba(99,102,241,0.15)" }}>
                  <Zap className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Live AI Signals</h2>
                  <p className="text-xs text-neutral-500">Real-time BUY/SELL/HOLD signals</p>
                </div>
                {newSignal && (
                  <span className="ml-auto px-2 py-1 rounded-full text-xs font-medium animate-pulse" style={{
                    background: newSignal.type === "BUY" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                    color: newSignal.type === "BUY" ? "#10b981" : "#ef4444"
                  }}>
                    New!
                  </span>
                )}
              </div>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <SignalCards signals={signals} onSignalClick={onSignalClick} />
            </div>
          </div>

          {/* Wallet Assets - 1 column */}
          <div className="rounded-xl border overflow-hidden" style={{
            background: "#0d0d14",
            borderColor: "rgba(139,92,246,0.3)"
          }}>
            <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg" style={{ background: "rgba(139,92,246,0.15)" }}>
                  <WalletIcon className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Wallet Assets</h2>
                  <p className="text-xs text-neutral-500">{wallet?.tokens.length ?? 0} tokens held</p>
                </div>
              </div>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <WalletAssets tokens={wallet?.tokens ?? []} />
            </div>
          </div>
        </div>

        {/* Bento Grid Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Portfolio Performance - spans 2 columns */}
          <div className="md:col-span-2 rounded-xl border overflow-hidden" style={{
            background: "#0d0d14",
            borderColor: "rgba(16,185,129,0.3)"
          }}>
            <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg" style={{ background: "rgba(16,185,129,0.15)" }}>
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Portfolio Performance</h2>
                  <p className="text-xs text-neutral-500">30-day portfolio value chart</p>
                </div>
              </div>
            </div>
            <div className="p-4 h-[300px]">
              <PortfolioChart data={portfolioHistory} />
            </div>
          </div>

          {/* Trending Memecoins - 1 column */}
          <div className="rounded-xl border overflow-hidden" style={{
            background: "#0d0d14",
            borderColor: "rgba(255,107,157,0.3)"
          }}>
            <div className="p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg" style={{ background: "rgba(255,107,157,0.15)" }}>
                  <Flame className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Trending Now</h2>
                  <p className="text-xs text-neutral-500">Hot memecoins trending</p>
                </div>
              </div>
            </div>
            <div className="p-4 max-h-[364px] overflow-y-auto">
              <TrendingCoins tokens={trendingTokens} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
