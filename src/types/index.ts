export type SegmentName = 
  | 'High-Value Champions'
  | 'Loyal Customers'
  | 'At-Risk / Churn Risk'
  | 'Occasional Buyers';

export interface Customer {
  customerId: number;
  name: string;
  email: string;
  city: string;
  country: string;
  signupDate: string;
  // RFM & Cluster attributes
  recencyDays: number;
  frequencyOrders: number;
  monetaryValue: number;
  clusterId: number;
  segment: SegmentName;
}

export interface Product {
  productId: number;
  productName: string;
  category: 'Electronics' | 'Apparel' | 'Home & Kitchen' | 'Beauty & Health' | 'Sports & Outdoors';
  unitPrice: number;
}

export interface Order {
  orderId: number;
  customerId: number;
  productId: number;
  orderDate: string; // YYYY-MM-DD
  quantity: number;
  discount: number; // 0.0 to 0.3
  unitPrice: number;
  grossRevenue: number;
  netRevenue: number;
}

export interface DateDimension {
  dateKey: number; // YYYYMMDD
  fullDate: string;
  year: number;
  quarter: number;
  month: number;
  monthName: string;
  dayOfWeek: string;
  isWeekend: boolean;
}

export interface ClusterCentroid {
  clusterId: number;
  segment: SegmentName;
  color: string;
  recencyMean: number;
  frequencyMean: number;
  monetaryMean: number;
  customerCount: number;
  revenueSharePct: number;
  businessAction: string;
}

export interface FilterState {
  year: number | 'All';
  country: string | 'All';
  category: string | 'All';
  segment: SegmentName | 'All';
  searchQuery: string;
}
