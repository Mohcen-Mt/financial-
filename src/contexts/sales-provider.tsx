
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Sale, Product } from '@/lib/types';
import { useProducts } from './products-provider';

interface SalesContextType {
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'saleDate' | 'totalProfit'> & {productId: string}) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export function SalesProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<Sale[]>([]);
  const { products } = useProducts();

  useEffect(() => {
    try {
      const storedSales = localStorage.getItem('sales');
      if (storedSales) {
        setSales(JSON.parse(storedSales));
      }
    } catch (error) {
      console.error('Failed to load sales from localStorage', error);
      setSales([]);
    }
  }, []);

  const persistSales = (updatedSales: Sale[]) => {
    localStorage.setItem('sales', JSON.stringify(updatedSales));
    setSales(updatedSales);
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'saleDate' | 'totalProfit'> & { productId: string }) => {
    const product = products.find(p => p.id === saleData.productId);
    if (!product) {
        console.error("Product not found for sale");
        return;
    }

    const totalProfit = (product.sellPrice - product.buyPrice) * saleData.quantitySold;

    const newSale: Sale = {
      ...saleData,
      id: `sale-${new Date().getTime()}`,
      saleDate: new Date().toISOString(),
      totalProfit,
    };
    const updatedSales = [...sales, newSale];
    persistSales(updatedSales);
  };


  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
}
