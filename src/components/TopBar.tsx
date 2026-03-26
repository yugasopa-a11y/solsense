"use client";

import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Build, Eye, Download, Trash2, Zap } from "lucide-react";
import { useState } from "react";
import JSZip from "jszip";
import { generateWebsite } from "@/lib/ai-engine";

export function TopBar() {
  const {
    isGenerating,
    setIsGenerating,
    setFiles,
    setPreviewUrl,
    addMessage,
    files,
    addToast,
    reset,
  } = useApp();

  const handleBuild = async () => {
    const lastMessage = window.__apexLastPrompt;
    if (!lastMessage) {
      addToast("error", "Describe your website first!");
      return;
    }

    setIsGenerating(true);
    addMessage("user", lastMessage);

    try {
      const result = await generateWebsite(lastMessage);
      addMessage("ai", result.description, result.files);
      setFiles(result.files);
      const html = buildPreviewHtml(result.files);
      setPreviewUrl(html);
      addToast("success", `Built ${Object.keys(result.files).length} files!`);
    } catch (err) {
      addToast("error", "Build failed. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (Object.keys(files).length === 0) {
      addToast("error", "Nothing to download. Build first!");
      return;
    }

    try {
      const zip = new JSZip();
      for (const [path, content] of Object.entries(files)) {
        zip.file(path, content);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "apex-website.zip";
      a.click();
      URL.revokeObjectURL(url);
      addToast("success", "Downloaded!");
    } catch {
      addToast("error", "Download failed.");
    }
  };

  const handleReset = () => {
    if (confirm("Reset everything?")) {
      reset();
      setPreviewUrl(null);
      addToast("info", "Reset complete.");
    }
  };

  return (
    <header
      className="h-12 flex items-center justify-between px-4 border-b"
      style={{
        background: "linear-gradient(180deg, #161618 0%, #111113 100%)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
            }}
          >
            A
          </div>
          <span
            className="text-sm font-semibold tracking-tight glitch"
            style={{ color: "var(--text-primary)" }}
          >
            APEX
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded"
          style={{
            background: "rgba(139, 92, 246, 0.15)",
            color: "var(--accent-purple)",
          }}
        >
          AI BUILDER
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleBuild}
          disabled={isGenerating}
          className={cn(
            "btn btn-primary",
            isGenerating && "opacity-50 cursor-not-allowed"
          )}
        >
          <Zap className="w-3.5 h-3.5" />
          {isGenerating ? "Building..." : "Build"}
        </button>

        <button onClick={handleDownload} className="btn btn-secondary">
          <Download className="w-3.5 h-3.5" />
          Download
        </button>

        <button onClick={handleReset} className="btn btn-ghost">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}

function buildPreviewHtml(files: Record<string, string>): string {
  const pageContent = files["src/app/page.tsx"] || files["app/page.tsx"] || "";
  const globalsCss = files["src/app/globals.css"] || files["app/globals.css"] || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Preview</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${globalsCss}
    body { font-family: 'Inter', sans-serif; margin: 0; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    ${pageContent}
  </script>
</body>
</html>`;
}
