'use client';

import { useInvitation } from './InvitationContext';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Dotted heart outline around the wedding date */
function HeartOutline() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-charcoal-light"
      viewBox="0 0 50 50"
      fill="none"
    >
      <path
        d="M25 43 C25 43, 6 30, 6 19 C6 12, 11 7, 16 7 C20 7, 23 10, 25 13 C27 10, 30 7, 34 7 C39 7, 44 12, 44 19 C44 30, 25 43, 25 43Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
        fill="none"
      />
    </svg>
  );
}

export default function SaveTheDateSection() {
  const { data, isEditMode, updateField } = useInvitation();

  // Build the week that contains the wedding date (Sunday → Saturday)
  const weddingDate = new Date(
    data.weddingYear,
    data.weddingMonth,
    data.weddingDay,
  );
  const dayOfWeek = weddingDate.getDay(); // 0 = Sunday

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weddingDate);
    d.setDate(weddingDate.getDate() - dayOfWeek + i);
    return d;
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = new Date(e.target.value + 'T12:00:00');
    if (!isNaN(d.getTime())) {
      updateField('weddingMonth', d.getMonth());
      updateField('weddingDay', d.getDate());
      updateField('weddingYear', d.getFullYear());
    }
  };

  const dateInputValue = `${data.weddingYear}-${String(data.weddingMonth + 1).padStart(2, '0')}-${String(data.weddingDay).padStart(2, '0')}`;

  return (
    <section className="bg-cream py-16 px-6 text-center">
      {/* Month Name */}
      <h2 className="text-2xl tracking-[0.4em] uppercase font-playfair text-charcoal mb-10">
        {MONTH_NAMES[data.weddingMonth]}
      </h2>

      {/* Day-of-week Headers */}
      <div className="grid grid-cols-7 gap-1 max-w-[340px] mx-auto mb-3">
        {DAY_NAMES.map((day) => (
          <span
            key={day}
            className="text-sm italic font-playfair text-charcoal/60"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Week Dates */}
      <div className="grid grid-cols-7 gap-1 max-w-[340px] mx-auto">
        {weekDates.map((date, i) => {
          const isWeddingDay =
            date.getDate() === data.weddingDay &&
            date.getMonth() === data.weddingMonth;
          const isCurrentMonth = date.getMonth() === data.weddingMonth;

          return (
            <div
              key={i}
              className="relative flex items-center justify-center py-2"
            >
              <span
                className={`text-xl font-playfair relative z-10 ${
                  isWeddingDay ? 'font-bold text-charcoal' : ''
                } ${!isCurrentMonth ? 'text-charcoal/30' : 'text-charcoal/80'}`}
              >
                {date.getDate()}
              </span>
              {isWeddingDay && <HeartOutline />}
            </div>
          );
        })}
      </div>

      {/* Dotted vertical line from heart to text */}
      <div className="flex flex-col items-center mt-2">
        <div className="h-20 border-l border-dotted border-charcoal/40" />
      </div>

      {/* "save the date" in cursive script */}
      <p className="text-5xl font-script text-charcoal mt-2">save the date</p>

      {/* Date picker – edit mode only */}
      {isEditMode && (
        <div className="mt-8">
          <label className="text-xs text-charcoal/50 block mb-2 font-playfair">
            Change wedding date:
          </label>
          <input
            type="date"
            value={dateInputValue}
            onChange={handleDateChange}
            className="bg-white border border-charcoal/20 rounded-lg px-4 py-2 text-charcoal font-playfair text-sm focus:outline-none focus:border-sage"
          />
        </div>
      )}
    </section>
  );
}
