import type React from 'react';

export interface LinkItem {
  id: string;
  classroom: string;
  subject: string;
  url: string;
  icon: React.ReactNode;
}
