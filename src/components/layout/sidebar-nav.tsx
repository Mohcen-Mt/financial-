
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit, LayoutDashboard, Package } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useTranslation } from '@/hooks/use-translation';

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: '/', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/products', label: t('products'), icon: Package },
    { href: '/ai-pricing', label: t('aiPricing'), icon: BrainCircuit },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
