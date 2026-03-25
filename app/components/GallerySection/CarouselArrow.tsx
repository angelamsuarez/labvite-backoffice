'use client';

import { ChevronIcon } from '../../icons';

export default function CarouselArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const isPrev = direction === 'prev';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${isPrev ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-charcoal/70 hover:bg-white transition-all disabled:opacity-30`}
    >
      <ChevronIcon direction={isPrev ? 'left' : 'right'} />
    </button>
  );
}

