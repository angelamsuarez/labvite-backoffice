'use client';

import { ImageIcon } from '../../icons';

export default function EditablePhotoCard({
  src,
  index,
  onReplace,
  onRemove,
}: {
  src: string;
  index: number;
  onReplace: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative group">
      <label className="block cursor-pointer w-full aspect-[3/4] rounded-2xl overflow-hidden bg-charcoal/5">
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={`Gallery photo ${index + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-charcoal/30">
            <ImageIcon className="w-8 h-8 mb-2" />
            <span className="text-xs font-playfair">Add photo</span>
          </div>
        )}

        {/* Hover overlay */}
        {src && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-2xl">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 text-white" />
              <span className="text-white text-sm font-medium">Change photo</span>
            </div>
          </div>
        )}

        <input type="file" accept="image/*" onChange={onReplace} className="hidden" />
      </label>

      <button
        onClick={onRemove}
        className="absolute -top-2 right-0 w-6 h-6 rounded-full bg-red-400/90 text-white text-xs flex items-center justify-center hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow"
      >
        ×
      </button>
    </div>
  );
}

