export type PortfolioNavItem = {
  id: string;
  label: string;
};

export type CoverLetterItem = {
  number: string;
  title: string;
  paragraphs: string[];
};

export type HistoryItem = {
  period: string;
  title: string;
  description: string;
};

export type SkillGroup = {
  title: string;
  subtitle: string;
  skills: string[];
};

export type PortfolioProject = {
  title: string;
  description: string;
  period?: string;
  details?: string[];
  stacks?: string[];
};

export const PORTFOLIO_SITE_TITLE = '포트폴리오';

export const PORTFOLIO_NAV_ITEMS: PortfolioNavItem[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'cover', label: 'Cover' },
  { id: 'history', label: 'History' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

export const PORTFOLIO_HERO = {
  greeting: "Hello, I'm",
  role: 'Full Stack Developer',
  subtitle: ['UI부터 API까지,', '서비스의 처음과 끝을 만듭니다.'],
};

export const PORTFOLIO_ABOUT = {
  title: 'About Me',
  paragraphs: [
    '안녕하세요, 민서입니다. 2년차 웹 개발자로 SaaS와 커머스 도메인에서 일해왔습니다. 빠르게 변하는 요구사항 속에서도 안정적인 배포와 명확한 UI를 만드는 데 관심이 많습니다.',
    'React와 TypeScript를 중심으로 작업하며, 디자인 시스템과 API 연동, 폼·결제 플로우처럼 사용자 경험에 직접 닿는 영역을 주로 맡아왔습니다.',
    '최근에는 Node.js와 PostgreSQL을 함께 다루며 기능 설계부터 배포까지 한 흐름으로 이해하려 노력하고 있습니다. 작은 기능 하나도 팀이 다시 쓰기 쉽게 만드는 것을 좋아합니다.',
    '이 페이지는 제가 배우고 만든 것들을 정리해 둔 개인 아카이브입니다.',
  ],
};

export const PORTFOLIO_COVER_LETTERS: CoverLetterItem[] = [
  {
    number: '01',
    title: '개발에 관심을 갖게 된 이유',
    paragraphs: [
      '대학 시절 동아리 홈페이지를 직접 수정하면서 HTML과 CSS를 처음 접했습니다. 작은 레이아웃 변경이 화면 전체 분위기를 바꾸는 과정이 신기했고, 그때부터 웹 개발에 관심을 갖기 시작했습니다.',
      '졸업 후에는 스타트업 인턴으로 합류해 실제 사용자가 있는 서비스를 운영하는 경험을 했습니다. 버그 수정, 기능 추가, 배포까지 전 과정을 경험하며 개발이 단순한 코딩을 넘어 문제 해결 도구라는 걸 배웠습니다.',
      '지금은 프론트엔드를 중심으로 일하지만, 서비스 전체 흐름을 이해하는 개발자가 되고 싶다는 목표는 그때부터 이어져 왔습니다.',
    ],
  },
  {
    number: '02',
    title: '일하는 방식',
    paragraphs: [
      '업무를 시작할 때는 먼저 사용자 시나리오와 예외 케이스를 정리한 뒤 구현에 들어갑니다. 요구사항이 모호할수록 빠르게 질문하고, 작은 단위로 확인하며 진행하는 편입니다.',
      '코드 리뷰를 통해 팀의 기준을 맞추는 과정을 중요하게 생각합니다. 제 코드가 다른 사람에게 읽히는 순간, 더 단순하고 명확한 구조를 고민하게 됩니다.',
      '새로운 기술을 도입할 때는 유행보다 팀의 유지보수 비용과 학습 곡선을 먼저 따집니다. 필요할 때 과감히 바꾸되, 이유 없는 변경은 피하려 합니다.',
    ],
  },
  {
    number: '03',
    title: '협업 경험',
    paragraphs: [
      '스터디에서 팀 프로젝트로 예약 관리 서비스를 만들었습니다. 프론트엔드 담당으로 캘린더 UI와 예약 상태 흐름을 구현했고, API 스펙 논의 과정에서 백엔드와 함께 응답 구조를 단순화했습니다.',
      '이전 회사에서는 디자이너·기획자·QA와 주간 스프린트를 운영했습니다. 릴리즈 전 체크리스트를 공유하고, 장애 대응 시 재현 경로를 문서화하는 문화를 팀에 제안해 도입했습니다.',
      '원격 협업 환경에서도 이슈를 짧게 정리하고, 스크린샷과 로그를 함께 공유하는 습관을 들여 커뮤니케이션 비용을 줄이려 노력했습니다.',
    ],
  },
  {
    number: '04',
    title: '앞으로의 목표',
    paragraphs: [
      '사용자가 “쓰기 편하다”고 느끼는 인터페이스를 만드는 개발자가 되고 싶습니다. 화면만 예쁜 것이 아니라, 실제 업무와 일상에서 도움이 되는 제품을 만드는 데 집중하겠습니다.',
      '프론트엔드 역량을 기반으로 API 설계와 데이터 모델에도 더 적극적으로 참여하고 싶습니다. 기능 하나를 끝에서 끝까지 책임질 수 있는 범위를 넓혀가는 것이 목표입니다.',
      '새로운 팀에 합류한다면, 빠르게 맥락을 이해하고 신뢰를 쌓는 구성원이 되겠습니다. 배운 것은 문서와 코드로 남기고, 팀과 함께 성장하는 경험을 만들고 싶습니다.',
    ],
  },
];

export const PORTFOLIO_HISTORY: HistoryItem[] = [
  {
    period: '2017 ~ 2021',
    title: 'OO대학교 컴퓨터공학과',
    description:
      '알고리즘, 자료구조, 웹 프로그래밍 기초를 학습했고, 학술제에서 동아리 관리 웹앱을 팀으로 제작해 우수상을 받았습니다.',
  },
  {
    period: '2021.07 ~ 2022.01',
    title: '스타트업 인턴',
    description:
      'React 기반 어드민 페이지 유지보수와 고객 문의 대시보드 기능을 담당했습니다. Git 브랜치 전략과 코드 리뷰 문화를 처음 경험했습니다.',
  },
  {
    period: '2022.03 ~ 2024.08',
    title: 'Nova Labs',
    description:
      'B2B SaaS 제품의 프론트엔드 개발을 맡았습니다. 권한 관리, 알림 센터, 온보딩 플로우를 구현했고, Lighthouse 성능 점수 개선 작업에도 참여했습니다.',
  },
  {
    period: '2024.09 ~',
    title: 'Freelance / Side Projects',
    description:
      '소규모 쇼핑몰 리뉴얼과 랜딩 페이지 제작을 병행하며, Next.js App Router와 Tailwind CSS 기반 프로젝트를 운영 중입니다.',
  },
  {
    period: '2025.01 ~',
    title: '오픈소스 기여',
    description:
      'UI 컴포넌트 라이브러리에 접근성 관련 이슈를 해결하는 PR을 보냈고, 문서 오타 수정과 예제 코드 개선에도 참여했습니다.',
  },
];

export const PORTFOLIO_SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Main Stacks',
    subtitle: '최근 프로젝트에서 가장 자주 사용하는 기술',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Vitest',
      'Playwright',
      'Git',
      'GitHub Actions',
    ],
  },
  {
    title: 'Experience Stacks',
    subtitle: '실무·사이드 프로젝트에서 다뤄 본 기술',
    skills: [
      'Vue',
      'Nuxt',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Docker',
      'AWS S3',
      'Vercel',
      'Figma',
      'Storybook',
      'Sentry',
      'Jest',
      'Cypress',
      'SCSS',
      'REST API',
      'GraphQL',
    ],
  },
];

