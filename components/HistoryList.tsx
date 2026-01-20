
import React from 'react';
import { SaleEntry } from '../types';

interface HistoryListProps {
  entries: SaleEntry[];
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ entries, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        <p className="mt-4 text-slate-500 font-medium">No records found. Start by adding a new sale entry!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Total Sale</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cash Remaining / Card</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Expenses</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry) => {
              const netTotal = (entry.cashSales + entry.cardSales) - entry.expenses;
              const cashRemaining = entry.cashSales - entry.expenses;
              return (
                <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${netTotal >= 0 ? 'text-indigo-700' : 'text-rose-600'}`}>
                      ${netTotal.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    <div className="flex space-x-2">
                      <span title="Cash Remaining" className={`${cashRemaining >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'} px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>
                        Rem: ${cashRemaining.toLocaleString()}
                      </span>
                      <span title="Card Payment" className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        Card: ${entry.cardSales.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-rose-600 font-medium">${entry.expenses.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(entry.id)}
                      className="text-slate-400 hover:text-rose-600 p-2 transition-colors rounded-lg hover:bg-rose-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
