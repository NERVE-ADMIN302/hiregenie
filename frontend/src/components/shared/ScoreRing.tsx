import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ScoreRing({ score, size = 120, strokeWidth = 10, label }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = score / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#34d399', glow: 'rgba(52, 211, 153, 0.3)' };
    if (s >= 60) return { stroke: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)' };
    return { stroke: '#f87171', glow: 'rgba(248, 113, 113, 0.3)' };
  };

  const colors = getColor(score);

  return (
    <div className="relative flex flex-col items-center justify-center score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={`ring-grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.stroke} />
            <stop offset="100%" stopColor={colors.stroke} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={`url(#ring-grad-${score})`} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${colors.glow})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="font-bold font-['Outfit'] tabular-nums"
          style={{ color: colors.stroke, fontSize: size * 0.22 }}
        >
          {displayScore}
        </span>
        {label && <span className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">{label}</span>}
      </div>
    </div>
  );
}