
'use client';

import { useProducts } from '@/contexts/products-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  const { products } = useProducts();

  // Assuming initial stock was 250 for each product to calculate sales
  const INITIAL_STOCK = 250;

  const totalSalesValue = products.reduce((acc, p) => {
    const soldQuantity = INITIAL_STOCK - p.quantity;
    return acc + (soldQuantity * p.sellPrice);
  }, 0);
  
  const totalProfit = products.reduce((acc, p) => {
      const soldQuantity = INITIAL_STOCK - p.quantity;
      return acc + (soldQuantity * p.profit);
  }, 0);

  const totalProducts = products.reduce((acc, p) => acc + p.quantity, 0);
  
  const totalSales = products.reduce((acc, p) => acc + (INITIAL_STOCK - p.quantity), 0);

  const bestSellingProduct = [...products].sort((a, b) => {
    const profitA = (INITIAL_STOCK - a.quantity) * a.profit;
    const profitB = (INITIAL_STOCK - b.quantity) * b.profit;
    return profitB - profitA;
  })[0] || { name: 'N/A', profit: 0 };

  const stats = [
    {
      titleKey: 'totalProfit',
      value: `$${(totalProfit / 1000).toFixed(1)}k`,
      icon: 'DollarSign',
      change: '+15.2%', // This can be made dynamic later
    },
    {
        titleKey: 'totalRevenue',
        value: `$${(totalSalesValue / 1000).toFixed(1)}k`,
        icon: 'DollarSign',
        change: '+20.1%',
    },
    {
      titleKey: 'totalSales',
      value: `+${totalSales}`,
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
