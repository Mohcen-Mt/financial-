
import type { Product, Sale } from './types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Classic Black Tee',
    category: 'T-shirt',
    buyPrice: 800,
    sellPrice: 2000,
    quantity: 150,
    color: 'Black',
    size: 'L',
    image: 'product-1',
    profit: 1200,
    addedDate: '2024-05-20',
  },
  {
    id: 'prod-002',
    name: 'Comfy Blue Hoodie',
    category: 'Hoodie',
    buyPrice: 2500,
    sellPrice: 5500,
    quantity: 80,
    color: 'Blue',
    size: 'M',
    image: 'product-2',
    profit: 3000,
    addedDate: '2024-05-18',
  },
  {
    id: 'prod-003',
    name: 'Slim Fit Gray Pants',
    category: 'Pants',
    buyPrice: 3000,
    sellPrice: 6000,
    quantity: 60,
    color: 'Gray',
    size: '32',
    image: 'product-3',
    profit: 3000,
    addedDate: '2024-05-15',
  },
  {
    id: 'prod-004',
    name: 'Plain White Tee',
    category: 'T-shirt',
    buyPrice: 700,
    sellPrice: 1800,
    quantity: 200,
    color: 'White',
    size: 'S',
    image: 'product-4',
    profit: 1100,
    addedDate: '2024-05-12',
  },
  {
    id: 'prod-005',
    name: 'Street Style Red Hoodie',
    category: 'Hoodie',
    buyPrice: 2800,
    sellPrice: 6500,
    quantity: 45,
    color: 'Red',
    size: 'XL',
    image: 'product-5',
    profit: 3700,
    addedDate: '2024-05-10',
  },
  {
    id: 'prod-006',
    name: 'Everyday Black Pants',
    category: 'Pants',
    buyPrice: 2200,
    sellPrice: 4500,
    quantity: 70,
    color: 'Black',
    size: '34',
    image: 'product-6',
    profit: 2300,
    addedDate: '2024-05-09',
  },
];

export const mockSales: Sale[] = [
    {
      id: 'sale-001',
      productId: 'prod-001',
      quantitySold: 2,
      customerName: 'Alice',
      customerPhone: '111-222-3333',
      paymentMethod: 'Card',
      saleDate: '2024-05-21T10:00:00.000Z',
      totalProfit: 2400,
    },
    {
      id: 'sale-002',
      productId: 'prod-002',
      quantitySold: 1,
      customerName: 'Bob',
      customerPhone: '444-555-6666',
      paymentMethod: 'Cash',
      saleDate: '2024-05-21T12:30:00.000Z',
      totalProfit: 3000,
    },
];

export const weeklyProfitData = [
  { week: 'Week 1', profit: 120000 },
  { week: 'Week 2', profit: 180000 },
  { week: 'Week 3', profit: 150000 },
  { week: 'Week 4', profit: 210000 },
];

export const totalProfit = mockProducts.reduce((acc, p) => acc + (p.profit * (250-p.quantity)), 0);
export const totalProducts = mockProducts.reduce((acc, p) => acc + p.quantity, 0);
export const totalSales = mockProducts.length * 20; // Mock value
export const bestSellingProduct = mockProducts[1];
