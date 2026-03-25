'use client';

import { useRef, useEffect, useState } from 'react';
import EditableText from '../EditableText';
import { useInvitation } from '../../context/InvitationContext';
import { HeartIcon } from '../../icons';
import { MONTH_NAMES } from './constants';

/* ── Scroll-reveal wrapper for timeline items ── */

function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isEditMode } = useInvitation();

  useEffect(() => {
    if (isEditMode) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEditMode]);

  return (
    <div ref={ref} className={`timeline-stagger ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

/* ── Hearts Timeline Variant ── */

export default function HeartsTimelineVariant() {
  const { data, updateField, updateEvent, isEditMode, addEvent, removeEvent } = useInvitation();

  const weddingDate = new Date(data.weddingYear, data.weddingMonth, data.weddingDay);

  // 5-day range centred on the wedding date
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(weddingDate);
    d.setDate(weddingDate.getDate() - 2 + i);
    return d;
  });

  const dateInputValue = `${data.weddingYear}-${String(data.weddingMonth + 1).padStart(2, '0')}-${String(data.weddingDay).padStart(2, '0')}`;

  return (
    <section
      className="py-12 px-6"
      style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}
    >
      {/* ── Month in script ── */}
      <p className="text-center text-2xl font-script mb-4" style={{ opacity: 0.8 }}>
        our {MONTH_NAMES[data.weddingMonth].toLowerCase()}
      </p>

      {/* ── Mini calendar row ── */}
      <div className="flex justify-center gap-2 mb-12">
        {dates.map((date, i) => {
          const isWedding =
            date.getDate() === data.weddingDay && date.getMonth() === data.weddingMonth;
          return (
            <div
              key={i}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-playfair transition-colors ${
                isWedding ? 'font-bold' : ''
              }`}
              style={
                isWedding
                  ? { backgroundColor: data.dateTextColor, color: data.dateBgColor }
                  : { opacity: 0.4 }
              }
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>

      {/* ── Hearts timeline ── */}
      <div className="relative max-w-[300px] mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-0 bottom-0 w-px"
          style={{ backgroundColor: data.dateTextColor, opacity: 0.25 }}
        />

        {data.events.map((event, idx) => (
          <StaggerItem key={event.id} index={idx} className="relative pl-14 pb-10 last:pb-0">
            {/* Heart marker */}
            <div className="absolute left-[9px] top-1">
              <HeartIcon className="w-5 h-5" />
            </div>

            {/* Event content */}
            <EditableText
              value={event.time}
              onChange={(v) => updateEvent(event.id, { time: v })}
              as="p"
              className="text-2xl font-script mb-0"
              style={{ opacity: 0.7 }}
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
          </StaggerItem>
        ))}

        {isEditMode && (
          <div className="flex justify-center mt-6 relative z-10">
            <button
              onClick={addEvent}
              className="px-4 py-2 rounded-full text-xs font-playfair transition-colors"
              style={{ backgroundColor: `${data.dateTextColor}1A`, color: data.dateTextColor }}
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
