'use client';

import {
  InvitationProvider,
  useInvitation,
} from './components/InvitationContext';
import HeaderSection from './components/HeaderSection';
import DateScheduleSection from './components/DateScheduleSection';
import LocationSection from './components/LocationSection';
import DressCodeSection from './components/DressCodeSection';
import RSVPSection from './components/RSVPSection';
import StyleDrawer from './components/StyleDrawer';
import { EyeIcon, PencilIcon } from './components/icons';

/* ── Edit / Preview toggle ─────────────────────────────────── */

function EditModeToggle() {
  const { isEditMode, setIsEditMode } = useInvitation();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className="bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-5 py-2.5 flex items-center gap-2.5 text-charcoal hover:bg-white transition-all hover:shadow-xl font-playfair text-sm"
      >
        {isEditMode ? (
          <>
            <EyeIcon />
            Preview
          </>
        ) : (
          <>
            <PencilIcon />
            Edit
          </>
        )}
      </button>
    </div>
  );
}

/* ── Invitation card ───────────────────────────────────────── */

function InvitationCard() {
  return (
    <div className="min-h-screen flex flex-col items-center sm:py-8 sm:px-4">
      <EditModeToggle />
      <StyleDrawer />

      <div className="invitation-card w-full max-w-[420px] sm:shadow-2xl overflow-hidden sm:rounded-lg">
        <HeaderSection />
        <DateScheduleSection />
        <LocationSection />
        <DressCodeSection />
        <RSVPSection />
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <InvitationProvider>
      <InvitationCard />
    </InvitationProvider>
  );
}
