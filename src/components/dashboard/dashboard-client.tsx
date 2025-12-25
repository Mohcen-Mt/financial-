
'use client';
import { Header } from "@/components/layout/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProfitChart } from "@/components/dashboard/profit-chart";
import { RecentProductsTable } from "@/components/dashboard/recent-products-table";
import type { Product } from "@/lib/types";
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
};

interface Stat {
  titleKey: string;
  value: string | number;
  icon: string;
  change: string;
}

const titles: { [key: string]: string } = {
  totalProfit: 'Total Profit',
  totalRevenue: 'Total Revenue',
  totalSales: 'Total Sales',
  bestSellingProduct: 'Best Selling Product',
};

interface weeklyProfitDataType {
    week: string;
    profit: number;
}

interface DashboardClientProps {
  stats: Stat[];
  weeklyProfitData: weeklyProfitDataType[];
  recentProducts: Product[];
  suppressHydrationWarning?: boolean;
}

export function DashboardClient({ stats, weeklyProfitData, recentProducts, suppressHydrationWarning }: DashboardClientProps) {
  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>
      <Header title={'Dashboard'} />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.titleKey}
              title={titles[stat.titleKey] || stat.titleKey}
              value={stat.value}
              icon={iconMap[stat.icon]}
              change={stat.change}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <ProfitChart data={weeklyProfitData} />
          <RecentProductsTable products={recentProducts} />
        </div>
      </div>
    </div>
  );
}
