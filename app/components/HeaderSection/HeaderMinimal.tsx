'use client';

import EditableText from '../EditableText';
import { useInvitation } from '../../context/InvitationContext';

export default function HeaderMinimal() {
  const { data, updateField } = useInvitation();

  return (
    <div
      className="px-8 py-20 text-center"
      style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}
    >
      {/* ── Subtitle ── */}
      <EditableText
        value={data.headerSubtitle}
        onChange={(v) => updateField('headerSubtitle', v)}
        as="p"
        className="text-xs tracking-[0.4em] font-playfair uppercase mb-5"
        style={{ opacity: 0.7 }}
      />

      {/* ── Names ── */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <EditableText
          value={data.partnerName1}
          onChange={(v) => updateField('partnerName1', v)}
          as="h1"
          className="text-3xl tracking-[0.1em] font-playfair font-bold uppercase"
        />
        <span className="text-2xl font-script select-none" style={{ opacity: 0.5 }}>
          and
        </span>
        <EditableText
          value={data.partnerName2}
          onChange={(v) => updateField('partnerName2', v)}
          as="h1"
          className="text-3xl tracking-[0.1em] font-playfair font-bold uppercase"
        />
      </div>
    </div>
  );
}
