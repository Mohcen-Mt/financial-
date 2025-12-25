
'use client';

import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/contexts/providers';

export function MainLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div suppressHydrationWarning>
        {children}
        <Toaster />
      </div>
    </Providers>
  );
}
