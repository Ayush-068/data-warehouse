import React from 'react';
import { 
  BarChart3, 
  Database, 
  FileSpreadsheet, 
  Cpu, 
  FunctionSquare, 
  BookOpen, 
  Download,
  Home,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

export type ActiveTab = 
  | 'landing'
  | 'dashboard'
  | 'synthetic-data'
  | 'data-warehouse'
  | 'power-query-etl'
  | 'dax-measures'
  | 'build-manual';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onDownloadAll: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onDownloadAll,
  isDark,
  onToggleTheme
}) => {
  // Logical segmentation of deliverables
  const navSections = [
    {
      group: 'Home',
      items: [
        { id: 'landing' as ActiveTab, label: 'Overview', icon: Home, shortLabel: 'Home' }
      ]
    },
    {
      group: 'Analytics',
      items: [
        { id: 'dashboard' as ActiveTab, label: 'Power BI Dashboard', icon: BarChart3, shortLabel: 'Dashboard' }
      ]
    },
    {
      group: 'Data Engineering',
      items: [
        { id: 'synthetic-data' as ActiveTab, label: '1. Synthetic Data', icon: FileSpreadsheet, shortLabel: '1. Data' },
        { id: 'data-warehouse' as ActiveTab, label: '2. Warehouse DDL', icon: Database, shortLabel: '2. Schema' }
      ]
    },
    {
      group: 'Machine Learning',
      items: [
        { id: 'power-query-etl' as ActiveTab, label: '3. Power Query RFM', icon: Cpu, shortLabel: '3. ML ETL' }
      ]
    },
    {
      group: 'BI Modeling',
      items: [
        { id: 'dax-measures' as ActiveTab, label: '4. DAX Measures', icon: FunctionSquare, shortLabel: '4. DAX' },
        { id: 'build-manual' as ActiveTab, label: '5. Build Manual', icon: BookOpen, shortLabel: '5. Manual' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Wordmark & Project Subtitle */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              BI
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Retail DWH &amp; Segmentation
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Star Schema</span>
                <span aria-hidden="true">·</span>
                <span>RFM K-Means</span>
                <span aria-hidden="true">·</span>
                <span className="hidden sm:inline">Power BI</span>
              </div>
            </div>
          </div>

          {/* Segmented Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            {navSections.map((section, sIdx) => (
              <div key={section.group} className="flex items-center">
                {sIdx > 0 && (
                  <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" aria-hidden="true" />
                )}
                <div className="flex items-center gap-1">
                  {section.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        title={tab.label}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200/80 dark:border-slate-700/80'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Right Action Controls: Theme Toggle & Export Package */}
          <div className="flex items-center gap-2">
            {/* Dark Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Export Package Button */}
            <button
              onClick={onDownloadAll}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-xs whitespace-nowrap active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Package</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Secondary Segmented Tab Strip */}
        <div className="lg:hidden flex overflow-x-auto py-2.5 gap-1.5 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
          {navSections.flatMap(s => s.items).map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
