"use client";

import { cn } from "@/lib/utils";
import { Token } from "@/lib/types";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/mockData";

interface WalletAssetsProps {
  tokens: Token[];
}

export function WalletAssets({ tokens }: WalletAssetsProps) {
  return (
    <div className="flex flex-col gap-2">
      {tokens.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Wallet className="h-10 w-10 text-neutral-600 mb-2" />
          <p className="text-neutral-400 text-sm">No tokens found</p>
          <p className="text-neutral-600 text-xs">Connect a wallet to see assets</p>
        </div>
      ) : (
        tokens.map((token) => (
          <div
            key={token.mint}
            className="group flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-white/[0.03]"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)"
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: token.change24h >= 0
                    ? "rgba(16,185,129,0.15)"
                    : "rgba(239,68,68,0.15)",
                  color: token.change24h >= 0 ? "#10b981" : "#ef4444"
                }}
              >
                {token.symbol.slice(0, 3)}
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{token.symbol}</div>
                <div className="text-xs text-neutral-500">
                  {formatNumber(token.amount)} tokens
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-white">
                {formatCurrency(token.value)}
              </div>
              <div className={cn(
                "text-xs flex items-center justify-end gap-0.5",
                token.change24h >= 0 ? "text-emerald-400" : "text-red-400"
              )}>
                {token.change24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {formatPercent(token.change24h)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
