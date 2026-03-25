'use client';

import { useEffect, useRef, useState } from 'react';
import { useInvitation } from '../context/InvitationContext';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isEditMode } = useInvitation();

  useEffect(() => {
    // Skip animations in edit mode
    if (isEditMode) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEditMode]);

  // Reset visibility when switching to preview mode
  useEffect(() => {
    if (!isEditMode) {
      setIsVisible(false);
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, [isEditMode]);

  const delayClass = delay > 0 ? `scroll-reveal-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
