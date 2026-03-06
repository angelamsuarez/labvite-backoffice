interface HeartOutlineIconProps {
  className?: string;
}

export default function HeartOutlineIcon({ className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-charcoal-light' }: HeartOutlineIconProps) {
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none">
      <path
        d="M25 43 C25 43, 6 30, 6 19 C6 12, 11 7, 16 7 C20 7, 23 10, 25 13 C27 10, 30 7, 34 7 C39 7, 44 12, 44 19 C44 30, 25 43, 25 43Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        fill="none"
      />
    </svg>
  );
}
