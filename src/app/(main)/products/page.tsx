
import { mockProducts } from '@/lib/data';
import { ProductsClient } from './products-client';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const products: Product[] = mockProducts;

  return (
    <ProductsClient products={products} />
  );
}
