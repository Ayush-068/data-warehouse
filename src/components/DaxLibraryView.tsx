import React, { useState } from 'react';
import { DAX_MEASURES_CODE } from '../data/codeDeliverables';
import { downloadTextFile } from '../utils/exportUtils';
import { 
  FunctionSquare, 
  Copy, 
  Check, 
  Download, 
  Calculator, 
  Layers, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock 
} from 'lucide-react';

interface DaxMeasureItem {
  name: string;
  category: 'Core Sales' | 'Customer RFM' | 'Time Intelligence' | 'Segmentation Share';
  dax: string;
  format: string;
  description: string;
  evaluationContext: string;
}

export const DaxLibraryView: React.FC = () => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedMeasure, setCopiedMeasure] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const measures: DaxMeasureItem[] = [
    {
      name: 'Total Revenue',
      category: 'Core Sales',
      format: 'Currency ($#,##0.00)',
      description: 'Aggregates net sales revenue earned across transactions.',
      evaluationContext: 'Slices dynamically across Dim_Date, Dim_Customer, and Dim_Product.',
      dax: `Total Revenue = \nSUM ( Fact_Sales[TotalRevenue] )`
    },
    {
      name: 'Total Orders',
      category: 'Core Sales',
      format: 'Whole Number (#,##0)',
      description: 'Counts distinct customer order baskets to avoid duplicate line-item inflation.',
      evaluationContext: 'Evaluates at order grain across the active date and customer filter.',
      dax: `Total Orders = \nDISTINCTCOUNT ( Fact_Sales[OrderID] )`
    },
    {
      name: 'Average Order Value (AOV)',
      category: 'Core Sales',
      format: 'Currency ($#,##0.00)',
      description: 'Computes average dollar yield per transaction basket using division safety.',
      evaluationContext: 'Guards against division by zero via DIVIDE() function.',
      dax: `Average Order Value (AOV) = \nDIVIDE (\n    [Total Revenue],\n    [Total Orders],\n    0\n)`
    },
    {
      name: 'Active Customer Count',
      category: 'Customer RFM',
      format: 'Whole Number (#,##0)',
      description: 'Distinct count of unique customer keys who executed transactions in the period.',
      evaluationContext: 'Calculates active reach vs total registered universe in Dim_Customer.',
      dax: `Active Customer Count = \nDISTINCTCOUNT ( Fact_Sales[CustomerKey] )`
    },
    {
      name: 'YoY Revenue Growth %',
      category: 'Time Intelligence',
      format: 'Percentage (0.0%)',
      description: 'Calculates year-over-year revenue percentage variance relative to previous calendar year.',
      evaluationContext: 'Uses SAMEPERIODLASTYEAR() on Dim_Date[FullDate] calendar table.',
      dax: `YoY Revenue Growth % = \nDIVIDE (\n    [Total Revenue] - [Prior Year Revenue (PY)],\n    [Prior Year Revenue (PY)],\n    BLANK ()\n)`
    },
    {
      name: 'Segment Revenue Share %',
      category: 'Segmentation Share',
      format: 'Percentage (0.0%)',
      description: 'Percentage ratio of filtered segment sales to the total enterprise revenue.',
      evaluationContext: 'Uses ALLSELECTED(Dim_Customer[CustomerSegment]) to preserve external page filters.',
      dax: `Segment Revenue Share % = \nDIVIDE (\n    [Total Revenue],\n    CALCULATE ( [Total Revenue], ALLSELECTED ( Dim_Customer[CustomerSegment] ) ),\n    0\n)`
    }
  ];

  const handleCopyAll = () => {
    navigator.clipboard.writeText(DAX_MEASURES_CODE);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (dax: string, name: string) => {
    navigator.clipboard.writeText(dax);
    setCopiedMeasure(name);
    setTimeout(() => setCopiedMeasure(null), 2000);
  };

  const handleDownloadDax = () => {
    downloadTextFile('retail_dax_measures.dax', DAX_MEASURES_CODE, 'text/plain');
  };

  const categories = ['All', 'Core Sales', 'Customer RFM', 'Time Intelligence', 'Segmentation Share'];

  const filteredMeasures = selectedCategory === 'All' 
    ? measures 
    : measures.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Deliverable 4</span>
              <span aria-hidden="true">·</span>
              <span>Power BI DAX (Data Analysis Expressions)</span>
              <span aria-hidden="true">·</span>
              <span>Dedicated _Measures Table</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Production DAX Measures Library
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Standardized DAX calculations adhering strictly to Microsoft Tabular Architecture: 
              unqualified measure references, qualified column references, explicit format strings, safe mathematical division (<code className="font-mono text-slate-800 dark:text-slate-300">DIVIDE</code>), and Time Intelligence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Copied All DAX' : 'Copy All DAX'}</span>
            </button>
            <button
              onClick={handleDownloadDax}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .dax</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Individual DAX Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMeasures.map(item => (
          <div 
            key={item.name} 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <FunctionSquare className="w-4 h-4 text-indigo-500" />
                  <span>{item.name}</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {item.description}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Format:</span>
                <code className="font-mono bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-[10px]">
                  {item.format}
                </code>
              </div>
            </div>

            {/* DAX Formula Code Block */}
            <div className="relative">
              <pre className="p-3 bg-slate-950 text-indigo-300 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                {item.dax}
              </pre>
              <button
                onClick={() => handleCopySingle(item.dax, item.name)}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white rounded bg-slate-800/80 hover:bg-slate-700 transition-colors"
                title="Copy DAX Measure"
              >
                {copiedMeasure === item.name ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Filter Context: </span>
              <span>{item.evaluationContext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Complete DAX Table Script */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">_Measures.dax (Dedicated Tabular Measures Container)</span>
          </div>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copiedAll ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedAll ? 'Copied' : 'Copy Full File'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed select-all">
          {DAX_MEASURES_CODE}
        </pre>
      </div>
    </div>
  );
};
