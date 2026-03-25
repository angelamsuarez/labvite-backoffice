'use client';

import { InvitationProvider } from './InvitationContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <InvitationProvider>{children}</InvitationProvider>;
}
