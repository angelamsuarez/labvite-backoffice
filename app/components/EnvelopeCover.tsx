'use client';

import { useState } from 'react';
import { useInvitation } from './InvitationContext';
import EditableText from './EditableText';
import Image from 'next/image';

interface EnvelopeCoverProps {
  onOpen: () => void;
}

export default function EnvelopeCover({ onOpen }: EnvelopeCoverProps) {
  const { data, updateField, isEditMode } = useInvitation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isEditMode || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-[900ms] ease-in-out ${
        isAnimating ? 'opacity-0 scale-105 pointer-events-none' : ''
      }`}
      style={{ backgroundColor: data.envelopeBgColor, color: data.envelopeTextColor }}
      onClick={handleOpen}
    >
      {/* Top text */}
      <div className="mb-2" onClick={(e) => isEditMode && e.stopPropagation()}>
        <EditableText
          value={data.envelopeTopText || "WE'RE GETTING MARRIED"}
          onChange={(v) => updateField('envelopeTopText', v)}
          as="p"
          className="text-[13px] tracking-[0.35em] uppercase font-playfair text-center" style={{ opacity: 0.8 }}
        />
      </div>

      {/* Names */}
      <div className="mb-3 text-center" onClick={(e) => isEditMode && e.stopPropagation()}>
        <EditableText
          value={data.partnerName1}
          onChange={(v) => updateField('partnerName1', v)}
          as="span"
          className="text-5xl md:text-6xl font-script capitalize"
        />
        <span className="text-4xl md:text-5xl font-script mx-3" style={{ opacity: 0.9 }}>&amp;</span>
        <EditableText
          value={data.partnerName2}
          onChange={(v) => updateField('partnerName2', v)}
          as="span"
          className="text-5xl md:text-6xl font-script capitalize"
        />
      </div>

      {/* Envelope image — contained size */}
      <div className="relative w-[700px] h-[340px] md:w-[780px] md:h-[400px] transition-transform duration-300 hover:scale-[1.03]">
        <Image
          src="/envelope.svg"
          alt=""
          fill
          className="object-contain pointer-events-none drop-shadow-lg"
          priority
        />
      </div>

      {/* Click instruction */}
      <div className="mt-2" onClick={(e) => isEditMode && e.stopPropagation()}>
        {!isEditMode ? (
          <EditableText
            value={data.envelopeInstruction || 'CLICK TO OPEN'}
            onChange={(v) => updateField('envelopeInstruction', v)}
            as="p"
            className="text-[11px] tracking-[0.3em] uppercase font-playfair text-center" style={{ opacity: 0.6 }}
          />
        ) : (
          <p className="text-[11px] font-playfair text-center tracking-wider" style={{ opacity: 0.4 }}>
            Switch to Preview mode to open
          </p>
        )}
      </div>
    </div>
  );
}
