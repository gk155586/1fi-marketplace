"use client";

import React from "react";

interface AnimatedLetterTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  delayMultiplier?: number;
}

export default function AnimatedLetterText({
  text,
  isActive,
  className = "",
  delayMultiplier = 12,
}: AnimatedLetterTextProps) {
  if (!isActive) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      key={`animated-${text}-${isActive}`}
      className={`${className} inline-flex items-center whitespace-nowrap flex-nowrap relative z-10`}
    >
      {text.split("").map((char, charIdx) => (
        <span
          key={charIdx}
          className="animate-letter-emerge"
          style={{
            animationDelay: `${charIdx * delayMultiplier}ms`,
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
