"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Monitor, Tablet, Smartphone, RefreshCw, ExternalLink } from "lucide-react";

export function Preview() {
  const { previewUrl, previewDevice, setPreviewDevice, files } = useApp();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setLoading(true);
    setKey((k) => k + 1);
    setTimeout(() => setLoading(false), 1000);
  };

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  const hasContent = Object.keys(files).length > 0;

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--bg)" }}>
      {/* Preview Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          PREVIEW
        </span>

        <div className="flex items-center gap-2">
          {/* Device toggles */}
          <div
            className="flex items-center rounded-lg p-1"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {[
              { device: "desktop" as const, icon: Monitor },
              { device: "tablet" as const, icon: Tablet },
              { device: "mobile" as const, icon: Smartphone },
            ].map(({ device, icon: Icon }) => (
              <button
                key={device}
                onClick={() => setPreviewDevice(device)}
                className={cn(
                  "p-1.5 rounded transition-all",
                  previewDevice === device
                    ? "bg-white/10 text-white"
                    : "text-gray-500 hover:text-gray-300"
                )}
                title={device}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            title="Refresh preview"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <div
          className="relative w-full rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: "#1a1a1a",
            border: "1px solid var(--border)",
            maxWidth: deviceWidths[previewDevice],
            height: previewDevice === "desktop" ? "100%" : "700px",
          }}
        >
          {loading && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ background: "rgba(0,0,0,0.7)" }}
            >
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ color: "var(--accent-purple)" }} />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Loading preview...
                </span>
              </div>
            </div>
          )}

          {previewUrl ? (
            <iframe
              key={key}
              srcDoc={previewUrl}
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin"
              title="Website Preview"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <Monitor className="w-8 h-8" style={{ color: "var(--text-secondary)" }} />
              </div>
              <h3 className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                {hasContent ? "Preview Ready" : "No Website Yet"}
              </h3>
              <p className="text-xs max-w-xs" style={{ color: "var(--text-secondary)" }}>
                {hasContent
                  ? "Your website is ready to preview. Build it to see the live result."
                  : "Describe a website in the terminal and click Build to generate your site."}
              </p>

              {!hasContent && (
                <div
                  className="mt-6 p-4 rounded-lg text-xs text-left"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p className="mb-2" style={{ color: "var(--accent-green)" }}>
                    Quick start examples:
                  </p>
                  <ul className="space-y-1" style={{ color: "var(--text-secondary)" }}>
                    <li>• "Build a startup landing page"</li>
                    <li>• "Create a portfolio website"</li>
                    <li>• "Make an e-commerce store"</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
