'use client';

import { useRef, useEffect, useState } from 'react';

interface CircleEllipseIconProps {
  className?: string;
}

export default function CircleEllipseIcon({
  className = 'absolute w-20 h-20',
}: CircleEllipseIconProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      className={`circle-draw ${animate ? 'animate' : ''} ${className}`}
      viewBox="0 0 80 80"
      fill="none"
    >
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
