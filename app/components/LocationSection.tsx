'use client';

import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { useInvitation } from './InvitationContext';
import { GoogleMapsPinIcon } from './icons';

/* ================================================================
   LOCATION SECTION
   Shows the wedding venue with address, map/photo, and a link
   to Google Maps directions.
   ================================================================ */

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
   Dark olive background · title · address · map image · directions
   ================================================================ */

function MapLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section className="bg-sage-dark py-12 px-6 text-white text-center">
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
        className="text-xs font-playfair text-white/70 leading-relaxed max-w-[260px] mx-auto mb-6"
      />

      {/* Map image */}
      <div className="w-full max-w-[300px] mx-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-6">
        <EditableImage
          src={data.locationImageUrl}
          onChange={(url) => updateField('locationImageUrl', url)}
          className="w-full h-full"
        />
      </div>

      {/* Google Maps link */}
      {isEditMode ? (
        <div className="space-y-2">
          <label className="text-[10px] text-white/40 font-playfair block">Google Maps URL:</label>
          <input
            type="url"
            value={data.googleMapsUrl}
            onChange={(e) => updateField('googleMapsUrl', e.target.value)}
            placeholder="https://maps.google.com/..."
            className="w-full max-w-[300px] bg-white/10 border border-white/20 rounded px-3 py-2 text-white/80 placeholder-white/30 text-xs font-playfair focus:outline-none focus:border-white/40"
          />
        </div>
      ) : (
        <a
          href={data.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-2 border-white/60 text-white px-6 py-3 tracking-[0.2em] font-playfair text-xs uppercase hover:bg-white hover:text-sage-dark transition-all"
        >
          GET DIRECTIONS
        </a>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 2  –  Venue
   Light background · title · venue name · address with Maps pin ·
   date/time · large venue photo
   ================================================================ */

function VenueLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section className="bg-cream py-12 px-6 text-center">
      {/* Title */}
      <EditableText
        value={data.locationTitle}
        onChange={(v) => updateField('locationTitle', v)}
        as="h2"
        className="text-sm font-playfair uppercase tracking-[0.35em] text-charcoal mb-8"
      />

      {/* Venue name */}
      <EditableText
        value={data.venueName}
        onChange={(v) => updateField('venueName', v)}
        as="p"
        className="text-lg font-playfair text-charcoal/80 italic mb-2"
      />

      {/* Address + Maps link */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <EditableText
          value={data.venueAddress}
          onChange={(v) => updateField('venueAddress', v)}
          as="p"
          className="text-xs font-playfair text-charcoal/50"
        />
        {!isEditMode && (
          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            title="Open in Google Maps"
          >
            <GoogleMapsPinIcon />
          </a>
        )}
      </div>

      {/* Date / Time */}
      <EditableText
        value={data.venueDateTime}
        onChange={(v) => updateField('venueDateTime', v)}
        as="p"
        className="text-xs font-playfair text-charcoal/40 mb-8"
      />

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
