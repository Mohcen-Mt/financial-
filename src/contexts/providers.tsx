
'use client';

import { ProductsProvider } from '@/contexts/products-provider';
import { SalesProvider } from '@/contexts/sales-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProductsProvider>
        <SalesProvider>{children}</SalesProvider>
      </ProductsProvider>
    </SidebarProvider>
  );
}
