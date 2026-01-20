
import React, { useState } from 'react';
import { SaleEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { analyzeFinancials } from '../services/geminiService';

interface DashboardProps {
  entries: SaleEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ entries }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const totals = entries.reduce((acc, curr) => ({
    cash: acc.cash + curr.cashSales,
    card: acc.card + curr.cardSales,
    expenses: acc.expenses + curr.expenses
  }), { cash: 0, card: 0, expenses: 0 });

  const grossSales = totals.cash + totals.card;
  const netTotalSale = grossSales - totals.expenses;
  const cashRemaining = totals.cash - totals.expenses;

  // Last 7 days chart data
  const chartData = [...entries].reverse().slice(-7).map(e => ({
    name: new Date(e.date).toLocaleDateString(undefined, { weekday: 'short' }),
    'Total Sale': (e.cashSales + e.cardSales) - e.expenses,
    'Gross': e.cashSales + e.cardSales,
    'Expenses': e.expenses
  }));

  const handleGetInsight = async () => {
    setLoading(true);
    const res = await analyzeFinancials(entries.slice(0, 30)); 
    setInsight(res);
    setLoading(false);
  };

  const MetricCard = ({ title, value, colorClass, subtitle }: { title: string, value: string | number, colorClass: string, subtitle?: string }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${colorClass}`}>{value}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Sale" 
          value={`$${netTotalSale.toLocaleString()}`} 
          colorClass="text-indigo-600" 
          subtitle={`(Cash + Card) - Exp`}
        />
        <MetricCard 
          title="Total Expenses" 
          value={`$${totals.expenses.toLocaleString()}`} 
          colorClass="text-rose-600" 
        />
        <MetricCard 
          title="Cash Remaining" 
          value={`$${cashRemaining.toLocaleString()}`} 
          colorClass={cashRemaining >= 0 ? 'text-emerald-600' : 'text-rose-600'} 
          subtitle="Cash Sales - Expenses"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard title="Gross Cash Sales" value={`$${totals.cash.toLocaleString()}`} colorClass="text-slate-700" />
        <MetricCard title="Gross Card Sales" value={`$${totals.card.toLocaleString()}`} colorClass="text-slate-700" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Daily Sales Performance</h3>
        <div className="h-64">
          {entries.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Total Sale" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              No data entries to visualize.
            </div>
          )}
        </div>
      </div>

      <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM6.464 14.95a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414z" /></svg>
            AI Financial Advisor
          </h3>
          <p className="text-indigo-100 mb-4 text-sm opacity-90">
            Get personalized insights based on your net totals and cash position.
          </p>
          {insight ? (
            <div className="bg-white/10 rounded-lg p-4 text-sm leading-relaxed border border-white/20 animate-fade-in">
              {insight}
              <button 
                onClick={() => setInsight(null)}
                className="block mt-4 text-indigo-200 hover:text-white underline text-xs transition-colors"
              >
                Reset Insight
              </button>
            </div>
          ) : (
            <button 
              onClick={handleGetInsight}
              disabled={loading || entries.length === 0}
              className="px-6 py-2 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Generate Analysis'}
            </button>
          )}
        </div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
};

export default Dashboard;
