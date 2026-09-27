import React, { useState } from 'react';
import { Customer, Product, Order } from '../types';
import { PYTHON_SYNTHETIC_DATA_SCRIPT } from '../data/codeDeliverables';
import { 
  exportCustomersCsv, 
  exportProductsCsv, 
  exportOrdersCsv, 
  downloadTextFile 
} from '../utils/exportUtils';
import { 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Table, 
  Code2, 
  Search
} from 'lucide-react';

interface SyntheticDataViewProps {
  customers: Customer[];
  products: Product[];
  orders: Order[];
}

export const SyntheticDataView: React.FC<SyntheticDataViewProps> = ({
  customers,
  products,
  orders
}) => {
  const [activePreview, setActivePreview] = useState<'customers' | 'products' | 'orders'>('customers');
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_SYNTHETIC_DATA_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPy = () => {
    downloadTextFile('generate_synthetic_retail_data.py', PYTHON_SYNTHETIC_DATA_SCRIPT, 'text/x-python');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customerId.toString().includes(searchQuery)
  );

  const filteredProducts = products.filter(p => 
    p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.orderId.toString().includes(searchQuery) ||
    o.customerId.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header & Overview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Deliverable 1</span>
              <span aria-hidden="true">·</span>
              <span>Python 3.10+ / Pandas / NumPy</span>
              <span aria-hidden="true">·</span>
              <span>3 Raw Datasets</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Synthetic Data Generation Pipeline
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Generates realistic raw retail enterprise datasets with underlying latent RFM behavioral dynamics. 
              Outputs 3 relational CSV files for ingestion into the data warehouse: customers, products, and orders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Script' : 'Copy Python'}</span>
            </button>
            <button
              onClick={handleDownloadPy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>
          </div>
        </div>

        {/* 3 CSV Cards with Instant Download Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
          {/* Card 1: Customers */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">raw_customers.csv</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{customers.length} records</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Schema: <code className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">CustomerID, Name, Email, City, Country, SignupDate</code>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <button
                onClick={() => setActivePreview('customers')}
                className={`text-xs font-medium transition-colors ${
                  activePreview === 'customers' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Inspect Data
              </button>
              <button
                onClick={() => exportCustomersCsv(customers)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Card 2: Products */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">raw_products.csv</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{products.length} records</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Schema: <code className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">ProductID, ProductName, Category, UnitPrice</code>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <button
                onClick={() => setActivePreview('products')}
                className={`text-xs font-medium transition-colors ${
                  activePreview === 'products' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Inspect Data
              </button>
              <button
                onClick={() => exportProductsCsv(products)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
            </div>
          </div>

          {/* Card 3: Orders */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">raw_orders.csv</span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{orders.length} records</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Schema: <code className="text-slate-800 dark:text-slate-300 font-mono text-[11px]">OrderID, CustomerID, ProductID, OrderDate, Quantity, Discount</code>
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
              <button
                onClick={() => setActivePreview('orders')}
                className={`text-xs font-medium transition-colors ${
                  activePreview === 'orders' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Inspect Data
              </button>
              <button
                onClick={() => exportOrdersCsv(orders)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 shadow-2xs"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer & Interactive Data Inspector Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActivePreview('customers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activePreview === 'customers'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Customers Preview</span>
            </button>
            <button
              onClick={() => setActivePreview('products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activePreview === 'products'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Products Catalog</span>
            </button>
            <button
              onClick={() => setActivePreview('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activePreview === 'orders'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Transactions Preview</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active table..."
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-8 pr-3 py-1 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 w-48 sm:w-56"
            />
          </div>
        </div>

        {/* Tabular Data Preview */}
        <div className="overflow-x-auto max-h-96">
          {activePreview === 'customers' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold sticky top-0">
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2.5 px-3">CustomerID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">Country</th>
                  <th className="py-2.5 px-3">SignupDate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCustomers.slice(0, 100).map(c => (
                  <tr key={c.customerId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 font-mono">
                    <td className="py-2 px-3 text-slate-900 dark:text-slate-100 font-bold">{c.customerId}</td>
                    <td className="py-2 px-3 font-sans text-slate-800 dark:text-slate-200 font-medium">{c.name}</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{c.email}</td>
                    <td className="py-2 px-3 font-sans text-slate-700 dark:text-slate-300">{c.city}</td>
                    <td className="py-2 px-3 font-sans text-slate-700 dark:text-slate-300">{c.country}</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{c.signupDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activePreview === 'products' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold sticky top-0">
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2.5 px-3">ProductID</th>
                  <th className="py-2.5 px-3">ProductName</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">UnitPrice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map(p => (
                  <tr key={p.productId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 font-mono">
                    <td className="py-2 px-3 text-slate-900 dark:text-slate-100 font-bold">{p.productId}</td>
                    <td className="py-2 px-3 font-sans text-slate-800 dark:text-slate-200 font-medium">{p.productName}</td>
                    <td className="py-2 px-3 font-sans text-slate-600 dark:text-slate-400">{p.category}</td>
                    <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">${p.unitPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activePreview === 'orders' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold sticky top-0">
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="py-2.5 px-3">OrderID</th>
                  <th className="py-2.5 px-3">CustomerID</th>
                  <th className="py-2.5 px-3">ProductID</th>
                  <th className="py-2.5 px-3">OrderDate</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Discount</th>
                  <th className="py-2.5 px-3 text-right">NetRevenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredOrders.slice(0, 100).map(o => (
                  <tr key={o.orderId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 font-mono">
                    <td className="py-2 px-3 text-slate-900 dark:text-slate-100 font-bold">{o.orderId}</td>
                    <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{o.customerId}</td>
                    <td className="py-2 px-3 text-slate-600 dark:text-slate-400">{o.productId}</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{o.orderDate}</td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{o.quantity}</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{(o.discount * 100).toFixed(0)}%</td>
                    <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">${o.netRevenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Complete Python Script Code Viewer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-semibold">generate_synthetic_retail_data.py</span>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Full Script'}</span>
          </button>
        </div>
        <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-[460px] leading-relaxed select-all">
          {PYTHON_SYNTHETIC_DATA_SCRIPT}
        </pre>
      </div>
    </div>
  );
};
