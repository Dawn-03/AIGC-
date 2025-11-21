import React from 'react';
import { Terminal, GitBranch, Server, AlertCircle, CloudOff, CheckCircle } from 'lucide-react';

export const AdminDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">System Architecture & Deployment Guide</h1>
        <p className="mt-2 text-gray-600 text-lg">
          Operational manual for the offline K8s cluster (Dify + MinerU) and Workflow Configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Col: Navigation/TOC */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Critical Operations</h3>
            <nav className="space-y-2">
              <a href="#issue-offline" className="flex items-center p-2 text-red-700 bg-red-50 rounded hover:bg-red-100 text-sm font-medium">
                <CloudOff className="w-4 h-4 mr-2" />
                Fix: Offline Image Pulling
              </a>
              <a href="#workflow" className="flex items-center p-2 text-blue-700 bg-blue-50 rounded hover:bg-blue-100 text-sm font-medium">
                <GitBranch className="w-4 h-4 mr-2" />
                Dify Workflow Configuration
              </a>
              <a href="#feishu" className="flex items-center p-2 text-gray-700 hover:bg-gray-50 rounded text-sm font-medium">
                <Server className="w-4 h-4 mr-2" />
                Feishu Integration Data Model
              </a>
            </nav>
          </div>
        </div>

        {/* Right Col: Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SECTION 1: OFFLINE K8S FIX */}
          <section id="issue-offline" className="bg-white shadow rounded-lg overflow-hidden border-l-4 border-red-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Fixing "ImagePullBackOff" in Offline K8s</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Problem:</strong> Your K8s cluster cannot reach Docker Hub/GitHub. Mirrors are failing. <br/>
                <strong>Solution:</strong> Use the "Sneaker-net" method via your Windows PC.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                  <p className="text-gray-500"># 1. On your Windows PC (with internet)</p>
                  <p>$ docker pull opendatalab/mineru:latest</p>
                  <p>$ docker save -o mineru.tar opendatalab/mineru:latest</p>
                  <br/>
                  <p className="text-gray-500"># 2. Transfer mineru.tar to ALL K8s nodes (Master & Workers) using SCP/SFTP</p>
                  <br/>
                  <p className="text-gray-500"># 3. Load the image on EACH node (SSH into each)</p>
                  <p className="text-gray-500"># If using Docker runtime:</p>
                  <p>$ docker load -i mineru.tar</p>
                  <p className="text-gray-500"># If using Containerd (Standard K8s):</p>
                  <p>$ ctr -n k8s.io images import mineru.tar</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="text-sm font-bold text-yellow-800 mb-2">Step 4: Update Deployment YAML</h4>
                  <p className="text-sm text-yellow-700 mb-2">
                    You must tell K8s <b>NOT</b> to try pulling from the internet.
                  </p>
                  <pre className="text-xs bg-white p-2 rounded border border-yellow-200">
{`containers:
  - name: mineru
    image: opendatalab/mineru:latest
    imagePullPolicy: Never  # <--- CRITICAL CHANGE`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: DIFY WORKFLOW */}
          <section id="workflow" className="bg-white shadow rounded-lg overflow-hidden border-l-4 border-blue-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900">Dify Workflow Setup</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Since you are on Dify 1.7.0, create a <strong>Workflow Application</strong>.
              </p>

              <div className="space-y-6">
                <div className="relative border-l-2 border-gray-200 pl-8 ml-2">
                  <div className="mb-6">
                    <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">1</span>
                    <h4 className="text-sm font-bold text-gray-900">Start Node</h4>
                    <p className="text-xs text-gray-500">Define input variable: <code>file_upload</code> (Type: File).</p>
                  </div>
                  
                  <div className="mb-6">
                    <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">2</span>
                    <h4 className="text-sm font-bold text-gray-900">HTTP Request (MinerU API)</h4>
                    <p className="text-xs text-gray-500">Point to your internal K8s service.</p>
                    <div className="mt-2 bg-gray-100 p-2 rounded text-xs font-mono">
                      POST http://mineru-service.dify170:8000/parse<br/>
                      Body: form-data (file: start.file_upload)
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">3</span>
                    <h4 className="text-sm font-bold text-gray-900">LLM Node (Extraction)</h4>
                    <p className="text-xs text-gray-500">Model: GPT-4o or Qwen-Max (Long context).</p>
                    <div className="mt-2 bg-gray-50 border border-gray-200 p-2 rounded text-xs font-mono whitespace-pre-wrap">
                      Prompt: "You are a data analyst. Read the following Markdown content. Extract data into a JSON array strictly following this schema: Layer1, Layer2, Layer3, DimensionPoint, Content, SourcePage.
                      
                      Context: {'{{http_request.body.markdown_content}}'}
                      
                      Format: JSON Array Only."
                    </div>
                  </div>

                  <div className="mb-0">
                     <span className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">4</span>
                    <h4 className="text-sm font-bold text-gray-900">HTTP Request (Feishu/Lark)</h4>
                    <p className="text-xs text-gray-500">Batch write to Multi-dimensional Table.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: DATA MODEL */}
          <section id="feishu" className="bg-white shadow rounded-lg overflow-hidden">
             <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-6 h-6 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-900">Storage Strategy</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                  <h4 className="font-bold text-sm text-gray-900">Feishu Base (Primary Search)</h4>
                  <ul className="mt-2 space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Used for structured filtering</li>
                     <li>Columns: Layer 1, Layer 2, Content</li>
                     <li>Link column to "Source PDF"</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded border border-gray-200">
                  <h4 className="font-bold text-sm text-gray-900">Dify Knowledge Base (Semantic)</h4>
                  <ul className="mt-2 space-y-1 text-xs text-gray-600 list-disc list-inside">
                     <li>Used for "Chat with Reports"</li>
                     <li>Import cleaned Markdown from MinerU</li>
                     <li>High-quality vector retrieval</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};