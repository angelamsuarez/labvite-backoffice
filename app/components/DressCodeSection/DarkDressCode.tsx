'use client';

import EditableText from '../EditableText';
import { useInvitation } from '../../context/InvitationContext';
import ColorPaletteEditor from './ColorPaletteEditor';

export default function DarkDressCode() {
  const { data, updateField } = useInvitation();

  return (
    <section
      className="py-24 px-6 text-center"
      style={{ backgroundColor: data.dressBgColor, color: data.dressTextColor }}
    >
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
        className="text-xs font-playfair leading-relaxed max-w-[280px] mx-auto mb-8"
        style={{ opacity: 0.6 }}
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
