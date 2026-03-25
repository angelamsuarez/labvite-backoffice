import React from 'react';

interface ChevronIconProps {
  direction: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

const PATHS: Record<ChevronIconProps['direction'], string> = {
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
};

export default function ChevronIcon({ direction, className, style, width = 14, height = 14 }: ChevronIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d={PATHS[direction]} />
    </svg>
  );
}
