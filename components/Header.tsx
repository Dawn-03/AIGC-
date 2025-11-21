import React from 'react';
import { BarChart3, ShieldCheck, Layout, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Report Library', icon: Layout },
    { id: 'upload', label: 'Upload & Parse', icon: FileText },
    { id: 'admin', label: 'System Architecture & DevOps', icon: ShieldCheck },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 text-brand-600">
              <BarChart3 className="h-8 w-8" />
              <span className="font-bold text-xl tracking-tight">CategoryInsight</span>
            </div>
            <nav className="ml-10 flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors
                      ${isActive 
                        ? 'border-brand-500 text-gray-900' 
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                    `}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-brand-500' : ''}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Product Team</p>
                <p className="text-xs text-gray-500">Viewer Access</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                PT
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};