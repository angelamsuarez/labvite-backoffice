'use client';

import { useInvitation } from '../../context/InvitationContext';
import MapLocationVariant from './MapLocationVariant';
import VenueLocationVariant from './VenueLocationVariant';
import SideBySideLocationVariant from './SideBySideLocationVariant';

export default function LocationSection() {
  const { data } = useInvitation();

  switch (data.locationVariant) {
    case 'map':
      return <MapLocationVariant />;
    case 'venue':
      return <VenueLocationVariant />;
    case 'side-by-side':
      return <SideBySideLocationVariant />;
    default:
      return <VenueLocationVariant />;
  }
}
