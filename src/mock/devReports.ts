// ===== Types =====

export interface Repository {
  id: string;
  name: string;
  language: string;
  visibility: "public" | "private";
  lastPushedAt: string;
}

export interface AnalysisCard {
  title: string;
  description: string;
}

export interface DeveloperReport {
  id: string;
  repoId: string;
  repoName: string;
  language: string;
  developerName: string;
  overallScore: number;
  scores: {
    codeQuality: number;
    collaboration: number;
    consistency: number;
    growth: number;
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

// ===== Mock Data =====

export const mockDeveloperReports: DeveloperReport[] = [
  {
    id: "report-001",
    repoId: "repo-001",
    repoName: "e-commerce-platform",
    language: "TypeScript",
    developerName: "김철수",
    overallScore: 87,
    scores: {
      codeQuality: 85,
      collaboration: 92,
      consistency: 78,
      growth: 88,
    },
    createdAt: "2025-12-03",
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
        {
          title: "성능 개선을 위한 반복 최적화 시도",
          description: "배열/객체 순회 방식 개선 흔적",
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
        {
          title: "예외 상황 가정 부족",
          description:
            "가장 흔히 발생하는 edge case 처리 루틴이 일부 누락되어 있음",
        },
      ],
      signals: [
        {
          title: "과도하게 큰 단일 함수/컴포넌트",
          description:
            "한 파일에 300줄 이상, 하나의 함수가 지나치게 많은 책임을 가짐",
        },
        {
          title: "하드코딩된 API 키 또는 민감 정보 발견",
          description: "민감 정보가 코드 내 직접 포함된 흔적이 포착됨",
        },
      ],
      recommendations: [
        "테스트 커버러지 확장하기",
        "반복되는 로직 공통화",
        "에러 및 예외처리 보강",
        "도메인 문서화 습관 들이기",
      ],
    },
  },
  {
    id: "report-002",
    repoId: "repo-002",
    repoName: "data-visualization-lib",
    language: "JavaScript",
    developerName: "이영희",
    overallScore: 82,
    scores: {
      codeQuality: 80,
      collaboration: 85,
      consistency: 76,
      growth: 83,
    },
    createdAt: "2025-12-02",
    analysis: {
      talent: [
        {
          title: "시각화 라이브러리 설계 능력 탁월",
          description:
            "D3.js와 Canvas API를 활용한 고성능 렌더링 구현 능력이 우수함",
        },
        {
          title: "사용자 경험 중심의 개발",
          description: "직관적인 API 설계로 라이브러리 채택률이 높음",
        },
      ],
      strengths: [
        {
          title: "반응형 디자인 구현 능력",
          description: "다양한 해상도와 기기에서 일관된 동작 보장",
        },
        {
          title: "성능 최적화 경험 풍부",
          description:
            "메모리 누수 방지 및 렌더링 성능 개선에 많은 노력을 기울임",
        },
      ],
      weaknesses: [
        {
          title: "모듈 간 의존성 복잡도 높음",
          description: "코드 복잡도가 높아 새로운 기여자의 진입장벽이 있음",
        },
        {
          title: "주석 및 문서화 부족",
          description: "복잡한 알고리즘에 대한 설명이 거의 없음",
        },
        {
          title: "단위 테스트 커버리지 부족",
          description: "로직 검증을 위한 테스트 작성이 미흡함",
        },
      ],
      signals: [
        {
          title: "번들 크기 증가",
          description: "라이브러리 크기가 지속적으로 증가하는 추세",
        },
        {
          title: "의존성 관리 부족",
          description: "외부 라이브러리에 대한 버전 관리가 느슨함",
        },
      ],
      recommendations: [
        "모듈 분해 및 구조 개선",
        "API 문서화 체계화",
        "단위 테스트 작성 확대",
        "성능 벤치마킹 도입",
      ],
    },
  },
  {
    id: "report-003",
    repoId: "repo-003",
    repoName: "api-gateway-service",
    language: "Go",
    developerName: "박준호",
    overallScore: 91,
    scores: {
      codeQuality: 93,
      collaboration: 89,
      consistency: 88,
      growth: 92,
    },
    createdAt: "2025-12-01",
    analysis: {
      talent: [
        {
          title: "마이크로서비스 아키텍처 전문성",
          description: "서비스 간 통신과 로드 밸런싱을 효율적으로 구현함",
        },
        {
          title: "안정적 시스템 설계",
          description: "장애 전파 방지 및 회복력 있는 구조 구현",
        },
      ],
      strengths: [
        {
          title: "에러 처리가 견고함",
          description: "예상 불가능한 상황에 대한 대응이 체계적임",
        },
        {
          title: "확장성 고려 설계",
          description: "높은 트래픽 환경을 대비한 구조 설계",
        },
        {
          title: "코드 리뷰 주도 역할",
          description: "팀 내 코드 품질 표준 수립에 기여함",
        },
      ],
      weaknesses: [
        {
          title: "성능 테스트 자동화 필요",
          description: "부하 테스트 및 성능 모니터링 자동화 미흡",
        },
        {
          title: "로깅 상세도 개선",
          description: "디버깅 시 필요한 정보가 일부 누락되는 경향",
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
        "장애 복구 시나리오 테스트",
      ],
    },
  },
  {
    id: "report-004",
    repoId: "repo-004",
    repoName: "mobile-app-framework",
    language: "Kotlin",
    developerName: "최민지",
    overallScore: 84,
    scores: {
      codeQuality: 86,
      collaboration: 81,
      consistency: 82,
      growth: 85,
    },
    createdAt: "2025-11-30",
    analysis: {
      talent: [
        {
          title: "안드로이드 생명주기 이해도 높음",
          description: "메모리 누수 방지 및 생명주기 기반 상태 관리가 체계적",
        },
        {
          title: "사용자 인터페이스 설계 센스",
          description: "직관적이고 반응성 높은 UI 구현",
        },
      ],
      strengths: [
        {
          title: "Kotlin 특성 활용",
          description: "null-safety와 함수형 프로그래밍 패턴을 적극 활용",
        },
        {
          title: "리소스 관리 효율적",
          description: "배터리 소비 및 메모리 사용을 최소화하려는 노력",
        },
      ],
      weaknesses: [
        {
          title: "단위 테스트 커버리지 낮음",
          description: "UI 계층에 대한 테스트가 거의 없음",
        },
        {
          title: "리팩토링 필요한 부분 있음",
          description: "기술 부채가 점진적으로 누적되고 있음",
        },
      ],
      signals: [
        {
          title: "난독화되지 않은 코드",
          description: "릴리스 빌드에서 변수명이 그대로 노출됨",
        },
        {
          title: "버전 관리 미흡",
          description: "라이브러리 버전 관리가 느슨함",
        },
      ],
      recommendations: [
        "UI 테스트 자동화 도입",
        "코드 난독화 설정",
        "의존성 업데이트 정기화",
        "사용자 로그 분석 시스템 구축",
      ],
    },
  },
];
