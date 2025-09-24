'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import KeypointForm from '@/components/KeypointForm'
import KeypointsList from '@/components/KeypointsList'
import { useKeypoints } from '@/context/KeypointsContext'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Home() {
  const router = useRouter()
  const { keypoints, isLoading } = useKeypoints()

  const handleProceed = () => {
    if (keypoints.length === 0) {
      alert('Please add at least one keypoint before proceeding')
      return
    }
    router.push('/analysis')
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in">
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Document Keypoints Analyzer
            </h1>
            <p className="text-gray-600">
              Define keypoints to analyze in your documents
            </p>
          </div>
          <button
            onClick={() => router.push('/how-to-use')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How to Use
          </button>
        </div>
        
        <div className="space-y-6">
          <KeypointForm />
          <KeypointsList />
          
          <button 
            onClick={handleProceed}
            disabled={keypoints.length === 0}
            className="w-full btn-primary"
          >
            Proceed to Document Analysis →
          </button>
        </div>
      </div>
    </div>
  )
}