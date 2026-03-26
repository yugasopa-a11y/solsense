"use client";

import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
}

export function MovingBorder({
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 2000,
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val)?.x ?? 0;
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    return pathRef.current.getPointAtLength(val)?.y ?? 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <button
      className={cn(
        "relative h-12 w-48 overflow-hidden p-[1px] rounded-[1.75rem]",
        containerClassName
      )}
    >
      <div className="absolute inset-0 rounded-[1.75rem]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx="28"
            ry="28"
            ref={pathRef}
          />
        </svg>
        <motion.div
          style={{ position: "absolute", transform }}
          className={cn(
            "h-20 w-20 opacity-80 bg-[radial-gradient(var(--accent,#6366f1)_40%,transparent_60%)]",
            borderClassName
          )}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[1.75rem] border border-slate-800 bg-slate-900/80 text-sm text-white backdrop-blur-xl antialiased",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}
