'use client';

import { useState } from 'react';
import EditableText from './EditableText';
import { useInvitation } from './InvitationContext';

/* ================================================================
   RSVP SECTION
   Supports family invitations: the host sets maxGuests (in edit
   mode), and each guest fills in their name + attending status.
   A comments field lets the guest add dietary restrictions or notes
   like "I'll attend but X from my family won't".
   ================================================================ */

interface GuestRow {
  name: string;
  attending: 'yes' | 'no' | null;
}

export default function RSVPSection() {
  const { data } = useInvitation();

  switch (data.rsvpVariant) {
    case 'dark':
      return <DarkRsvp />;
    case 'light':
      return <LightRsvp />;
    default:
      return <DarkRsvp />;
  }
}

/* ── Shared form logic hook ────────────────────────────────── */

function useRsvpForm(maxGuests: number) {
  const [guests, setGuests] = useState<GuestRow[]>(() =>
    Array.from({ length: maxGuests }, () => ({ name: '', attending: null })),
  );
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const updateGuest = (index: number, updates: Partial<GuestRow>) => {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, ...updates } : g)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, POST to your backend here.
    // For now, just show the thank-you message.
    setSubmitted(true);
  };

  return { guests, comments, setComments, updateGuest, submitted, handleSubmit };
}

/* ================================================================
   VARIANT 1  –  Dark
   Dark charcoal background · centred form · family guest rows
   ================================================================ */

