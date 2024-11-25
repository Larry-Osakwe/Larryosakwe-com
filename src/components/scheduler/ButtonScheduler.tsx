'use client';

import { config } from '@/config';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import tw, { styled } from 'twin.macro';

// Styled components
const SchedulerButton = styled(Button)`
  ${tw`flex items-center gap-2`}
`;

const CalendarIcon = styled(Calendar)`
  ${tw`h-4 w-4`}
`;

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (config: {
          url: string;
          color?: string;
          label?: string;
          target: HTMLElement | null;
        }) => void;
      };
    };
  }
}

export function ButtonScheduler() {
  const handleClick = () => {
    // Open the scheduling URL in a new tab
    window.open(config.scheduler.defaultConfig.url, '_blank');
  };

  return (
    <SchedulerButton onClick={handleClick}>
      <CalendarIcon />
      Schedule a Call
    </SchedulerButton>
  );
}