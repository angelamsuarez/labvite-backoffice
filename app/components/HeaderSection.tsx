'use client';

import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { useInvitation } from './InvitationContext';

/* ================================================================
   VARIANT 1  –  Classic Framed
   Cream background · elegant double-border · initials at top ·
   single photo · names + date/location below
   ================================================================ */

function HeaderClassicFramed() {
  const { data, updateField } = useInvitation();

  const initial1 = data.partnerName1.charAt(0).toUpperCase();
  const initial2 = data.partnerName2.charAt(0).toUpperCase();

  return (
    <div className="px-7 py-9" style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}>
      {/* Double border frame */}
      <div className="border p-[6px]" style={{ borderColor: `${data.headerTextColor}25` }}>
        <div className="border px-5 pt-12 pb-7 relative" style={{ borderColor: `${data.headerTextColor}15` }}>
          {/* ── Initials on top border ── */}
          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
            <div className="px-5 flex items-center gap-5" style={{ backgroundColor: data.headerBgColor }}>
              <span className="text-lg font-playfair tracking-[0.3em]">
                {initial1}
              </span>
              <span className="text-4xl font-script leading-none select-none" style={{ opacity: 0.5 }}>
                &amp;
              </span>
              <span className="text-lg font-playfair tracking-[0.3em]">
                {initial2}
              </span>
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
              <span className="text-base tracking-[0.2em] font-playfair">
                AND
              </span>
              <EditableText
                value={data.partnerName2}
                onChange={(v) => updateField('partnerName2', v)}
                as="span"
                className="text-base tracking-[0.2em] font-playfair uppercase"
              />
            </div>

            {/* ── Date + Location ── */}
            <div className="flex items-center justify-center gap-1 mt-2 flex-wrap" style={{ opacity: 0.6 }}>
              <EditableText
                value={data.date}
                onChange={(v) => updateField('date', v)}
                as="span"
                className="text-sm italic font-playfair"
              />
              <span className="text-sm italic font-playfair">
                in
              </span>
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

/* ================================================================
   VARIANT 2  –  Triptych
   White background · handwritten names · three photos side-by-side
   ================================================================ */

function HeaderTriptych() {
  const { data, updateField } = useInvitation();

  return (
    <div className="px-4 pt-10 pb-6" style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}>
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

/* ================================================================
   VARIANT 3  –  Bold Photo
   Full-bleed moody photo · wide-spaced names below on cream
   ================================================================ */

function HeaderBoldPhoto() {
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
          <span className="text-lg tracking-[0.45em] font-playfair mx-4 select-none">
            &amp;
          </span>
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

/* ================================================================
   VARIANT 4  –  Minimal (text only, no photo)
   Cream background · subtitle · large names with script "and"
   ================================================================ */

function HeaderMinimal() {
  const { data, updateField } = useInvitation();

  return (
    <div className="px-8 py-20 text-center" style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor }}>
      {/* ── Subtitle ── */}
      <EditableText
        value={data.headerSubtitle}
        onChange={(v) => updateField('headerSubtitle', v)}
        as="p"
        className="text-xs tracking-[0.4em] font-playfair uppercase mb-5" style={{ opacity: 0.7 }}
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

/* ================================================================
   HEADER SECTION  –  renders the active variant
   ================================================================ */

export default function HeaderSection() {
  const { data } = useInvitation();

  return (
    <section>
      {data.headerVariant === 'classic' && <HeaderClassicFramed />}
      {data.headerVariant === 'triptych' && <HeaderTriptych />}
      {data.headerVariant === 'bold' && <HeaderBoldPhoto />}
      {data.headerVariant === 'minimal' && <HeaderMinimal />}
    </section>
  );
}
