
'use client';

import { useProducts } from '@/contexts/products-provider';
import { useSales } from '@/contexts/sales-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import type { Product } from '@/lib/types';

export default function DashboardPage() {
  const { products } = useProducts();
  const { sales } = useSales();

  const totalRevenue = sales.reduce((acc, sale) => {
      const product = products.find(p => p.id === sale.productId);
      if (!product) return acc;
      return acc + (sale.quantitySold * product.sellPrice);
  }, 0);
  
  const totalProfit = sales.reduce((acc, sale) => acc + sale.totalProfit, 0);
  
  const totalSales = sales.reduce((acc, sale) => acc + sale.quantitySold, 0);

  const bestSellingProductMap = new Map<string, { quantity: number; profit: number }>();
  sales.forEach(sale => {
    const existing = bestSellingProductMap.get(sale.productId) || { quantity: 0, profit: 0 };
    existing.quantity += sale.quantitySold;
    existing.profit += sale.totalProfit;
    bestSellingProductMap.set(sale.productId, existing);
  });
  
  const bestSellingEntry = [...bestSellingProductMap.entries()].sort((a, b) => b[1].quantity - a[1].quantity)[0];
  const bestSellingProductId = bestSellingEntry?.[0];
  const bestSellingProduct = products.find(p => p.id === bestSellingProductId);
  const bestSellingProductProfit = bestSellingEntry ? bestSellingEntry[1].profit : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD', minimumFractionDigits: 2 }).format(value);
  }
  
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  }

  const stats = [
    {
      titleKey: 'totalRevenue',
      value: formatCurrency(totalRevenue),
      icon: 'DollarSign',
      change: '+20.1% from last month',
    },
    {
      titleKey: 'totalProfit',
      value: formatCurrency(totalProfit),
      icon: 'DollarSign',
      change: '+15.2% from last month',
    },
    {
      titleKey: 'totalSales',
      value: `+${formatNumber(totalSales)}`,
      icon: 'ShoppingCart',
      change: '+10% from last month',
    },
    {
      titleKey: 'bestSellingProduct',
      value: bestSellingProduct?.name || 'N/A',
      icon: 'TrendingUp',
      change: `Profit: ${formatCurrency(bestSellingProductProfit)}`,
    },
  ];

  // This can be made dynamic in the future based on sales data
  const weeklyProfitData = [
    { week: 'Week 1', profit: 120000 },
    { week: 'Week 2', profit: 180000 },
    { week: 'Week 3', profit: 150000 },
    { week: 'Week 4', profit: 210000 },
  ];

  const recentProducts = products.sort((a,b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()).slice(0, 5);

  return (
    <DashboardClient stats={stats} weeklyProfitData={weeklyProfitData} recentProducts={recentProducts} />
  );
}
