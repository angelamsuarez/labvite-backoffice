'use client';

import { useInvitation } from '../../context/InvitationContext';
import { MapPinIcon } from '../../icons';
import { SectionGroup, VariantButton, ToggleRow, SectionColors } from './shared';

export default function LocationPanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="Location">
      <ToggleRow
        label="Show section"
        checked={data.enableLocation}
        onChange={() => updateField('enableLocation', !data.enableLocation)}
      />
      {data.enableLocation && (
        <>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <VariantButton
              active={data.locationVariant === 'venue'}
              onClick={() => updateField('locationVariant', 'venue')}
              label="Venue"
            >
              <VenueThumb />
            </VariantButton>
            <VariantButton
              active={data.locationVariant === 'map'}
              onClick={() => updateField('locationVariant', 'map')}
              label="Map"
            >
              <MapThumb />
            </VariantButton>
            <VariantButton
              active={data.locationVariant === 'side-by-side'}
              onClick={() => updateField('locationVariant', 'side-by-side')}
              label="Side by Side"
            >
              <div className="w-full h-full flex items-center justify-center gap-1">
                <div className="w-2 h-6 bg-current opacity-60"></div>
                <div className="w-2 h-6 bg-current opacity-60"></div>
              </div>
            </VariantButton>
          </div>
          <div className="mt-4 space-y-2">
            <ToggleRow
              small
              label="Show Ceremony"
              checked={data.enableCeremony}
              onChange={() => updateField('enableCeremony', !data.enableCeremony)}
            />
            <ToggleRow
              small
              label="Show Reception"
              checked={data.enableReception}
              onChange={() => updateField('enableReception', !data.enableReception)}
            />
          </div>
          <SectionColors
            bgField="locationBgColor"
            textField="locationTextColor"
            bgValue={data.locationBgColor}
            textValue={data.locationTextColor}
            updateField={updateField}
          />
        </>
      )}
    </SectionGroup>
  );
}

/* ── Thumbnails ────────────────────────────────────────────── */

function VenueThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] px-2 py-16">
      <div className="text-[4px] text-charcoal/40 font-playfair uppercase tracking-wider">
        Ceremony
      </div>
      <div className="text-[4px] text-charcoal/30 font-playfair italic">Venue Name</div>
      <div className="w-[70%] aspect-[4/3] bg-charcoal/10 rounded-sm mt-[2px]" />
    </div>
  );
}

function MapThumb() {
  return (
    <div className="w-full h-full bg-sage-dark flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[4px] text-white/50 font-playfair uppercase tracking-wider">
        Location
      </div>
      <div className="w-[70%] aspect-[4/3] bg-white/10 rounded-sm flex items-center justify-center">
        <MapPinIcon className="w-[10px] h-[10px] text-white/30" />
      </div>
      <div className="w-[60%] h-[3px] border border-white/20 rounded-sm mt-[1px]" />
    </div>
  );
}
