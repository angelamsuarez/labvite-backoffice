'use client';

import { useRef } from 'react';
import { useInvitation } from '../context/InvitationContext';
import { ImageIcon } from '../icons';

interface EditableImageProps {
  src: string;
  onChange: (dataUrl: string) => void;
  className?: string;
}

export default function EditableImage({ src, onChange, className = '' }: EditableImageProps) {
  const { isEditMode } = useInvitation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative ${className} ${isEditMode ? 'cursor-pointer group' : ''}`}
      onClick={() => isEditMode && fileInputRef.current?.click()}
    >
      {src && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt="Wedding photo" className="w-full h-full object-cover" />
      )}

      {/* Edit overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-white" />
            <span className="text-white text-sm font-medium">
              {src ? 'Change photo' : 'Add photo'}
            </span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
