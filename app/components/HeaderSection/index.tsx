'use client';

import { useInvitation } from '../../context/InvitationContext';
import HeaderClassicFramed from './HeaderClassicFramed';
import HeaderTriptych from './HeaderTriptych';
import HeaderBoldPhoto from './HeaderBoldPhoto';
import HeaderMinimal from './HeaderMinimal';

export default function HeaderSection() {
  const { data } = useInvitation();

  return (
    <section>
      {data.headerVariant === 'classic' && <HeaderClassicFramed />}
      {data.headerVariant === 'triptych' && <HeaderTriptych />}
      {data.headerVariant === 'bold' && <HeaderBoldPhoto />}
      {data.headerVariant === 'minimal' && <HeaderMinimal />}
    </section>
  );
}
