'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import AddPhotoButton from './AddPhotoButton';
import EditablePhotoCard from './EditablePhotoCard';
import CarouselArrow from './CarouselArrow';

export default function GallerySection() {
  const { data, isEditMode, addGalleryPhoto, removeGalleryPhoto, updateGalleryPhoto } =
    useInvitation();

  const photos = data.galleryPhotos;

  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const totalItems = isEditMode ? photos.length + 1 : photos.length;

  useEffect(() => {
    if (currentIndex >= totalItems) {
      setCurrentIndex(Math.max(0, totalItems - 1));
    }
  }, [totalItems, currentIndex]);

  const visibleCount = 3;
  const maxSlide = Math.max(0, totalItems - visibleCount);

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(Math.max(0, Math.min(idx, maxSlide)));
    },
    [maxSlide]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (touchDelta.current > 50) goTo(currentIndex - 1);
    else if (touchDelta.current < -50) goTo(currentIndex + 1);
    touchDelta.current = 0;
  };

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addGalleryPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleReplaceFile = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateGalleryPhoto(index, reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!isEditMode && photos.length === 0) return null;

  const slideWidth = `${100 / visibleCount}%`;
  const showNav = totalItems > visibleCount;

  if (isEditMode && photos.length === 0) {
    return (
      <section className="py-16 overflow-hidden" style={{ backgroundColor: data.galleryBgColor }}>
        <div className="flex items-center justify-center px-6">
          <AddPhotoButton onChange={handleAddFile} className="w-48" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: data.galleryBgColor }}>
      <div className="relative">
        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {photos.map((src, i) => (
            <div key={i} className="flex-shrink-0 px-2" style={{ width: slideWidth }}>
              {isEditMode ? (
                <EditablePhotoCard
                  src={src}
                  index={i}
                  onReplace={handleReplaceFile(i)}
                  onRemove={() => removeGalleryPhoto(i)}
                />
              ) : (
                <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
                  {src && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={src} alt={`Gallery photo ${i + 1}`} className="w-full h-full object-cover" />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Trailing "add" slot */}
          {isEditMode && (
            <div className="flex-shrink-0 px-2" style={{ width: slideWidth }}>
              <AddPhotoButton onChange={handleAddFile} />
            </div>
          )}
        </div>

        {/* Prev / Next arrows */}
        {showNav && (
          <>
            <CarouselArrow direction="prev" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex <= 0} />
            <CarouselArrow direction="next" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex >= maxSlide} />
          </>
        )}
      </div>

      {/* Dot indicators */}
      {showNav && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: maxSlide + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-charcoal/60 scale-125' : 'bg-charcoal/20'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

