
'use client';
import { ProductsClient } from './products-client';
import { useProducts } from '@/contexts/products-provider';

export default function ProductsPage() {
  const { products } = useProducts();

  return (
    <ProductsClient products={products} />
  );
}
