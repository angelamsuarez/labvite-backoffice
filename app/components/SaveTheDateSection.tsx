'use client';

import { useInvitation } from '../context/InvitationContext';
import { HeartOutlineIcon } from '../icons';

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
  return <HeartOutlineIcon />;
}

export default function SaveTheDateSection() {
  const { data, isEditMode, updateField } = useInvitation();

  // Build the week that contains the wedding date (Sunday → Saturday)
  const weddingDate = new Date(data.weddingYear, data.weddingMonth, data.weddingDay);
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
    <section
      className="py-16 px-6 text-center"
      style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}
    >
      {/* Month Name */}
      <h2 className="text-2xl tracking-[0.4em] uppercase font-playfair mb-10">
        {MONTH_NAMES[data.weddingMonth]}
      </h2>

      {/* Day-of-week Headers */}
      <div className="grid grid-cols-7 gap-1 max-w-[340px] mx-auto mb-3">
        {DAY_NAMES.map((day) => (
          <span key={day} className="text-sm italic font-playfair" style={{ opacity: 0.6 }}>
            {day}
          </span>
        ))}
      </div>

      {/* Week Dates */}
      <div className="grid grid-cols-7 gap-1 max-w-[340px] mx-auto">
        {weekDates.map((date, i) => {
          const isWeddingDay =
            date.getDate() === data.weddingDay && date.getMonth() === data.weddingMonth;
          const isCurrentMonth = date.getMonth() === data.weddingMonth;

          return (
            <div key={i} className="relative flex items-center justify-center py-2">
              <span
                className={`text-xl font-playfair relative z-10 ${isWeddingDay ? 'font-bold' : ''}`}
                style={{ opacity: !isCurrentMonth ? 0.3 : isWeddingDay ? 1 : 0.8 }}
              >
                {date.getDate()}
              </span>
              {isWeddingDay && <HeartOutline />}
            </div>
          );
        })}
      </div>

      {/* "save the date" in cursive script */}
      <p className="text-5xl font-script mt-8">save the date</p>

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