export const PORTFOLIO_WORK_PROJECTS: PortfolioProject[] = [
  {
    title: 'Pulse Dashboard',
    description: 'B2B SaaS 사용자 활동과 구독 상태를 한눈에 보는 운영 대시보드',
    period: '2023.04 ~ 2024.02',
    details: [
      '차트·테이블·필터 조합 UI를 컴포넌트 단위로 분리해 재사용성 확보',
      '대용량 목록 가상 스크롤 적용으로 렌더링 성능 개선',
    ],
    stacks: ['react', 'typescript', 'recharts'],
  },
  {
    title: 'Shoplane Admin',
    description: '소형 커머스 셀러를 위한 상품·주문 관리 어드민',
    period: '2022.08 ~ 2023.03',
    details: [
      '주문 상태 변경과 배송 추적 화면 구현',
      '엑셀 업로드 기반 대량 상품 등록 기능 개발',
    ],
    stacks: ['next.js', 'tailwind css'],
  },
  {
    title: 'Notify Hub',
    description: '앱 내 알림과 이메일 발송 이력을 통합 관리하는 서비스',
    details: [
      '알림 템플릿 미리보기와 테스트 발송 기능 구현',
      '다국어 템플릿 변수 치환 로직 UI 제공',
    ],
    stacks: ['react', 'zod', 'react-hook-form'],
  },
  {
    title: 'Onboard Flow',
    description: '신규 가입 사용자를 위한 단계형 온보딩 경험',
    period: '2024.03 ~ 2024.07',
    details: [
      '단계별 진행률 저장 및 이탈 후 재진입 지원',
      'A/B 테스트용 UI 변형 스위칭 구조 설계',
    ],
    stacks: ['next.js', 'typescript'],
  },
];

export const PORTFOLIO_TOY_PROJECTS: PortfolioProject[] = [
  {
    title: 'Weather Pocket',
    description: '즐겨찾는 도시 날씨를 빠르게 확인하는 미니 웹앱',
    details: [
      'OpenWeather API 연동 및 위치 기반 검색 구현',
      'PWA 설치 지원과 오프라인 캐시 적용',
    ],
    stacks: ['vite', 'react', 'pwa'],
  },
  {
    title: 'Focus Timer',
    description: '뽀모도로 타이머와 간단한 작업 기록 기능',
    details: [
      'localStorage 기반 세션 저장',
      '다크 모드와 알림음 커스터마이징 지원',
    ],
    stacks: ['react', 'zustand'],
  },
  {
    title: 'Link Shelf',
    description: '개발자용 북마크 정리 페이지',
    period: '2025.02 ~ 진행중',
    details: [
      '태그·검색·드래그 정렬 기능 구현',
      'Markdown 메모와 링크 미리보기 카드 UI 제공',
    ],
    stacks: ['next.js', 'tailwind css'],
  },
  {
    title: 'Color Palette Lab',
    description: '브랜드 컬러 조합을 실험해 보는 토이 프로젝트',
    details: ['접근성 대비 점수 계산', 'Tailwind config 코드 자동 생성'],
    stacks: ['typescript', 'canvas api'],
  },
];

export const PORTFOLIO_CONTACT = {
  email: 'hello.minsuh.dev@example.com',
  github: 'https://github.com/minsuh-dev',
  githubLabel: 'github.com/minsuh-dev',
};
