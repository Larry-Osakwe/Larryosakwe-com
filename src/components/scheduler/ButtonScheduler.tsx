'use client';

import { useEffect, useState } from 'react';
import { config } from '@/config';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';

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
    <Button
      onClick={handleClick}
      className="gap-2"
    >
      <Calendar className="h-4 w-4" />
      Schedule a Call
    </Button>
  );
}