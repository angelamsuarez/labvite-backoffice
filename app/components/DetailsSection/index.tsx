'use client';

import { useRouter } from 'next/navigation';
import { useInvitation } from '../../context/InvitationContext';
import DateScheduleSection from '../DateScheduleSection';
import LocationSection from '../LocationSection';
import DressCodeSection from '../DressCodeSection';
import EditableText from '../EditableText';
import Image from 'next/image';
import PolaroidCards from './PolaroidCards';

export default function DetailsSection() {
  const { data, updateField, isEditMode } = useInvitation();
  const router = useRouter();

  if (!data.enableDetails) return null;

  return (
    <>
      {/* Inline details section — decorative frame + polaroids */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ backgroundColor: data.detailsBgColor, color: data.detailsTextColor }}
      >
        <div className="relative max-w-[320px] mx-auto">
          {/* In edit mode: polaroid slots shown as a row ABOVE the frame */}
          {isEditMode && <PolaroidCards />}

          {/* SVG frame with text */}
          <div
            className={`relative group transition-transform duration-300 ${!isEditMode ? 'cursor-pointer hover:scale-[1.03]' : ''}`}
            onClick={() => !isEditMode && router.push('/details')}
          >
            {/* In preview mode: fanned polaroids behind the frame */}
            {!isEditMode && <PolaroidCards />}

            <div className="relative mx-auto w-[200px] h-[200px]">
              <Image
                src="/details-frame.svg"
                alt=""
                width={200}
                height={200}
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.3))' }}
                priority
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div onClick={(e) => isEditMode && e.stopPropagation()}>
                  <EditableText
                    value={data.detailsButtonText || 'The Details'}
                    onChange={(v) => updateField('detailsButtonText', v)}
                    as="p"
                    className="font-script text-3xl text-[#8B6B5A] mb-1"
                  />
                </div>
                {!isEditMode && (
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#A89880] font-playfair">
                    CLICK HERE
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In EDIT mode: show grouped detail sub-sections inline */}
      {isEditMode && (
        <div>
          {data.enableLocation && data.detailsIncludeLocation && <LocationSection />}
          {data.enableSchedule && data.detailsIncludeSchedule && <DateScheduleSection />}
          {data.enableDressCode && data.detailsIncludeDressCode && <DressCodeSection />}
        </div>
      )}
    </>
  );
}
