'use client';

import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { useInvitation } from '../../context/InvitationContext';

export default function HeaderBoldPhoto() {
  const { data, updateField } = useInvitation();

  return (
    <div style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}>
      {/* ── Full-width photo ── */}
      <EditableImage
        src={data.headerImageUrl}
        onChange={(url) => updateField('headerImageUrl', url)}
        className="w-full aspect-[4/5]"
      />

      {/* ── Names below ── */}
      <div className="py-7 px-4 text-center">
        <div className="flex items-center justify-center flex-wrap">
          <EditableText
            value={data.partnerName1}
            onChange={(v) => updateField('partnerName1', v)}
            as="span"
            className="text-lg tracking-[0.45em] font-playfair uppercase"
          />
          <span className="text-lg tracking-[0.45em] font-playfair mx-4 select-none">&amp;</span>
          <EditableText
            value={data.partnerName2}
            onChange={(v) => updateField('partnerName2', v)}
            as="span"
            className="text-lg tracking-[0.45em] font-playfair uppercase"
          />
        </div>
      </div>
    </div>
  );
}
