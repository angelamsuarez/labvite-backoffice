'use client';

import { useRef, useState } from 'react';
import { useInvitation } from './InvitationContext';
import DateScheduleSection from './DateScheduleSection';
import LocationSection from './LocationSection';
import DressCodeSection from './DressCodeSection';
import EditableText from './EditableText';
import Image from 'next/image';
import { ImageIcon } from './icons';

/* ── Polaroid photo card ─────────────────────────────────────── */

const POLAROID_STYLES = [
  { top: '8%', right: '2%', rotate: '18deg', w: 100, h: 120, imgH: 80 },
  { top: '35%', right: '-5%', rotate: '30deg', w: 95, h: 115, imgH: 76 },
  { bottom: '10%', right: '5%', rotate: '40deg', w: 90, h: 110, imgH: 72 },
];

type PhotoField = 'detailsPhoto1' | 'detailsPhoto2' | 'detailsPhoto3';
const PHOTO_FIELDS: PhotoField[] = ['detailsPhoto1', 'detailsPhoto2', 'detailsPhoto3'];

function PolaroidCard({
  src,
  style,
  onUpload,
  onRemove,
  isEditMode,
}: {
  src: string;
  style: typeof POLAROID_STYLES[number];
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
  isEditMode: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const posStyle: React.CSSProperties = {
    transform: `rotate(${style.rotate})`,
    width: style.w,
    height: style.h,
  };
  if ('top' in style && style.top) posStyle.top = style.top;
  if ('bottom' in style && style.bottom) posStyle.bottom = style.bottom;
  posStyle.right = style.right;

  return (
    <div
      className={`absolute bg-white shadow-lg rounded-sm ${isEditMode ? 'cursor-pointer z-10' : 'pointer-events-none'}`}
      style={posStyle}
      onClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          fileRef.current?.click();
        }
      }}
    >
      <div className="m-[6px] rounded-sm overflow-hidden" style={{ height: style.imgH }}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#4A3728]/60 to-[#6B5443]/60 flex items-center justify-center">
            {isEditMode && <ImageIcon className="w-5 h-5 text-white/60" />}
          </div>
        )}
      </div>
      <div style={{ height: style.h - style.imgH - 12 }} />

      {/* Remove button */}
      {isEditMode && src && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 shadow-md z-20"
        >
          ×
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

/* ── Edit-mode polaroid slot (simple grid card) ──────────── */

function PolaroidSlot({
  src,
  label,
  onUpload,
  onRemove,
}: {
  src: string;
  label: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-sm cursor-pointer" style={{ width: 90, height: 110 }}>
      <div
        className="m-[5px] rounded-sm overflow-hidden"
        style={{ height: 72 }}
        onClick={() => fileRef.current?.click()}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#4A3728]/40 to-[#6B5443]/40 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white/60" />
          </div>
        )}
      </div>
      <p className="text-[8px] text-center text-gray-400 mt-1">{label}</p>

      {src && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 shadow-md z-20"
        >
          ×
        </button>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

/* ── Polaroid cards container ────────────────────────────── */

function PolaroidCards() {
  const { data, updateField, isEditMode } = useInvitation();

  const allCards = PHOTO_FIELDS.map((field, i) => ({
    field,
    src: data[field] as string,
    style: POLAROID_STYLES[i],
  }));

  /* Edit mode → simple horizontal row, each card independently clickable */
  if (isEditMode) {
    return (
      <div className="flex items-center justify-center gap-3 mb-4">
        {allCards.map((card, i) => (
          <PolaroidSlot
            key={card.field}
            src={card.src}
            label={`Photo ${i + 1}`}
            onUpload={(url) => updateField(card.field, url)}
            onRemove={() => updateField(card.field, '')}
          />
        ))}
      </div>
    );
  }

  /* Preview mode → fanned absolute layout */
  const visibleCards = allCards.filter((c) => c.src);
  if (visibleCards.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0">
      {visibleCards.map((card) => (
        <PolaroidCard
          key={card.field}
          src={card.src}
          style={card.style}
          isEditMode={false}
          onUpload={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
}

/* ── Main DetailsSection ───────────────────────────────────── */

export default function DetailsSection() {
  const { data, updateField, isEditMode } = useInvitation();
  const [isOpen, setIsOpen] = useState(false);

  if (!data.enableDetails) return null;

  return (
    <>
      {/* Inline details section — decorative frame + polaroids */}
      <section
        className="relative py-16 px-6 overflow-hidden"
        style={{ backgroundColor: data.detailsBgColor, color: data.detailsTextColor }}
      >
        <div className="relative max-w-[320px] mx-auto">
          {/* In edit mode: polaroid slots shown as a row ABOVE the frame */}
          {isEditMode && <PolaroidCards />}

          {/* SVG frame with text */}
          <div
            className={`relative group transition-transform duration-300 ${!isEditMode ? 'cursor-pointer hover:scale-[1.03]' : ''}`}
            onClick={() => !isEditMode && setIsOpen(true)}
          >
            {/* In preview mode: fanned polaroids behind the frame */}
            {!isEditMode && <PolaroidCards />}

            <div className="relative mx-auto w-[200px] h-[200px]">
              <Image
                src="/details-frame.svg"
                alt=""
                width={200}
                height={200}
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))' }}
                priority
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div onClick={(e) => isEditMode && e.stopPropagation()}>
                  <EditableText
                    value={data.detailsButtonText || 'The Details'}
                    onChange={(v) => updateField('detailsButtonText', v)}
                    as="p"
                    className="font-script text-3xl text-[#8B6B5A] mb-1"
                  />
                </div>
                {!isEditMode && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#A89880] font-playfair">
                    CLICK HERE
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In EDIT mode: show grouped detail sub-sections inline (no modal) */}
      {isEditMode && (
        <div>
          {data.enableSchedule && data.detailsIncludeSchedule && <DateScheduleSection />}
          {data.enableLocation && data.detailsIncludeLocation && <LocationSection />}
          {data.enableDressCode && data.detailsIncludeDressCode && <DressCodeSection />}
        </div>
      )}

      {/* In PREVIEW mode: full screen modal on click */}
      {!isEditMode && isOpen && (
        <div
          className="fixed inset-0 z-[150] overflow-y-auto"
          style={{ backgroundColor: data.detailsBgColor }}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="fixed top-5 left-5 z-[201] flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-lg rounded-full pl-3 pr-5 py-2.5 text-charcoal hover:bg-white transition-all hover:shadow-xl font-playfair text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="max-w-[420px] mx-auto py-16 px-4">
            <div className="invitation-card w-full overflow-hidden rounded-lg">
              {data.enableSchedule && data.detailsIncludeSchedule && <DateScheduleSection />}
              {data.enableLocation && data.detailsIncludeLocation && <LocationSection />}
              {data.enableDressCode && data.detailsIncludeDressCode && <DressCodeSection />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
