'use client';

import { useRef } from 'react';

export default function AddPhotoButton({
  onChange,
  className = '',
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={className}>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-charcoal/20 hover:border-charcoal/40 transition-colors flex flex-col items-center justify-center text-charcoal/30 hover:text-charcoal/50 bg-charcoal/5"
      >
        <span className="text-3xl mb-1">+</span>
        <span className="text-xs font-playfair">Add photo</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
    </div>
  );
}

