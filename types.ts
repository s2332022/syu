import type { ReactNode } from 'react';

export interface LinkItem {
  id: string;
  classroom: string;
  subject: string;
  url: string;
  icon: ReactNode;
}
