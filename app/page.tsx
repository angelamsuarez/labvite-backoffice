'use client';

import { useState, useEffect } from 'react';
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
import EnvelopeCover from './components/EnvelopeCover';
import DetailsSection from './components/DetailsSection';
import OurStorySection from './components/OurStorySection';
import { EyeIcon, PencilIcon } from './components/icons';

/* ── Edit / Preview toggle ─────────────────────────────────── */

function EditModeToggle() {
  const { isEditMode, setIsEditMode } = useInvitation();

  return (
    <div className="fixed top-4 right-4 z-[200]">
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
  const { data } = useInvitation();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Reset envelope state when enableEnvelope changes
  useEffect(() => {
    if (!data.enableEnvelope) {
      setEnvelopeOpened(true);
    } else {
      setEnvelopeOpened(false);
    }
  }, [data.enableEnvelope]);

  return (
    <div className="min-h-screen flex flex-col items-center sm:py-8 sm:px-4">
      <EditModeToggle />
      <StyleDrawer />

      {/* Envelope cover */}
      {data.enableEnvelope && !envelopeOpened && (
        <EnvelopeCover onOpen={() => setEnvelopeOpened(true)} />
      )}

      {/* Main invitation */}
      {envelopeOpened && (
        <div className="invitation-card w-full max-w-[420px] sm:shadow-2xl overflow-hidden sm:rounded-lg">
          <HeaderSection />
          {data.enableOurStory && <OurStorySection />}

          {data.enableDetails ? (
            <>
              <DetailsSection />
              {/* Sections NOT grouped under details render standalone */}
              {data.enableSchedule && !data.detailsIncludeSchedule && <DateScheduleSection />}
              {data.enableLocation && !data.detailsIncludeLocation && <LocationSection />}
              {data.enableDressCode && !data.detailsIncludeDressCode && <DressCodeSection />}
            </>
          ) : (
            <>
              {data.enableSchedule && <DateScheduleSection />}
              {data.enableLocation && <LocationSection />}
              {data.enableDressCode && <DressCodeSection />}
            </>
          )}
          {data.enableRsvp && <RSVPSection />}
        </div>
      )}
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
