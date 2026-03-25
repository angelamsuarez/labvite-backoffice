'use client';

import { useInvitation } from '../context/InvitationContext';
import EditableText from './EditableText';
import Image from 'next/image';

export default function OurStorySection() {
  const { data, updateField } = useInvitation();

  if (!data.enableOurStory) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: data.ourStoryBgColor, color: data.ourStoryTextColor }}
    >
      {/* SVG background frame */}
      <div className="absolute inset-0 z-0">
        <Image src="/our-story-bg.svg" alt="" fill className="object-cover" priority />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 py-16 px-8 text-center">
        {/* Title */}
        <EditableText
          value={data.ourStoryTitle || 'Our Story'}
          onChange={(v) => updateField('ourStoryTitle', v)}
          as="h2"
          className="font-script text-4xl mb-6"
        />

        {/* Decorative line */}
        <div
          className="w-16 h-[1px] mx-auto mb-6"
          style={{ backgroundColor: 'currentColor', opacity: 0.3 }}
        />

        {/* Story text */}
        <EditableText
          value={
            data.ourStoryText ||
            'We met on a beautiful summer day and knew from the start that our journey together would be filled with love, laughter, and endless adventures. After years of building memories, we are overjoyed to celebrate the next chapter of our lives with you.'
          }
          onChange={(v) => updateField('ourStoryText', v)}
          as="p"
          className="font-playfair text-sm leading-relaxed max-w-[320px] mx-auto"
          style={{ opacity: 0.8 }}
        />

        {/* Decorative bottom line */}
        <div
          className="w-16 h-[1px] mx-auto mt-6"
          style={{ backgroundColor: 'currentColor', opacity: 0.3 }}
        />
      </div>
    </section>
  );
}
