import React, { useState } from 'react';
import { POWER_QUERY_PYTHON_ETL, POWER_QUERY_M_CODE } from '../data/codeDeliverables';
import { CLUSTER_CENTROIDS_LIST } from '../data/mockWarehouseData';
import { downloadTextFile } from '../utils/exportUtils';
import { 
  Cpu, 
  Copy, 
  Check, 
  Download, 
  Workflow, 
  GitBranch,
  Sparkles
} from 'lucide-react';

export const PowerQueryEtlView: React.FC = () => {
  const [copiedPython, setCopiedPython] = useState(false);
  const [copiedM, setCopiedM] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleCopyPython = () => {
    navigator.clipboard.writeText(POWER_QUERY_PYTHON_ETL);
    setCopiedPython(true);
    setTimeout(() => setCopiedPython(false), 2000);
  };

  const handleCopyM = () => {
    navigator.clipboard.writeText(POWER_QUERY_M_CODE);
    setCopiedM(true);
    setTimeout(() => setCopiedM(false), 2000);
  };

  const handleDownloadPython = () => {
    downloadTextFile('power_query_rfm_kmeans.py', POWER_QUERY_PYTHON_ETL, 'text/x-python');
  };

  const steps = [
    {
      num: 1,
      title: 'Ingestion & Validation',
      desc: 'Pulls upstream joined table passed automatically by Power Query as "dataset". Verifies required columns (CustomerID, OrderDate, TotalRevenue).'
    },
    {
      num: 2,
      title: 'Raw RFM Aggregation',
      desc: 'Computes Recency (days since last purchase vs max date + 1), Frequency (nunique OrderID), Monetary (sum TotalRevenue).'
    },
    {
      num: 3,
      title: 'Log Transform & Normalization',
      desc: 'Applies np.log1p() to correct extreme right-skew in financial distributions, then scales features with sklearn StandardScaler.'
    },
    {
      num: 4,
      title: 'K-Means Clustering (k=4)',
      desc: 'Fits KMeans(n_clusters=4, random_state=42) to segment the 3-dimensional normalized feature space into mathematical clusters.'
    },
    {
      num: 5,
      title: 'Centroid Business Mapping',
      desc: 'Maps cluster IDs (0-3) to human business labels dynamically based on centroid sorting to prevent label switching across model refreshes.'
    },
    {
      num: 6,
      title: 'Data Merging & Export',
      desc: 'Merges CustomerSegment, Recency, Frequency, and Monetary back into main transactions table as result_df for Power BI.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Deliverable 3</span>
              <span aria-hidden="true">·</span>
              <span>Power Query Desktop ETL</span>
              <span aria-hidden="true">·</span>
              <span>scikit-learn &amp; pandas</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Power Query Python ETL Script (RFM K-Means)
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Execution-ready Python script for Power Query Editor (<code className="font-mono text-slate-800 dark:text-slate-300">Transform &gt; Run Python Script</code>). 
              Performs feature extraction, StandardScaler normalization, K-Means (k=4) clustering, and deterministic centroid persona mapping.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPython}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              {copiedPython ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPython ? 'Copied Script' : 'Copy Python'}</span>
            </button>
            <button
              onClick={handleDownloadPython}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6-Stage ETL Workflow Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              6-Stage Power Query Pipeline Execution Flow
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Deterministic Centroid Mapping</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {steps.map(step => (
            <div
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`cursor-pointer rounded-xl p-3 border text-left transition-all ${
                activeStep === step.num
                  ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                  activeStep === step.num
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}>
                  {step.num}
                </span>
              </div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                {step.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cluster Persona Centroid Reference */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Cluster Persona Mapping Matrix (Based on Centroids)
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">k = 4 Clusters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CLUSTER_CENTROIDS_LIST.map(c => (
            <div key={c.segment} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{c.segment}</span>
              </div>
              <div className="text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between"><span>Recency:</span> <span className="font-bold">{c.recencyMean}d</span></div>
                <div className="flex justify-between"><span>Frequency:</span> <span className="font-bold">{c.frequencyMean} orders</span></div>
                <div className="flex justify-between"><span>Spend:</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">${c.monetaryMean.toLocaleString()}</span></div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700 leading-snug">
                {c.businessAction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Python Code Viewer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">power_query_rfm_kmeans.py (Execute in Power Query Editor)</span>
          </div>
          <button
            onClick={handleCopyPython}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copiedPython ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedPython ? 'Copied' : 'Copy Script'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed select-all">
          {POWER_QUERY_PYTHON_ETL}
        </pre>
      </div>

      {/* M-Code Wrapper */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">Power Query Advanced Editor (M-Language Invocation Step)</span>
          </div>
          <button
            onClick={handleCopyM}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copiedM ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedM ? 'Copied' : 'Copy M-Code'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[300px] leading-relaxed select-all">
          {POWER_QUERY_M_CODE}
        </pre>
      </div>
    </div>
  );
};
