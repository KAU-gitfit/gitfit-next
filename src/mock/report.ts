import type { Report } from "@/lib/types/report";

export const mockReports: Report[] = [
  {
    id: "report-001",
    repoName: "e-commerce-platform",
    language: "TypeScript",
    overallScore: 87,
    scores: {
      structure: 85,
      quality: 92,
      testing: 78,
      documentation: 88,
    },
    status: "COMPLETED",
    progress: 100,
    createdAt: "2025-12-03",
    completedAt: "2025-12-03",
    analysis: {
      talent: [
        {
          title: "도메인 요구사항 이해도 우수",
          description:
            "요구사항 분석–설계–구현 흐름이 자연스럽고 변경 요청 반영 속도가 안정적임",
        },
        {
          title: "협업 친화적 커밋 메시지 작성",
          description: "협업 프로젝트에서 좋은 성과를 낼 가능성이 높음",
        },
      ],
      strengths: [
        {
          title: "위험한 코드 패턴 최소 사용",
          description: "JSON 텍스트에서 위험도 높은 API 사용 비율이 낮음",
        },
        {
          title: "예외/오류 처리 비율 높음",
          description:
            "try-catch, 타입 검사, null-safe 처리 등의 패턴이 꾸준히 발견됨",
        },
      ],
      weaknesses: [
        {
          title: "테스트 커버리지 부족",
          description:
            "기능 중심 개발 비중이 높고 안정성 점검 루틴은 부족한 편",
        },
        {
          title: "주석 및 문서화 비율 낮음",
          description: "복잡한 로직에 대한 주석이 거의 없음",
        },
      ],
      signals: [
        {
          title: "과도하게 큰 단일 함수/컴포넌트",
          description:
            "한 파일에 300줄 이상, 하나의 함수가 지나치게 많은 책임을 가짐",
        },
      ],
      recommendations: [
        "테스트 커버리지 확장하기",
        "반복되는 로직 공통화",
        "에러 및 예외처리 보강",
        "도메인 문서화 습관 들이기",
      ],
    },
  },
  {
    id: "report-002",
    repoName: "data-visualization-lib",
    language: "JavaScript",
    overallScore: 82,
    scores: {
      structure: 80,
      quality: 85,
      testing: 76,
      documentation: 83,
    },
    status: "COMPLETED",
    progress: 100,
    createdAt: "2025-12-02",
    completedAt: "2025-12-02",
    analysis: {
      talent: [
        {
          title: "시각화 라이브러리 설계 능력 탁월",
          description:
            "D3.js와 Canvas API를 활용한 고성능 렌더링 구현 능력이 우수함",
        },
      ],
      strengths: [
        {
          title: "반응형 디자인 구현 능력",
          description: "다양한 해상도와 기기에서 일관된 동작 보장",
        },
      ],
      weaknesses: [
        {
          title: "모듈 간 의존성 복잡도 높음",
          description: "코드 복잡도가 높아 새로운 기여자의 진입장벽이 있음",
        },
      ],
      signals: [
        {
          title: "번들 크기 증가",
          description: "라이브러리 크기가 지속적으로 증가하는 추세",
        },
      ],
      recommendations: [
        "모듈 분해 및 구조 개선",
        "API 문서화 체계화",
        "단위 테스트 작성 확대",
      ],
    },
  },
  {
    id: "report-003",
    repoName: "api-gateway-service",
    language: "Go",
    overallScore: 91,
    scores: {
      structure: 93,
      quality: 89,
      testing: 88,
      documentation: 92,
    },
    status: "COMPLETED",
    progress: 100,
    createdAt: "2025-12-01",
    completedAt: "2025-12-01",
    analysis: {
      talent: [
        {
          title: "마이크로서비스 아키텍처 전문성",
          description: "서비스 간 통신과 로드 밸런싱을 효율적으로 구현함",
        },
      ],
      strengths: [
        {
          title: "에러 처리가 견고함",
          description: "예상 불가능한 상황에 대한 대응이 체계적임",
        },
      ],
      weaknesses: [
        {
          title: "성능 테스트 자동화 필요",
          description: "부하 테스트 및 성능 모니터링 자동화 미흡",
        },
      ],
      signals: [
        {
          title: "메모리 누수 의심",
          description: "장기 운영 시 메모리 사용량이 점진적으로 증가",
        },
      ],
      recommendations: [
        "성능 테스트 자동화 구축",
        "분산 추적 시스템 도입",
        "메모리 프로파일링 정기 수행",
      ],
    },
  },
];
