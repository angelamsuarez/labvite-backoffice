'use client';

import { useRef, useState } from 'react';
import { useInvitation, COLOR_PALETTE, type InvitationData } from './InvitationContext';
import { GridIcon, CloseIcon, HeartIcon, CircleEllipseIcon, MapPinIcon } from './icons';

/* ================================================================
   STYLE DRAWER
   Always-open side panel (left) with variant selectors.
   Visible only in edit mode. Does NOT close on outside click.
   ================================================================ */

export default function StyleDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const { isEditMode, data, updateField } = useInvitation();

  if (!isEditMode) return null;

  return (
    <>
      {/* ── Toggle button (visible when drawer is closed) ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-5 py-2.5 flex items-center gap-2.5 text-charcoal hover:bg-white transition-all hover:shadow-xl font-playfair text-sm"
        >
          <GridIcon />
          Styles
        </button>
      )}

      {/* ── Drawer panel ── */}
      <div
        className={`fixed top-0 left-0 h-full w-[340px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10 flex-shrink-0">
          <h2 className="text-base font-playfair text-charcoal tracking-wide font-semibold">
            Styles &amp; Sections
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-charcoal/5 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">

          {/* ────────── Features ────────── */}
          <SectionGroup title="Features">
            <div className="space-y-3">
           
           <Card>
              <ToggleRow label="Envelope Cover" checked={data.enableEnvelope} onChange={() => updateField('enableEnvelope', !data.enableEnvelope)} />
              {data.enableEnvelope && (
                <ColorBlock>
                  <ColorPickerRow label="Background" field="envelopeBgColor" value={data.envelopeBgColor} updateField={updateField} />
                  <ColorPickerRow label="Text" field="envelopeTextColor" value={data.envelopeTextColor} updateField={updateField} />
                </ColorBlock>
              )}
              </Card>

<Card>
              <ToggleRow label="Details Section (grouped)" checked={data.enableDetails} onChange={() => updateField('enableDetails', !data.enableDetails)} />
              {data.enableDetails && (
                <>
                  <p className="text-[10px] text-charcoal/50 font-playfair leading-snug -mt-1 ml-1">
                    Sections toggled below will appear inside the Details modal.
                  </p>
                  <div className="ml-2 space-y-2 border-l-2 border-sage/20 pl-3">
                    <ToggleRow small label="Date &amp; Schedule" checked={data.detailsIncludeSchedule} onChange={() => updateField('detailsIncludeSchedule', !data.detailsIncludeSchedule)} />
                    <ToggleRow small label="Location" checked={data.detailsIncludeLocation} onChange={() => updateField('detailsIncludeLocation', !data.detailsIncludeLocation)} />
                    <ToggleRow small label="Dress Code" checked={data.detailsIncludeDressCode} onChange={() => updateField('detailsIncludeDressCode', !data.detailsIncludeDressCode)} />
                  </div>
                  <ColorBlock>
                    <ColorPickerRow label="Background" field="detailsBgColor" value={data.detailsBgColor} updateField={updateField} />
                    <ColorPickerRow label="Text" field="detailsTextColor" value={data.detailsTextColor} updateField={updateField} />
                  </ColorBlock>
                </>
              )}
</Card>
<Card>
              <ToggleRow label="Our Story" checked={data.enableOurStory} onChange={() => updateField('enableOurStory', !data.enableOurStory)} />
              {data.enableOurStory && (
                <ColorBlock>
                  <ColorPickerRow label="Background" field="ourStoryBgColor" value={data.ourStoryBgColor} updateField={updateField} />
                  <ColorPickerRow label="Text" field="ourStoryTextColor" value={data.ourStoryTextColor} updateField={updateField} />
                </ColorBlock>
              )}
               </Card>
            </div>
           
          </SectionGroup>

          {/* ────────── Header ────────── */}
          <SectionGroup title="Header">
            <div className="grid grid-cols-4 gap-2">
              <VariantButton active={data.headerVariant === 'classic'} onClick={() => updateField('headerVariant', 'classic')} label="Classic">
                <ClassicThumb />
              </VariantButton>
              <VariantButton active={data.headerVariant === 'triptych'} onClick={() => updateField('headerVariant', 'triptych')} label="Triptych">
                <TriptychThumb />
              </VariantButton>
              <VariantButton active={data.headerVariant === 'bold'} onClick={() => updateField('headerVariant', 'bold')} label="Bold">
                <BoldThumb />
              </VariantButton>
              <VariantButton active={data.headerVariant === 'minimal'} onClick={() => updateField('headerVariant', 'minimal')} label="Minimal">
                <MinimalThumb />
              </VariantButton>
            </div>
            <SectionColors bgField="headerBgColor" textField="headerTextColor" bgValue={data.headerBgColor} textValue={data.headerTextColor} updateField={updateField} />
          </SectionGroup>

          {/* ────────── Date & Schedule ────────── */}
          <SectionGroup title="Date &amp; Schedule">
            <ToggleRow label="Show section" checked={data.enableSchedule} onChange={() => updateField('enableSchedule', !data.enableSchedule)} />
            {data.enableSchedule && (
              <>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <VariantButton active={data.saveDateVariant === 'calendar'} onClick={() => updateField('saveDateVariant', 'calendar')} label="Calendar">
                    <CalendarThumb />
                  </VariantButton>
                  <VariantButton active={data.saveDateVariant === 'schedule'} onClick={() => updateField('saveDateVariant', 'schedule')} label="Schedule">
                    <ScheduleThumb />
                  </VariantButton>
                  <VariantButton active={data.saveDateVariant === 'hearts'} onClick={() => updateField('saveDateVariant', 'hearts')} label="Hearts">
                    <HeartsThumb />
                  </VariantButton>
                  <VariantButton active={data.saveDateVariant === 'circle'} onClick={() => updateField('saveDateVariant', 'circle')} label="Circle">
                    <CircleThumb />
                  </VariantButton>
                </div>
                <SectionColors bgField="dateBgColor" textField="dateTextColor" bgValue={data.dateBgColor} textValue={data.dateTextColor} updateField={updateField} />
              </>
            )}
          </SectionGroup>

          {/* ────────── Location ────────── */}
          <SectionGroup title="Location">
            <ToggleRow label="Show section" checked={data.enableLocation} onChange={() => updateField('enableLocation', !data.enableLocation)} />
            {data.enableLocation && (
              <>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <VariantButton active={data.locationVariant === 'venue'} onClick={() => updateField('locationVariant', 'venue')} label="Venue">
                    <VenueThumb />
                  </VariantButton>
                  <VariantButton active={data.locationVariant === 'map'} onClick={() => updateField('locationVariant', 'map')} label="Map">
                    <MapThumb />
                  </VariantButton>
                </div>
                <SectionColors bgField="locationBgColor" textField="locationTextColor" bgValue={data.locationBgColor} textValue={data.locationTextColor} updateField={updateField} />
              </>
            )}
          </SectionGroup>

          {/* ────────── Dress Code ────────── */}
          <SectionGroup title="Dress Code">
            <ToggleRow label="Show section" checked={data.enableDressCode} onChange={() => updateField('enableDressCode', !data.enableDressCode)} />
            {data.enableDressCode && (
              <>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <VariantButton active={data.dressCodeVariant === 'pastel'} onClick={() => updateField('dressCodeVariant', 'pastel')} label="Pastel">
                    <PastelDressThumb />
                  </VariantButton>
                  <VariantButton active={data.dressCodeVariant === 'clean'} onClick={() => updateField('dressCodeVariant', 'clean')} label="Clean">
                    <CleanDressThumb />
                  </VariantButton>
                  <VariantButton active={data.dressCodeVariant === 'dark'} onClick={() => updateField('dressCodeVariant', 'dark')} label="Dark">
                    <DarkDressThumb />
                  </VariantButton>
                </div>
                <SectionColors bgField="dressBgColor" textField="dressTextColor" bgValue={data.dressBgColor} textValue={data.dressTextColor} updateField={updateField} />
              </>
            )}
          </SectionGroup>

          {/* ────────── RSVP ────────── */}
          <SectionGroup title="RSVP">
            <ToggleRow label="Show section" checked={data.enableRsvp} onChange={() => updateField('enableRsvp', !data.enableRsvp)} />
            {data.enableRsvp && (
              <>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <VariantButton active={data.rsvpVariant === 'dark'} onClick={() => updateField('rsvpVariant', 'dark')} label="Dark">
                    <RSVPDarkThumb />
                  </VariantButton>
                  <VariantButton active={data.rsvpVariant === 'light'} onClick={() => updateField('rsvpVariant', 'light')} label="Light">
                    <RSVPLightThumb />
                  </VariantButton>
                </div>
                <SectionColors bgField="rsvpBgColor" textField="rsvpTextColor" bgValue={data.rsvpBgColor} textValue={data.rsvpTextColor} updateField={updateField} />
              </>
            )}
          </SectionGroup>

        </div>
      </div>
    </>
  );
}

/* ── Shared sub-components ──────────────────────────────────── */

function SectionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-6 border-b border-charcoal/10 last:border-b-0 last:pb-0">
      <h3 className="text-[12px] uppercase tracking-[0.25em] text-charcoal font-playfair mb-3 font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function VariantButton({ active, onClick, label, children }: { active: boolean; onClick?: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'opacity-100' : 'opacity-40 hover:opacity-75'}`}
    >
      <div className={`w-full aspect-[5/6] rounded-md border-2 transition-colors overflow-hidden ${active ? 'border-sage shadow-sm' : 'border-charcoal/10'}`}>
        {children}
      </div>
      <span className="text-[10px] font-playfair text-charcoal/70">{label}</span>
    </button>
  );
}

