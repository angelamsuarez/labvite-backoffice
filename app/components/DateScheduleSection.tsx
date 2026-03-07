'use client';

import SaveTheDateSection from './SaveTheDateSection';
import TimelineSection from './TimelineSection';
import EditableText from './EditableText';
import { useInvitation } from './InvitationContext';
import { HeartIcon, CircleEllipseIcon } from './icons';

export default function DateScheduleSection() {
  const { data } = useInvitation();

  switch (data.saveDateVariant) {
    case 'calendar':
      return (
        <>
          <SaveTheDateSection />
          <TimelineSection />
        </>
      );
    case 'schedule':
      return <DarkScheduleVariant />;
    case 'hearts':
      return <HeartsTimelineVariant />;
    case 'circle':
      return <CircleCalendarVariant />;
    default:
      return null;
  }
}

/* ================================================================
   VARIANT 2  –  Dark Schedule
   ================================================================ */

function DarkScheduleVariant() {
  const { data, updateField, updateEvent, isEditMode, addEvent, removeEvent } =
    useInvitation();

  return (
    <section className="py-14 px-6 text-center" style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}>
      {/* ── Subtitle ── */}
      <EditableText
        value={data.scheduleSubtitle}
        onChange={(v) => updateField('scheduleSubtitle', v)}
        as="p"
        className="text-[10px] tracking-[0.3em] uppercase font-playfair mb-3" style={{ opacity: 0.4 }}
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
            <div className="w-8 h-px mx-auto mb-2" style={{ backgroundColor: 'currentColor', opacity: 0.2 }} />
            <EditableText
              value={event.title}
              onChange={(v) => updateEvent(event.id, { title: v })}
              as="p"
              className="text-[8px] tracking-[0.15em] uppercase font-playfair leading-relaxed" style={{ opacity: 0.5 }}
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
          className="mt-8 px-4 py-2 rounded-full text-xs font-playfair transition-colors" style={{ backgroundColor: `${data.dateTextColor}1A`, color: data.dateTextColor, opacity: 0.6 }}
        >
          + Add Event
        </button>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 3  –  Hearts Timeline
   ================================================================ */

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function HeartsTimelineVariant() {
  const { data, updateField, updateEvent, isEditMode, addEvent, removeEvent } =
    useInvitation();

  const weddingDate = new Date(data.weddingYear, data.weddingMonth, data.weddingDay);

  // 5-day range centred on the wedding date
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(weddingDate);
    d.setDate(weddingDate.getDate() - 2 + i);
    return d;
  });

  const dateInputValue = `${data.weddingYear}-${String(data.weddingMonth + 1).padStart(2, '0')}-${String(data.weddingDay).padStart(2, '0')}`;

  return (
    <section className="py-12 px-6" style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}>
      {/* ── Month in script ── */}
      <p className="text-center text-2xl font-script mb-4" style={{ opacity: 0.8 }}>
        our {MONTH_NAMES[data.weddingMonth].toLowerCase()}
      </p>

      {/* ── Mini calendar row ── */}
      <div className="flex justify-center gap-2 mb-12">
        {dates.map((date, i) => {
          const isWedding =
            date.getDate() === data.weddingDay &&
            date.getMonth() === data.weddingMonth;
          return (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-playfair transition-colors ${
                isWedding
                  ? 'font-bold'
                  : ''
              }`}
              style={isWedding ? { backgroundColor: data.dateTextColor, color: data.dateBgColor } : { opacity: 0.4 }}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* ── Hearts timeline ── */}
      <div className="relative max-w-[300px] mx-auto">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ backgroundColor: data.dateTextColor, opacity: 0.25 }} />

        {data.events.map((event) => (
          <div key={event.id} className="relative pl-14 pb-10 last:pb-0">
            {/* Heart marker */}
            <div className="absolute left-[9px] top-1">
              <HeartIcon className="w-5 h-5" />
            </div>

            {/* Event content */}
            <EditableText
              value={event.time}
              onChange={(v) => updateEvent(event.id, { time: v })}
              as="p"
              className="text-2xl font-script mb-0" style={{ opacity: 0.7 }}
            />
            <EditableText
              value={event.title}
              onChange={(v) => updateEvent(event.id, { title: v })}
              as="p"
              className="text-lg font-script"
            />

            {isEditMode && (
              <button
                onClick={() => removeEvent(event.id)}
                className="absolute right-0 top-0 w-4 h-4 rounded-full bg-red-400/80 text-white text-[8px] flex items-center justify-center hover:bg-red-500"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {isEditMode && (
          <div className="flex justify-center mt-6 relative z-10">
            <button
              onClick={addEvent}
              className="px-4 py-2 rounded-full text-xs font-playfair transition-colors" style={{ backgroundColor: `${data.dateTextColor}1A`, color: data.dateTextColor }}
            >
              + Add Event
            </button>
          </div>
        )}
      </div>

      {/* Date picker (edit mode) */}
      {isEditMode && (
        <div className="mt-8 text-center">
          <label className="text-xs text-charcoal/50 block mb-2 font-playfair">
            Change wedding date:
          </label>
          <input
            type="date"
            value={dateInputValue}
            onChange={(e) => {
              const d = new Date(e.target.value + 'T12:00:00');
              if (!isNaN(d.getTime())) {
                updateField('weddingMonth', d.getMonth());
                updateField('weddingDay', d.getDate());
                updateField('weddingYear', d.getFullYear());
              }
            }}
            className="bg-white border border-charcoal/20 rounded-lg px-4 py-2 text-charcoal font-playfair text-sm focus:outline-none focus:border-sage"
          />
        </div>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 4  –  Circle Calendar
   ================================================================ */

const DAY_NAMES_FULL = [
  'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',
];

function CircleCalendarVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  const weddingDate = new Date(data.weddingYear, data.weddingMonth, data.weddingDay);
  const prevDate = new Date(weddingDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(weddingDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const threeDays = [prevDate, weddingDate, nextDate];

  const dateInputValue = `${data.weddingYear}-${String(data.weddingMonth + 1).padStart(2, '0')}-${String(data.weddingDay).padStart(2, '0')}`;

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}>
      {/* ── Three day columns ── */}
      <div className="flex justify-center items-end gap-0 max-w-[340px] mx-auto">
        {threeDays.map((date, i) => {
          const isWedding = i === 1;
          return (
            <div
              key={i}
              className={`flex-1 py-4 px-2 ${
                isWedding ? 'border-x' : ''
              }`}
              style={isWedding ? { borderColor: `${data.dateTextColor}25` } : undefined}
            >
              <p className="text-[10px] font-playfair uppercase tracking-[0.15em] mb-1" style={{ opacity: 0.45 }}>
                {DAY_NAMES_FULL[date.getDay()]}
              </p>
              <p className="text-[9px] font-playfair mb-2" style={{ opacity: 0.35 }}>
                {MONTH_NAMES[date.getMonth()].toLowerCase()}
              </p>
              <div className="relative flex items-center justify-center">
                <span
                  className={`text-6xl font-playfair leading-none ${
                    isWedding
                      ? 'font-bold'
                      : ''
                  }`}
                  style={{ opacity: isWedding ? 1 : 0.25 }}
                >
                  {date.getDate()}
                </span>
                {isWedding && <CircleEllipseIcon className="absolute w-20 h-20" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── "save our date!" ── */}
      <p className="text-4xl font-script mt-8 mb-4">
        save our date!
      </p>

      {/* Date picker (edit mode) */}
      {isEditMode && (
        <div className="mt-6">
          <label className="text-xs text-charcoal/50 block mb-2 font-playfair">
            Change wedding date:
          </label>
          <input
            type="date"
            value={dateInputValue}
            onChange={(e) => {
              const d = new Date(e.target.value + 'T12:00:00');
              if (!isNaN(d.getTime())) {
                updateField('weddingMonth', d.getMonth());
                updateField('weddingDay', d.getDate());
                updateField('weddingYear', d.getFullYear());
              }
            }}
            className="bg-white border border-charcoal/20 rounded-lg px-4 py-2 text-charcoal font-playfair text-sm focus:outline-none focus:border-sage"
          />
        </div>
      )}
    </section>
  );
}
