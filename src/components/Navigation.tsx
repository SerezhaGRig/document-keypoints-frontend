'use client'

import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Analysis</h1>
        <p className="text-gray-600">Upload documents or enter text to analyze</p>
      </div>
      <button 
        onClick={() => router.push('/')}
        className="btn-secondary"
      >
        ← Back to Keypoints
      </button>
    </div>
  )
}