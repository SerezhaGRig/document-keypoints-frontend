export interface Keypoint {
  name: string;
  description: string;
}

export interface AnalysisRequest {
  keypoints: Keypoint[];
  text: string;
}

export interface AnalysisResult {
  [keypointName: string]: string;
}

export interface DocumentAnalysis {
  id: string;
  name: string;
  results: AnalysisResult;
  timestamp: Date;
}

export interface AppState {
  keypoints: Keypoint[];
  documents: DocumentAnalysis[];
}