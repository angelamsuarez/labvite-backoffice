'use client';

import { useInvitation } from '../../context/InvitationContext';
import { SectionGroup, VariantButton, ToggleRow, SectionColors } from './shared';

export default function DressCodePanel() {
  const { data, updateField } = useInvitation();

  return (
    <SectionGroup title="Dress Code">
      <ToggleRow
        label="Show section"
        checked={data.enableDressCode}
        onChange={() => updateField('enableDressCode', !data.enableDressCode)}
      />
      {data.enableDressCode && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <VariantButton
              active={data.dressCodeVariant === 'pastel'}
              onClick={() => updateField('dressCodeVariant', 'pastel')}
              label="Pastel"
            >
              <PastelDressThumb />
            </VariantButton>
            <VariantButton
              active={data.dressCodeVariant === 'clean'}
              onClick={() => updateField('dressCodeVariant', 'clean')}
              label="Clean"
            >
              <CleanDressThumb />
            </VariantButton>
            <VariantButton
              active={data.dressCodeVariant === 'dark'}
              onClick={() => updateField('dressCodeVariant', 'dark')}
              label="Dark"
            >
              <DarkDressThumb />
            </VariantButton>
          </div>
          <SectionColors
            bgField="dressBgColor"
            textField="dressTextColor"
            bgValue={data.dressBgColor}
            textValue={data.dressTextColor}
            updateField={updateField}
          />
        </>
      )}
    </SectionGroup>
  );
}

/* ── Thumbnails ────────────────────────────────────────────── */

function PastelDressThumb() {
  return (
    <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] font-script text-charcoal/30">Dress Code</div>
      <div className="flex gap-[3px]">
        {['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'].map((c) => (
          <div key={c} className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function CleanDressThumb() {
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] font-script text-charcoal/30">Dress Code</div>
      <div className="flex gap-[3px]">
        {['#E8E0D4', '#8C8C8C', '#5C4033'].map((c) => (
          <div key={c} className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}

function DarkDressThumb() {
  return (
    <div className="w-full h-full bg-sage-dark flex flex-col items-center justify-center gap-[4px] p-2">
      <div className="text-[4px] text-white/40 font-playfair uppercase tracking-wider">Dress</div>
      <div className="flex gap-[2px]">
        {['#D4C5A9', '#B8C5A3', '#9B9B8E', '#C4A882'].map((c) => (
          <div key={c} className="w-[8px] h-[5px] rounded-[1px]" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}
