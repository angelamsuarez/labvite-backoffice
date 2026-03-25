'use client';

import { useInvitation } from '../../context/InvitationContext';
import { CircleEllipseIcon } from '../../icons';
import { MONTH_NAMES, DAY_NAMES_FULL } from './constants';

export default function CircleCalendarVariant() {
  const { data, updateField, isEditMode } = useInvitation();

  const weddingDate = new Date(data.weddingYear, data.weddingMonth, data.weddingDay);
  const prevDate = new Date(weddingDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(weddingDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const threeDays = [prevDate, weddingDate, nextDate];

  const dateInputValue = `${data.weddingYear}-${String(data.weddingMonth + 1).padStart(2, '0')}-${String(data.weddingDay).padStart(2, '0')}`;

  return (
    <section
      className="py-24 px-6 text-center"
      style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}
    >
      {/* ── Three day columns ── */}
      <div className="flex justify-center items-end gap-0 max-w-[340px] mx-auto">
        {threeDays.map((date, i) => {
          const isWedding = i === 1;
          return (
            <div
              key={i}
              className={`flex-1 py-4 px-2 ${isWedding ? 'border-x' : ''}`}
              style={isWedding ? { borderColor: `${data.dateTextColor}25` } : undefined}
            >
              <p
                className="text-[10px] font-playfair uppercase tracking-[0.15em] mb-1"
                style={{ opacity: 0.45 }}
              >
                {DAY_NAMES_FULL[date.getDay()]}
              </p>
              <p className="text-[9px] font-playfair mb-2" style={{ opacity: 0.35 }}>
                {MONTH_NAMES[date.getMonth()].toLowerCase()}
              </p>
              <div className="relative flex items-center justify-center">
                <span
                  className={`text-6xl font-playfair leading-none ${isWedding ? 'font-bold' : ''}`}
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
      <p className="text-4xl font-script mt-8 mb-4">save our date!</p>

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
