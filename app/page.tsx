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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
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
