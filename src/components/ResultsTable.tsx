'use client'

import { useKeypoints } from '@/context/KeypointsContext'
import ExportButton from './ExportButton'

export default function ResultsTable() {
  const { keypoints, documents, clearDocuments } = useKeypoints()

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Analysis Results Comparison</h2>
        <div className="flex gap-4 items-center">
          <ExportButton />
          <button 
            onClick={clearDocuments}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All Results
          </button>
        </div>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Keypoint
              </th>
              {documents.map(doc => (
                <th key={doc.id} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {doc.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {keypoints.map((kp, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {kp.name}
                </td>
                {documents.map(doc => (
                  <td key={doc.id} className="px-6 py-4 text-sm text-gray-600">
                    {doc.results[kp.name] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}