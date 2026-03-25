interface MusicCardIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function MusicCardIcon({ className = 'w-14 h-14', style }: MusicCardIconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Card shape */}
      <rect x="14" y="8" width="36" height="44" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      {/* Folded corner */}
      <path d="M38 52 L50 52 L50 40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 52 L38 40 L50 40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Music note */}
      <circle cx="26" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M30 34 L30 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 18 L38 16 L38 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="34" cy="28" r="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}
