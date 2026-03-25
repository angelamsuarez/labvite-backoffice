'use client';

import { useInvitation } from '../../context/InvitationContext';
import { POLAROID_STYLES, PHOTO_FIELDS } from './constants';
import PolaroidCard from './PolaroidCard';
import PolaroidSlot from './PolaroidSlot';

export default function PolaroidCards() {
  const { data, updateField, isEditMode } = useInvitation();

  const allCards = PHOTO_FIELDS.map((field, i) => ({
    field,
    src: data[field] as string,
    style: POLAROID_STYLES[i],
  }));

  /* Edit mode */
  if (isEditMode) {
    return (
      <div className="flex items-center justify-center gap-3 mb-4">
        {allCards.map((card, i) => (
          <PolaroidSlot
            key={card.field}
            src={card.src}
            label={`Photo ${i + 1}`}
            onUpload={(url) => updateField(card.field, url)}
            onRemove={() => updateField(card.field, '')}
          />
        ))}
      </div>
    );
  }

  /* Preview mode */
  const visibleCards = allCards.filter((c) => c.src);
  if (visibleCards.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0">
      {visibleCards.map((card) => (
        <PolaroidCard
          key={card.field}
          src={card.src}
          style={card.style}
          isEditMode={false}
          onUpload={() => {}}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
}
