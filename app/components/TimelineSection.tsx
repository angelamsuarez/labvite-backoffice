'use client';

import EditableText from './EditableText';
import { useInvitation } from './InvitationContext';

export default function TimelineSection() {
  const { data, isEditMode, updateEvent, addEvent, removeEvent } =
    useInvitation();

  return (
    <section className="py-12 px-4" style={{ backgroundColor: data.dateBgColor, color: data.dateTextColor }}>
      <div className="relative max-w-[360px] mx-auto">
        {/* Vertical center line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px">
          <div className="w-px h-full border-l border-dotted" style={{ borderColor: 'currentColor', opacity: 0.25 }} />
        </div>

        {/* Events */}
        {data.events.map((event, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={event.id}
              className="relative flex items-center mb-10 last:mb-0"
            >
              {/* Left side */}
              <div
                className={`w-[calc(50%-24px)] ${isLeft ? 'text-right pr-4' : ''}`}
              >
                {isLeft && (
                  <>
                    <EditableText
                      value={event.time}
                      onChange={(v) => updateEvent(event.id, { time: v })}
                      as="p"
                      className="text-lg font-playfair font-semibold leading-tight"
                    />
                    <EditableText
                      value={event.title}
                      onChange={(v) => updateEvent(event.id, { title: v })}
                      as="p"
                      className="text-sm font-playfair mt-1 leading-snug" style={{ opacity: 0.6 }}
                    />
                  </>
                )}
              </div>

              {/* Center emoji */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: data.dateBgColor }}>
                  {isEditMode ? (
                    <input
                      value={event.emoji}
                      onChange={(e) =>
                        updateEvent(event.id, { emoji: e.target.value })
                      }
                      className="w-10 h-10 text-center bg-transparent outline-none text-xl rounded-full hover:bg-charcoal/5 focus:bg-charcoal/5 transition-colors"
                      maxLength={2}
                    />
                  ) : (
                    <span>{event.emoji}</span>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div
                className={`w-[calc(50%-24px)] ${!isLeft ? 'text-left pl-4' : ''}`}
              >
                {!isLeft && (
                  <>
                    <EditableText
                      value={event.time}
                      onChange={(v) => updateEvent(event.id, { time: v })}
                      as="p"
                      className="text-lg font-playfair font-semibold leading-tight"
                    />
                    <EditableText
                      value={event.title}
                      onChange={(v) => updateEvent(event.id, { title: v })}
                      as="p"
                      className="text-sm font-playfair mt-1 leading-snug" style={{ opacity: 0.6 }}
                    />
                  </>
                )}
              </div>

              {/* Remove button (edit mode) */}
              {isEditMode && (
                <button
                  onClick={() => removeEvent(event.id)}
                  className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-red-400/80 text-white text-xs flex items-center justify-center hover:bg-red-500 transition-colors shadow-sm"
                  title="Remove event"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}

        {/* Add event button (edit mode) */}
        {isEditMode && (
          <div className="flex justify-center mt-8 relative z-10">
            <button
              onClick={addEvent}
              className="bg-sage text-white px-5 py-2.5 rounded-full text-sm font-playfair hover:bg-sage-dark transition-colors shadow-md"
            >
              + Add Event
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
