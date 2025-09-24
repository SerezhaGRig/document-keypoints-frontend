'use client'

import { useKeypoints } from '@/context/KeypointsContext'

export default function KeypointsList() {
  const { keypoints, removeKeypoint } = useKeypoints()

  if (keypoints.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Keypoints</h2>
        <p className="text-gray-500 italic">No keypoints added yet</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Keypoints</h2>
      <div className="space-y-3">
        {keypoints.map((kp, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all animate-slide-up">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{kp.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{kp.description}</p>
              </div>
              <button 
                onClick={() => removeKeypoint(index)}
                className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove keypoint"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}