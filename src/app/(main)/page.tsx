
import { bestSellingProduct, mockProducts, totalProducts, totalProfit, totalSales, weeklyProfitData } from '@/lib/data';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default function DashboardPage() {
  const stats = [
    {
      titleKey: 'totalProfit',
      value: `$${(totalProfit / 1000).toFixed(1)}k`,
      icon: 'DollarSign',
      change: '+15.2%',
    },
    {
      titleKey: 'totalProducts',
      value: totalProducts,
      icon: 'Package',
      change: '+200',
    },
    {
      titleKey: 'totalSales',
      value: totalSales,
      icon: 'ShoppingCart',
      change: '+50',
    },
    {
      titleKey: 'bestSellingProduct',
      value: bestSellingProduct.name,
      icon: 'TrendingUp',
      change: `Profit: $${bestSellingProduct.profit}`,
    },
  ];

  return (
    <DashboardClient stats={stats} weeklyProfitData={weeklyProfitData} recentProducts={mockProducts.slice(0, 5)} />
  );
}
