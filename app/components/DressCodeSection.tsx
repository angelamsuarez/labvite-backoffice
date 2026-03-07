'use client';

import EditableText from './EditableText';
import { useInvitation } from './InvitationContext';

/* ================================================================
   DRESS CODE SECTION
   Displays a colour palette the couple wants guests to follow.
   Three visual variants: pastel, clean, dark.
   ================================================================ */

export default function DressCodeSection() {
  const { data } = useInvitation();

  switch (data.dressCodeVariant) {
    case 'pastel':
      return <PastelDressCode />;
    case 'clean':
      return <CleanDressCode />;
    case 'dark':
      return <DarkDressCode />;
    default:
      return <PastelDressCode />;
  }
}

/* ── Shared colour palette editor ─────────────────────────── */

function ColorPaletteEditor({
  colors,
  onUpdate,
  shape = 'circle',
  darkMode = false,
}: {
  colors: string[];
  onUpdate: (colors: string[]) => void;
  shape?: 'circle' | 'square';
  darkMode?: boolean;
}) {
  const { isEditMode } = useInvitation();

  const handleColorChange = (index: number, newColor: string) => {
    const updated = [...colors];
    updated[index] = newColor;
    onUpdate(updated);
  };

  const addColor = () => {
    onUpdate([...colors, '#B8B8B8']);
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      onUpdate(colors.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {colors.map((color, i) => (
        <div key={i} className="relative group">
          {isEditMode ? (
            <>
              <label
                className={`block cursor-pointer ${
                  shape === 'circle' ? 'w-12 h-12 rounded-full' : 'w-14 h-10 rounded-md'
                } shadow-sm transition-transform hover:scale-110`}
                style={{ backgroundColor: color }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(i, e.target.value)}
                  className="sr-only"
                />
              </label>
             
                <button
                  onClick={() => removeColor(i)}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-400/80 text-white text-[8px] flex items-center justify-center hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              
            </>
          ) : (
            <div
              className={`${
                shape === 'circle' ? 'w-12 h-12 rounded-full' : 'w-14 h-10 rounded-md'
              } shadow-sm`}
              style={{ backgroundColor: color }}
            />
          )}
        </div>
      ))}

      {isEditMode && (
        <button
          onClick={addColor}
          className={`${
            shape === 'circle' ? 'w-12 h-12 rounded-full' : 'w-14 h-10 rounded-md'
          } border-2 border-dashed flex items-center justify-center text-lg transition-colors ${
            darkMode
              ? 'border-white/20 text-white/30 hover:border-white/40'
              : 'border-charcoal/15 text-charcoal/25 hover:border-charcoal/30'
          }`}
        >
          +
        </button>
      )}
    </div>
  );
}

/* ================================================================
   VARIANT 1  –  Pastel
   Warm cream background · script title · circular color swatches
   ================================================================ */

function PastelDressCode() {
  const { data, updateField } = useInvitation();

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.dressBgColor, color: data.dressTextColor }}>
      <EditableText
        value={data.dressCodeTitle}
        onChange={(v) => updateField('dressCodeTitle', v)}
        as="h2"
        className="text-3xl font-script mb-4"
      />
      <EditableText
        value={data.dressCodeSubtitle}
        onChange={(v) => updateField('dressCodeSubtitle', v)}
        as="p"
        className="text-xs font-playfair leading-relaxed max-w-[280px] mx-auto mb-8" style={{ opacity: 0.5 }}
      />
      <ColorPaletteEditor
        colors={data.dressCodeColors}
        onUpdate={(c) => updateField('dressCodeColors', c)}
        shape="circle"
      />
    </section>
  );
}

/* ================================================================
   VARIANT 2  –  Clean
   White background · script title · circular colour swatches ·
   subtle understated look
   ================================================================ */

function CleanDressCode() {
  const { data, updateField } = useInvitation();

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.dressBgColor, color: data.dressTextColor }}>
      <EditableText
        value={data.dressCodeTitle}
        onChange={(v) => updateField('dressCodeTitle', v)}
        as="h2"
        className="text-3xl font-script mb-4"
      />
      <EditableText
        value={data.dressCodeSubtitle}
        onChange={(v) => updateField('dressCodeSubtitle', v)}
        as="p"
        className="text-xs font-playfair leading-relaxed max-w-[280px] mx-auto mb-8" style={{ opacity: 0.45 }}
      />
      <ColorPaletteEditor
        colors={data.dressCodeColors}
        onUpdate={(c) => updateField('dressCodeColors', c)}
        shape="circle"
      />
    </section>
  );
}

/* ================================================================
   VARIANT 3  –  Dark
   Dark sage/olive background · bold uppercase title ·
   rectangular colour swatches
   ================================================================ */

function DarkDressCode() {
  const { data, updateField } = useInvitation();

  return (
    <section className="py-12 px-6 text-center" style={{ backgroundColor: data.dressBgColor, color: data.dressTextColor }}>
      <EditableText
        value={data.dressCodeTitle}
        onChange={(v) => updateField('dressCodeTitle', v)}
        as="h2"
        className="text-lg font-playfair uppercase tracking-[0.3em] mb-5"
      />
      <EditableText
        value={data.dressCodeSubtitle}
        onChange={(v) => updateField('dressCodeSubtitle', v)}
        as="p"
        className="text-xs font-playfair leading-relaxed max-w-[280px] mx-auto mb-8" style={{ opacity: 0.6 }}
      />
      <ColorPaletteEditor
        colors={data.dressCodeColors}
        onUpdate={(c) => updateField('dressCodeColors', c)}
        shape="square"
        darkMode
      />
    </section>
  );
}
