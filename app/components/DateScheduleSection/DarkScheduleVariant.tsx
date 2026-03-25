'use client';

import EditableText from '../EditableText';
import { useInvitation } from '../../context/InvitationContext';

export default function DarkScheduleVariant() {
  const { data, updateField, updateEvent, isEditMode, addEvent, removeEvent } = useInvitation();

  return (
    <section
      className="py-14 px-6 text-center"
      style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}
    >
      {/* ── Subtitle ── */}
      <EditableText
        value={data.scheduleSubtitle}
        onChange={(v) => updateField('scheduleSubtitle', v)}
        as="p"
        className="text-[10px] tracking-[0.3em] uppercase font-playfair mb-3"
        style={{ opacity: 0.4 }}
      />

      {/* ── Title ── */}
      <EditableText
        value={data.scheduleTitle}
        onChange={(v) => updateField('scheduleTitle', v)}
        as="h2"
        className="text-xl font-playfair tracking-[0.12em] uppercase mb-12 leading-relaxed"
      />

      {/* ── Events in a horizontal row ── */}
      <div className="flex justify-center gap-5 flex-wrap">
        {data.events.map((event) => (
          <div key={event.id} className="text-center min-w-[70px] relative">
            <EditableText
              value={event.time}
              onChange={(v) => updateEvent(event.id, { time: v })}
              as="p"
              className="text-lg font-playfair font-semibold mb-2"
            />
            <div
              className="w-8 h-px mx-auto mb-2"
              style={{ backgroundColor: 'currentColor', opacity: 0.2 }}
            />
            <EditableText
              value={event.title}
              onChange={(v) => updateEvent(event.id, { title: v })}
              as="p"
              className="text-[8px] tracking-[0.15em] uppercase font-playfair leading-relaxed"
              style={{ opacity: 0.5 }}
            />
            {isEditMode && (
              <button
                onClick={() => removeEvent(event.id)}
                className="absolute -right-1 -top-2 w-4 h-4 rounded-full bg-red-400/80 text-white text-[8px] flex items-center justify-center hover:bg-red-500"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditMode && (
        <button
          onClick={addEvent}
          className="mt-8 px-4 py-2 rounded-full text-xs font-playfair transition-colors"
          style={{
            backgroundColor: `${data.dateTextColor}1A`,
            color: data.dateTextColor,
            opacity: 0.6,
          }}
        >
          + Add Event
        </button>
      )}
    </section>
  );
}
