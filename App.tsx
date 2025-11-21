import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UploadView } from './components/UploadView';
import { AdminDocs } from './components/AdminDocs';
import { UserQuota, UserRole } from './types';
import { INITIAL_QUOTA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quota, setQuota] = useState<UserQuota>(INITIAL_QUOTA);

  // Load quota from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('userQuota');
    if (saved) {
      try {
        setQuota(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse quota", e);
      }
    }
  }, []);

  // Save quota to localStorage whenever it changes
  const handleQuotaUpdate = (newQuota: UserQuota) => {
    setQuota(newQuota);
    localStorage.setItem('userQuota', JSON.stringify(newQuota));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard quota={quota} updateQuota={handleQuotaUpdate} />;
      case 'upload':
        return <UploadView />;
      case 'admin':
        return <AdminDocs />;
      default:
        return <Dashboard quota={quota} updateQuota={handleQuotaUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;