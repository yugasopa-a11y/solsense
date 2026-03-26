"use client";

import { useEffect, useRef, useState } from "react";
import { PortfolioHistory } from "@/lib/types";
import { formatCurrency } from "@/lib/mockData";

interface PortfolioChartProps {
  data: PortfolioHistory[];
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; value: number; date: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const padding = { top: 20, right: 20, bottom: 30, left: 60 };

      ctx.clearRect(0, 0, width, height);

      const values = data.map(d => d.value);
      const minValue = Math.min(...values) * 0.95;
      const maxValue = Math.max(...values) * 1.05;

      const xScale = (i: number) => padding.left + (i / (data.length - 1)) * (width - padding.left - padding.right);
      const yScale = (v: number) => height - padding.bottom - ((v - minValue) / (maxValue - minValue)) * (height - padding.top - padding.bottom);

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)");
      gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");

      ctx.beginPath();
      ctx.moveTo(xScale(0), height - padding.bottom);
      data.forEach((d, i) => {
        ctx.lineTo(xScale(i), yScale(d.value));
      });
      ctx.lineTo(xScale(data.length - 1), height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.moveTo(xScale(0), yScale(data[0].value));
      data.forEach((d, i) => {
        ctx.lineTo(xScale(i), yScale(d.value));
      });
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow effect
      ctx.shadowColor = "#6366f1";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Grid lines
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      const gridCount = 4;
      for (let i = 0; i <= gridCount; i++) {
        const y = padding.top + (i / gridCount) * (height - padding.top - padding.bottom);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
      }

      // Y axis labels
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "right";
      for (let i = 0; i <= gridCount; i++) {
        const value = maxValue - (i / gridCount) * (maxValue - minValue);
        const y = padding.top + (i / gridCount) * (height - padding.top - padding.bottom);
        ctx.fillText(formatCurrency(value), padding.left - 8, y + 4);
      }
    };

    resize();
    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const padding = { left: 60, right: 20 };
      const index = Math.round(((x - padding.left) / (rect.width - padding.left - padding.right)) * (data.length - 1));

      if (index >= 0 && index < data.length) {
        const d = data[index];
        setTooltip({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          value: d.value,
          date: d.timestamp.toLocaleDateString()
        });
      }
    };

    const handleMouseLeave = () => setTooltip(null);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [data]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full" />
      {tooltip && (
        <div
          className="absolute pointer-events-none px-2 py-1 rounded text-xs"
          style={{
            background: "rgba(13,13,20,0.95)",
            border: "1px solid rgba(99,102,241,0.4)",
            left: tooltip.x,
            top: tooltip.y - 40
          }}
        >
          <p className="font-semibold text-white">{formatCurrency(tooltip.value)}</p>
          <p className="text-neutral-500">{tooltip.date}</p>
        </div>
      )}
    </div>
  );
}
