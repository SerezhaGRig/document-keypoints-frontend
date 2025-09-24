'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Keypoint, DocumentAnalysis } from '@/types'

interface KeypointsContextType {
  keypoints: Keypoint[]
  documents: DocumentAnalysis[]
  addKeypoint: (keypoint: Keypoint) => void
  removeKeypoint: (index: number) => void
  addDocument: (document: DocumentAnalysis) => void
  clearDocuments: () => void
  isLoading: boolean
}

const KeypointsContext = createContext<KeypointsContextType | undefined>(undefined)

const STORAGE_KEYS = {
  KEYPOINTS: 'document_analyzer_keypoints',
  DOCUMENTS: 'document_analyzer_documents'
}

export function KeypointsProvider({ children }: { children: React.ReactNode }) {
  const [keypoints, setKeypoints] = useState<Keypoint[]>([])
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        if (typeof window !== 'undefined') {
          // Load keypoints
          const storedKeypoints = localStorage.getItem(STORAGE_KEYS.KEYPOINTS)
          if (storedKeypoints) {
            const parsed = JSON.parse(storedKeypoints)
            setKeypoints(Array.isArray(parsed) ? parsed : [])
          }

          // Load documents
          const storedDocuments = localStorage.getItem(STORAGE_KEYS.DOCUMENTS)
          if (storedDocuments) {
            const parsed = JSON.parse(storedDocuments)
            setDocuments(Array.isArray(parsed) ? parsed : [])
          }
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Save keypoints to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.KEYPOINTS, JSON.stringify(keypoints))
      } catch (error) {
        console.error('Error saving keypoints to localStorage:', error)
      }
    }
  }, [keypoints, isLoading])

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents))
      } catch (error) {
        console.error('Error saving documents to localStorage:', error)
      }
    }
  }, [documents, isLoading])

  const addKeypoint = useCallback((keypoint: Keypoint) => {
    setKeypoints(prev => [...prev, keypoint])
  }, [])

  const removeKeypoint = useCallback((index: number) => {
    setKeypoints(prev => prev.filter((_, i) => i !== index))
  }, [])

  const addDocument = useCallback((document: DocumentAnalysis) => {
    setDocuments(prev => [...prev, document])
  }, [])

  const clearDocuments = useCallback(() => {
    setDocuments([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.DOCUMENTS)
    }
  }, [])

  return (
    <KeypointsContext.Provider value={{
      keypoints,
      documents,
      addKeypoint,
      removeKeypoint,
      addDocument,
      clearDocuments,
      isLoading
    }}>
      {children}
    </KeypointsContext.Provider>
  )
}

export function useKeypoints() {
  const context = useContext(KeypointsContext)
  if (context === undefined) {
    throw new Error('useKeypoints must be used within a KeypointsProvider')
  }
  return context
}