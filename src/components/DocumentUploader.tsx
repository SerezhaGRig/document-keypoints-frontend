'use client'

import { useState, useRef } from 'react'
import { useKeypoints } from '@/context/KeypointsContext'
import { extractTextFromPDF } from '@/lib/pdf-utils'
import { DocumentAnalysis } from '@/types'
import { analyzeDocument } from '@/lib/api-client'

export default function DocumentUploader() {
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { keypoints, addDocument } = useKeypoints()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const text = await extractTextFromPDF(file)
      const results = await analyzeDocument(keypoints, text)
      
      const document: DocumentAnalysis = {
        id: Date.now().toString(),
        name: file.name,
        results,
        timestamp: new Date()
      }
      
      addDocument(document)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (error) {
      console.error('Error analyzing PDF:', error)
      alert('Error analyzing PDF. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload PDF Document</h2>
      <input 
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all"
      />
      {isLoading && (
        <div className="mt-4 text-purple-600">
          Analyzing document...
        </div>
      )}
    </div>
  )
}