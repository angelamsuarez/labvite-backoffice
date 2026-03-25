'use client';

import { useState, useEffect, useMemo } from 'react';
import EditableText from './EditableText';
import { useInvitation } from '../context/InvitationContext';

/* ================================================================
   COUNTDOWN SECTION
   Live countdown timer to the wedding date & time.
   ================================================================ */

export default function CountdownSection() {
  const { data, isEditMode, updateField } = useInvitation();

  const targetMs = useMemo(
    () => buildTargetDate(data.countdownDate, data.countdownTime).getTime(),
    [data.countdownDate, data.countdownTime]
  );

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetMs));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetMs));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetMs]);

  return (
    <section
      className="py-20 px-6 text-center"
      style={{ backgroundColor: data.countdownBgColor, color: data.countdownTextColor }}
    >
      <EditableText
        value={data.countdownTitle}
        onChange={(v) => updateField('countdownTitle', v)}
        as="p"
        className="text-xs font-playfair uppercase tracking-[0.3em] mb-10"
      />

      <div className="flex items-center justify-center gap-6 sm:gap-10">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      {/* Date & time picker (edit mode only) */}
      {isEditMode && (
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-xs font-playfair opacity-70">
            Date:
            <input
              type="date"
              value={data.countdownDate}
              onChange={(e) => updateField('countdownDate', e.target.value)}
              className="bg-white/20 border border-white/30 rounded-md px-3 py-1.5 text-xs outline-none focus:border-white/60 transition-colors"
              style={{ color: 'inherit' }}
            />
          </label>
          <label className="flex items-center gap-2 text-xs font-playfair opacity-70">
            Time:
            <input
              type="time"
              value={data.countdownTime}
              onChange={(e) => updateField('countdownTime', e.target.value)}
              className="bg-white/20 border border-white/30 rounded-md px-3 py-1.5 text-xs outline-none focus:border-white/60 transition-colors"
              style={{ color: 'inherit' }}
            />
          </label>
        </div>
      )}
    </section>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl sm:text-6xl font-playfair font-light leading-none">
        {String(value).padStart(value >= 100 ? 3 : 2, '0')}
      </span>
      <span className="text-xs font-playfair mt-2 opacity-70">{label}</span>
    </div>
  );
}

function buildTargetDate(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours || 0, minutes || 0);
}

function getTimeLeft(targetMs: number) {
  const now = new Date();
  const diff = Math.max(0, targetMs - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}
