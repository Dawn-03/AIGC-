import React, { useState } from 'react';
import { UploadCloud, File, Check, Loader2 } from 'lucide-react';

export const UploadView: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startProcess = () => {
    if (!file) return;
    setStatus('uploading');
    
    // Simulate Workflow
    setTimeout(() => setStatus('processing'), 2000); // Upload to Dify
    setTimeout(() => setStatus('complete'), 5000); // MinerU + LLM + Feishu
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">Upload New Report</h2>
        <p className="mt-2 text-sm text-gray-600">
          Upload a PDF to trigger the Dify Workflow. <br/>
          (MinerU Parsing -> LLM Extraction -> Feishu Sync)
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <div className="p-8">
           {status === 'complete' ? (
             <div className="text-center py-12">
               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                 <Check className="h-8 w-8 text-green-600" />
               </div>
               <h3 className="mt-4 text-lg font-medium text-gray-900">Processing Complete</h3>
               <p className="mt-2 text-sm text-gray-500">
                 The report has been parsed and added to the Knowledge Base and Feishu Table.
               </p>
               <button 
                onClick={() => { setFile(null); setStatus('idle'); }}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700"
               >
                 Upload Another
               </button>
             </div>
           ) : (
             <div
              className={`
                relative border-2 border-dashed rounded-lg p-12 text-center hover:bg-gray-50 transition-colors
                ${dragActive ? 'border-brand-500 bg-brand-50' : 'border-gray-300'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {status === 'idle' && !file && (
                <>
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm text-gray-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleChange} accept=".pdf" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 50MB</p>
                </>
              )}

              {file && status === 'idle' && (
                 <div className="flex flex-col items-center">
                   <File className="h-12 w-12 text-brand-600 mb-2" />
                   <p className="text-sm font-medium text-gray-900">{file.name}</p>
                   <p className="text-xs text-gray-500 mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                   <button 
                    onClick={startProcess}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700"
                   >
                     Start Processing
                   </button>
                 </div>
              )}

              {(status === 'uploading' || status === 'processing') && (
                 <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-brand-600 animate-spin mb-4" />
                    <p className="text-lg font-medium text-gray-900">
                      {status === 'uploading' ? 'Uploading to Dify...' : 'Running MinerU & LLM Extraction...'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">This usually takes 1-2 minutes for large PDFs.</p>
                 </div>
              )}
            </div>
           )}
        </div>
        
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Required Dimensions</h4>
          <div className="mt-2 flex flex-wrap gap-2">
             {['Layer 1', 'Layer 2', 'Layer 3', 'Dimension Point', 'Content', 'Source Page'].map(tag => (
               <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};