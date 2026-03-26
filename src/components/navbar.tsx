"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MovingBorder } from "@/components/ui/moving-border";
import { Wallet, Bell, Menu, X, TrendingUp } from "lucide-react";

interface NavbarProps {
  solPrice?: number;
  onConnectWallet?: () => void;
  isConnected?: boolean;
}

export function Navbar({ solPrice = 178.42, onConnectWallet, isConnected = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "#" },
    { name: "Signals", href: "#" },
    { name: "Trending", href: "#" },
    { name: "Watchlist", href: "#" },
    { name: "Alerts", href: "#" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b"
      style={{
        background: "rgba(10,10,15,0.8)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.06)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="h-9 w-9 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)"
              }}
            >
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span
              className="text-xl font-bold"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              SolSense
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* SOL Price Ticker */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <span className="text-neutral-400">SOL</span>
              <span className="font-semibold text-white">${solPrice.toFixed(2)}</span>
              <span className="text-emerald-400 text-xs">+2.4%</span>
            </div>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <Bell className="h-5 w-5" />
              <span
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500"
                style={{ boxShadow: "0 0 8px rgba(99,102,241,0.8)" }}
              />
            </button>

            {/* Connect Wallet */}
            {isConnected ? (
              <div
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.3)"
                }}
              >
                <Wallet className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Connected</span>
              </div>
            ) : (
              <MovingBorder
                duration={2000}
                className="hidden sm:flex h-10 px-6 text-sm font-semibold"
                containerClassName="h-10"
              >
                <button
                  onClick={onConnectWallet}
                  className="flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </button>
              </MovingBorder>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "rgba(10,10,15,0.95)",
            borderColor: "rgba(255,255,255,0.06)"
          }}
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-sm text-neutral-400 hover:text-white transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onConnectWallet}
              className="w-full mt-4 px-4 py-3 rounded-xl text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white"
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
