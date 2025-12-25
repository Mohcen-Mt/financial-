
'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ProfitChartProps {
  data: { week: string; profit: number }[];
}

export function ProfitChart({ data }: ProfitChartProps) {
  const chartConfig = {
    profit: {
      label: 'Profit',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <Card className="glassmorphic lg:col-span-4">
      <CardHeader>
        <CardTitle className="font-headline">{'Profit Analysis'}</CardTitle>
      </CardHeader>
      <CardContent className="ps-2">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={data}>
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <YAxis
                tickFormatter={(value) => `$${value / 1000}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
             />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="profit" fill="var(--color-profit)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
