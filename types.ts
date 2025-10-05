
import type React from 'react';

export interface ColorClasses {
  bg: string;
  text: string;
  border: string;
  iconBg: string;
}

export interface SecuritySectionData {
  title: string;
  Icon: React.FC<{ className?: string }>;
  colorClasses: ColorClasses;
  checklist: string[];
}
