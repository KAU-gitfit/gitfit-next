// 백엔드 API 응답 구조
export interface BackendRepository {
  id: number;
  ownerType: string | null;
  ownerName: string | null;
  full_name: string;
  language: string | null;
  private: boolean;
  pushed_at: string;
}

// 프론트엔드 UI에서 사용하는 구조
export interface Repository {
  id: string;
  name: string;
  language: string;
  visibility: "Public" | "Private";
  lastPush: string;
  isSelected: boolean;
}

// API 응답 래퍼
export interface RepositoryListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: BackendRepository[];
}

// 분석 요청 타입
export interface AnalyzeRequest {
  repositoryIds: number[];
}
