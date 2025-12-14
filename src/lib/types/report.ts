// 백엔드 API 응답 타입
export type ReportStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

// 분석 카드
export interface AnalysisCard {
  title: string;
  description: string;
}

// AI 분석 결과 (result 필드 내부의 JSON)
export interface ReportAnalysisResult {
  id: string;
  repoId: string;
  repoName: string;
  language: string;
  developerName: string;
  overallScore: number;
  scores: {
    structure: number;
    quality: number;
    testing: number;
    documentation: number;
  };
  createdAt: string;
  analysis: {
    talent: AnalysisCard[];
    strengths: AnalysisCard[];
    weaknesses: AnalysisCard[];
    signals: AnalysisCard[];
    recommendations: string[];
  };
}

// 리포트 생성 요청
export interface ReportGenerateRequest {
  repositoryIds: number[];
}

// 리포트 생성 응답
export interface ReportGenerateResponse {
  reportId: number;
  message: string;
  status: ReportStatus;
  repositoryFullNames: string[];
}

// 리포트 상태 조회 응답
export interface ReportStatusResponse {
  reportId: number;
  status: ReportStatus;
  progress: number;
  createdAt: string;
  completedAt: string | null;
  errorMessage: string | null;
}

// 리포트 상세 조회 응답
export interface ReportDetailResponse {
  reportId: number;
  repositoryId: number | null;
  repositoryName: string | null;
  repositoryFullName: string | null;
  result: string; // JSON 문자열 (ReportAnalysisResult)
  createdAt: string;
  completedAt: string;
}

// 리포트 목록 조회 응답 (단일 항목)
export interface ReportListItem {
  reportId: number;
  repositoryName: string | null;
  repositoryFullName: string | null;
  language: string | null;
  overallScore: number | null;
  status: ReportStatus;
  progress: number;
  createdAt: string;
  completedAt: string | null;
}

// 프론트엔드에서 사용하는 리포트 타입
export interface Report {
  id: string;
  repoName: string;
  language: string;
  overallScore: number;
  scores: {
    structure: number;
    quality: number;
    testing: number;
    documentation: number;
  };
  status: ReportStatus;
  progress: number;
  createdAt: string;
  completedAt: string | null;
  analysis?: ReportAnalysisResult["analysis"];
}
