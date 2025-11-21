import React, { useState } from 'react';
import { Report, UserQuota } from '../types';
import { Download, FileText, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MAX_DAILY_DOWNLOADS, MAX_MONTHLY_DOWNLOADS } from '../constants';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
  quota: UserQuota;
  updateQuota: (newQuota: UserQuota) => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose, quota, updateQuota }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDownload = quota.lastDownloadDate.split('T')[0];
    
    let newDaily = quota.dailyDownloads;
    let newMonthly = quota.monthlyDownloads;

    if (today !== lastDownload) {
      newDaily = 0; 
    }

    if (newDaily >= MAX_DAILY_DOWNLOADS) {
      setDownloadStatus('error');
      setErrorMessage(`Daily limit reached (${MAX_DAILY_DOWNLOADS}/day).`);
      return;
    }

    if (newMonthly >= MAX_MONTHLY_DOWNLOADS) {
      setDownloadStatus('error');
      setErrorMessage(`Monthly limit reached (${MAX_MONTHLY_DOWNLOADS}/month).`);
      return;
    }

    // Update Quota
    updateQuota({
      dailyDownloads: newDaily + 1,
      monthlyDownloads: newMonthly + 1,
      lastDownloadDate: new Date().toISOString(),
    });

    setDownloadStatus('success');
    // Simulate download
    setTimeout(() => setDownloadStatus('idle'), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {report.fileName} • {report.category} / {report.subCategory} • {report.reportDate}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="px-4 py-5 sm:p-6 bg-gray-50 h-[60vh] overflow-y-auto">
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layer 1</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layer 2</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layer 3</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimension Point</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Content</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source (Pg)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.dimensions.map((dim, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dim.layer1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dim.layer2}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dim.layer3}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{dim.dimensionPoint}</td>
                      <td className="px-6 py-4 text-sm text-gray-700 leading-relaxed">{dim.content}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline cursor-pointer">Page {dim.sourcePage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200 justify-between items-center">
            <div className="flex gap-3">
              {downloadStatus === 'error' && (
                 <span className="flex items-center text-sm text-red-600 gap-1">
                   <AlertTriangle className="w-4 h-4" /> {errorMessage}
                 </span>
              )}
              {downloadStatus === 'success' && (
                 <span className="flex items-center text-sm text-green-600 gap-1">
                   <CheckCircle2 className="w-4 h-4" /> Download started...
                 </span>
              )}
              
              <button
                type="button"
                onClick={handleDownload}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Source Excel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              Quote usage: {quota.dailyDownloads}/{MAX_DAILY_DOWNLOADS} (Daily) • {quota.monthlyDownloads}/{MAX_MONTHLY_DOWNLOADS} (Monthly)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};