'use client';

import { useInvitation } from '../../context/InvitationContext';
import PastelDressCode from './PastelDressCode';
import CleanDressCode from './CleanDressCode';
import DarkDressCode from './DarkDressCode';

export default function DressCodeSection() {
  const { data } = useInvitation();

  switch (data.dressCodeVariant) {
    case 'pastel':
      return <PastelDressCode />;
    case 'clean':
      return <CleanDressCode />;
    case 'dark':
      return <DarkDressCode />;
    default:
      return <PastelDressCode />;
  }
}
