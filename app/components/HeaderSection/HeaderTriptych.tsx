'use client';

import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { useInvitation } from '../../context/InvitationContext';

export default function HeaderTriptych() {
  const { data, updateField } = useInvitation();

  return (
    <div
      className="px-4 pt-10 pb-6"
      style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}
    >
      {/* ── Names in handwritten font ── */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <EditableText
            value={data.partnerName1}
            onChange={(v) => updateField('partnerName1', v)}
            as="span"
            className="text-2xl font-handwritten lowercase"
          />
          <span className="text-2xl font-handwritten">+</span>
          <EditableText
            value={data.partnerName2}
            onChange={(v) => updateField('partnerName2', v)}
            as="span"
            className="text-2xl font-handwritten lowercase"
          />
        </div>
      </div>

      {/* ── Three photos ── */}
      <div className="grid grid-cols-3 gap-[3px]">
        <EditableImage
          src={data.headerImageUrl}
          onChange={(url) => updateField('headerImageUrl', url)}
          className="aspect-[3/4]"
        />
        <EditableImage
          src={data.headerImageUrl2}
          onChange={(url) => updateField('headerImageUrl2', url)}
          className="aspect-[3/4]"
        />
        <EditableImage
          src={data.headerImageUrl3}
          onChange={(url) => updateField('headerImageUrl3', url)}
          className="aspect-[3/4]"
        />
      </div>
    </div>
  );
}
