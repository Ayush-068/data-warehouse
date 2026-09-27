import React, { useState } from 'react';
import { Customer, Product, Order } from '../types';
import { 
  PYTHON_SYNTHETIC_DATA_SCRIPT,
  SQL_STAR_SCHEMA_DDL,
  POWER_QUERY_PYTHON_ETL,
  DAX_MEASURES_CODE,
  POWER_BI_BUILD_MANUAL
} from '../data/codeDeliverables';
import { 
  downloadTextFile, 
  exportCustomersCsv, 
  exportProductsCsv, 
  exportOrdersCsv 
} from '../utils/exportUtils';
import { X, Download, FileText, Check, Database, Cpu, FunctionSquare, BookOpen, Layers } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  products: Product[];
  orders: Order[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  customers,
  products,
  orders
}) => {
  if (!isOpen) return null;

  const downloadFullPackageMarkdown = () => {
    const fullMarkdown = `# Retail Customer Segmentation & Star Schema Data Warehouse
## Production Technical Package & Power BI Deliverables
Generated: 2026-09-27
Lead Data Architect & Senior Power BI Developer Technical Package

================================================================================
1. SYNTHETIC DATA GENERATION (Python)
================================================================================

\`\`\`python
${PYTHON_SYNTHETIC_DATA_SCRIPT}
\`\`\`

================================================================================
2. DATA WAREHOUSE SCHEMA (SQL DDL)
================================================================================

\`\`\`sql
${SQL_STAR_SCHEMA_DDL}
\`\`\`

================================================================================
3. POWER QUERY PYTHON ETL SCRIPT (RFM + K-MEANS CLUSTERING)
================================================================================

\`\`\`python
${POWER_QUERY_PYTHON_ETL}
\`\`\`

================================================================================
4. POWER BI DAX MEASURES
================================================================================

\`\`\`dax
${DAX_MEASURES_CODE}
\`\`\`

================================================================================
5. POWER BI DASHBOARD BUILD MANUAL
================================================================================

${POWER_BI_BUILD_MANUAL}
`;

    downloadTextFile('RETAIL_SEGMENTATION_AND_DWH_PACKAGE.md', fullMarkdown, 'text/markdown');
  };

  const handleDownloadAllIndividual = () => {
    downloadTextFile('generate_synthetic_retail_data.py', PYTHON_SYNTHETIC_DATA_SCRIPT, 'text/x-python');
    setTimeout(() => {
      downloadTextFile('create_star_schema.sql', SQL_STAR_SCHEMA_DDL, 'text/sql');
    }, 200);
    setTimeout(() => {
      downloadTextFile('power_query_rfm_kmeans.py', POWER_QUERY_PYTHON_ETL, 'text/x-python');
    }, 400);
    setTimeout(() => {
      downloadTextFile('retail_dax_measures.dax', DAX_MEASURES_CODE, 'text/plain');
    }, 600);
    setTimeout(() => {
      downloadTextFile('POWER_BI_BUILD_MANUAL.md', POWER_BI_BUILD_MANUAL, 'text/markdown');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Deliverables Package Exporter
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Download Complete Production Artifacts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Download individual scripts, schema definitions, sample raw CSV files, or an aggregated enterprise bundle for your data engineering and Power BI workflow.
        </p>

        {/* Primary Download All Bundle */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">Complete Markdown Technical Package</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">All 5 deliverables combined into a single, comprehensive .md document</span>
          </div>
          <button
            onClick={downloadFullPackageMarkdown}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.md)</span>
          </button>
        </div>

        {/* Individual File Options */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Individual Source Files
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => downloadTextFile('generate_synthetic_retail_data.py', PYTHON_SYNTHETIC_DATA_SCRIPT, 'text/x-python')}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">generate_synthetic.py</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => downloadTextFile('create_star_schema.sql', SQL_STAR_SCHEMA_DDL, 'text/sql')}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">create_star_schema.sql</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => downloadTextFile('power_query_rfm_kmeans.py', POWER_QUERY_PYTHON_ETL, 'text/x-python')}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">power_query_rfm.py</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => downloadTextFile('retail_dax_measures.dax', DAX_MEASURES_CODE, 'text/plain')}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">_Measures.dax</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => downloadTextFile('POWER_BI_BUILD_MANUAL.md', POWER_BI_BUILD_MANUAL, 'text/markdown')}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">BUILD_MANUAL.md</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={() => exportCustomersCsv(customers)}
              className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span className="font-mono text-[11px]">raw_customers.csv</span>
              <Download className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <button
            onClick={handleDownloadAllIndividual}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            Download all individual scripts (.py, .sql, .dax, .md)
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
