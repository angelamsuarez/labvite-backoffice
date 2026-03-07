'use client';

import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { useInvitation } from './InvitationContext';
import { GoogleMapsPinIcon } from './icons';

export default function LocationSection() {
  const { data } = useInvitation();

  switch (data.locationVariant) {
    case 'map':
      return <MapLocationVariant />;
    case 'venue':
      return <VenueLocationVariant />;
    default:
      return <VenueLocationVariant />;
  }
}

/* ================================================================
   VARIANT 1  –  Map
   ================================================================ */

function MapLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.locationBgColor, color: data.locationTextColor }}>
      {/* Title */}
      <EditableText
        value={data.locationTitle}
        onChange={(v) => updateField('locationTitle', v)}
        as="h2"
        className="text-lg font-playfair uppercase tracking-[0.3em] mb-5"
      />

      {/* Address */}
      <EditableText
        value={data.venueAddress}
        onChange={(v) => updateField('venueAddress', v)}
        as="p"
        className="text-xs font-playfair leading-relaxed max-w-[260px] mx-auto mb-6" style={{ opacity: 0.7 }}
      />

      {/* Map image */}
{  data?.locationImageUrl || isEditMode  &&  <div className="w-full max-w-[300px] mx-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-6">
        <EditableImage
          src={data.locationImageUrl}
          onChange={(url) => updateField('locationImageUrl', url)}
          className="w-full h-full"
        />
      </div>}

      {/* Google Maps link */}
      {isEditMode ? (
        <div className="space-y-2">
          <label className="text-[10px] font-playfair block" style={{ opacity: 0.4 }}>Google Maps URL:</label>
          <input
            type="url"
            value={data.googleMapsUrl}
            onChange={(e) => updateField('googleMapsUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full max-w-[300px] border rounded px-3 py-2 text-xs font-playfair focus:outline-none"
            style={{ backgroundColor: `${data.locationTextColor}1A`, borderColor: `${data.locationTextColor}33`, color: data.locationTextColor }}
          />
        </div>
      ) : (
        <a
          href={data.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 px-6 py-3 tracking-[0.2em] font-playfair text-xs uppercase transition-all"
          style={{ borderColor: `${data.locationTextColor}99`, color: data.locationTextColor }}
        >
          GET DIRECTIONS
        </a>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 2  –  Venue
   ================================================================ */

function VenueLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.locationBgColor, color: data.locationTextColor }}>
      {/* Title */}
      <EditableText
        value={data.locationTitle}
        onChange={(v) => updateField('locationTitle', v)}
        as="h2"
        className="text-sm font-playfair uppercase tracking-[0.35em] mb-8"
      />

      {/* Venue name */}
      <EditableText
        value={data.venueName}
        onChange={(v) => updateField('venueName', v)}
        as="p"
        className="text-lg font-playfair italic mb-2" style={{ opacity: 0.8 }}
      />

      {/* Address + Maps link */}
      {isEditMode ? (
        <div className="flex items-center justify-center gap-2 mb-3 w-full">
          <EditableText
            value={data.venueAddress}
            onChange={(v) => updateField('venueAddress', v)}
            as="p"
            className="text-xs font-playfair" style={{ opacity: 0.5 }}
          />
          <div className="flex-shrink-0">
            <GoogleMapsPinIcon />
          </div>
        </div>
      ) : (

        <a
          href={data.googleMapsUrl}
          target="_blank"
          className="flex items-center justify-center gap-2 mb-3 hover:opacity-70 transition-opacity"
          title="Open in Google Maps"
        >
          <EditableText
            value={data.venueAddress}
            onChange={(v) => updateField('venueAddress', v)}
            as="p"
            className="text-xs font-playfair" style={{ opacity: 0.5 }}
          />
          <GoogleMapsPinIcon className="flex-shrink-0 w-4 h-4" />
        </a>
      )}

      {/* Venue photo */}
      <div className="w-full max-w-[360px] mx-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
        <EditableImage
          src={data.locationImageUrl}
          onChange={(url) => updateField('locationImageUrl', url)}
          className="w-full h-full"
        />
      </div>

      {/* Google Maps URL editor (edit mode) */}
      {isEditMode && (
        <div className="mt-6 space-y-2">
          <label className="text-[10px] text-charcoal/40 font-playfair block">Google Maps URL:</label>
          <input
            type="url"
            value={data.googleMapsUrl}
            onChange={(e) => updateField('googleMapsUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full max-w-[300px] bg-white border border-charcoal/15 rounded px-3 py-2 text-charcoal/70 placeholder-charcoal/25 text-xs font-playfair focus:outline-none focus:border-sage"
          />
        </div>
      )}
    </section>
  );
}
