'use client';

import { useInvitation } from '../../context/InvitationContext';
import { SectionGroup, VariantButton, SectionColors } from './shared';

export default function HeaderPanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="Header">
      <div className="grid grid-cols-4 gap-2">
        <VariantButton
          active={data.headerVariant === 'classic'}
          onClick={() => updateField('headerVariant', 'classic')}
          label="Classic"
        >
          <ClassicThumb />
        </VariantButton>
        <VariantButton
          active={data.headerVariant === 'triptych'}
          onClick={() => updateField('headerVariant', 'triptych')}
          label="Triptych"
        >
          <TriptychThumb />
        </VariantButton>
        <VariantButton
          active={data.headerVariant === 'bold'}
          onClick={() => updateField('headerVariant', 'bold')}
          label="Bold"
        >
          <BoldThumb />
        </VariantButton>
        <VariantButton
          active={data.headerVariant === 'minimal'}
          onClick={() => updateField('headerVariant', 'minimal')}
          label="Minimal"
        >
          <MinimalThumb />
        </VariantButton>
      </div>
      <SectionColors
        bgField="headerBgColor"
        textField="headerTextColor"
        bgValue={data.headerBgColor}
        textValue={data.headerTextColor}
        updateField={updateField}
      />
    </SectionGroup>
  );
}

/* ── Thumbnails ────────────────────────────────────────────── */

function ClassicThumb() {
  return (
    <div className="w-full h-full bg-cream flex items-center justify-center p-1.5">
      <div className="w-full h-full border border-charcoal/20 p-[3px] flex flex-col items-center justify-center gap-[3px]">
        <div className="text-[5px] text-charcoal/40 font-playfair">C &amp; M</div>
        <div className="w-[70%] aspect-square bg-charcoal/10 rounded-sm" />
        <div className="w-[55%] h-[2px] bg-charcoal/15 rounded-full" />
      </div>
    </div>
  );
}

function TriptychThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-[3px] p-1.5">
      <div className="text-[5px] text-charcoal/40 font-handwritten">n + n</div>
      <div className="flex gap-[2px] w-full px-0.5">
        <div className="flex-1 aspect-[3/4] bg-charcoal/10 rounded-sm" />
        <div className="flex-1 aspect-[3/4] bg-charcoal/15 rounded-sm" />
        <div className="flex-1 aspect-[3/4] bg-charcoal/10 rounded-sm" />
      </div>
    </div>
  );
}

function BoldThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col">
      <div className="flex-1 bg-charcoal/20" />
      <div className="py-1.5 flex items-center justify-center">
        <div className="w-[75%] h-[2px] bg-charcoal/20 rounded-full" />
      </div>
    </div>
  );
}

function MinimalThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="w-[40%] h-[2px] bg-sage/30 rounded-full" />
      <div className="text-[5px] text-charcoal/50 font-playfair font-bold">A &amp; S</div>
    </div>
  );
}
