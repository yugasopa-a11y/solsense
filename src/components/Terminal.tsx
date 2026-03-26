"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Send, Copy, Check, Terminal as TerminalIcon } from "lucide-react";

export function Terminal() {
  const { messages, addMessage, isGenerating } = useApp();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    // Store globally for TopBar access
    if (typeof window !== "undefined") {
      (window as any).__apexLastPrompt = input.trim();
    }

    setInput("");
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--bg)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <TerminalIcon className="w-4 h-4" style={{ color: "var(--accent-green)" }} />
        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
          TERMINAL
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <p className="mb-2" style={{ color: "var(--accent-green)" }}>
              <span className="mr-2">⚡</span>
              APEX AI Website Builder v1.0
            </p>
            <p className="mb-4">
              Describe the website you want to build. Be specific about:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-6 text-xs">
              <li>Industry (SaaS, e-commerce, portfolio, etc.)</li>
              <li>Target audience</li>
              <li>Key features needed</li>
              <li>Design style preferences</li>
            </ul>
            <div
              className="p-3 rounded-lg text-xs"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ color: "var(--accent-amber)" }}>TIP:</span> Try saying something like{" "}
              <span
                className="cursor-pointer"
                style={{ color: "var(--accent-cyan)" }}
                onClick={() => setInput("Build a modern startup landing page for an AI company")}
              >
                "Build a modern startup landing page for an AI company"
              </span>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg) => (
          <div key={msg.id} className="space-y-3">
            {/* User message */}
            <div className="flex gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs"
                style={{ background: "var(--accent-cyan)", color: "var(--bg)" }}
              >
                U
              </span>
              <div
                className="flex-1 text-sm px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                }}
              >
                {msg.content}
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--accent-purple)" }}
              >
                AI
              </span>
              <div className="flex-1">
                <div
                  className="text-sm px-3 py-2 rounded-lg"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--accent-purple)",
                  }}
                >
                  <div className="prose prose-sm max-w-none">
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {line.startsWith("- ") || line.startsWith("⚡") || line.startsWith("✨") || line.startsWith("🚀") || line.startsWith("🛒") ? (
                          <span style={{ color: "var(--accent-purple)" }}>{line}</span>
                        ) : line.startsWith("**") ? (
                          <strong>{line.replace(/\*\*/g, "")}</strong>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Code blocks */}
                {msg.files && Object.keys(msg.files).length > 0 && (
                  <div className="mt-3 space-y-2">
                    {Object.entries(msg.files).map(([filename, content]) => (
                      <div
                        key={filename}
                        className="rounded-lg overflow-hidden"
                        style={{
                          background: "#0d0d0f",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          className="flex items-center justify-between px-3 py-2 text-xs"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          <span style={{ color: "var(--accent-amber)" }}>{filename}</span>
                          <button
                            onClick={() => handleCopy(content, `${msg.id}-${filename}`)}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {copiedId === `${msg.id}-${filename}` ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                        <pre
                          className="p-3 text-xs overflow-x-auto"
                          style={{
                            color: "var(--text-secondary)",
                            maxHeight: "200px",
                            overflowY: "auto",
                          }}
                        >
                          <code>{content}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isGenerating && (
          <div className="flex gap-3">
            <span
              className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent-purple)" }}
            >
              AI
            </span>
            <div
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ background: "var(--accent-purple)", animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ background: "var(--accent-purple)", animationDelay: "150ms" }}
              />
              <span
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ background: "var(--accent-purple)", animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-lg"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "var(--accent-green)" }}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your dream website..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-xs"
            style={{ color: "var(--text-primary)" }}
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className={cn(
              "p-1.5 rounded transition-all",
              input.trim() && !isGenerating
                ? "hover:bg-white/10"
                : "opacity-30 cursor-not-allowed"
            )}
            style={{ color: "var(--accent-green)" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
