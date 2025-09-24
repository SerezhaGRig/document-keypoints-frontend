'use client'

import { useState } from 'react'
import { useKeypoints } from '@/context/KeypointsContext'
import { DocumentAnalysis } from '@/types'
import { analyzeDocument } from '@/lib/api-client'

export default function TextInput() {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { keypoints, addDocument } = useKeypoints()

  const handleAnalyze = async () => {
    if (!name.trim() || !text.trim()) {
      alert('Please enter both document name and text content')
      return
    }

    setIsLoading(true)
    try {
      const results = await analyzeDocument(keypoints, text)
      
      const document: DocumentAnalysis = {
        id: Date.now().toString(),
        name: name.trim(),
        results,
        timestamp: new Date()
      }
      
      addDocument(document)
      setName('')
      setText('')
    } catch (error) {
      console.error('Error analyzing text:', error)
      alert('Error analyzing text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Enter Text Directly</h2>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Document Name"
        className="input-field mb-3"
        disabled={isLoading}
      />
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text content"
        rows={4}
        className="input-field resize-none"
        disabled={isLoading}
      />
      <button 
        onClick={handleAnalyze}
        disabled={isLoading}
        className="mt-4 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Text'}
      </button>
    </div>
  )
}