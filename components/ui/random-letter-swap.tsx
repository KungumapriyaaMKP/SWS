'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: any;
  onClick?: () => void;
  href?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export function RandomLetterSwap({
  label,
  className = '',
  staggerDuration = 0.025,
  transition = { duration: 0.6, type: 'spring' },
  onClick,
}: RandomLetterSwapProps) {
  const [displayText, setDisplayText] = useState(label);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const maxIterations = label.length;

    const interval = setInterval(() => {
      setDisplayText(
        label
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return label[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(label);
        setIsAnimating(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`inline-block select-none font-mono ${className}`}
      whileHover={{ y: -1 }}
      transition={transition}
    >
      {displayText}
    </motion.span>
  );
}
