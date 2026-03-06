interface CircleEllipseIconProps {
  className?: string;
}

export default function CircleEllipseIcon({ className = 'absolute w-20 h-20' }: CircleEllipseIconProps) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <ellipse
        cx="40"
        cy="42"
        rx="34"
        ry="30"
        stroke="#7A2B3B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        transform="rotate(-6 40 42)"
      />
    </svg>
  );
}
