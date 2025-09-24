'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HowToUsePage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'keypoints', title: 'Define Keypoints', icon: '🎯' },
    { id: 'upload', title: 'Upload Documents', icon: '📄' },
    { id: 'analysis', title: 'View Analysis', icon: '📊' },
    { id: 'export', title: 'Export Results', icon: '📥' },
    { id: 'tips', title: 'Tips & Tricks', icon: '💡' },
    { id: 'faq', title: 'FAQ', icon: '❓' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">How to Use Document Analyzer</h1>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to App
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Navigation</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2
                        ${activeSection === section.id 
                          ? 'bg-blue-100 text-blue-700 font-medium' 
                          : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeSection === 'getting-started' && <GettingStartedSection />}
              {activeSection === 'keypoints' && <KeypointsSection />}
              {activeSection === 'upload' && <UploadSection />}
              {activeSection === 'analysis' && <AnalysisSection />}
              {activeSection === 'export' && <ExportSection />}
              {activeSection === 'tips' && <TipsSection />}
              {activeSection === 'faq' && <FAQSection />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function GettingStartedSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🚀 Getting Started</h2>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to Document Keypoints Analyzer! This tool helps you analyze documents based on custom-defined keypoints. 
          Follow these simple steps to get started:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">1️⃣</span> Define Your Keypoints
          </h3>
          <p className="text-gray-700">
            Start by creating keypoints - these are the aspects you want to analyze in your documents. 
            Each keypoint has a name and description.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">2️⃣</span> Upload Documents
          </h3>
          <p className="text-gray-700">
            Upload PDF files or enter text directly. The system will analyze each document against your defined keypoints.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">3️⃣</span> Review Analysis
          </h3>
          <p className="text-gray-700">
            View the analysis results in a comparison table that shows how each document scores on each keypoint.
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">4️⃣</span> Export Results
          </h3>
          <p className="text-gray-700">
            Export your analysis results in Excel, CSV, or JSON format for further processing or reporting.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mt-6">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Start Video</h3>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Video tutorial coming soon</p>
        </div>
      </div>
    </div>
  )
}

function KeypointsSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Define Keypoints</h2>
        <p className="text-gray-600 text-lg mb-6">
          Keypoints are the criteria you want to analyze in your documents. They form the foundation of your analysis.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">What are Keypoints?</h3>
          <p className="text-gray-700 mb-4">
            Keypoints are specific aspects or criteria you want to evaluate in your documents. For example:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Summary:</strong> Main points or executive summary of the document</li>
            <li><strong>Key Terms:</strong> Important terminology or concepts mentioned</li>
            <li><strong>Recommendations:</strong> Action items or suggestions provided</li>
            <li><strong>Data Points:</strong> Statistics or numerical information</li>
            <li><strong>Risks:</strong> Potential issues or concerns identified</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">How to Add Keypoints</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong>Navigate to the home page</strong> - This is where you manage keypoints
            </li>
            <li>
              <strong>Enter a Name</strong> - Keep it short and descriptive (e.g., "Budget Impact")
            </li>
            <li>
              <strong>Add a Description</strong> - Explain what this keypoint should capture
              <div className="bg-white rounded p-3 mt-2 text-sm">
                Example: "Identify any financial implications, costs, or budget considerations mentioned in the document"
              </div>
            </li>
            <li>
              <strong>Click "Add Keypoint"</strong> - The keypoint will be added to your list
            </li>
            <li>
              <strong>Repeat as needed</strong> - Add all keypoints before proceeding to analysis
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Best Practices</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Be Specific:</strong> Clear, focused keypoints yield better results</li>
            <li>✅ <strong>Use Consistent Language:</strong> Similar terminology across keypoints</li>
            <li>✅ <strong>Limit Quantity:</strong> 5-10 keypoints usually work best</li>
            <li>✅ <strong>Test First:</strong> Try with a few documents before finalizing</li>
            <li>❌ <strong>Avoid Overlap:</strong> Each keypoint should capture unique information</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function UploadSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">📄 Upload Documents</h2>
        <p className="text-gray-600 text-lg mb-6">
          You can analyze documents by uploading PDF files or entering text directly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            PDF Upload
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click "Choose File" in the PDF upload section</li>
            <li>Select a PDF file from your computer</li>
            <li>The system will automatically extract text</li>
            <li>Analysis begins immediately</li>
            <li>Results appear in the comparison table</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded text-sm text-gray-600">
            <strong>Supported:</strong> PDF files up to 10MB<br/>
            <strong>Processing:</strong> Automatic text extraction
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Direct Text Input
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter a name for your document</li>
            <li>Paste or type text in the content area</li>
            <li>Click "Analyze Text"</li>
            <li>The system processes the text</li>
            <li>Results appear alongside other documents</li>
          </ol>
          <div className="mt-4 p-3 bg-white rounded text-sm text-gray-600">
            <strong>Use for:</strong> Emails, notes, articles<br/>
            <strong>Tip:</strong> Great for quick text analysis
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">⚠️ Important Notes</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• PDF files must not be password protected</li>
          <li>• Text extraction works best with text-based PDFs (not scanned images)</li>
          <li>• Large documents may take longer to process</li>
          <li>• You can upload multiple documents sequentially</li>
          <li>• All documents are analyzed using the same keypoints</li>
        </ul>
      </div>
    </div>
  )
}

function AnalysisSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">📊 View Analysis Results</h2>
        <p className="text-gray-600 text-lg mb-6">
          The comparison table shows how each document scores on each keypoint, making it easy to compare multiple documents.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Understanding the Results Table</h3>
        <div className="bg-white rounded-lg p-4 mt-4">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Keypoint</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Document 1</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Document 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Summary</td>
                <td className="px-4 py-2 text-sm text-gray-600">Main points found...</td>
                <td className="px-4 py-2 text-sm text-gray-600">Executive overview...</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Key Terms</td>
                <td className="px-4 py-2 text-sm text-gray-600">Technical terms...</td>
                <td className="px-4 py-2 text-sm text-gray-600">Important concepts...</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>• <strong>Rows:</strong> Each row represents a keypoint</li>
          <li>• <strong>Columns:</strong> Each column represents a document</li>
          <li>• <strong>Cells:</strong> Analysis results for that keypoint-document combination</li>
          <li>• <strong>N/A:</strong> Indicates no relevant content found</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Interpreting Results</h3>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>🎯 Relevance:</strong> Results show content relevant to each keypoint
          </li>
          <li>
            <strong>📊 Comparison:</strong> Easily compare how different documents address the same points
          </li>
          <li>
            <strong>🔍 Patterns:</strong> Identify trends across multiple documents
          </li>
          <li>
            <strong>📝 Completeness:</strong> See which documents cover which topics
          </li>
        </ul>
      </div>

      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Table Features</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✨ <strong>Hover Effects:</strong> Rows highlight on hover for easier reading</li>
          <li>✨ <strong>Responsive:</strong> Table scrolls horizontally on small screens</li>
          <li>✨ <strong>Clear All:</strong> Remove all results to start fresh</li>
          <li>✨ <strong>Persistent:</strong> Results saved in browser storage</li>
        </ul>
      </div>
    </div>
  )
}

function ExportSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">📥 Export Results</h2>
        <p className="text-gray-600 text-lg mb-6">
          Export your analysis results in multiple formats for reporting, sharing, or further processing.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Excel (.xlsx)</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Professional spreadsheet with multiple sheets:
          </p>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Comparison table</li>
            <li>• Detailed analysis</li>
            <li>• Summary statistics</li>
            <li>• Pivot-ready data</li>
          </ul>
          <div className="mt-3 p-2 bg-white rounded text-xs text-gray-500">
            Best for: Reports, presentations
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">CSV (.csv)</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Simple tabular format compatible with all spreadsheet apps.
          </p>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Universal compatibility</li>
            <li>• Easy to import</li>
            <li>• Lightweight format</li>
            <li>• Plain text structure</li>
          </ul>
          <div className="mt-3 p-2 bg-white rounded text-xs text-gray-500">
            Best for: Data processing, imports
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">JSON (.json)</h3>
          </div>
          <p className="text-gray-700 mb-3">
            Structured data format for developers and APIs.
          </p>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>• Complete data structure</li>
            <li>• Programmatic access</li>
            <li>• Metadata included</li>
            <li>• API integration ready</li>
          </ul>
          <div className="mt-3 p-2 bg-white rounded text-xs text-gray-500">
            Best for: APIs, automation
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">How to Export</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Navigate to the Analysis page with your results</li>
          <li>Click the export button for your preferred format</li>
          <li>The file will download automatically</li>
          <li>Find the file in your Downloads folder</li>
          <li>Open with appropriate software (Excel, text editor, etc.)</li>
        </ol>
      </div>
    </div>
  )
}

function TipsSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">💡 Tips & Tricks</h2>
        <p className="text-gray-600 text-lg mb-6">
          Get the most out of Document Analyzer with these helpful tips.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900 mb-2">🎯 Keypoint Quality</h3>
          <p className="text-gray-700">
            The quality of your analysis depends on well-defined keypoints. Be specific and clear in your descriptions.
            Instead of "Financial," use "Quarterly revenue projections and budget allocations."
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-900 mb-2">📄 Document Preparation</h3>
          <p className="text-gray-700">
            For best results with PDFs, ensure they contain selectable text (not scanned images). 
            Use OCR software to convert image PDFs to text PDFs if needed.
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="font-semibold text-gray-900 mb-2">🔄 Batch Processing</h3>
          <p className="text-gray-700">
            Process multiple documents efficiently by preparing all your PDFs in advance. 
            Upload them one after another without waiting for each to complete.
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-l-4 border-yellow-500">
          <h3 className="font-semibold text-gray-900 mb-2">💾 Data Persistence</h3>
          <p className="text-gray-700">
            Your keypoints and analysis results are automatically saved in your browser. 
            To keep a permanent copy, export to Excel or JSON regularly.
          </p>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-6 border-l-4 border-red-500">
          <h3 className="font-semibold text-gray-900 mb-2">🎨 Comparison Strategy</h3>
          <p className="text-gray-700">
            When comparing documents, upload them in a logical order (e.g., chronological or by importance). 
            This makes the comparison table easier to read and understand.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">⌨️ Keyboard Shortcuts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <kbd className="px-2 py-1 bg-white rounded border">Ctrl/Cmd + Enter</kbd>
            <span className="ml-2 text-gray-700">Submit form</span>
          </div>
          <div>
            <kbd className="px-2 py-1 bg-white rounded border">Esc</kbd>
            <span className="ml-2 text-gray-700">Close modals</span>
          </div>
          <div>
            <kbd className="px-2 py-1 bg-white rounded border">Ctrl/Cmd + S</kbd>
            <span className="ml-2 text-gray-700">Save/Export</span>
          </div>
          <div>
            <kbd className="px-2 py-1 bg-white rounded border">Tab</kbd>
            <span className="ml-2 text-gray-700">Navigate fields</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "How many keypoints can I add?",
      answer: "There's no hard limit, but we recommend 5-10 keypoints for optimal performance and readability. Too many keypoints can make the analysis overwhelming."
    },
    {
      question: "What's the maximum file size for PDFs?",
      answer: "PDFs up to 10MB are supported. Larger files may cause performance issues. Consider splitting very large documents or extracting relevant sections."
    },
    {
      question: "Can I edit keypoints after adding them?",
      answer: "Currently, you need to remove and re-add a keypoint to edit it. Make sure to export any existing analysis results before making changes."
    },
    {
      question: "Is my data stored securely?",
      answer: "Data is stored locally in your browser's storage. It's not sent to any external servers unless you explicitly export it. Clear your browser data to remove all stored information."
    },
    {
      question: "Can I use this offline?",
      answer: "Once loaded, the application works offline for most features. However, PDF processing and some advanced features may require an internet connection."
    },
    {
      question: "What languages are supported?",
      answer: "The application currently supports documents in English. The text extraction works with any language, but analysis quality may vary for non-English content."
    },
    {
      question: "Can I analyze images or scanned documents?",
      answer: "The system works with text-based PDFs only. For scanned documents or images, you'll need to use OCR (Optical Character Recognition) software first to convert them to text PDFs."
    },
    {
      question: "How do I share my analysis with others?",
      answer: "Export your results to Excel, CSV, or JSON format and share the file. The Excel format is best for sharing with non-technical users as it includes multiple organized sheets."
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
        <p className="text-gray-600 text-lg mb-6">
          Find answers to common questions about Document Analyzer.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <summary className="font-semibold text-gray-900 cursor-pointer select-none hover:text-blue-600 transition-colors">
              {faq.question}
            </summary>
            <p className="mt-3 text-gray-700">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Still have questions?</h3>
        <p className="text-gray-700 mb-4">
          If you couldn't find the answer you're looking for, here are some ways to get help:
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Contact Support
          </button>
          <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  )
}