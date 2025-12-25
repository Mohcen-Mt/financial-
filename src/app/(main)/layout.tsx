
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Flame } from 'lucide-react';
import { Providers } from '@/contexts/providers';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
       <div suppressHydrationWarning>
        <Sidebar side="left" collapsible="icon">
          <SidebarHeader>
            <Button variant="ghost" className="h-12 justify-start gap-3 px-3 font-headline text-lg">
              <Flame className="h-6 w-6 text-primary" />
              <span className="font-bold">Financial Alchemist</span>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Footer content if any */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          {/* The Header component will be rendered by child pages */}
          <main className="flex-1 overflow-y-auto" suppressHydrationWarning>
            {children}
          </main>
        </SidebarInset>
      </div>
    </Providers>
  );
}
