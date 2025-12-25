
'use client';

import { useProducts } from '@/contexts/products-provider';
import { useSales } from '@/contexts/sales-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import type { Product } from '@/lib/types';
import { startOfWeek, format } from 'date-fns';

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

  const weeklyProfitData = sales.reduce((acc, sale) => {
    const saleDate = new Date(sale.saleDate);
    // Use Monday as the start of the week
    const weekStart = startOfWeek(saleDate, { weekStartsOn: 1 });
    const weekKey = format(weekStart, 'yyyy-MM-dd');

    if (!acc[weekKey]) {
      acc[weekKey] = { week: `Week of ${format(weekStart, 'MMM d')}`, profit: 0 };
    }
    acc[weekKey].profit += sale.totalProfit;
    return acc;
  }, {} as Record<string, { week: string, profit: number }>);

  const chartData = Object.values(weeklyProfitData).sort((a, b) => {
    // Extract date from "Week of MMM d" string to sort correctly
    const dateA = new Date(a.week.replace('Week of ', ''));
    const dateB = new Date(b.week.replace('Week of ', ''));
    // Set a common year to avoid issues with year changes if data spans across years
    dateA.setFullYear(2000);
    dateB.setFullYear(2000);
    return dateA.getTime() - dateB.getTime();
  });


  const recentProducts = products.sort((a,b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()).slice(0, 5);

  return (
    <DashboardClient stats={stats} weeklyProfitData={chartData} recentProducts={recentProducts} />
  );
}
