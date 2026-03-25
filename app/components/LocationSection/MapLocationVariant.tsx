'use client';

import EditableText from '../EditableText';
import EditableImage from '../EditableImage';
import { useInvitation } from '../../context/InvitationContext';
import LottieAnimation from './LottieAnimation';

export default function MapLocationVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  return (
    <section
      className="py-10 px-6 text-center"
      style={{ backgroundColor: data.locationBgColor, color: data.locationTextColor }}
    >
      {/* Ceremony Section */}
      {data.enableCeremony && (
        <div className="mb-12">
          <LottieAnimation src="/wedding-rings.json" className="w-16 h-16 mx-auto mb-4" color={data.locationTextColor} />

          <EditableText
            value={data.locationCeremonyTitle}
            onChange={(v) => updateField('locationCeremonyTitle', v)}
            as="h2"
            className="text-lg font-playfair uppercase tracking-[0.3em] mb-5"
          />

          <EditableText
            value={data.venueAddress}
            onChange={(v) => updateField('venueAddress', v)}
            as="p"
            className="text-xs font-playfair leading-relaxed max-w-[260px] mx-auto mb-6"
            style={{ opacity: 0.7 }}
          />

          {data?.locationImageUrl ||
            (isEditMode && (
              <div className="w-full max-w-[300px] mx-auto aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-6">
                <EditableImage
                  src={data.locationImageUrl}
                  onChange={(url) => updateField('locationImageUrl', url)}
                  className="w-full h-full"
                />
              </div>
            ))}

          {isEditMode ? (
            <div className="space-y-2">
              <label className="text-[10px] font-playfair block" style={{ opacity: 0.4, color: data.locationTextColor }}>
                Ceremony Google Maps URL:
              </label>
              <input
                type="url"
                value={data.googleMapsUrl}
                onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full max-w-[300px] mx-auto border rounded px-3 py-2 text-xs font-playfair focus:outline-none"
                style={{
                  backgroundColor: `${data.locationTextColor}1A`,
                  borderColor: `${data.locationTextColor}33`,
                  color: data.locationTextColor,
                }}
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
        </div>
      )}

      {/* Reception Section */}
      {data.enableReception && (
        <div>
          <LottieAnimation src="/cheers-celebrations.json" className="w-16 h-16 mx-auto mb-4" color={data.locationTextColor} />

          <EditableText
            value={data.locationReceptionTitle}
            onChange={(v) => updateField('locationReceptionTitle', v)}
            as="h2"
            className="text-lg font-playfair uppercase tracking-[0.3em] mb-5"
          />

          <EditableText
            value={data.venueAddress}
            onChange={(v) => updateField('venueAddress', v)}
            as="p"
            className="text-xs font-playfair leading-relaxed max-w-[260px] mx-auto mb-6"
            style={{ opacity: 0.7 }}
          />

          {isEditMode ? (
            <div className="space-y-2">
              <label className="text-[10px] font-playfair block" style={{ opacity: 0.4, color: data.locationTextColor }}>
                Reception Google Maps URL:
              </label>
              <input
                type="url"
                value={data.receptionGoogleMapsUrl}
                onChange={(e) => updateField('receptionGoogleMapsUrl', e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full max-w-[300px] mx-auto border rounded px-3 py-2 text-xs font-playfair focus:outline-none"
                style={{
                  backgroundColor: `${data.locationTextColor}1A`,
                  borderColor: `${data.locationTextColor}33`,
                  color: data.locationTextColor,
                }}
              />
            </div>
          ) : (
            <a
              href={data.receptionGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 px-6 py-3 tracking-[0.2em] font-playfair text-xs uppercase transition-all"
              style={{ borderColor: `${data.locationTextColor}99`, color: data.locationTextColor }}
            >
              GET DIRECTIONS
            </a>
          )}
        </div>
      )}
    </section>
  );
}
