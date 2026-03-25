import React from 'react';

interface BackArrowIconProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function BackArrowIcon({ className, style, width = 16, height = 16 }: BackArrowIconProps) {
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
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}
