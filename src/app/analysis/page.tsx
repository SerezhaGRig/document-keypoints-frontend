'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useKeypoints } from '@/context/KeypointsContext'
import DocumentUploader from '@/components/DocumentUploader'
import TextInput from '@/components/TextInput'
import ResultsTable from '@/components/ResultsTable'
import Navigation from '@/components/Navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function AnalysisPage() {
  const router = useRouter()
  const { keypoints, documents, isLoading } = useKeypoints()

  useEffect(() => {
    // Only redirect after loading is complete and there are no keypoints
    if (!isLoading && keypoints.length === 0) {
      router.push('/')
    }
  }, [isLoading, keypoints.length, router])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="card">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  // Don't render the page if there are no keypoints (will redirect)
  if (keypoints.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="card">
        <Navigation />
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <DocumentUploader />
          <TextInput />
        </div>
        
        {documents.length > 0 && <ResultsTable />}
      </div>
    </div>
  )
}