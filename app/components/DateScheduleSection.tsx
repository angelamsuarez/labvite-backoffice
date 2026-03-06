'use client';

import SaveTheDateSection from './SaveTheDateSection';
import TimelineSection from './TimelineSection';
import EditableText from './EditableText';
import { useInvitation } from './InvitationContext';

/* ================================================================
   DATE & SCHEDULE SECTION
   Wraps save-the-date + timeline with variant switching.
   ================================================================ */

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
   Dark background · horizontal row of time/event pairs
   ================================================================ */

function DarkScheduleVariant() {
  const { data, updateField, updateEvent, isEditMode, addEvent, removeEvent } =
    useInvitation();

  return (
    <section className="bg-charcoal py-14 px-6 text-white text-center">
      {/* ── Subtitle ── */}
      <EditableText
        value={data.scheduleSubtitle}
        onChange={(v) => updateField('scheduleSubtitle', v)}
        as="p"
        className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-playfair mb-3"
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
            <div className="w-8 h-px bg-white/20 mx-auto mb-2" />
            <EditableText
              value={event.title}
              onChange={(v) => updateEvent(event.id, { title: v })}
              as="p"
              className="text-[8px] tracking-[0.15em] uppercase text-white/50 font-playfair leading-relaxed"
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
          className="mt-8 bg-white/10 text-white/60 px-4 py-2 rounded-full text-xs font-playfair hover:bg-white/20 transition-colors"
        >
          + Add Event
        </button>
      )}
    </section>
  );
}

/* ================================================================
   VARIANT 3  –  Hearts Timeline
   Calendar row at top · vertical line with heart markers ·
   events with script font · burgundy colour scheme
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
    <section className="bg-cream py-12 px-6">
      {/* ── Month in script ── */}
      <p className="text-center text-2xl font-script text-charcoal/80 mb-4">
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
                  ? 'bg-burgundy text-white font-bold'
                  : 'text-charcoal/40'
              }`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* ── Hearts timeline ── */}
      <div className="relative max-w-[300px] mx-auto">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px bg-burgundy/25" />

        {data.events.map((event) => (
          <div key={event.id} className="relative pl-14 pb-10 last:pb-0">
            {/* Heart marker */}
            <div className="absolute left-[9px] top-1">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-burgundy"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Event content */}
            <EditableText
              value={event.time}
              onChange={(v) => updateEvent(event.id, { time: v })}
              as="p"
              className="text-2xl font-script text-charcoal/70 mb-0"
            />
            <EditableText
              value={event.title}
              onChange={(v) => updateEvent(event.id, { title: v })}
              as="p"
              className="text-lg font-script text-burgundy"
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
              className="bg-burgundy/10 text-burgundy px-4 py-2 rounded-full text-xs font-playfair hover:bg-burgundy/20 transition-colors"
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
   Three large day numbers · hand-drawn circle · "save our date!"
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
    <section className="bg-cream py-12 px-6 text-center">
      {/* ── Three day columns ── */}
      <div className="flex justify-center items-end gap-0 max-w-[340px] mx-auto">
        {threeDays.map((date, i) => {
          const isWedding = i === 1;
          return (
            <div
              key={i}
              className={`flex-1 py-4 px-2 ${
                isWedding ? 'border-x border-charcoal/15' : ''
              }`}
            >
              <p className="text-[10px] font-playfair uppercase tracking-[0.15em] text-charcoal/45 mb-1">
                {DAY_NAMES_FULL[date.getDay()]}
              </p>
              <p className="text-[9px] font-playfair text-charcoal/35 mb-2">
                {MONTH_NAMES[date.getMonth()].toLowerCase()}
              </p>
              <div className="relative flex items-center justify-center">
                <span
                  className={`text-6xl font-playfair leading-none ${
                    isWedding
                      ? 'text-charcoal font-bold'
                      : 'text-charcoal/25'
                  }`}
                >
                  {date.getDate()}
                </span>
                {isWedding && (
                  <svg
                    className="absolute w-20 h-20"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <ellipse
                      cx="40"
                      cy="42"
                      rx="34"
                      ry="30"
                      stroke="#7A2B3B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      transform="rotate(-6 40 42)"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── "save our date!" ── */}
      <p className="text-4xl font-script text-charcoal mt-8 mb-4">
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
