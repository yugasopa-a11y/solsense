"use client";

import { useRef, useEffect, useState } from "react";

export function BackgroundBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const beams: Array<{
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
      opacity: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      "rgba(99, 102, 241, 0.15)",
      "rgba(139, 92, 246, 0.12)",
      "rgba(79, 70, 229, 0.1)",
      "rgba(99, 102, 241, 0.08)",
    ];

    const initBeams = () => {
      beams.length = 0;
      for (let i = 0; i < 30; i++) {
        beams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 200 + 100,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beams.forEach((beam) => {
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;
        beam.opacity += (Math.random() - 0.5) * 0.02;
        beam.opacity = Math.max(0.1, Math.min(0.6, beam.opacity));

        if (beam.x < -beam.length) beam.x = canvas.width + beam.length;
        if (beam.x > canvas.width + beam.length) beam.x = -beam.length;
        if (beam.y < -beam.length) beam.y = canvas.height + beam.length;
        if (beam.y > canvas.height + beam.length) beam.y = -beam.length;

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        const gradient = ctx.createLinearGradient(0, 0, beam.length, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, beam.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(beam.length, 0);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.globalAlpha = beam.opacity;
        ctx.stroke();
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initBeams();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
