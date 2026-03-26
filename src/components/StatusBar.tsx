"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function StatusBar() {
  const { files, messages, isGenerating } = useApp();

  const fileCount = Object.keys(files).length;
  const messageCount = messages.length;

  return (
    <footer
      className="h-6 flex items-center justify-between px-4 text-[10px]"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: isGenerating ? "var(--accent-amber)" : "var(--accent-green)",
            }}
          />
          {isGenerating ? "Building..." : "Ready"}
        </span>
        <span>|</span>
        <span>{fileCount} files</span>
        <span>|</span>
        <span>{messageCount} messages</span>
      </div>

      <div className="flex items-center gap-4">
        <span>UTF-8</span>
        <span>|</span>
        <span>TypeScript React</span>
        <span>|</span>
        <span
          className="px-1.5 py-0.5 rounded"
          style={{ background: "rgba(139, 92, 246, 0.2)", color: "var(--accent-purple)" }}
        >
          APEX v1.0
        </span>
      </div>
    </footer>
  );
}
