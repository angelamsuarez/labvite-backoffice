'use client';

import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { useInvitation } from '../../context/InvitationContext';
import { GoogleMapsPinIcon } from '../../icons';
import LottieAnimation from './LottieAnimation';
import ContentWrapper from './ContentWrapper';

export default function VenueLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section
      className="text-center"
      style={{ backgroundColor: data.locationBgColor, color: data.locationTextColor }}
    >
      {/* Ceremony Section */}
      {data.enableCeremony && (
        <ContentWrapper>
          <LottieAnimation src="/wedding-rings.json" className="w-16 h-16 mx-auto mb-4" color={data.locationTextColor} />

          <EditableText
            value={data.locationCeremonyTitle}
            onChange={(v) => updateField('locationCeremonyTitle', v)}
            as="h2"
            className="text-sm font-playfair uppercase tracking-[0.35em] mb-8"
          />

          <EditableText
            value={data.venueName}
            onChange={(v) => updateField('venueName', v)}
            as="p"
            className="text-lg font-playfair italic mb-2"
            style={{ opacity: 0.8 }}
          />

          {isEditMode ? (
            <div className="flex items-center justify-center gap-2 mb-3 w-full">
              <EditableText
                value={data.venueAddress}
                onChange={(v) => updateField('venueAddress', v)}
                as="p"
                className="text-xs font-playfair"
                style={{ opacity: 0.5 }}
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
                className="text-xs font-playfair"
                style={{ opacity: 0.5 }}
              />
              <GoogleMapsPinIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          )}

          {data?.locationImageUrl ||
            (isEditMode && (
              <div className="w-full max-w-[360px] mx-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <EditableImage
                  src={data.locationImageUrl}
                  onChange={(url) => updateField('locationImageUrl', url)}
                  className="w-full h-full"
                />
              </div>
            ))}

          {isEditMode && (
            <div className="mt-6 space-y-2">
              <label className="text-[10px] text-charcoal/40 font-playfair block" style={{ color: data.locationTextColor }}>
                Ceremony Google Maps URL:
              </label>
              <input
                type="url"
                value={data.googleMapsUrl}
                onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full max-w-[300px] mx-auto bg-white border border-charcoal/15 rounded px-3 py-2 text-charcoal/70 placeholder-charcoal/25 text-xs font-playfair focus:outline-none focus:border-sage"
              />
            </div>
          )}
        </ContentWrapper>
      )}

      {/* Reception Section */}
      {data.enableReception && (
        <ContentWrapper>
          <LottieAnimation src="/cheers-celebrations.json" className="w-16 h-16 mx-auto mb-4" color={data.locationTextColor} />

          <EditableText
            value={data.locationReceptionTitle}
            onChange={(v) => updateField('locationReceptionTitle', v)}
            as="h2"
            className="text-sm font-playfair uppercase tracking-[0.35em] mb-8"
          />

          <EditableText
            value={data.venueName}
            onChange={(v) => updateField('venueName', v)}
            as="p"
            className="text-lg font-playfair italic mb-2"
            style={{ opacity: 0.8 }}
          />

          {isEditMode ? (
            <div className="flex items-center justify-center gap-2 mb-3 w-full">
              <EditableText
                value={data.venueAddress}
                onChange={(v) => updateField('venueAddress', v)}
                as="p"
                className="text-xs font-playfair"
                style={{ opacity: 0.5 }}
              />
              <div className="flex-shrink-0">
                <GoogleMapsPinIcon />
              </div>
            </div>
          ) : (
            <a
              href={data.receptionGoogleMapsUrl}
              target="_blank"
              className="flex items-center justify-center gap-2 mb-3 hover:opacity-70 transition-opacity"
              title="Open in Google Maps"
            >
              <EditableText
                value={data.venueAddress}
                onChange={(v) => updateField('venueAddress', v)}
                as="p"
                className="text-xs font-playfair"
                style={{ opacity: 0.5 }}
              />
              <GoogleMapsPinIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          )}

          {isEditMode && (
            <div className="mt-6 space-y-2">
              <label className="text-[10px] text-charcoal/40 font-playfair block" style={{ color: data.locationTextColor }}>
                Reception Google Maps URL:
              </label>
              <input
                type="url"
                value={data.receptionGoogleMapsUrl}
                onChange={(e) => updateField('receptionGoogleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full max-w-[300px] mx-auto bg-white border border-charcoal/15 rounded px-3 py-2 text-charcoal/70 placeholder-charcoal/25 text-xs font-playfair focus:outline-none focus:border-sage"
              />
            </div>
          )}
        </ContentWrapper>
      )}
    </section>
  );
}
