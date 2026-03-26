"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm overflow-hidden">
      <div className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-white tabular-nums">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-neutral-400">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            changeType === "up" && "bg-emerald-500/15 text-emerald-400",
            changeType === "down" && "bg-red-500/15 text-red-400"
          )}
        >
          {changeType === "up" ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {change}
        </span>
        <span className="text-xs text-neutral-600">vs yesterday</span>
      </div>
    </div>
  );
}
