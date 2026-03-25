'use client';

import { useRef } from 'react';
import { ImageIcon } from '../../icons';
import { POLAROID_STYLES } from './constants';

export default function PolaroidCard({
  src,
  style,
  onUpload,
  onRemove,
  isEditMode,
}: {
  src: string;
  style: (typeof POLAROID_STYLES)[number];
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
  isEditMode: boolean;
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

  const posStyle: React.CSSProperties = {
    transform: `rotate(${style.rotate})`,
    width: style.w,
    height: style.h,
  };
  if ('top' in style && style.top) posStyle.top = style.top;
  if ('bottom' in style && style.bottom) posStyle.bottom = style.bottom;
  posStyle.right = style.right;

  return (
    <div
      className={`absolute bg-white shadow-lg rounded-sm ${isEditMode ? 'cursor-pointer z-10' : 'pointer-events-none'}`}
      style={posStyle}
      onClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          fileRef.current?.click();
        }
      }}
    >
      <div className="m-[6px] rounded-sm overflow-hidden" style={{ height: style.imgH }}>
        {src ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#4A3728]/60 to-[#6B5443]/60 flex items-center justify-center">
            {isEditMode && <ImageIcon className="w-5 h-5 text-white/60" />}
          </div>
        )}
      </div>
      <div style={{ height: style.h - style.imgH - 12 }} />

      {/* Remove button */}
      {isEditMode && src && (
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
