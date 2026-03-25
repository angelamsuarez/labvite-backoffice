'use client';

import React from 'react';
import { useInvitation } from '../context/InvitationContext';

export interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export default function EditableText({
  value,
  onChange,
  className = '',
  style,
  as: Tag = 'span',
}: EditableTextProps) {
  const { isEditMode } = useInvitation();

  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      className={`${className} cursor-text outline-none hover:underline hover:decoration-dotted hover:decoration-1 focus:underline focus:decoration-dotted focus:decoration-2 transition-all`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const newValue = e.currentTarget.textContent || '';
        if (newValue !== value) {
          onChange(newValue);
        }
      }}
    >
      {value}
    </Tag>
  );
}
