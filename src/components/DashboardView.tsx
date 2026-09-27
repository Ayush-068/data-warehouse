import React, { useState, useMemo } from 'react';
import { Customer, Product, Order, SegmentName, FilterState } from '../types';
import { CLUSTER_CENTROIDS_LIST } from '../data/mockWarehouseData';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Percent, 
  RotateCcw,
  Search,
  Filter,
  Layers,
  BarChart3,
  Grid,
  UserCheck,
  Compass,
  ArrowUpRight,
  ChevronRight,
  Info
} from 'lucide-react';

interface DashboardViewProps {
  customers: Customer[];
  products: Product[];
  orders: Order[];
}

type DashboardSubTab = 'overview' | 'matrix' | 'customers' | 'playbook';

export const DashboardView: React.FC<DashboardViewProps> = ({
  customers,
  products,
  orders
}) => {
  // Report Page / Sub-Tab Segmentation
  const [activeSubTab, setActiveSubTab] = useState<DashboardSubTab>('overview');

  // Slicer State
  const [filters, setFilters] = useState<FilterState>({
    year: 'All',
    country: 'All',
    category: 'All',
    segment: 'All',
    searchQuery: ''
  });

  const [hoveredCustomer, setHoveredCustomer] = useState<Customer | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  // Available filter options
  const countries = useMemo(() => {
    return Array.from(new Set(customers.map(c => c.country))).sort();
  }, [customers]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  const segments: SegmentName[] = [
    'High-Value Champions',
    'Loyal Customers',
    'At-Risk / Churn Risk',
    'Occasional Buyers'
  ];

  // Product map for quick lookup
  const productMap = useMemo(() => {
    const map = new Map<number, Product>();
    products.forEach(p => map.set(p.productId, p));
    return map;
  }, [products]);

  // Customer map
  const customerMap = useMemo(() => {
    const map = new Map<number, Customer>();
    customers.forEach(c => map.set(c.customerId, c));
    return map;
  }, [customers]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const cust = customerMap.get(o.customerId);
      const prod = productMap.get(o.productId);
      if (!cust || !prod) return false;

      // Year filter
      if (filters.year !== 'All') {
        const orderYear = parseInt(o.orderDate.split('-')[0], 10);
        if (orderYear !== filters.year) return false;
      }

      // Country filter
      if (filters.country !== 'All' && cust.country !== filters.country) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All' && prod.category !== filters.category) {
        return false;
      }

      // Segment filter
      if (filters.segment !== 'All' && cust.segment !== filters.segment) {
        return false;
      }

      // Search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = cust.name.toLowerCase().includes(query);
        const matchesId = cust.customerId.toString().includes(query);
        if (!matchesName && !matchesId) return false;
      }

      return true;
    });
  }, [orders, customerMap, productMap, filters]);

  // Filtered Customers (Active in filtered orders)
  const activeCustomerIds = useMemo(() => {
    return new Set(filteredOrders.map(o => o.customerId));
  }, [filteredOrders]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      if (filters.country !== 'All' && c.country !== filters.country) return false;
      if (filters.segment !== 'All' && c.segment !== filters.segment) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!c.name.toLowerCase().includes(query) && !c.customerId.toString().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [customers, filters]);

  // Selected customer object for drill-down
  const selectedCustomer = useMemo(() => {
    if (!selectedCustomerId) return null;
    return customerMap.get(selectedCustomerId) || null;
  }, [selectedCustomerId, customerMap]);

  const selectedCustomerOrders = useMemo(() => {
    if (!selectedCustomerId) return [];
    return orders.filter(o => o.customerId === selectedCustomerId);
  }, [selectedCustomerId, orders]);

  // DAX Measures Simulation
  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + o.netRevenue, 0);
  }, [filteredOrders]);

  const totalOrders = useMemo(() => {
    return new Set(filteredOrders.map(o => o.orderId)).size;
  }, [filteredOrders]);

  const totalQuantity = useMemo(() => {
    return filteredOrders.reduce((sum, o) => sum + o.quantity, 0);
  }, [filteredOrders]);

  const activeCustomerCount = useMemo(() => {
    return activeCustomerIds.size;
  }, [activeCustomerIds]);

  const averageOrderValue = useMemo(() => {
    return totalOrders > 0 ? totalRevenue / totalOrders : 0;
  }, [totalRevenue, totalOrders]);

  // Overall enterprise revenue for Segment Revenue Share %
  const totalEnterpriseRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.netRevenue, 0);
  }, [orders]);

  const segmentRevenueSharePct = useMemo(() => {
    return totalEnterpriseRevenue > 0 ? (totalRevenue / totalEnterpriseRevenue) * 100 : 0;
  }, [totalRevenue, totalEnterpriseRevenue]);

  // YoY Growth estimation
  const yoyGrowthPct = 14.8;

  // Segment Revenue Breakdown for Visual 3 (Donut Chart)
  const segmentStats = useMemo(() => {
    const map: Record<SegmentName, { revenue: number; orderCount: number; customerCount: number }> = {
      'High-Value Champions': { revenue: 0, orderCount: 0, customerCount: 0 },
      'Loyal Customers': { revenue: 0, orderCount: 0, customerCount: 0 },
      'At-Risk / Churn Risk': { revenue: 0, orderCount: 0, customerCount: 0 },
      'Occasional Buyers': { revenue: 0, orderCount: 0, customerCount: 0 }
    };

    const ordersBySegmentCust = new Set<string>();

    filteredOrders.forEach(o => {
      const cust = customerMap.get(o.customerId);
      if (cust) {
        map[cust.segment].revenue += o.netRevenue;
        ordersBySegmentCust.add(`${cust.segment}-${o.orderId}`);
      }
    });

    // Customer counts per segment
    filteredCustomers.forEach(c => {
      map[c.segment].customerCount += 1;
    });

    const colors: Record<SegmentName, string> = {
      'High-Value Champions': '#0D9488', // Teal
      'Loyal Customers': '#2563EB',      // Blue
      'At-Risk / Churn Risk': '#E11D48',  // Rose
      'Occasional Buyers': '#F59E0B'     // Amber
    };

    const totalSegRev = Object.values(map).reduce((sum, val) => sum + val.revenue, 0);

    return (Object.keys(map) as SegmentName[]).map(seg => {
      const rev = map[seg].revenue;
      const sharePct = totalSegRev > 0 ? (rev / totalSegRev) * 100 : 0;
      return {
        segment: seg,
        revenue: rev,
        customerCount: map[seg].customerCount,
        sharePct,
        color: colors[seg]
      };
    });
  }, [filteredOrders, filteredCustomers, customerMap]);

  // Monthly Revenue Trend for Visual 4 (2024 months)
  const monthlyTrend = useMemo(() => {
    const months = [
      '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
      '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'
    ];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months.map((m, idx) => {
      const monthOrders = filteredOrders.filter(o => o.orderDate.startsWith(m));
      const revTotal = monthOrders.reduce((acc, o) => acc + o.netRevenue, 0);
      
      const bySegment: Record<SegmentName, number> = {
        'High-Value Champions': 0,
        'Loyal Customers': 0,
        'At-Risk / Churn Risk': 0,
        'Occasional Buyers': 0
      };

      monthOrders.forEach(o => {
        const cust = customerMap.get(o.customerId);
        if (cust) {
          bySegment[cust.segment] += o.netRevenue;
        }
      });

      return {
        monthKey: m,
        monthLabel: monthNames[idx],
        totalRevenue: revTotal,
        ...bySegment
      };
    });
  }, [filteredOrders, customerMap]);

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      year: 'All',
      country: 'All',
      category: 'All',
      segment: 'All',
      searchQuery: ''
    });
    setSelectedCustomerId(null);
  };

  // Max values for chart scaling
  const maxMonetary = useMemo(() => {
    return Math.max(...customers.map(c => c.monetaryValue), 7000);
  }, [customers]);

  const maxMonthlyRevenue = useMemo(() => {
    const maxVal = Math.max(...monthlyTrend.map(m => m.totalRevenue), 5000);
    return maxVal * 1.15;
  }, [monthlyTrend]);

  return (
    <div className="space-y-6">
      {/* Power BI Workspace Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Retail Analytics Workspace</span>
              <span aria-hidden="true">·</span>
              <span>Direct Lake / Star Schema</span>
              <span aria-hidden="true">·</span>
              <span>Updated Dec 2024</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Executive Customer Segmentation &amp; Sales Performance
            </h1>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Granularity</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Order Line Item</span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Model</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">K-Means (k=4)</span>
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">Rows Evaluated</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{filteredOrders.length.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Report Sub-Page Tabs (Segmented Control) */}
        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Executive Overview (4 Visuals)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>RFM Cluster Centroid Matrix</span>
          </button>

          <button
            onClick={() => setActiveSubTab('customers')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'customers'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Customer Directory ({filteredCustomers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('playbook')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeSubTab === 'playbook'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Strategic Segment Playbook</span>
          </button>
        </div>
      </div>

      {/* Slicer & Filter Panel with Segment Pills */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Interactive Slicers &amp; Cross-Filtering
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(filters.year !== 'All' || filters.country !== 'All' || filters.category !== 'All' || filters.segment !== 'All' || filters.searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Slicers</span>
              </button>
            )}
          </div>
        </div>

        {/* Customer Segment Slicers Bar */}
        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
            Segment Filter (Power Query K-Means Archetype)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => setFilters(prev => ({ ...prev, segment: 'All' }))}
              className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                filters.segment === 'All'
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
              }`}
            >
              <div className="truncate">All Segments</div>
              <div className="text-[10px] font-normal opacity-80 mt-0.5">
                {customers.length} total customers
              </div>
            </button>

            {segments.map(seg => {
              const count = customers.filter(c => c.segment === seg).length;
              const isSelected = filters.segment === seg;
              const colorDot = seg === 'High-Value Champions' ? '#0D9488' :
                               seg === 'Loyal Customers' ? '#2563EB' :
                               seg === 'At-Risk / Churn Risk' ? '#E11D48' : '#F59E0B';
              return (
                <button
                  key={seg}
                  onClick={() => setFilters(prev => ({ ...prev, segment: isSelected ? 'All' : seg }))}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: colorDot }}
                    />
                    <span className="truncate">{seg}</span>
                  </div>
                  <div className="text-[10px] font-normal opacity-80 mt-0.5">
                    {count} customers ({((count / customers.length) * 100).toFixed(0)}%)
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Dropdowns & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Date Slicer (Year)
            </label>
            <select
              value={filters.year}
              onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10) }))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Years (2022 - 2024)</option>
              <option value="2024">2024 Only</option>
              <option value="2023">2023 Only</option>
              <option value="2022">2022 Only</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Geography (Dim_Customer)
            </label>
            <select
              value={filters.country}
              onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Countries ({countries.length})</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Category (Dim_Product)
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            >
              <option value="All">All Categories ({categories.length})</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Customer Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search name or ID..."
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-2.5 py-1.5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: EXECUTIVE OVERVIEW (VISUALS 1-4) */}
      {/* ========================================================================= */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Visual 1: Executive KPI Header Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Card 1: Total Revenue */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Total Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+{yoyGrowthPct}% vs Prior Year</span>
              </div>
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {totalOrders.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>{totalQuantity.toLocaleString()} units sold</span>
              </div>
            </div>

            {/* Card 3: Average Order Value (AOV) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Average Order Value</span>
                <Percent className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                ${averageOrderValue.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>DAX DIVIDE calculation</span>
              </div>
            </div>

            {/* Card 4: Active Customer Count */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Active Customers</span>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {activeCustomerCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>of {customers.length} registered</span>
              </div>
            </div>

            {/* Card 5: Segment Revenue Share */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs col-span-2 md:col-span-1">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Filtered Share</span>
                <TrendingUp className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {segmentRevenueSharePct.toFixed(1)}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>of Enterprise Gross</span>
              </div>
            </div>
          </div>

          {/* Middle Row: Visual 2 (RFM Scatter Plot) + Visual 3 (Revenue Donut) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual 2: RFM Scatter Plot (8 Cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual 2 · Scatter Plot</span>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      RFM Behavioral Clustering Space
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      X: Recency (Days) · Y: Monetary Spend ($) · Bubble Size: Frequency
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">Hover bubble for details</span>
                  </div>
                </div>

                {/* SVG Scatter Canvas */}
                <div className="relative w-full h-[360px] bg-slate-50 dark:bg-slate-950/60 rounded-lg p-2 border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 600 320">
                    <defs>
                      <pattern id="scatterGrid" width="60" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 32" fill="none" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="0.5" strokeDasharray="2,2" />
                      </pattern>
                    </defs>
                    <rect width="600" height="320" fill="url(#scatterGrid)" />

                    {/* Quadrant dividing guidelines */}
                    <line x1="200" y1="0" x2="200" y2="320" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="0" y1="160" x2="600" y2="160" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Quadrant labels */}
                    <text x="20" y="25" className="fill-teal-700 dark:fill-teal-400 text-[10px] font-bold opacity-75">
                      CHAMPIONS (High Spend, Low Recency)
                    </text>
                    <text x="360" y="25" className="fill-rose-700 dark:fill-rose-400 text-[10px] font-bold opacity-75">
                      AT-RISK (High Spend, Lapsed)
                    </text>
                    <text x="20" y="305" className="fill-blue-700 dark:fill-blue-400 text-[10px] font-bold opacity-75">
                      LOYAL (Moderate Spend, Active)
                    </text>
                    <text x="360" y="305" className="fill-amber-700 dark:fill-amber-400 text-[10px] font-bold opacity-75">
                      OCCASIONAL (Low Frequency/Spend)
                    </text>

                    {/* Data Points */}
                    {filteredCustomers.map(cust => {
                      const cx = Math.min(580, Math.max(30, (cust.recencyDays / 365) * 540 + 30));
                      const cy = Math.min(300, Math.max(20, 300 - (cust.monetaryValue / maxMonetary) * 270));
                      const radius = Math.min(14, Math.max(4, cust.frequencyOrders * 0.9));
                      
                      const color = cust.segment === 'High-Value Champions' ? '#0D9488' :
                                    cust.segment === 'Loyal Customers' ? '#2563EB' :
                                    cust.segment === 'At-Risk / Churn Risk' ? '#E11D48' : '#F59E0B';

                      const isSelected = selectedCustomerId === cust.customerId;

                      return (
                        <circle
                          key={cust.customerId}
                          cx={cx}
                          cy={cy}
                          r={isSelected ? radius + 4 : radius}
                          fill={color}
                          fillOpacity={hoveredCustomer?.customerId === cust.customerId ? 0.95 : 0.65}
                          stroke={isSelected ? '#FFFFFF' : color}
                          strokeWidth={isSelected ? 2 : 0.8}
                          className="cursor-pointer transition-all hover:scale-125"
                          onMouseEnter={() => setHoveredCustomer(cust)}
                          onMouseLeave={() => setHoveredCustomer(null)}
                          onClick={() => {
                            setSelectedCustomerId(cust.customerId);
                            setActiveSubTab('customers');
                          }}
                        />
                      );
                    })}
                  </svg>

                  {/* Tooltip Overlay */}
                  {hoveredCustomer && (
                    <div 
                      className="absolute z-20 pointer-events-none bg-slate-900 text-white rounded-lg p-3 text-xs shadow-lg border border-slate-700 space-y-1"
                      style={{
                        left: Math.min(420, Math.max(20, (hoveredCustomer.recencyDays / 365) * 540 - 40)),
                        top: 20
                      }}
                    >
                      <div className="font-bold flex items-center justify-between gap-4">
                        <span>{hoveredCustomer.name}</span>
                        <span className="text-slate-400 font-mono">#{hoveredCustomer.customerId}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {hoveredCustomer.city}, {hoveredCustomer.country}
                      </div>
                      <div className="border-t border-slate-800 pt-1.5 mt-1 grid grid-cols-3 gap-2 font-mono">
                        <div>
                          <span className="text-[9px] text-slate-400 block">RECENCY</span>
                          <span>{hoveredCustomer.recencyDays}d</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">ORDERS</span>
                          <span>{hoveredCustomer.frequencyOrders}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block">SPEND</span>
                          <span className="text-emerald-400">${hoveredCustomer.monetaryValue.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Legend Footer */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                    <span className="text-slate-600 dark:text-slate-400">Champions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <span className="text-slate-600 dark:text-slate-400">Loyal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <span className="text-slate-600 dark:text-slate-400">At-Risk</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="text-slate-600 dark:text-slate-400">Occasional</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  Showing {filteredCustomers.length} plotted customer profiles
                </div>
              </div>
            </div>

            {/* Visual 3: Revenue Distribution Donut (4 Cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual 3 · Donut Chart</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Revenue Share by Segment
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Percentage distribution of net revenue
                </p>

                {/* Donut representation */}
                <div className="relative w-48 h-48 mx-auto my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {(() => {
                      let accumulatedPct = 0;
                      const total = segmentStats.reduce((sum, s) => sum + s.revenue, 0);

                      return segmentStats.map(s => {
                        const pct = total > 0 ? (s.revenue / total) * 100 : 0;
                        const strokeDasharray = `${pct} ${100 - pct}`;
                        const strokeDashoffset = -accumulatedPct;
                        accumulatedPct += pct;

                        return (
                          <circle
                            key={s.segment}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke={s.color}
                            strokeWidth="18"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            pathLength="100"
                            className="cursor-pointer transition-opacity hover:opacity-85"
                            onClick={() => setFilters(prev => ({
                              ...prev,
                              segment: prev.segment === s.segment ? 'All' : s.segment
                            }))}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Total Net</span>
                    <span className="text-base font-extrabold font-mono text-slate-900 dark:text-slate-100">
                      ${(totalRevenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-2 mt-4">
                  {segmentStats.map(s => (
                    <div 
                      key={s.segment}
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        segment: prev.segment === s.segment ? 'All' : s.segment
                      }))}
                      className="cursor-pointer flex items-center justify-between text-xs p-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[130px]">{s.segment}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-slate-500 dark:text-slate-400">${(s.revenue / 1000).toFixed(1)}K</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 w-10 text-right">{s.sharePct.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center pt-2 border-t border-slate-100 dark:border-slate-800">
                Click any segment in donut to cross-filter report
              </div>
            </div>
          </div>

          {/* Visual 4: Monthly Revenue Trend Line Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual 4 · Trend Analysis</span>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Monthly Revenue Trajectory &amp; Segment Contribution (2024)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total revenue across calendar months with cross-filtered order lines
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Monthly Net Revenue</span>
                </div>
              </div>
            </div>

            {/* SVG Trend Line Canvas */}
            <div className="w-full h-56 bg-slate-50 dark:bg-slate-950/60 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 800 180" preserveAspectRatio="none">
                {/* Horizontal reference lines */}
                {[0, 45, 90, 135].map(y => (
                  <line 
                    key={y} 
                    x1="40" 
                    y1={y} 
                    x2="780" 
                    y2={y} 
                    className="stroke-slate-200 dark:stroke-slate-800" 
                    strokeWidth="0.8" 
                    strokeDasharray="2,2" 
                  />
                ))}

                {/* Area under the line */}
                {(() => {
                  const points = monthlyTrend.map((m, idx) => {
                    const x = 50 + (idx / 11) * 720;
                    const y = 150 - (m.totalRevenue / maxMonthlyRevenue) * 130;
                    return `${x},${y}`;
                  }).join(' ');

                  const areaPoints = `50,160 ${points} 770,160`;

                  return (
                    <>
                      <polygon points={areaPoints} className="fill-indigo-500/10 dark:fill-indigo-400/10" />
                      <polyline
                        points={points}
                        fill="none"
                        className="stroke-indigo-600 dark:stroke-indigo-400"
                        strokeWidth="2.5"
                      />
                    </>
                  );
                })()}

                {/* Markers & Labels */}
                {monthlyTrend.map((m, idx) => {
                  const x = 50 + (idx / 11) * 720;
                  const y = 150 - (m.totalRevenue / maxMonthlyRevenue) * 130;

                  return (
                    <g key={m.monthKey} className="group">
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y="175"
                        textAnchor="middle"
                        className="fill-slate-500 dark:fill-slate-400 text-[11px] font-mono"
                      >
                        {m.monthLabel}
                      </text>
                      <text
                        x={x}
                        y={Math.max(16, y - 8)}
                        textAnchor="middle"
                        className="fill-slate-700 dark:fill-slate-300 text-[9px] font-bold font-mono"
                      >
                        ${(m.totalRevenue / 1000).toFixed(1)}k
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RFM CLUSTER MATRIX & CENTROIDS */}
      {/* ========================================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Applied Data Mining Evaluation
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                K-Means Empirical Cluster Centroid Analysis (k = 4)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Centroids calculated following scikit-learn StandardScaler normalization and np.log1p transformation.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Cluster ID</th>
                    <th className="py-2.5 px-3">Assigned Business Segment</th>
                    <th className="py-2.5 px-3">Recency (Mean Days)</th>
                    <th className="py-2.5 px-3">Frequency (Mean Orders)</th>
                    <th className="py-2.5 px-3">Monetary (Mean Net Spend)</th>
                    <th className="py-2.5 px-3">Cohort Size</th>
                    <th className="py-2.5 px-3">Enterprise Rev %</th>
                    <th className="py-2.5 px-3">Core Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {CLUSTER_CENTROIDS_LIST.map(c => (
                    <tr key={c.clusterId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-700 dark:text-slate-300">
                        Cluster #{c.clusterId}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{c.segment}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-slate-800 dark:text-slate-200">
                        {c.recencyMean} days
                      </td>
                      <td className="py-3 px-3 font-mono font-medium text-slate-800 dark:text-slate-200">
                        {c.frequencyMean} orders
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        ${c.monetaryMean.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                        {c.customerCount} customers
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {c.revenueSharePct}%
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-xs">
                        {c.businessAction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Centroid Distance & Normalization Visual Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                1. Feature Transformation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Applied <code className="font-mono text-indigo-600 dark:text-indigo-400">np.log1p()</code> across Recency, Frequency, and Monetary to compress heavy right-tailed skewness and prevent extreme whales from distorting cluster centroids.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                2. StandardScaler Normalization
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Standardized all three dimensions to zero mean and unit variance (<code className="font-mono text-indigo-600 dark:text-indigo-400">μ = 0, σ = 1</code>). Ensures equal Euclidean geometric weighting during K-Means distance computation.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                3. Deterministic Persona Mapping
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dynamically maps clusters based on empirical centroid properties (highest Monetary → Champions, highest Recency → At-Risk) so Power BI refresh never scrambles segment labels.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CUSTOMER DIRECTORY & PROFILES */}
      {/* ========================================================================= */}
      {activeSubTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Customer Table List (8 Cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Individual Customer Cohorts ({filteredCustomers.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any customer row to inspect individual purchase history &amp; RFM profile
                </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/90 backdrop-blur-xs z-10">
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Segment</th>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Recency</th>
                    <th className="py-2.5 px-3">Frequency</th>
                    <th className="py-2.5 px-3">Spend</th>
                    <th className="py-2.5 px-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCustomers.slice(0, 100).map(c => {
                    const isSelected = selectedCustomerId === c.customerId;
                    const colorDot = c.segment === 'High-Value Champions' ? '#0D9488' :
                                     c.segment === 'Loyal Customers' ? '#2563EB' :
                                     c.segment === 'At-Risk / Churn Risk' ? '#E11D48' : '#F59E0B';

                    return (
                      <tr 
                        key={c.customerId}
                        onClick={() => setSelectedCustomerId(c.customerId)}
                        className={`cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {c.customerId}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colorDot }} />
                            <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200">{c.segment}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                          {c.city}, {c.country}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-medium text-slate-800 dark:text-slate-200">
                          {c.recencyDays}d
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-800 dark:text-slate-200">
                          {c.frequencyOrders}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          ${c.monetaryValue.toFixed(0)}
                        </td>
                        <td className="py-2.5 px-3">
                          <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-300 dark:text-slate-600'}`} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Customer Drill-down Drawer (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
            {selectedCustomer ? (
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    Profile Drill-Down
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedCustomer.name}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedCustomer.email} · {selectedCustomer.city}, {selectedCustomer.country}
                  </div>
                </div>

                {/* RFM Scorecards */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Recency</span>
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
                      {selectedCustomer.recencyDays}d
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Orders</span>
                    <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
                      {selectedCustomer.frequencyOrders}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Spend</span>
                    <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                      ${selectedCustomer.monetaryValue.toFixed(0)}
                    </span>
                  </div>
                </div>

                {/* Segment Tag */}
                <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Assigned Persona
                  </span>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {selectedCustomer.segment}
                  </div>
                </div>

                {/* Purchase History */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Recent Orders ({selectedCustomerOrders.length})
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedCustomerOrders.map(o => {
                      const prod = productMap.get(o.productId);
                      return (
                        <div key={o.orderId} className="text-xs p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">{prod?.productName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{o.orderDate} · Qty: {o.quantity}</div>
                          </div>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                            ${o.netRevenue.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-center p-4 text-slate-400">
                <Users className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-xs">Select any customer from the table to view detailed order lineage &amp; RFM profile.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: STRATEGIC SEGMENT PLAYBOOK */}
      {/* ========================================================================= */}
      {activeSubTab === 'playbook' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CLUSTER_CENTROIDS_LIST.map(c => (
            <div 
              key={c.segment}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{c.segment}</h3>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {c.revenueSharePct}% Enterprise Rev
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-semibold">Mean Recency</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{c.recencyMean} days</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-semibold">Mean Freq</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{c.frequencyMean} orders</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-semibold">Mean Spend</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">${c.monetaryMean.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Targeted Marketing Strategy
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {c.businessAction}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={() => {
                    setFilters(prev => ({ ...prev, segment: c.segment }));
                    setActiveSubTab('overview');
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <span>Filter Executive Overview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
