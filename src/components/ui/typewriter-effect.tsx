"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface Word {
  text: string;
  className?: string;
}

interface TypewriterEffectProps {
  words: Word[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterEffect({ words, className, cursorClassName }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex]?.text || "";

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentCharIndex < currentWord.length) {
            setCurrentCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (currentCharIndex > 0) {
            setCurrentCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentWordIndex, isDeleting, words]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {words.map((word, wordIndex) => {
        const isCurrentWord = wordIndex === currentWordIndex;
        const displayText = isCurrentWord
          ? word.text.slice(0, currentCharIndex)
          : wordIndex < currentWordIndex
          ? word.text
          : "";

        return (
          <span
            key={wordIndex}
            className={cn(
              "inline-block",
              word.className,
              wordIndex < currentWordIndex && "text-white"
            )}
          >
            {displayText}
            {isCurrentWord && (
              <span
                className={cn(
                  "ml-1 inline-block h-8 w-0.5 bg-indigo-500 animate-pulse",
                  cursorClassName
                )}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
