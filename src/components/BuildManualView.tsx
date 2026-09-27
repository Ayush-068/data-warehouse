import React, { useState } from 'react';
import { POWER_BI_BUILD_MANUAL } from '../data/codeDeliverables';
import { CLUSTER_CENTROIDS } from '../data/mockWarehouseData';
import { downloadTextFile } from '../utils/exportUtils';
import { 
  BookOpen, 
  Copy, 
  Check, 
  Download, 
  Layout, 
  SlidersHorizontal, 
  Palette, 
  Maximize2, 
  MousePointerClick
} from 'lucide-react';

export const BuildManualView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyManual = () => {
    navigator.clipboard.writeText(POWER_BI_BUILD_MANUAL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadManual = () => {
    downloadTextFile('POWER_BI_BUILD_MANUAL.md', POWER_BI_BUILD_MANUAL, 'text/markdown');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Deliverable 5</span>
              <span aria-hidden="true">·</span>
              <span>Power BI Desktop Implementation Guide</span>
              <span aria-hidden="true">·</span>
              <span>16:9 1920x1080 Canvas</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Power BI Dashboard Build Manual
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Exhaustive step-by-step instructions for assembling the executive dashboard inside Power BI Desktop. 
              Details exact canvas dimensions, visual placement coordinates, field bucket assignments, hex color branding, reference lines, and interactive cross-filtering.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyManual}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Manual' : 'Copy Manual'}</span>
            </button>
            <button
              onClick={handleDownloadManual}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Canvas Layout Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Maximize2 className="w-4 h-4" />
            <span>Canvas Settings</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <div>Type: <span className="font-semibold text-slate-900 dark:text-slate-100">16:9 Widescreen</span></div>
            <div>Resolution: <span className="font-mono text-slate-900 dark:text-slate-100">1920 × 1080 px</span></div>
            <div>Wallpaper: <span className="font-mono text-slate-900 dark:text-slate-100">#F8FAFC</span></div>
            <div>Grid Alignment: <span className="font-semibold text-slate-900 dark:text-slate-100">8px snap</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Slicer Panel</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <div>Position: <span className="font-mono text-slate-900 dark:text-slate-100">X:32, Y:100</span></div>
            <div>Dimensions: <span className="font-mono text-slate-900 dark:text-slate-100">1856 × 68 px</span></div>
            <div>Controls: <span className="font-semibold text-slate-900 dark:text-slate-100">Date, Segment, Country, Category</span></div>
            <div>Interaction: <span className="font-semibold text-slate-900 dark:text-slate-100">Cross-filter all</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Layout className="w-4 h-4" />
            <span>Visual Coordinates</span>
          </div>
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <div>KPI Cards: <span className="font-mono text-slate-900 dark:text-slate-100">Y: 184 (1856 × 120)</span></div>
            <div>Scatter Plot: <span className="font-mono text-slate-900 dark:text-slate-100">Y: 320 (1040 × 440)</span></div>
            <div>Revenue Donut: <span className="font-mono text-slate-900 dark:text-slate-100">Y: 320 (792 × 440)</span></div>
            <div>Monthly Trend: <span className="font-mono text-slate-900 dark:text-slate-100">Y: 780 (1856 × 260)</span></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs transition-colors">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Palette className="w-4 h-4" />
            <span>Theme Hex Palette</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="font-mono text-slate-700 dark:text-slate-300">#0D9488</span>
              <span className="text-slate-400 text-[10px]">Champions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <span className="font-mono text-slate-700 dark:text-slate-300">#2563EB</span>
              <span className="text-slate-400 text-[10px]">Loyal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
              <span className="font-mono text-slate-700 dark:text-slate-300">#E11D48</span>
              <span className="text-slate-400 text-[10px]">At-Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="font-mono text-slate-700 dark:text-slate-300">#F59E0B</span>
              <span className="text-slate-400 text-[10px]">Occasional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Markdown Manual Viewer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">POWER_BI_BUILD_MANUAL.md</span>
          </div>
          <button
            onClick={handleCopyManual}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Manual Markdown'}</span>
          </button>
        </div>
        <div className="p-6 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[600px] leading-relaxed whitespace-pre-wrap select-all">
          {POWER_BI_BUILD_MANUAL}
        </div>
      </div>
    </div>
  );
};
