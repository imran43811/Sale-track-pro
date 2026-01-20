
import React, { useState, useEffect, useMemo } from 'react';
import { SaleEntry } from './types';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import HistoryList from './components/HistoryList';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [entries, setEntries] = useState<SaleEntry[]>([]);
  const [view, setView] = useState<'dashboard' | 'entry' | 'history'>('dashboard');

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('saletrack_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved entries");
      }
    }
  }, []);

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem('saletrack_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: SaleEntry) => {
    setEntries(prev => [entry, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setView('dashboard');
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <Layout currentView={view} setView={setView}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' && <Dashboard entries={entries} />}
        {view === 'entry' && <EntryForm onSubmit={addEntry} onCancel={() => setView('dashboard')} />}
        {view === 'history' && <HistoryList entries={entries} onDelete={deleteEntry} />}
      </div>
    </Layout>
  );
};

export default App;
