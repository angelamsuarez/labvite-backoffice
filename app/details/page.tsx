'use client';

import { useRouter } from 'next/navigation';
import { useInvitation } from '../context/InvitationContext';
import { BackArrowIcon } from '../icons';
import DateScheduleSection from '../components/DateScheduleSection';
import LocationSection from '../components/LocationSection';
import DressCodeSection from '../components/DressCodeSection';

export default function DetailsPage() {
  const router = useRouter();
  const { data } = useInvitation();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <button
        onClick={() => router.push('/')}
        className="fixed top-5 left-5 z-[201] flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-lg rounded-full pl-3 pr-5 py-2.5 text-charcoal hover:bg-white transition-all hover:shadow-xl font-playfair text-sm"
      >
        <BackArrowIcon />
        Back
      </button>

      <div className="w-full max-w-[600px]">
      {data.enableLocation && data.detailsIncludeLocation && <LocationSection />}
        {data.enableSchedule && data.detailsIncludeSchedule && <DateScheduleSection />}
        
        {data.enableDressCode && data.detailsIncludeDressCode && <DressCodeSection />}
      </div>
    </div>
  );
}
