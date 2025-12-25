
import type { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Classic Black Tee',
    category: 'T-shirt',
    buyPrice: 8,
    sellPrice: 20,
    quantity: 150,
    color: 'Black',
    size: 'L',
    image: 'product-1',
    profit: 12,
    addedDate: '2024-05-20',
  },
  {
    id: 'prod-002',
    name: 'Comfy Blue Hoodie',
    category: 'Hoodie',
    buyPrice: 25,
    sellPrice: 55,
    quantity: 80,
    color: 'Blue',
    size: 'M',
    image: 'product-2',
    profit: 30,
    addedDate: '2024-05-18',
  },
  {
    id: 'prod-003',
    name: 'Slim Fit Gray Pants',
    category: 'Pants',
    buyPrice: 30,
    sellPrice: 60,
    quantity: 60,
    color: 'Gray',
    size: '32',
    image: 'product-3',
    profit: 30,
    addedDate: '2024-05-15',
  },
  {
    id: 'prod-004',
    name: 'Plain White Tee',
    category: 'T-shirt',
    buyPrice: 7,
    sellPrice: 18,
    quantity: 200,
    color: 'White',
    size: 'S',
    image: 'product-4',
    profit: 11,
    addedDate: '2024-05-12',
  },
  {
    id: 'prod-005',
    name: 'Street Style Red Hoodie',
    category: 'Hoodie',
    buyPrice: 28,
    sellPrice: 65,
    quantity: 45,
    color: 'Red',
    size: 'XL',
    image: 'product-5',
    profit: 37,
    addedDate: '2024-05-10',
  },
  {
    id: 'prod-006',
    name: 'Everyday Black Pants',
    category: 'Pants',
    buyPrice: 22,
    sellPrice: 45,
    quantity: 70,
    color: 'Black',
    size: '34',
    image: 'product-6',
    profit: 23,
    addedDate: '2024-05-09',
  },
];

export const weeklyProfitData = [
  { week: 'Week 1', profit: 1200 },
  { week: 'Week 2', profit: 1800 },
  { week: 'Week 3', profit: 1500 },
  { week: 'Week 4', profit: 2100 },
];

export const totalProfit = mockProducts.reduce((acc, p) => acc + (p.profit * (250-p.quantity)), 0);
export const totalProducts = mockProducts.reduce((acc, p) => acc + p.quantity, 0);
export const totalSales = mockProducts.length * 20; // Mock value
export const bestSellingProduct = mockProducts[1];