/* ── Toggle row ────────────────────────────────────────────── */

function ToggleRow({ label, checked, onChange, small }: { label: string; checked: boolean; onChange: () => void; small?: boolean }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className={`${small ? 'text-[10px]' : 'text-xs'} font-playfair text-charcoal/70`}>{label}</span>
      <button
        onClick={onChange}
        className={`relative ${small ? 'w-9 h-5' : 'w-11 h-6'} rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-sage' : 'bg-charcoal/20'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 ${small ? 'w-4 h-4' : 'w-5 h-5'} bg-white rounded-full transition-transform ${
            checked ? (small ? 'translate-x-4' : 'translate-x-5') : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}


function Card({ backgroundColor, children }: { backgroundColor?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: backgroundColor || 'rgba(28,28,28,0.05)' }}>
      {children}
    </div>
  );
}

/* ── Color block wrapper ───────────────────────────────────── */

function ColorBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-2 space-y-2.5 pb-6">
      {children}
    </div>
  );
}

/* ── Color picker row ──────────────────────────────────────── */

function ColorPickerRow({
  label,
  field,
  value,
  updateField,
}: {
  label: string;
  field: keyof InvitationData;
  value: string;
  updateField: <K extends keyof InvitationData>(f: K, v: InvitationData[K]) => void;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-playfair text-charcoal/50">{label}</span>
      <div className="flex gap-1.5 flex-wrap items-center">
        {COLOR_PALETTE.map((c) => {
          const isSelected = c.value === value;
          return (
            <div key={c.value} className={`inline-flex rounded-full p-[2px] transition-all ${isSelected && 'bg-sage scale-110' }`}>
              <button
                onClick={() => updateField(field, c.value as never)}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                  isSelected ? 'border-white' : 'border-charcoal/15 hover:border-charcoal/30'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            </div>
          );
        })}
        {/* Show custom color circle if a custom color is selected */}
        {(() => {
          const isCustomColor = !COLOR_PALETTE.some((c) => c.value === value);
          if (!isCustomColor) return null;
          const isSelected = true; // Always selected when this circle appears
          return (
            <div className={`inline-flex rounded-full p-[2px] transition-all ${isSelected ? 'bg-sage scale-110' : 'bg-white'}`}>
              <button
                onClick={() => colorInputRef.current?.click()}
                className="w-6 h-6 rounded-full border-2 border-white transition-all cursor-pointer"
                style={{ backgroundColor: value }}
                title="Selected custom color"
              />
            </div>
          );
        })()}
        {/* Custom color picker - always show "+" button */}
        <button
          onClick={() => colorInputRef.current?.click()}
          className="relative w-6 h-6 rounded-full border-2 border-dashed border-charcoal/25 hover:border-charcoal/40 transition-all flex items-center justify-center cursor-pointer"
          title="Custom color"
        >
          <span className="text-[8px] text-charcoal/60 font-bold">+</span>
        </button>
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={(e) => updateField(field, e.target.value as never)}
          className="sr-only"
        />
      </div>
    </div>
  );
}

function SectionColors({
  bgField,
  textField,
  bgValue,
  textValue,
  updateField,
}: {
  bgField: keyof InvitationData;
  textField: keyof InvitationData;
  bgValue: string;
  textValue: string;
  updateField: <K extends keyof InvitationData>(f: K, v: InvitationData[K]) => void;
}) {
  return (
    <div className="mt-3 space-y-3">
      <ColorPickerRow label="Background" field={bgField} value={bgValue} updateField={updateField} />
      <ColorPickerRow label="Text" field={textField} value={textValue} updateField={updateField} />
    </div>
  );
}

/* ── Header thumbnails ──────────────────────────────────────── */

function ClassicThumb() {
  return (
    <div className="w-full h-full bg-cream flex items-center justify-center p-1.5">
      <div className="w-full h-full border border-charcoal/20 p-[3px] flex flex-col items-center justify-center gap-[3px]">
        <div className="text-[5px] text-charcoal/40 font-playfair">C &amp; M</div>
        <div className="w-[70%] aspect-square bg-charcoal/10 rounded-sm" />
        <div className="w-[55%] h-[2px] bg-charcoal/15 rounded-full" />
      </div>
    </div>
  );
}

function TriptychThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-[3px] p-1.5">
      <div className="text-[5px] text-charcoal/40 font-handwritten">n + n</div>
      <div className="flex gap-[2px] w-full px-0.5">
        <div className="flex-1 aspect-[3/4] bg-charcoal/10 rounded-sm" />
        <div className="flex-1 aspect-[3/4] bg-charcoal/15 rounded-sm" />
        <div className="flex-1 aspect-[3/4] bg-charcoal/10 rounded-sm" />
      </div>
    </div>
  );
}

function BoldThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col">
      <div className="flex-1 bg-charcoal/20" />
      <div className="py-1.5 flex items-center justify-center">
        <div className="w-[75%] h-[2px] bg-charcoal/20 rounded-full" />
      </div>
    </div>
  );
}

function MinimalThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="w-[40%] h-[2px] bg-sage/30 rounded-full" />
      <div className="text-[5px] text-charcoal/50 font-playfair font-bold">A &amp; S</div>
    </div>
  );
}

/* ── Date & Schedule thumbnails ─────────────────────────────── */

function CalendarThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[5px] text-charcoal/40 font-playfair uppercase tracking-wider">Dec</div>
      <div className="flex gap-[1px]">
        {[16, 17, 18, 19, 20].map((d) => (
          <div key={d} className={`w-[7px] h-[7px] rounded-[1px] text-[3px] flex items-center justify-center font-playfair ${d === 18 ? 'bg-charcoal/20 text-charcoal/80 font-bold' : 'text-charcoal/30'}`}>{d}</div>
        ))}
      </div>
      <div className="w-px h-2 border-l border-dotted border-charcoal/25" />
      <div className="text-[4px] font-script text-charcoal/30">save the date</div>
    </div>
  );
}

function ScheduleThumb() {
  return (
    <div className="w-full h-full bg-charcoal flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[4px] text-white/40 font-playfair uppercase tracking-wider">Schedule</div>
      <div className="flex gap-[3px] mt-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-[1px]">
            <div className="text-[5px] text-white/60 font-playfair font-semibold">{i}:00</div>
            <div className="w-[2px] h-[2px] rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeartsThumb() {
  return (
    <div className="w-full h-full bg-cream flex items-center justify-center p-2">
      <div className="relative flex flex-col items-start gap-[6px]">
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-burgundy/20" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[4px] relative z-10">
            <HeartIcon className="w-[7px] h-[7px] text-burgundy/60" />
            <div className="w-[14px] h-[2px] bg-charcoal/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CircleThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[2px] p-2">
      <div className="flex items-end gap-[2px]">
        <span className="text-[8px] text-charcoal/20 font-playfair">4</span>
        <div className="relative">
          <span className="text-[12px] text-charcoal/60 font-playfair font-bold">5</span>
          <CircleEllipseIcon className="absolute inset-0 w-full h-full" />
        </div>
        <span className="text-[8px] text-charcoal/20 font-playfair">6</span>
      </div>
      <div className="text-[4px] font-script text-charcoal/30">save our date!</div>
    </div>
  );
}

/* ── Location thumbnails ────────────────────────────────────── */

function VenueThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[4px] text-charcoal/40 font-playfair uppercase tracking-wider">Ceremony</div>
      <div className="text-[4px] text-charcoal/30 font-playfair italic">Venue Name</div>
      <div className="w-[70%] aspect-[4/3] bg-charcoal/10 rounded-sm mt-[2px]" />
    </div>
  );
}

function MapThumb() {
  return (
    <div className="w-full h-full bg-sage-dark flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[4px] text-white/50 font-playfair uppercase tracking-wider">Location</div>
      <div className="w-[70%] aspect-[4/3] bg-white/10 rounded-sm flex items-center justify-center">
        <MapPinIcon className="w-[10px] h-[10px] text-white/30" />
      </div>
      <div className="w-[60%] h-[3px] border border-white/20 rounded-sm mt-[1px]" />
    </div>
  );
}

/* ── Dress Code thumbnails ──────────────────────────────────── */

function PastelDressThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] font-script text-charcoal/30">Dress Code</div>
      <div className="flex gap-[3px]">
        {['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'].map((c) => (
          <div key={c} className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function CleanDressThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] font-script text-charcoal/30">Dress Code</div>
      <div className="flex gap-[3px]">
        {['#E8E0D4', '#8C8C8C', '#5C4033'].map((c) => (
          <div key={c} className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function DarkDressThumb() {
  return (
    <div className="w-full h-full bg-sage-dark flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] text-white/40 font-playfair uppercase tracking-wider">Dress</div>
      <div className="flex gap-[2px]">
        {['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'].map((c) => (
          <div key={c} className="w-[8px] h-[5px] rounded-[1px]" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

/* ── RSVP thumbnails ────────────────────────────────────────── */

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
