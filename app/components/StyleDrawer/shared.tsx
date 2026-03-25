'use client';

import { useRef } from 'react';
import { COLOR_PALETTE, type InvitationData } from '../../context/InvitationContext';

/* ── Section group wrapper ─────────────────────────────────── */

export function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-6 border-b border-charcoal/10 last:border-b-0 last:pb-0">
      <h3 className="text-[12px] uppercase tracking-[0.25em] text-charcoal font-playfair mb-3 font-semibold">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Variant button ────────────────────────────────────────── */

export function VariantButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick?: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'opacity-100' : 'opacity-40 hover:opacity-75'}`}
    >
      <div
        className={`w-full aspect-[5/6] rounded-md border-2 transition-colors overflow-hidden ${active ? 'border-sage shadow-sm' : 'border-charcoal/10'}`}
      >
        {children}
      </div>
      <span className="text-[10px] font-playfair text-charcoal/70">{label}</span>
    </button>
  );
}

/* ── Toggle row ────────────────────────────────────────────── */

export function ToggleRow({
  label,
  checked,
  onChange,
  small,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  small?: boolean;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className={`${small ? 'text-[10px]' : 'text-xs'} font-playfair text-charcoal/70`}>
        {label}
      </span>
      <button
        onClick={onChange}
        className={`relative ${small ? 'w-9 h-5' : 'w-11 h-6'} rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-sage' : 'bg-charcoal/20'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 ${small ? 'w-4 h-4' : 'w-5 h-5'} bg-white rounded-full transition-transform ${
            checked ? (small ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}

/* ── Card ──────────────────────────────────────────────────── */

export function Card({
  backgroundColor,
  children,
}: {
  backgroundColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: backgroundColor || 'rgba(28,28,28,0.05)' }}
    >
      {children}
    </div>
  );
}

/* ── Color block wrapper ───────────────────────────────────── */

export function ColorBlock({ children }: { children: React.ReactNode }) {
  return <div className="pt-2 space-y-2.5 pb-6">{children}</div>;
}

/* ── Color picker row ──────────────────────────────────────── */

export function ColorPickerRow({
  label,
  field,
  value,
  updateField,
}: {
  label: string;
  field: keyof InvitationData;
  value: string;
  updateField: <K extends keyof InvitationData>(f: K, v: InvitationData[K]) => void;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-playfair text-charcoal/50">{label}</span>
      <div className="flex gap-1.5 flex-wrap items-center">
        {COLOR_PALETTE.map((c) => {
          const isSelected = c.value === value;
          return (
            <div
              key={c.value}
              className={`inline-flex rounded-full p-[2px] transition-all ${isSelected && 'bg-sage scale-110'}`}
            >
              <button
                onClick={() => updateField(field, c.value as never)}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                  isSelected ? 'border-white' : 'border-charcoal/15 hover:border-charcoal/30'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            </div>
          );
        })}
        {/* Show custom color circle if a custom color is selected */}
        {(() => {
          const isCustomColor = !COLOR_PALETTE.some((c) => c.value === value);
          if (!isCustomColor) return null;
          const isSelected = true;
          return (
            <div
              className={`inline-flex rounded-full p-[2px] transition-all ${isSelected ? 'bg-sage scale-110' : 'bg-white'}`}
            >
              <button
                onClick={() => colorInputRef.current?.click()}
                className="w-6 h-6 rounded-full border-2 border-white transition-all cursor-pointer"
                style={{ backgroundColor: value }}
                title="Selected custom color"
              />
            </div>
          );
        })()}
        {/* Custom color picker */}
        <button
          onClick={() => colorInputRef.current?.click()}
          className="relative w-6 h-6 rounded-full border-2 border-dashed border-charcoal/25 hover:border-charcoal/40 transition-all flex items-center justify-center cursor-pointer"
          title="Custom color"
        >
          <span className="text-[8px] text-charcoal/60 font-bold">+</span>
        </button>
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={(e) => updateField(field, e.target.value as never)}
          className="sr-only"
        />
      </div>
    </div>
  );
}

/* ── Section colors (bg + text pair) ───────────────────────── */

export function SectionColors({
  bgField,
  textField,
  bgValue,
  textValue,
  updateField,
}: {
  bgField: keyof InvitationData;
  textField: keyof InvitationData;
  bgValue: string;
  textValue: string;
  updateField: <K extends keyof InvitationData>(f: K, v: InvitationData[K]) => void;
}) {
  return (
    <div className="mt-3 space-y-3">
      <ColorPickerRow label="Background" field={bgField} value={bgValue} updateField={updateField} />
      <ColorPickerRow label="Text" field={textField} value={textValue} updateField={updateField} />
    </div>
  );
}
