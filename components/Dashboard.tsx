import React, { useState, useMemo } from 'react';
import { Search, Calendar, Filter, FileText, ChevronRight } from 'lucide-react';
import { MOCK_REPORTS, CATEGORIES } from '../constants';
import { Report, UserQuota } from '../types';
import { ReportDetail } from './ReportDetail';

interface DashboardProps {
  quota: UserQuota;
  updateQuota: (newQuota: UserQuota) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ quota, updateQuota }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = useMemo(() => {
    return MOCK_REPORTS.filter(report => {
      const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
      const matchesSearch = 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.dimensions.some(d => d.content.toLowerCase().includes(searchQuery.toLowerCase()) || d.dimensionPoint.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-end justify-between">
          
          {/* Search & Filter */}
          <div className="flex-1 w-full md:w-auto flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Library</h1>
              <p className="text-sm text-gray-500">Browse structured insights from industry reports.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative rounded-md shadow-sm flex-1 min-w-[300px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Search keywords, dimensions, or trends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Stats/Quota */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hidden lg:block">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My Download Quota</h4>
            <div className="flex gap-6">
              <div>
                <span className="text-2xl font-bold text-gray-900">{quota.dailyDownloads}</span>
                <span className="text-xs text-gray-500">/20 Daily</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">{quota.monthlyDownloads}</span>
                <span className="text-xs text-gray-500">/100 Monthly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white overflow-hidden rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => setSelectedReport(report)}>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {report.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {report.reportDate}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900 group-hover:text-brand-600 transition-colors">
                  {report.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {report.dimensions[0]?.content}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    {/* Mock avatars for people who viewed/liked */}
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-300" />
                    <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-400" />
                  </div>
                  <div className="flex items-center text-sm font-medium text-brand-600">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span className="flex items-center">
                     <FileText className="w-3 h-3 mr-1" /> {report.dimensions.length} insights extracted
                  </span>
                  <span>{report.fileName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {selectedReport && (
        <ReportDetail 
          report={selectedReport} 
          onClose={() => setSelectedReport(null)} 
          quota={quota}
          updateQuota={updateQuota}
        />
      )}
    </div>
  );
};