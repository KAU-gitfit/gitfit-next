import { apiGet, apiPost, apiDelete } from "./client";
import { USE_MOCK_DATA } from "@/lib/config";
import type {
  Report,
  ReportListItem,
  ReportGenerateRequest,
  ReportGenerateResponse,
  ReportStatusResponse,
  ReportDetailResponse,
  ReportAnalysisResult,
} from "@/lib/types/report";

// API 응답 래퍼
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 리포트 목록 조회
export async function getReports(): Promise<Report[]> {
  if (USE_MOCK_DATA) {
    const { mockReports } = await import("@/mock/report");
    return mockReports;
  }

  const response = await apiGet<ApiResponse<ReportListItem[]>>("/api/reports");
  return response.result.map(convertListItemToReport);
}

// 리포트 상세 조회
export async function getReportDetail(reportId: string): Promise<Report> {
  if (USE_MOCK_DATA) {
    const { mockReports } = await import("@/mock/report");
    const report = mockReports.find((r) => r.id === reportId);
    if (!report) throw new Error("Report not found");
    return report;
  }

  const response = await apiGet<ApiResponse<ReportDetailResponse>>(
    `/api/reports/${reportId}`
  );
  return convertDetailToReport(response.result);
}

// 리포트 상태 조회
export async function getReportStatus(
  reportId: string
): Promise<ReportStatusResponse> {
  if (USE_MOCK_DATA) {
    return {
      reportId: parseInt(reportId),
      status: "COMPLETED",
      progress: 100,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      errorMessage: null,
    };
  }

  const response = await apiGet<ApiResponse<ReportStatusResponse>>(
    `/api/reports/${reportId}/status`
  );
  return response.result;
}

// 리포트 생성 요청
export async function generateReport(
  repositoryIds: number[]
): Promise<ReportGenerateResponse> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      reportId: Date.now(),
      message: "Mock report generation started",
      status: "PENDING",
      repositoryFullNames: [],
    };
  }

  const requestBody: ReportGenerateRequest = { repositoryIds };
  const response = await apiPost<ApiResponse<ReportGenerateResponse>>(
    "/api/reports/generate",
    requestBody
  );
  return response.result;
}

// 리포트 삭제
export async function deleteReport(reportId: string): Promise<void> {
  if (USE_MOCK_DATA) {
    return;
  }

  await apiDelete(`/api/reports/${reportId}`);
}

// 변환 함수: ReportListItem -> Report
function convertListItemToReport(item: ReportListItem): Report {
  return {
    id: item.reportId.toString(),
    repoName: item.repositoryName || "Unknown Repository",
    language: "Unknown",
    overallScore: 0,
    scores: { structure: 0, quality: 0, testing: 0, documentation: 0 },
    status: item.status,
    progress: item.progress,
    createdAt: item.createdAt.slice(0, 10),
    completedAt: item.completedAt?.slice(0, 10) || null,
  };
}

// 변환 함수: ReportDetailResponse -> Report
function convertDetailToReport(detail: ReportDetailResponse): Report {
  let analysisResult: ReportAnalysisResult | null = null;

  try {
    if (detail.result) {
      analysisResult = JSON.parse(detail.result);
    }
  } catch (e) {
    console.error("Failed to parse report result:", e);
  }

  return {
    id: detail.reportId.toString(),
    repoName:
      analysisResult?.repoName ||
      detail.repositoryName ||
      "Unknown Repository",
    language: analysisResult?.language || "Unknown",
    overallScore: analysisResult?.overallScore || 0,
    scores: analysisResult?.scores || {
      structure: 0,
      quality: 0,
      testing: 0,
      documentation: 0,
    },
    status: "COMPLETED",
    progress: 100,
    createdAt: detail.createdAt.slice(0, 10),
    completedAt: detail.completedAt?.slice(0, 10) || null,
    analysis: analysisResult?.analysis,
  };
}
