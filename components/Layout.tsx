
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: 'dashboard' | 'entry' | 'history') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">SaleTrack Pro</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setView('history')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'history' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              History
            </button>
            <button 
              onClick={() => setView('entry')}
              className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              New Entry
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-slate-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => setView('entry')} className="flex flex-col items-center -mt-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-slate-50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
        </button>
        <button onClick={() => setView('history')} className={`flex flex-col items-center ${currentView === 'history' ? 'text-indigo-600' : 'text-slate-500'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-xs mt-1">History</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
