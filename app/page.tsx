'use client';

import { useEffect } from 'react';
import { useInvitation } from './context/InvitationContext';
import HeaderSection from './components/HeaderSection';
import DateScheduleSection from './components/DateScheduleSection';
import LocationSection from './components/LocationSection';
import DressCodeSection from './components/DressCodeSection';
import RSVPSection from './components/RSVPSection';
import StyleDrawer from './components/StyleDrawer';
import EnvelopeCover from './components/EnvelopeCover';
import DetailsSection from './components/DetailsSection';
import OurStorySection from './components/OurStorySection';
import CountdownSection from './components/CountdownSection';
import GallerySection from './components/GallerySection';
import SongSuggestSection from './components/SongSuggestSection';
import { EyeIcon, PencilIcon } from './icons';
import ScrollReveal from './components/ScrollReveal';

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
  const { data, isEditMode, envelopeOpened, setEnvelopeOpened } = useInvitation();

  // Reset envelope state when enableEnvelope changes
  useEffect(() => {
    if (!data.enableEnvelope) {
      setEnvelopeOpened(true);
    }
  }, [data.enableEnvelope, setEnvelopeOpened]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${isEditMode ? 'sm:py-8 sm:px-4' : ''}`}
    >
      <EditModeToggle />
      <StyleDrawer />

      {/* Envelope cover */}
      {data.enableEnvelope && !envelopeOpened && (
        <EnvelopeCover onOpen={() => setEnvelopeOpened(true)} />
      )}

      {/* Main invitation */}
      {envelopeOpened && (
        <div
          className={`invitation-card w-full overflow-hidden ${isEditMode ? 'max-w-[420px] sm:shadow-2xl sm:rounded-lg' : 'max-w-[600px]'}`}
        >
          <ScrollReveal>
            <HeaderSection />
          </ScrollReveal>

          {data.enableOurStory && (
            <ScrollReveal>
              <OurStorySection />
            </ScrollReveal>
          )}

          {data.enableDetails ? (
            <>
              <ScrollReveal>
                <DetailsSection />
              </ScrollReveal>
              {data.enableSchedule && !data.detailsIncludeSchedule && (
                <ScrollReveal>
                  <DateScheduleSection />
                </ScrollReveal>
              )}
              {data.enableLocation && !data.detailsIncludeLocation && (
                <ScrollReveal>
                  <LocationSection />
                </ScrollReveal>
              )}
              {data.enableDressCode && !data.detailsIncludeDressCode && (
                <ScrollReveal>
                  <DressCodeSection />
                </ScrollReveal>
              )}
            </>
          ) : (
            <>
              {data.enableSchedule && (
                <ScrollReveal>
                  <DateScheduleSection />
                </ScrollReveal>
              )}
              {data.enableLocation && (
                <ScrollReveal>
                  <LocationSection />
                </ScrollReveal>
              )}
              {data.enableDressCode && (
                <ScrollReveal>
                  <DressCodeSection />
                </ScrollReveal>
              )}
            </>
          )}

          {data.enableCountdown && (
            <ScrollReveal>
              <CountdownSection />
            </ScrollReveal>
          )}

          {data.enableGallery && (
            <ScrollReveal>
              <GallerySection />
            </ScrollReveal>
          )}

          {data.enableSongs && (
            <ScrollReveal>
              <SongSuggestSection />
            </ScrollReveal>
          )}

          {data.enableRsvp && (
            <ScrollReveal>
              <RSVPSection />
            </ScrollReveal>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function Home() {
  return <InvitationCard />;
}
