
'use client';

import { useProducts } from '@/contexts/products-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  const { products } = useProducts();

  // Calculate stats based on products
  const totalProfit = products.reduce((acc, p) => acc + (p.profit * (250-p.quantity)), 0);
  const totalProducts = products.reduce((acc, p) => acc + p.quantity, 0);
  const totalSales = products.reduce((acc, p) => acc + (250-p.quantity), 0);
  
  const bestSellingProduct = [...products].sort((a, b) => (b.sellPrice - b.buyPrice) - (a.sellPrice - a.buyPrice))[0] || {
    name: 'N/A',
    profit: 0
  };

  const stats = [
    {
      titleKey: 'totalProfit',
      value: `$${(totalProfit / 1000).toFixed(1)}k`,
      icon: 'DollarSign',
      change: '+15.2%', // This can be made dynamic later
    },
    {
      titleKey: 'totalProducts',
      value: totalProducts,
      icon: 'Package',
      change: `+${products.length}`,
    },
    {
      titleKey: 'totalSales',
      value: totalSales,
      icon: 'ShoppingCart',
      change: '+50', // This can be made dynamic later
    },
    {
      titleKey: 'bestSellingProduct',
      value: bestSellingProduct.name,
      icon: 'TrendingUp',
      change: `Profit: $${bestSellingProduct.profit.toFixed(2)}`,
    },
  ];

  // This can be made dynamic in the future based on sales data
  const weeklyProfitData = [
    { week: 'Week 1', profit: 1200 },
    { week: 'Week 2', profit: 1800 },
    { week: 'Week 3', profit: 1500 },
    { week: 'Week 4', profit: 2100 },
  ];

  return (
    <DashboardClient stats={stats} weeklyProfitData={weeklyProfitData} recentProducts={products.slice(0, 5)} />
  );
}
