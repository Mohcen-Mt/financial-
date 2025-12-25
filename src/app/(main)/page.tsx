
'use client';

import { useProducts } from '@/contexts/products-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  const { products } = useProducts();

  // Assuming initial stock was 250 for each product to calculate sales
  const INITIAL_STOCK = 250;

  const totalRevenue = products.reduce((acc, p) => {
    const soldQuantity = Math.max(0, INITIAL_STOCK - p.quantity);
    return acc + (soldQuantity * p.sellPrice);
  }, 0);
  
  const totalProfit = products.reduce((acc, p) => {
      const soldQuantity = Math.max(0, INITIAL_STOCK - p.quantity);
      return acc + (soldQuantity * p.profit);
  }, 0);
  
  const totalSales = products.reduce((acc, p) => acc + Math.max(0, INITIAL_STOCK - p.quantity), 0);

  const bestSellingProduct = products.length > 0 ? [...products].sort((a, b) => {
    const profitA = Math.max(0, INITIAL_STOCK - a.quantity) * a.profit;
    const profitB = Math.max(0, INITIAL_STOCK - b.quantity) * b.profit;
    return profitB - profitA;
  })[0] : { name: 'N/A', profit: 0 };
  
  const bestSellingProductProfit = products.length > 0 ? (Math.max(0, INITIAL_STOCK - bestSellingProduct.quantity) * bestSellingProduct.profit) : 0;


  const stats = [
    {
      titleKey: 'totalRevenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      icon: 'DollarSign',
      change: '+20.1% from last month',
    },
    {
      titleKey: 'totalProfit',
      value: `$${(totalProfit / 1000).toFixed(1)}k`,
      icon: 'DollarSign',
      change: '+15.2% from last month',
    },
    {
      titleKey: 'totalSales',
      value: `+${totalSales}`,
      icon: 'ShoppingCart',
      change: '+10% from last month',
    },
    {
      titleKey: 'bestSellingProduct',
      value: bestSellingProduct.name,
      icon: 'TrendingUp',
      change: `Profit: $${bestSellingProductProfit.toFixed(2)}`,
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
