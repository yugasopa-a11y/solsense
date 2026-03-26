"use client";

import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[18rem]",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl",
        "border border-transparent bg-black p-4 shadow-input transition duration-200",
        "hover:shadow-xl dark:border-white/[0.1] dark:shadow-none",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-sans font-bold text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-400">
          {description}
        </div>
      </div>
    </div>
  );
};
