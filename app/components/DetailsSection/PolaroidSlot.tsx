'use client';

import { useRef } from 'react';
import { ImageIcon } from '../../icons';

export default function PolaroidSlot({
  src,
  label,
  onUpload,
  onRemove,
}: {
  src: string;
  label: string;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative bg-white shadow-md rounded-sm cursor-pointer"
      style={{ width: 90, height: 110 }}
    >
      <div
        className="m-[5px] rounded-sm overflow-hidden"
        style={{ height: 72 }}
        onClick={() => fileRef.current?.click()}
      >
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#4A3728]/40 to-[#6B5443]/40 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white/60" />
          </div>
        )}
      </div>
      <p className="text-[8px] text-center text-gray-400 mt-1">{label}</p>

      {src && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 shadow-md z-20"
        >
          ×
        </button>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
