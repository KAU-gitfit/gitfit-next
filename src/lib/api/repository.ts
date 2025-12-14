import { apiGet, apiPost } from "./client";
import { USE_MOCK_DATA } from "@/lib/config";
import type {
  Repository,
  BackendRepository,
  RepositoryListResponse,
  AnalyzeRequest,
} from "@/lib/types/repository";

// 백엔드 -> 프론트엔드 타입 변환
function convertToRepository(repo: BackendRepository): Repository {
  return {
    id: repo.id.toString(),
    name: repo.full_name,
    language: repo.language ?? "Unknown",
    visibility: repo.private ? "Private" : "Public",
    lastPush: repo.pushed_at.slice(0, 10),
    isSelected: false,
  };
}

// 레포지토리 목록 조회
export async function getRepositories(): Promise<Repository[]> {
  if (USE_MOCK_DATA) {
    const { mockRepositories } = await import("@/mock/repository");
    return mockRepositories;
  }

  const response = await apiGet<RepositoryListResponse>("/api/repositories");
  if (!response.result || !Array.isArray(response.result)) {
    return [];
  }
  return response.result.map(convertToRepository);
}

// 레포지토리 분석 요청
export async function analyzeRepositories(
  repositoryIds: number[]
): Promise<void> {
  if (USE_MOCK_DATA) {
    // 목 모드에서는 딜레이만 주고 성공 처리
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
  }

  const requestBody: AnalyzeRequest = { repositoryIds };
  await apiPost("/api/reports/generate", requestBody, true);
}
