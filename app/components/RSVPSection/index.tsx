'use client';

import { useInvitation } from '../../context/InvitationContext';
import DarkRsvp from './DarkRsvp';
import LightRsvp from './LightRsvp';

export default function RSVPSection() {
  const { data } = useInvitation();

  switch (data.rsvpVariant) {
    case 'dark':
      return <DarkRsvp />;
    case 'light':
      return <LightRsvp />;
    default:
      return <DarkRsvp />;
  }
}
