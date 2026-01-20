
import React, { useState } from 'react';
import { SaleEntry } from '../types';

interface EntryFormProps {
  onSubmit: (entry: SaleEntry) => void;
  onCancel: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    cashSales: '',
    cardSales: '',
    expenses: '',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: SaleEntry = {
      id: crypto.randomUUID(),
      date: formData.date,
      cashSales: Number(formData.cashSales) || 0,
      cardSales: Number(formData.cardSales) || 0,
      expenses: Number(formData.expenses) || 0,
      note: formData.note
    };
    onSubmit(entry);
  };

  const cash = Number(formData.cashSales) || 0;
  const card = Number(formData.cardSales) || 0;
  const exp = Number(formData.expenses) || 0;
  
  const grossTotal = cash + card;
  const cashRemaining = cash - exp;
  const netTotalSale = grossTotal - exp;

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
          <h2 className="text-xl font-bold text-slate-800">New Daily Record</h2>
          <p className="text-slate-500 text-sm mt-1">Enter your figures to calculate today's final sale.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Record Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Cash Received ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.cashSales}
                  onChange={(e) => setFormData({...formData, cashSales: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Card Payments ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.cardSales}
                  onChange={(e) => setFormData({...formData, cardSales: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Expenses ($)</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={formData.expenses}
                onChange={(e) => setFormData({...formData, expenses: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none text-rose-700 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex flex-col">
                <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider">Cash Remaining</span>
                <span className={`text-lg font-bold ${cashRemaining >= 0 ? 'text-emerald-900' : 'text-rose-600'}`}>
                  ${cashRemaining.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 mt-0.5">(Cash - Exp)</span>
              </div>
              <div className="p-4 bg-indigo-600 rounded-xl border border-indigo-700 flex flex-col shadow-lg shadow-indigo-100">
                <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Total Sale</span>
                <span className="text-xl font-bold text-white">
                  ${netTotalSale.toLocaleString()}
                </span>
                <span className="text-[10px] text-indigo-200 mt-0.5">(Cash + Card) - Exp</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Brief details about today's trade..."
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