function DarkRsvp() {
  const { data, isEditMode, updateField } = useInvitation();
  const form = useRsvpForm(data.maxGuests);

  return (
    <section className="py-16 px-8 text-center" style={{ backgroundColor: data.rsvpBgColor, color: data.rsvpTextColor }}>
      {/* Title */}
      <EditableText
        value={data.rsvpTitle}
        onChange={(v) => updateField('rsvpTitle', v)}
        as="h2"
        className="text-5xl font-playfair mb-3 tracking-wide"
      />

      {/* Subtitle */}
      <EditableText
        value={data.rsvpSubtitle}
        onChange={(v) => updateField('rsvpSubtitle', v)}
        as="p"
        className="text-xl font-script mb-3" style={{ opacity: 0.7 }}
      />

      {/* Deadline */}
      <p className="text-xs font-playfair mb-10" style={{ opacity: 0.4 }}>
        Let us know by{' '}
        <EditableText
          value={data.rsvpDeadline}
          onChange={(v) => updateField('rsvpDeadline', v)}
          as="span"
          className="" style={{ opacity: 0.6 }}
        />
      </p>

      {/* Max guests editor (host only) */}
      {isEditMode && (
        <div className="mb-6 flex items-center justify-center gap-3">
          <label className="text-xs font-playfair" style={{ opacity: 0.5 }}>Max guests per invite:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={data.maxGuests}
            onChange={(e) => updateField('maxGuests', Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 border rounded px-2 py-1 text-center text-sm font-playfair focus:outline-none" style={{ backgroundColor: `${data.rsvpTextColor}1A`, borderColor: `${data.rsvpTextColor}33`, color: data.rsvpTextColor }}
          />
        </div>
      )}

      {/* Thank-you message */}
      {form.submitted && !isEditMode ? (
        <div className="py-8">
          <p className="text-3xl font-script text-white">Thank you!</p>
          <p className="text-white/60 mt-3 font-playfair text-sm">
            Your response has been recorded.
          </p>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit} className="max-w-[320px] mx-auto space-y-5">
          {/* Guest rows */}
          {form.guests.map((guest, i) => (
            <div key={i} className="border rounded-lg p-4 text-left space-y-3" style={{ borderColor: `${data.rsvpTextColor}25` }}>
              <p className="text-[10px] font-playfair uppercase tracking-wider" style={{ opacity: 0.4 }}>
                Guest {i + 1} of {data.maxGuests}
              </p>
              {isEditMode ? (
                <div className="border px-4 py-3" style={{ borderColor: `${data.rsvpTextColor}4D` }}>
                  <EditableText
                    value={data.rsvpNameLabel}
                    onChange={(v) => updateField('rsvpNameLabel', v)}
                    as="span"
                    className="text-sm font-playfair" style={{ opacity: 0.5 }}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder={data.rsvpNameLabel}
                  value={guest.name}
                  onChange={(e) => form.updateGuest(i, { name: e.target.value })}
                  className="w-full bg-transparent border px-4 py-3 outline-none transition-colors font-playfair text-sm rounded"
                  style={{ borderColor: `${data.rsvpTextColor}40`, color: data.rsvpTextColor }}
                />
              )}

              {/* Attending radios */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: guest.attending === 'yes' ? data.rsvpTextColor : `${data.rsvpTextColor}4D` }}
                    onClick={() => !isEditMode && form.updateGuest(i, { attending: 'yes' })}
                  >
                    {guest.attending === 'yes' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.rsvpTextColor }} />}
                  </div>
                  {i === 0 ? (
                    <EditableText
                      value={data.rsvpAttendingLabel}
                      onChange={(v) => updateField('rsvpAttendingLabel', v)}
                      as="span"
                      className="text-xs font-playfair" style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <span className="text-xs font-playfair" style={{ opacity: 0.8 }}>{data.rsvpAttendingLabel}</span>
                  )}
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: guest.attending === 'no' ? data.rsvpTextColor : `${data.rsvpTextColor}4D` }}
                    onClick={() => !isEditMode && form.updateGuest(i, { attending: 'no' })}
                  >
                    {guest.attending === 'no' && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.rsvpTextColor }} />}
                  </div>
                  {i === 0 ? (
                    <EditableText
                      value={data.rsvpNotAttendingLabel}
                      onChange={(v) => updateField('rsvpNotAttendingLabel', v)}
                      as="span"
                      className="text-xs font-playfair" style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <span className="text-xs font-playfair" style={{ opacity: 0.8 }}>{data.rsvpNotAttendingLabel}</span>
                  )}
                </label>
              </div>
            </div>
          ))}

          {/* Comments / dietary restrictions */}
          <div className="text-left space-y-2">
            <EditableText
              value={data.rsvpCommentsLabel}
              onChange={(v) => updateField('rsvpCommentsLabel', v)}
              as="p"
              className="text-sm font-playfair" style={{ opacity: 0.7 }}
            />
            {isEditMode ? (
              <div className="border rounded px-4 py-3 min-h-[80px]" style={{ borderColor: `${data.rsvpTextColor}40` }}>
                <EditableText
                  value={data.rsvpCommentsPlaceholder}
                  onChange={(v) => updateField('rsvpCommentsPlaceholder', v)}
                  as="span"
                  className="text-sm font-playfair" style={{ opacity: 0.3 }}
                />
              </div>
            ) : (
              <textarea
                placeholder={data.rsvpCommentsPlaceholder}
                value={form.comments}
                onChange={(e) => form.setComments(e.target.value)}
                rows={3}
                className="w-full bg-transparent border rounded px-4 py-3 outline-none transition-colors font-playfair text-sm resize-none"
                style={{ borderColor: `${data.rsvpTextColor}40`, color: data.rsvpTextColor }}
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isEditMode}
            className={`w-full border py-3 tracking-[0.2em] font-playfair text-sm transition-all rounded ${
              isEditMode
                ? 'cursor-default'
                : 'cursor-pointer'
            }`}
            style={{ borderColor: `${data.rsvpTextColor}80`, color: data.rsvpTextColor, opacity: isEditMode ? 0.5 : 1 }}
          >
            <EditableText
              value={data.rsvpButtonText}
              onChange={(v) => updateField('rsvpButtonText', v)}
              as="span"
              className="font-semibold"
            />
          </button>
        </form>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 2  –  Light
   Cream/beige background · split layout (info left, form right)
   Collapses to stacked on mobile.
   ================================================================ */

function LightRsvp() {
  const { data, isEditMode, updateField } = useInvitation();
  const form = useRsvpForm(data.maxGuests);

  return (
    <section className="py-14 px-6" style={{ backgroundColor: data.rsvpBgColor, color: data.rsvpTextColor }}>
      <div className="max-w-[420px] mx-auto flex flex-col md:flex-row gap-8">
        {/* ── Left info panel ── */}
        <div className="md:w-2/5 text-center md:text-left flex flex-col justify-center">
          <EditableText
            value={data.rsvpTitle}
            onChange={(v) => updateField('rsvpTitle', v)}
            as="h2"
            className="text-4xl font-playfair mb-4 tracking-wide"
          />

          <p className="text-xs font-playfair leading-relaxed mb-3" style={{ opacity: 0.5 }}>
            Let us know if you&apos;re able to make it or not by{' '}
            <EditableText
              value={data.rsvpDeadline}
              onChange={(v) => updateField('rsvpDeadline', v)}
              as="span"
              className="" style={{ opacity: 0.7 }}
            />
            .
          </p>

          <EditableText
            value={data.rsvpNote}
            onChange={(v) => updateField('rsvpNote', v)}
            as="p"
            className="text-xs font-playfair italic leading-relaxed" style={{ opacity: 0.5 }}
          />

          {/* Max guests editor (host only) */}
          {isEditMode && (
            <div className="mt-5 flex items-center gap-3 justify-center md:justify-start">
              <label className="text-[10px] text-charcoal/40 font-playfair">Max guests:</label>
              <input
                type="number"
                min={1}
                max={20}
                value={data.maxGuests}
                onChange={(e) => updateField('maxGuests', Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 bg-white border border-charcoal/15 rounded px-2 py-1 text-charcoal text-center text-sm font-playfair focus:outline-none focus:border-sage"
              />
            </div>
          )}
        </div>

        {/* ── Right form panel ── */}
        <div className="md:w-3/5">
          {form.submitted && !isEditMode ? (
            <div className="py-12 text-center">
              <p className="text-3xl font-script text-charcoal">Thank you!</p>
              <p className="text-charcoal/50 mt-3 font-playfair text-sm">
                Your response has been recorded.
              </p>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit} className="space-y-4">
              {/* Guest rows */}
              {form.guests.map((guest, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-playfair text-charcoal/60 font-medium">
                      {i === 0 ? (
                        <>
                          <EditableText
                            value={data.rsvpNameLabel}
                            onChange={(v) => updateField('rsvpNameLabel', v)}
                            as="span"
                            className="text-charcoal/70"
                          />
                          <span className="text-charcoal/40 ml-1">(required)</span>
                        </>
                      ) : (
                        <>Guest {i + 1} <span className="text-charcoal/35">(optional)</span></>
                      )}
                    </p>
                  </div>

                  {isEditMode && i === 0 ? (
                    <div className="bg-white border border-charcoal/10 px-4 py-3 rounded text-charcoal/40 text-sm font-playfair">
                      First and Last Name
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="First and Last Name"
                      value={guest.name}
                      onChange={(e) => form.updateGuest(i, { name: e.target.value })}
                      className="w-full bg-white border border-charcoal/10 px-4 py-3 text-charcoal placeholder-charcoal/30 outline-none focus:border-sage transition-colors font-playfair text-sm rounded"
                    />
                  )}

                  {/* Attending */}
                  <div className="flex gap-4 py-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          guest.attending === 'yes' ? 'border-charcoal' : 'border-charcoal/25'
                        }`}
                        onClick={() => !isEditMode && form.updateGuest(i, { attending: 'yes' })}
                      >
                        {guest.attending === 'yes' && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                      </div>
                      {i === 0 ? (
                        <EditableText
                          value={data.rsvpAttendingLabel}
                          onChange={(v) => updateField('rsvpAttendingLabel', v)}
                          as="span"
                          className="text-xs font-playfair text-charcoal/70"
                        />
                      ) : (
                        <span className="text-xs font-playfair text-charcoal/70">{data.rsvpAttendingLabel}</span>
                      )}
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          guest.attending === 'no' ? 'border-charcoal' : 'border-charcoal/25'
                        }`}
                        onClick={() => !isEditMode && form.updateGuest(i, { attending: 'no' })}
                      >
                        {guest.attending === 'no' && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                      </div>
                      {i === 0 ? (
                        <EditableText
                          value={data.rsvpNotAttendingLabel}
                          onChange={(v) => updateField('rsvpNotAttendingLabel', v)}
                          as="span"
                          className="text-xs font-playfair text-charcoal/70"
                        />
                      ) : (
                        <span className="text-xs font-playfair text-charcoal/70">{data.rsvpNotAttendingLabel}</span>
                      )}
                    </label>
                  </div>
                </div>
              ))}

              {/* Separator */}
              <div className="border-t border-charcoal/8 pt-3" />

              {/* Comments / dietary restrictions */}
              <div className="space-y-1">
                <EditableText
                  value={data.rsvpCommentsLabel}
                  onChange={(v) => updateField('rsvpCommentsLabel', v)}
                  as="p"
                  className="text-xs font-playfair text-charcoal/60 font-medium"
                />
                <p className="text-[10px] font-playfair text-charcoal/35">
                  <EditableText
                    value={data.rsvpCommentsPlaceholder}
                    onChange={(v) => updateField('rsvpCommentsPlaceholder', v)}
                    as="span"
                    className="text-charcoal/35"
                  />
                </p>
                {isEditMode ? (
                  <div className="bg-white border border-charcoal/10 rounded px-4 py-3 min-h-[80px]" />
                ) : (
                  <textarea
                    placeholder="Type here..."
                    value={form.comments}
                    onChange={(e) => form.setComments(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-charcoal/10 rounded px-4 py-3 text-charcoal placeholder-charcoal/25 outline-none focus:border-sage transition-colors font-playfair text-sm resize-none"
                  />
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isEditMode}
                  className={`bg-warm-gray/80 text-white px-8 py-3 tracking-[0.15em] font-playfair text-xs uppercase transition-all rounded ${
                    isEditMode
                      ? 'opacity-50 cursor-default'
                      : 'hover:bg-warm-gray cursor-pointer'
                  }`}
                >
                  <EditableText
                    value={data.rsvpButtonText}
                    onChange={(v) => updateField('rsvpButtonText', v)}
                    as="span"
                    className="font-semibold"
                  />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
