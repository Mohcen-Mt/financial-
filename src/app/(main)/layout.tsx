
'use client';

import { MainLayoutClient } from './main-layout-client';
import { ProductsProvider } from '@/contexts/products-provider';
import { SalesProvider } from '@/contexts/sales-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      <ProductsProvider>
        <SalesProvider>
            <MainLayoutClient>{children}</MainLayoutClient>
        </SalesProvider>
      </ProductsProvider>
    </div>
  );
}
