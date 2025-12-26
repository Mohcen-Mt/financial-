
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

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar side="left" collapsible="icon" suppressHydrationWarning>
        <SidebarHeader suppressHydrationWarning>
          <Button variant="ghost" className="h-12 justify-start gap-3 px-3 font-headline text-lg">
            <Flame className="h-6 w-6 text-primary" />
            <span className="font-bold">Financial Alchemist</span>
          </Button>
        </SidebarHeader>
        <SidebarContent suppressHydrationWarning>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter suppressHydrationWarning>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col" suppressHydrationWarning>
        {/* The Header component will be rendered by child pages */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
