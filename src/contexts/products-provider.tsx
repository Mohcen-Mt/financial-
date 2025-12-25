'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '@/lib/types';
import { mockProducts } from '@/lib/data';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'profit' | 'addedDate'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(mockProducts);
        localStorage.setItem('products', JSON.stringify(mockProducts));
      }
    } catch (error) {
      console.error('Failed to load products from localStorage', error);
      setProducts(mockProducts);
    }
  }, []);

  const persistProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'profit' | 'addedDate'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${new Date().getTime()}`,
      profit: productData.sellPrice - productData.buyPrice,
      addedDate: new Date().toISOString().split('T')[0],
      image: `product-${(products.length % 6) + 1}` as Product['image'], // Cycle through available images
    };
    const updatedProducts = [...products, newProduct];
    persistProducts(updatedProducts);
  };

  const updateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? { ...updatedProduct, profit: updatedProduct.sellPrice - updatedProduct.buyPrice } : p
    );
    persistProducts(updatedProducts);
  };

  const deleteProduct = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    persistProducts(updatedProducts);
  };

  const getProductById = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
