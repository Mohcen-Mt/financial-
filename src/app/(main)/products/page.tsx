
import { mockProducts } from '@/lib/data';
import { I18nProvider } from '@/contexts/i18n-provider';
import { ProductsClient } from './products-client';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const products: Product[] = mockProducts;

  return (
    // We need to re-wrap with provider here because layout is a Server Component.
    // This allows client components inside to use the hook.
    <I18nProvider>
      <ProductsClient products={products} />
    </I18nProvider>
  );
}
