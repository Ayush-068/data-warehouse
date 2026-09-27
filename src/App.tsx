import React, { useState, useMemo, useEffect } from 'react';
import { Navigation, ActiveTab } from './components/Navigation';
import { LandingPageView } from './components/LandingPageView';
import { DashboardView } from './components/DashboardView';
import { SyntheticDataView } from './components/SyntheticDataView';
import { DataWarehouseView } from './components/DataWarehouseView';
import { PowerQueryEtlView } from './components/PowerQueryEtlView';
import { DaxLibraryView } from './components/DaxLibraryView';
import { BuildManualView } from './components/BuildManualView';
import { ExportModal } from './components/ExportModal';
import { generateInitialCustomerCohort, INITIAL_PRODUCTS } from './data/mockWarehouseData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Dark Theme Management
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('retail_dwh_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('retail_dwh_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('retail_dwh_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Initialize data cohort once
  const { customers, orders } = useMemo(() => {
    return generateInitialCustomerCohort();
  }, []);

  const products = INITIAL_PRODUCTS;

  // Aggregate metrics for Landing Page preview
  const topMetrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + o.netRevenue, 0);
    const uniqueOrders = new Set(orders.map(o => o.orderId)).size;
    const aov = uniqueOrders > 0 ? totalRev / uniqueOrders : 0;
    return {
      totalRevenue: totalRev,
      totalOrders: uniqueOrders,
      totalCustomers: customers.length,
      aov,
      yoyGrowth: 14.8
    };
  }, [orders, customers]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200">
      {/* Universal Segmented Top Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadAll={() => setIsExportOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'landing' && (
          <LandingPageView
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenExport={() => setIsExportOpen(true)}
            metrics={topMetrics}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            customers={customers}
            products={products}
            orders={orders}
          />
        )}

        {activeTab === 'synthetic-data' && (
          <SyntheticDataView
            customers={customers}
            products={products}
            orders={orders}
          />
        )}

        {activeTab === 'data-warehouse' && (
          <DataWarehouseView />
        )}

        {activeTab === 'power-query-etl' && (
          <PowerQueryEtlView />
        )}

        {activeTab === 'dax-measures' && (
          <DaxLibraryView />
        )}

        {activeTab === 'build-manual' && (
          <BuildManualView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Enterprise Data Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Star Schema &amp; RFM K-Means Segmentation</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('landing')} 
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Live Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('data-warehouse')} 
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Star Schema DDL
            </button>
            <button 
              onClick={() => setActiveTab('power-query-etl')} 
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              Power Query Python
            </button>
            <button 
              onClick={() => setActiveTab('dax-measures')} 
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              DAX Measures
            </button>
            <button 
              onClick={() => setIsExportOpen(true)} 
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Export Package
            </button>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        customers={customers}
        products={products}
        orders={orders}
      />
    </div>
  );
}
