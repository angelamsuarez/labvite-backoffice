'use client';

import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { useInvitation } from '../../context/InvitationContext';

export default function HeaderClassicFramed() {
  const { data, updateField } = useInvitation();

  const initial1 = data.partnerName1.charAt(0).toUpperCase();
  const initial2 = data.partnerName2.charAt(0).toUpperCase();

  return (
    <div
      className="px-7 py-9"
      style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}
    >
      {/* Double border frame */}
      <div className="border p-[6px]" style={{ borderColor: `${data.headerTextColor}25` }}>
        <div
          className="border px-5 pt-12 pb-7 relative"
          style={{ borderColor: `${data.headerTextColor}15` }}
        >
          {/* ── Initials on top border ── */}
          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
            <div
              className="px-5 flex items-center gap-5"
              style={{ backgroundColor: data.headerBgColor }}
            >
              <span className="text-lg font-playfair tracking-[0.3em]">{initial1}</span>
              <span
                className="text-4xl font-script leading-none select-none"
                style={{ opacity: 0.5 }}
              >
                &amp;
              </span>
              <span className="text-lg font-playfair tracking-[0.3em]">{initial2}</span>
            </div>
          </div>

          {/* ── Photo ── */}
          <EditableImage
            src={data.headerImageUrl}
            onChange={(url) => updateField('headerImageUrl', url)}
            className="w-full aspect-[4/5]"
          />

          {/* ── Names ── */}
          <div className="text-center mt-7">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <EditableText
                value={data.partnerName1}
                onChange={(v) => updateField('partnerName1', v)}
                as="span"
                className="text-base tracking-[0.2em] font-playfair uppercase"
              />
              <span className="text-base tracking-[0.2em] font-playfair">AND</span>
              <EditableText
                value={data.partnerName2}
                onChange={(v) => updateField('partnerName2', v)}
                as="span"
                className="text-base tracking-[0.2em] font-playfair uppercase"
              />
            </div>

            {/* ── Date + Location ── */}
            <div
              className="flex items-center justify-center gap-1 mt-2 flex-wrap"
              style={{ opacity: 0.6 }}
            >
              <EditableText
                value={data.date}
                onChange={(v) => updateField('date', v)}
                as="span"
                className="text-sm italic font-playfair"
              />
              <span className="text-sm italic font-playfair">in</span>
              <EditableText
                value={data.headerLocation}
                onChange={(v) => updateField('headerLocation', v)}
                as="span"
                className="text-sm italic font-playfair"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
