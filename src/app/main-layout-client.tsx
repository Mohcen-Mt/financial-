
'use client';

import { Toaster } from '@/components/ui/toaster';

export function MainLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div suppressHydrationWarning>
      {children}
      <Toaster />
    </div>
  );
}
