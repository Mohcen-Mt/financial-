
'use client';

import { useProducts } from '@/contexts/products-provider';
import { useSales } from '@/contexts/sales-provider';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

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

  const bestSellingProductProfitMap = new Map<string, number>();
  sales.forEach(sale => {
    bestSellingProductProfitMap.set(sale.productId, (bestSellingProductProfitMap.get(sale.productId) || 0) + sale.totalProfit);
  });
  
  const bestSellingProductId = [...bestSellingProductProfitMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const bestSellingProduct = products.find(p => p.id === bestSellingProductId);
  const bestSellingProductProfit = bestSellingProduct ? bestSellingProductProfitMap.get(bestSellingProduct.id) || 0 : 0;


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
      value: bestSellingProduct?.name || 'N/A',
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

  const recentProducts = products.sort((a,b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()).slice(0, 5);

  return (
    <DashboardClient stats={stats} weeklyProfitData={weeklyProfitData} recentProducts={recentProducts} />
  );
}
