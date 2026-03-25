'use client';

import EditableText from '../EditableText';
import { useInvitation } from '../../context/InvitationContext';
import { useRsvpForm } from '../../hooks/useRsvpForm';

export default function DarkRsvp() {
  const { data, isEditMode, updateField } = useInvitation();
  const form = useRsvpForm(data.maxGuests);

  return (
    <section
      className="py-16 px-8 text-center"
      style={{ backgroundColor: data.rsvpBgColor, color: data.rsvpTextColor }}
    >
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
        className="text-xl font-script mb-3"
        style={{ opacity: 0.7 }}
      />

      {/* Deadline */}
      <p className="text-xs font-playfair mb-10" style={{ opacity: 0.4 }}>
        Let us know by{' '}
        <EditableText
          value={data.rsvpDeadline}
          onChange={(v) => updateField('rsvpDeadline', v)}
          as="span"
          className=""
          style={{ opacity: 0.6 }}
        />
      </p>

      {/* Max guests editor (host only) */}
      {isEditMode && (
        <div className="mb-6 flex items-center justify-center gap-3">
          <label className="text-xs font-playfair" style={{ opacity: 0.5 }}>
            Max guests per invite:
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={data.maxGuests}
            onChange={(e) => updateField('maxGuests', Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 border rounded px-2 py-1 text-center text-sm font-playfair focus:outline-none"
            style={{
              backgroundColor: `${data.rsvpTextColor}1A`,
              borderColor: `${data.rsvpTextColor}33`,
              color: data.rsvpTextColor,
            }}
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
            <div
              key={i}
              className="border rounded-lg p-4 text-left space-y-3"
              style={{ borderColor: `${data.rsvpTextColor}25` }}
            >
              <p
                className="text-[10px] font-playfair uppercase tracking-wider"
                style={{ opacity: 0.4 }}
              >
                Guest {i + 1} of {data.maxGuests}
              </p>
              {isEditMode ? (
                <div
                  className="border px-4 py-3"
                  style={{ borderColor: `${data.rsvpTextColor}4D` }}
                >
                  <EditableText
                    value={data.rsvpNameLabel}
                    onChange={(v) => updateField('rsvpNameLabel', v)}
                    as="span"
                    className="text-sm font-playfair"
                    style={{ opacity: 0.5 }}
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
                    style={{
                      borderColor:
                        guest.attending === 'yes' ? data.rsvpTextColor : `${data.rsvpTextColor}4D`,
                    }}
                    onClick={() => !isEditMode && form.updateGuest(i, { attending: 'yes' })}
                  >
                    {guest.attending === 'yes' && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: data.rsvpTextColor }}
                      />
                    )}
                  </div>
                  {i === 0 ? (
                    <EditableText
                      value={data.rsvpAttendingLabel}
                      onChange={(v) => updateField('rsvpAttendingLabel', v)}
                      as="span"
                      className="text-xs font-playfair"
                      style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <span className="text-xs font-playfair" style={{ opacity: 0.8 }}>
                      {data.rsvpAttendingLabel}
                    </span>
                  )}
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    style={{
                      borderColor:
                        guest.attending === 'no' ? data.rsvpTextColor : `${data.rsvpTextColor}4D`,
                    }}
                    onClick={() => !isEditMode && form.updateGuest(i, { attending: 'no' })}
                  >
                    {guest.attending === 'no' && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: data.rsvpTextColor }}
                      />
                    )}
                  </div>
                  {i === 0 ? (
                    <EditableText
                      value={data.rsvpNotAttendingLabel}
                      onChange={(v) => updateField('rsvpNotAttendingLabel', v)}
                      as="span"
                      className="text-xs font-playfair"
                      style={{ opacity: 0.8 }}
                    />
                  ) : (
                    <span className="text-xs font-playfair" style={{ opacity: 0.8 }}>
                      {data.rsvpNotAttendingLabel}
                    </span>
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
              className="text-sm font-playfair"
              style={{ opacity: 0.7 }}
            />
            {isEditMode ? (
              <div
                className="border rounded px-4 py-3 min-h-[80px]"
                style={{ borderColor: `${data.rsvpTextColor}40` }}
              >
                <EditableText
                  value={data.rsvpCommentsPlaceholder}
                  onChange={(v) => updateField('rsvpCommentsPlaceholder', v)}
                  as="span"
                  className="text-sm font-playfair"
                  style={{ opacity: 0.3 }}
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
              isEditMode ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={{
              borderColor: `${data.rsvpTextColor}80`,
              color: data.rsvpTextColor,
              opacity: isEditMode ? 0.5 : 1,
            }}
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
