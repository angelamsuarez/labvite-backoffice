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
    <div className="bg-cream px-7 py-9">
      {/* Double border frame */}
      <div className="border border-charcoal/25 p-[6px]">
        <div className="border border-charcoal/15 px-5 pt-12 pb-7 relative">
          {/* ── Initials on top border ── */}
          <div className="absolute -top-5 left-0 right-0 flex items-center justify-center">
            <div className="bg-cream px-5 flex items-center gap-5">
              <span className="text-lg font-playfair tracking-[0.3em] text-charcoal">
                {initial1}
              </span>
              <span className="text-4xl font-script text-warm-gray leading-none select-none">
                &amp;
              </span>
              <span className="text-lg font-playfair tracking-[0.3em] text-charcoal">
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
                className="text-base tracking-[0.2em] font-playfair text-charcoal uppercase"
              />
              <span className="text-base tracking-[0.2em] font-playfair text-charcoal">
                AND
              </span>
              <EditableText
                value={data.partnerName2}
                onChange={(v) => updateField('partnerName2', v)}
                as="span"
                className="text-base tracking-[0.2em] font-playfair text-charcoal uppercase"
              />
            </div>

            {/* ── Date + Location ── */}
            <div className="flex items-center justify-center gap-1 mt-2 flex-wrap">
              <EditableText
                value={data.date}
                onChange={(v) => updateField('date', v)}
                as="span"
                className="text-sm italic font-playfair text-charcoal/60"
              />
              <span className="text-sm italic font-playfair text-charcoal/60">
                in
              </span>
              <EditableText
                value={data.headerLocation}
                onChange={(v) => updateField('headerLocation', v)}
                as="span"
                className="text-sm italic font-playfair text-charcoal/60"
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
    <div className="bg-white px-4 pt-10 pb-6">
      {/* ── Names in handwritten font ── */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2">
          <EditableText
            value={data.partnerName1}
            onChange={(v) => updateField('partnerName1', v)}
            as="span"
            className="text-2xl font-handwritten text-charcoal lowercase"
          />
          <span className="text-2xl font-handwritten text-charcoal">+</span>
          <EditableText
            value={data.partnerName2}
            onChange={(v) => updateField('partnerName2', v)}
            as="span"
            className="text-2xl font-handwritten text-charcoal lowercase"
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
    <div className="bg-cream">
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
            className="text-lg tracking-[0.45em] font-playfair text-charcoal uppercase"
          />
          <span className="text-lg tracking-[0.45em] font-playfair text-charcoal mx-4 select-none">
            &amp;
          </span>
          <EditableText
            value={data.partnerName2}
            onChange={(v) => updateField('partnerName2', v)}
            as="span"
            className="text-lg tracking-[0.45em] font-playfair text-charcoal uppercase"
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
    <div className="bg-cream px-8 py-20 text-center">
      {/* ── Subtitle ── */}
      <EditableText
        value={data.headerSubtitle}
        onChange={(v) => updateField('headerSubtitle', v)}
        as="p"
        className="text-xs tracking-[0.4em] font-playfair text-sage uppercase mb-5"
      />

      {/* ── Names ── */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <EditableText
          value={data.partnerName1}
          onChange={(v) => updateField('partnerName1', v)}
          as="h1"
          className="text-3xl tracking-[0.1em] font-playfair text-charcoal font-bold uppercase"
        />
        <span className="text-2xl font-script text-charcoal/50 select-none">
          and
        </span>
        <EditableText
          value={data.partnerName2}
          onChange={(v) => updateField('partnerName2', v)}
          as="h1"
          className="text-3xl tracking-[0.1em] font-playfair text-charcoal font-bold uppercase"
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
