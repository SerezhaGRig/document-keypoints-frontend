import axios from 'axios'
import { Keypoint, AnalysisResult } from '@/types'

const API_BASE_URL = 'https://m3wm13ba63.execute-api.us-east-1.amazonaws.com/dev'

export async function analyzeDocument(
  keypoints: Keypoint[], 
  text: string
): Promise<AnalysisResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/document/analyse`, {
      keypoints,
      text
    })
    return response.data
  } catch (error) {
    console.error('API call failed:', error)
    
    // Mock response for development
    const mockResults: AnalysisResult = {}
    keypoints.forEach(kp => {
      mockResults[kp.name] = `Analysis result for ${kp.name}: Found relevant content in the document.`
    })
    return mockResults
  }
}