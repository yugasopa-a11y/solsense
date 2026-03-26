"use client";

import { cn } from "@/lib/utils";
import { TrendingToken } from "@/lib/types";
import { TrendingUp, Clock, MessageSquare, Plus, Zap } from "lucide-react";
import { formatNumber, formatPercent } from "@/lib/mockData";

interface TrendingCoinsProps {
  tokens: TrendingToken[];
  onAddToWatchlist?: (token: TrendingToken) => void;
}

export function TrendingCoins({ tokens, onAddToWatchlist }: TrendingCoinsProps) {
  return (
    <div className="flex flex-col gap-2">
      {tokens.map((token) => (
        <div
          key={token.id}
          className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/[0.03]"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))",
                  border: "1px solid rgba(99,102,241,0.4)"
                }}
              >
                {token.ticker.slice(0, 3)}
              </div>
              {token.isNew && (
                <span
                  className="absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-[8px] font-bold animate-pulse"
                  style={{
                    background: "linear-gradient(135deg, #ff6b9d, #c026d3)",
                    color: "white"
                  }}
                >
                  NEW
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm">{token.ticker}</span>
                {token.pumpFun && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                    style={{
                      background: "rgba(255,107,157,0.2)",
                      color: "#ff6b9d",
                      border: "1px solid rgba(255,107,157,0.4)"
                    }}
                  >
                    PUMP.FUN
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {token.launchTime}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {formatNumber(token.socialMentions)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                ${token.price.toFixed(6)}
              </div>
              <div className={cn(
                "text-xs",
                token.change24h >= 0 ? "text-emerald-400" : "text-red-400"
              )}>
                {formatPercent(token.change24h)}
              </div>
            </div>

            <div className="w-16">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-500">Hype</span>
                <span className="text-white font-medium">{token.hypeScore}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${token.hypeScore}%`,
                    background: token.hypeScore > 70
                      ? "linear-gradient(90deg, #10b981, #6366f1)"
                      : token.hypeScore > 40
                      ? "linear-gradient(90deg, #f59e0b, #6366f1)"
                      : "linear-gradient(90deg, #6366f1, #8b5cf6)"
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => onAddToWatchlist?.(token)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/10"
            >
              <Plus className="h-4 w-4 text-neutral-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
