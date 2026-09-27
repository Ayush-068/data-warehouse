import React from 'react';
import { 
  BarChart3, 
  Database, 
  FileSpreadsheet, 
  Cpu, 
  FunctionSquare, 
  BookOpen, 
  ArrowRight, 
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Zap,
  Download
} from 'lucide-react';
import { ActiveTab } from './Navigation';
import { CLUSTER_CENTROIDS_LIST } from '../data/mockWarehouseData';

interface LandingPageViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenExport: () => void;
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    aov: number;
    yoyGrowth: number;
  };
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onNavigate,
  onOpenExport,
  metrics
}) => {
  const deliverables = [
    {
      id: 'dashboard' as ActiveTab,
      category: 'Analytics Execution',
      number: 'Interactive',
      title: 'Power BI Executive Dashboard',
      description: 'Simulated 16:9 widescreen Power BI report featuring KPI cards, RFM scatter plot, revenue share donut, and 2024 monthly trend lines.',
      icon: BarChart3,
      badge: 'Interactive Report',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      actionText: 'Launch Dashboard'
    },
    {
      id: 'synthetic-data' as ActiveTab,
      category: 'Data Engineering',
      number: 'Deliverable 1',
      title: 'Synthetic Data Generator',
      description: 'Production Python script generating raw_customers.csv, raw_products.csv, and raw_orders.csv with latent RFM clustering behaviors.',
      icon: FileSpreadsheet,
      badge: 'Python / Faker',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      actionText: 'View Generator'
    },
    {
      id: 'data-warehouse' as ActiveTab,
      category: 'Data Architecture',
      number: 'Deliverable 2',
      title: 'Star Schema Data Warehouse',
      description: 'Standard ANSI SQL DDL scripts creating Dim_Customer, Dim_Product, Dim_Date, and Fact_Sales with surrogate keys and star-join indexing.',
      icon: Database,
      badge: 'SQL DDL / ERD',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      actionText: 'Inspect Schema'
    },
    {
      id: 'power-query-etl' as ActiveTab,
      category: 'Machine Learning',
      number: 'Deliverable 3',
      title: 'Power Query Python RFM Pipeline',
      description: 'Embedded Power Query script executing StandardScaler normalization, KMeans(n_clusters=4), and centroid-based business persona mapping.',
      icon: Cpu,
      badge: 'scikit-learn / M',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      actionText: 'Review ML ETL'
    },
    {
      id: 'dax-measures' as ActiveTab,
      category: 'Tabular Modeling',
      number: 'Deliverable 4',
      title: 'Enterprise DAX Measures Library',
      description: 'Formal DAX measures organized for _Measures table: Total Revenue, AOV, YoY Revenue Growth %, and Segment Share with DIVIDE safety.',
      icon: FunctionSquare,
      badge: 'DAX Tabular',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      actionText: 'Browse DAX'
    },
    {
      id: 'build-manual' as ActiveTab,
      category: 'Implementation',
      number: 'Deliverable 5',
      title: 'Power BI Desktop Build Manual',
      description: 'Step-by-step visual configuration guide detailing canvas dimensions (1920x1080), slicer panel layouts, visual coordinates, and colors.',
      icon: BookOpen,
      badge: 'Implementation SOP',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      actionText: 'Read Manual'
    }
  ];

  const pipelineStages = [
    {
      step: '01',
      title: 'Raw Data Synthesis',
      tech: 'Python / NumPy',
      desc: 'Generates 2,500 customers, product catalog, and 12,000+ orders with natural log-normal spend distribution.'
    },
    {
      step: '02',
      title: 'Star Schema DWH',
      tech: 'ANSI SQL / DDL',
      desc: 'Dimensional model with 3 Dimensions, 1 Fact table, surrogate keys, calendar dimension, and covering indexes.'
    },
    {
      step: '03',
      title: 'Power Query ML ETL',
      tech: 'Python in Power Query',
      desc: 'Calculates raw RFM, applies StandardScaler, fits KMeans(k=4), and maps empirical centroids.'
    },
    {
      step: '04',
      title: 'DAX Business Logic',
      tech: 'DAX / Tabular Model',
      desc: 'Pre-computed business metrics, YoY time-intelligence calculations, and dynamic segment revenue share.'
    },
    {
      step: '05',
      title: 'Executive Visuals',
      tech: 'Power BI Desktop',
      desc: '16:9 widescreen canvas with cross-filtering KPI cards, RFM scatter plot, donut chart, and monthly trend.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 shadow-xl border border-slate-700/50">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>End-to-End Enterprise Technical Package · Power BI + RFM ML</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Retail Customer Segmentation &amp; Star Schema Data Warehouse
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            A production-grade, architectural blueprint uniting dimensional data modeling, 
            applied data mining (<span className="text-indigo-300 font-medium">RFM K-Means Clustering</span>), 
            Power Query Python ETL, and executive Power BI reporting.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-950/50"
            >
              <span>Launch Power BI Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('data-warehouse')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-600 transition-all"
            >
              <Database className="w-4 h-4 text-slate-300" />
              <span>Inspect Star Schema DDL</span>
            </button>
            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Package (.ZIP)</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Backdrop */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Live Enterprise KPI Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Evaluated Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            ${(metrics.totalRevenue / 1000).toFixed(1)}K
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{metrics.yoyGrowth}% YoY Growth</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Processed Orders</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            {metrics.totalOrders.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Granularity: Order Line Item</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Customer Universe</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            {metrics.totalCustomers.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>4 K-Means Segments</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Order Value</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">
            ${metrics.aov.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Calculated via DAX DIVIDE</span>
          </div>
        </div>
      </section>

      {/* End-to-End Pipeline Architecture Flow */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs transition-colors">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Layers className="w-4 h-4" />
            <span>Architecture &amp; Data Lineage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            End-to-End Retail Intelligence Pipeline
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            From raw transaction synthesis to star schema data warehousing, machine learning clustering, and Power BI DAX presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {pipelineStages.map((stage, idx) => (
            <div 
              key={stage.step}
              className="relative bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {stage.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {stage.tech}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-1">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>

              {idx < pipelineStages.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    →
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4 RFM Segments Strategic Matrix */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Applied Data Mining
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Customer Segments &amp; Centroid Behavioral Archetypes
            </h2>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore live scatter plot in Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLUSTER_CENTROIDS_LIST.map((c) => (
            <div 
              key={c.segment}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: c.color }} 
                  />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                    {c.segment}
                  </h3>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Avg Recency</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{c.recencyMean} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Avg Frequency</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{c.frequencyMean} orders</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Avg Monetary</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">${c.monetaryMean.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Revenue Share</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{c.revenueSharePct}%</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                    Playbook Strategy
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    {c.businessAction}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('dashboard')}
                className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between group"
              >
                <span>Filter in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Project Deliverables Cards */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Project Technical Package
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            5 Complete Technical Deliverables
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Access ready-to-run scripts, database schemas, Power Query algorithms, DAX measure files, and the setup manual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {item.number}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Standards & Technical Highlights */}
      <section className="bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Production Standards</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Surrogate keys, ANSI SQL compliance, zero placeholders, strict foreign key constraints, and 
              safe DAX calculation functions with mathematical zero-division protection.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Zap className="w-4 h-4" />
              <span>Deterministic Clustering</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              StandardScaler with log-transformed feature distribution. Centroid-based dynamic mapping 
              prevents cluster label flipping across model refresh cycles.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Power BI Tabular Guidelines</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Organized dedicated _Measures table, explicit measure references, role-playing Dim_Date table, 
              and precise coordinate specs for 1920x1080 canvas layout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
