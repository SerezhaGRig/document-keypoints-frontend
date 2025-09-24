'use client'

import { useState } from 'react'
import { useKeypoints } from '@/context/KeypointsContext'

export default function KeypointForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { addKeypoint } = useKeypoints()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && description.trim()) {
      addKeypoint({ name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Keypoint</h2>
      <div className="space-y-4">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Keypoint Name"
          className="input-field"
          required
        />
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Keypoint Description"
          rows={3}
          className="input-field resize-none"
          required
        />
        <button type="submit" className="btn-primary">
          Add Keypoint
        </button>
      </div>
    </form>
  )
}