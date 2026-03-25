'use client';

import SaveTheDateSection from '../SaveTheDateSection';
import TimelineSection from '../TimelineSection';
import { useInvitation } from '../../context/InvitationContext';
import DarkScheduleVariant from './DarkScheduleVariant';
import HeartsTimelineVariant from './HeartsTimelineVariant';
import CircleCalendarVariant from './CircleCalendarVariant';

export default function DateScheduleSection() {
  const { data } = useInvitation();

  switch (data.saveDateVariant) {
    case 'calendar':
      return (
        <>
          <SaveTheDateSection />
          <TimelineSection />
        </>
      );
    case 'schedule':
      return <DarkScheduleVariant />;
    case 'hearts':
      return <HeartsTimelineVariant />;
    case 'circle':
      return <CircleCalendarVariant />;
    default:
      return null;
  }
}
