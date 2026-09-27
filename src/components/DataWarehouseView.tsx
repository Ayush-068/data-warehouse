import React, { useState } from 'react';
import { SQL_STAR_SCHEMA_DDL } from '../data/codeDeliverables';
import { downloadTextFile } from '../utils/exportUtils';
import { 
  Database, 
  Key, 
  Layers, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck,
  FileCode2
} from 'lucide-react';

export const DataWarehouseView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTable, setActiveTable] = useState<'Fact_Sales' | 'Dim_Customer' | 'Dim_Product' | 'Dim_Date'>('Fact_Sales');

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_STAR_SCHEMA_DDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    downloadTextFile('create_star_schema.sql', SQL_STAR_SCHEMA_DDL, 'text/sql');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Deliverable 2</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise Star Schema (Dimensional Modeling)</span>
              <span aria-hidden="true">·</span>
              <span>Kimball Methodology</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Data Warehouse Schema (SQL DDL)
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Fully optimized Star Schema supporting high-performance analytical slicing in Power BI. 
              Features Surrogate Keys, Conformed Dimensions, B-Tree and Non-Clustered Indexes, Foreign Key Constraints, and an automated calendar generator for <code className="font-mono text-slate-800 dark:text-slate-300">Dim_Date</code>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied DDL' : 'Copy SQL'}</span>
            </button>
            <button
              onClick={handleDownloadSql}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .sql</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Star Schema ERD Architecture */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Star Schema Dimensional Architecture Diagram
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Central Fact Table at transactional line grain flanked by 3 Conformed Dimensions
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ANSI SQL Validated</span>
          </div>
        </div>

        {/* Interactive ERD Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Dimension 1: Dim_Customer */}
          <div 
            onClick={() => setActiveTable('Dim_Customer')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTable === 'Dim_Customer'
                ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/30 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dim_Customer</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded">
                Dimension
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <div className="flex justify-between items-center text-indigo-600 dark:text-indigo-400 font-bold">
                <span className="flex items-center gap-1"><Key className="w-3 h-3" /> CustomerKey (PK)</span>
                <span className="text-slate-400">BIGINT</span>
              </div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">CustomerID (UK)</span><span className="text-slate-400">INT</span></div>
              <div className="flex justify-between"><span>Name</span><span className="text-slate-400">VARCHAR(150)</span></div>
              <div className="flex justify-between"><span>Email</span><span className="text-slate-400">VARCHAR(200)</span></div>
              <div className="flex justify-between"><span>City, Country</span><span className="text-slate-400">VARCHAR(100)</span></div>
              <div className="flex justify-between"><span>SignupDate</span><span className="text-slate-400">DATE</span></div>
              <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                <span>CustomerSegment</span><span className="text-slate-400">VARCHAR(50)</span>
              </div>
            </div>
          </div>

          {/* Central Fact: Fact_Sales */}
          <div 
            onClick={() => setActiveTable('Fact_Sales')}
            className={`cursor-pointer rounded-xl border p-4 transition-all md:scale-105 z-10 ${
              activeTable === 'Fact_Sales'
                ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-md ring-2 ring-indigo-500/20'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2 bg-indigo-600 -mx-4 -mt-4 p-3 rounded-t-xl text-white">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Fact_Sales</span>
              </span>
              <span className="text-[10px] uppercase font-bold bg-white/20 px-1.5 py-0.5 rounded">
                Center Fact
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 pt-1">
              <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-bold">
                <span className="flex items-center gap-1"><Key className="w-3 h-3" /> SalesKey (PK)</span>
                <span className="text-slate-400">BIGINT</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                <span>OrderID</span><span className="text-slate-400">INT</span>
              </div>
              <div className="flex justify-between text-amber-600 dark:text-amber-400 font-medium">
                <span>DateKey (FK)</span><span className="text-slate-400">INT</span>
              </div>
              <div className="flex justify-between text-blue-600 dark:text-blue-400 font-medium">
                <span>CustomerKey (FK)</span><span className="text-slate-400">BIGINT</span>
              </div>
              <div className="flex justify-between text-purple-600 dark:text-purple-400 font-medium">
                <span>ProductKey (FK)</span><span className="text-slate-400">INT</span>
              </div>
              <div className="flex justify-between"><span>Quantity</span><span className="text-slate-400">INT</span></div>
              <div className="flex justify-between"><span>UnitPrice</span><span className="text-slate-400">NUMERIC(12,2)</span></div>
              <div className="flex justify-between"><span>DiscountRate</span><span className="text-slate-400">NUMERIC(5,4)</span></div>
              <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                <span>TotalRevenue</span><span className="text-slate-400">NUMERIC(12,2)</span>
              </div>
            </div>
          </div>

          {/* Dimension 2: Dim_Product */}
          <div 
            onClick={() => setActiveTable('Dim_Product')}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              activeTable === 'Dim_Product'
                ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/30 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-purple-500" />
                <span>Dim_Product</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded">
                Dimension
              </span>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
              <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-bold">
                <span className="flex items-center gap-1"><Key className="w-3 h-3" /> ProductKey (PK)</span>
                <span className="text-slate-400">INT</span>
              </div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-400">ProductID (UK)</span><span className="text-slate-400">INT</span></div>
              <div className="flex justify-between"><span>ProductName</span><span className="text-slate-400">VARCHAR(200)</span></div>
              <div className="flex justify-between font-semibold text-slate-800 dark:text-slate-200">
                <span>Category</span><span className="text-slate-400">VARCHAR(100)</span>
              </div>
              <div className="flex justify-between"><span>UnitPrice</span><span className="text-slate-400">NUMERIC(12,2)</span></div>
            </div>
          </div>
        </div>

        {/* Dimension 3: Dim_Date (Spanning Bottom) */}
        <div 
          onClick={() => setActiveTable('Dim_Date')}
          className={`cursor-pointer rounded-xl border p-4 transition-all ${
            activeTable === 'Dim_Date'
              ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-2">
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span>Dim_Date (Calendar Role-Playing Dimension)</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.5 rounded">
              Time Intelligence Dimension
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            <div className="text-indigo-600 dark:text-indigo-400 font-bold">DateKey (PK) [YYYYMMDD]</div>
            <div>FullDate [DATE]</div>
            <div>Year, Quarter, QuarterName</div>
            <div>Month, MonthName, MonthYear</div>
            <div>DayOfMonth, DayOfWeek</div>
            <div>DayOfWeekNumber (1-7)</div>
            <div>IsWeekend [BOOLEAN]</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold">Pre-populated 2020-2030</div>
          </div>
        </div>
      </div>

      {/* SQL DDL Code Viewer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">create_star_schema.sql (ANSI SQL DDL)</span>
          </div>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy SQL DDL'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed select-all">
          {SQL_STAR_SCHEMA_DDL}
        </pre>
      </div>
    </div>
  );
};
