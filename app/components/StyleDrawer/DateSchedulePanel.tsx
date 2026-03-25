'use client';

import { useInvitation } from '../../context/InvitationContext';
import { HeartIcon, CircleEllipseIcon } from '../../icons';
import { SectionGroup, VariantButton, ToggleRow, SectionColors } from './shared';

export default function DateSchedulePanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="Date &amp; Schedule">
      <ToggleRow
        label="Show section"
        checked={data.enableSchedule}
        onChange={() => updateField('enableSchedule', !data.enableSchedule)}
      />
      {data.enableSchedule && (
        <>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <VariantButton
              active={data.saveDateVariant === 'calendar'}
              onClick={() => updateField('saveDateVariant', 'calendar')}
              label="Calendar"
            >
              <CalendarThumb />
            </VariantButton>
            <VariantButton
              active={data.saveDateVariant === 'schedule'}
              onClick={() => updateField('saveDateVariant', 'schedule')}
              label="Schedule"
            >
              <ScheduleThumb />
            </VariantButton>
            <VariantButton
              active={data.saveDateVariant === 'hearts'}
              onClick={() => updateField('saveDateVariant', 'hearts')}
              label="Hearts"
            >
              <HeartsThumb />
            </VariantButton>
            <VariantButton
              active={data.saveDateVariant === 'circle'}
              onClick={() => updateField('saveDateVariant', 'circle')}
              label="Circle"
            >
              <CircleThumb />
            </VariantButton>
          </div>
          <SectionColors
            bgField="dateBgColor"
            textField="dateTextColor"
            bgValue={data.dateBgColor}
            textValue={data.dateTextColor}
            updateField={updateField}
          />
        </>
      )}
    </SectionGroup>
  );
}

/* ── Thumbnails ────────────────────────────────────────────── */

function CalendarThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[5px] text-charcoal/40 font-playfair uppercase tracking-wider">Dec</div>
      <div className="flex gap-[1px]">
        {[16, 17, 18, 19, 20].map((d) => (
          <div
            key={d}
            className={`w-[7px] h-[7px] rounded-[1px] text-[3px] flex items-center justify-center font-playfair ${d === 18 ? 'bg-charcoal/20 text-charcoal/80 font-bold' : 'text-charcoal/30'}`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="w-px h-2 border-l border-dotted border-charcoal/25" />
      <div className="text-[4px] font-script text-charcoal/30">save the date</div>
    </div>
  );
}

function ScheduleThumb() {
  return (
    <div className="w-full h-full bg-charcoal flex flex-col items-center justify-center gap-[3px] p-2">
      <div className="text-[4px] text-white/40 font-playfair uppercase tracking-wider">
        Schedule
      </div>
      <div className="flex gap-[3px] mt-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-[1px]">
            <div className="text-[5px] text-white/60 font-playfair font-semibold">{i}:00</div>
            <div className="w-[2px] h-[2px] rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function HeartsThumb() {
  return (
    <div className="w-full h-full bg-cream flex items-center justify-center p-2">
      <div className="relative flex flex-col items-start gap-[6px]">
        <div className="absolute left-[3px] top-0 bottom-0 w-px bg-burgundy/20" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[4px] relative z-10">
            <HeartIcon className="w-[7px] h-[7px] text-burgundy/60" />
            <div className="w-[14px] h-[2px] bg-charcoal/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CircleThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[2px] p-2">
      <div className="flex items-end gap-[2px]">
        <span className="text-[8px] text-charcoal/20 font-playfair">4</span>
        <div className="relative">
          <span className="text-[12px] text-charcoal/60 font-playfair font-bold">5</span>
          <CircleEllipseIcon className="absolute inset-0 w-full h-full" />
        </div>
        <span className="text-[8px] text-charcoal/20 font-playfair">6</span>
      </div>
      <div className="text-[4px] font-script text-charcoal/30">save our date!</div>
    </div>
  );
}
