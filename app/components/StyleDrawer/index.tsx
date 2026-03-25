'use client';

import { useState } from 'react';
import { useInvitation } from '../../context/InvitationContext';
import { GridIcon, CloseIcon } from '../../icons';
import FeaturesPanel from './FeaturesPanel';
import HeaderPanel from './HeaderPanel';
import DateSchedulePanel from './DateSchedulePanel';
import LocationPanel from './LocationPanel';
import DressCodePanel from './DressCodePanel';
import RSVPPanel from './RSVPPanel';

export default function StyleDrawer() {
  const [isOpen, setIsOpen] = useState(true);
  const { isEditMode } = useInvitation();

  if (!isEditMode) return null;

  return (
    <>
      {/* ── Toggle button (visible when drawer is closed) ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-4 z-50 bg-white/95 backdrop-blur-sm shadow-lg rounded-full px-5 py-2.5 flex items-center gap-2.5 text-charcoal hover:bg-white transition-all hover:shadow-xl font-playfair text-sm"
        >
          <GridIcon />
          Styles
        </button>
      )}

      {/* ── Drawer panel ── */}
      <div
        className={`fixed top-0 left-0 h-full w-[340px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal/10 flex-shrink-0">
          <h2 className="text-base font-playfair text-charcoal tracking-wide font-semibold">
            Styles &amp; Sections
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-charcoal/5 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">
          <FeaturesPanel />
          <HeaderPanel />
          <DateSchedulePanel />
          <LocationPanel />
          <DressCodePanel />
          <RSVPPanel />
        </div>
      </div>
    </>
  );
}
