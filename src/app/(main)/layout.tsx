
'use client';

import { MainLayoutClient } from './main-layout-client';
import { ProductsProvider } from '@/contexts/products-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ProductsProvider>
        <MainLayoutClient>{children}</MainLayoutClient>
      </ProductsProvider>
  );
}
