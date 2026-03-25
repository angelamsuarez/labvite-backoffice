'use client';

import { useInvitation } from '../../context/InvitationContext';
import { SectionGroup, VariantButton, ToggleRow, SectionColors } from './shared';

export default function RSVPPanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="RSVP">
      <ToggleRow
        label="Show section"
        checked={data.enableRsvp}
        onChange={() => updateField('enableRsvp', !data.enableRsvp)}
      />
      {data.enableRsvp && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <VariantButton
              active={data.rsvpVariant === 'dark'}
              onClick={() => updateField('rsvpVariant', 'dark')}
              label="Dark"
            >
              <RSVPDarkThumb />
            </VariantButton>
            <VariantButton
              active={data.rsvpVariant === 'light'}
              onClick={() => updateField('rsvpVariant', 'light')}
              label="Light"
            >
              <RSVPLightThumb />
            </VariantButton>
          </div>
          <SectionColors
            bgField="rsvpBgColor"
            textField="rsvpTextColor"
            bgValue={data.rsvpBgColor}
            textValue={data.rsvpTextColor}
            updateField={updateField}
          />
        </>
      )}
    </SectionGroup>
  );
}

/* ── Thumbnails ────────────────────────────────────────────── */

function RSVPDarkThumb() {
  return (
    <div className="w-full h-full bg-charcoal flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[5px] text-white/60 font-playfair font-semibold">RSVP</div>
      <div className="w-[70%] h-[3px] border border-white/20 rounded-sm" />
      <div className="w-[70%] h-[3px] border border-white/20 rounded-sm" />
      <div className="w-[50%] h-[4px] border border-white/30 rounded-sm mt-[2px]" />
    </div>
  );
}

function RSVPLightThumb() {
  return (
    <div className="w-full h-full bg-cream-dark flex gap-[3px] p-1.5 items-center">
      <div className="w-2/5 flex flex-col items-center justify-center">
        <div className="text-[5px] text-charcoal/50 font-playfair font-semibold">RSVP</div>
      </div>
      <div className="w-3/5 flex flex-col gap-[2px]">
        <div className="w-full h-[3px] bg-white/80 rounded-sm" />
        <div className="w-full h-[3px] bg-white/80 rounded-sm" />
        <div className="w-[60%] h-[3px] bg-charcoal/10 rounded-sm mt-[1px]" />
      </div>
    </div>
  );
}
