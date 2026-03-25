'use client';

import { useInvitation } from '../../context/InvitationContext';

export default function ColorPaletteEditor({
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
    onUpdate(colors.filter((_, i) => i !== index));
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
