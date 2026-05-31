export type CodeExplorerFileNode = {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  changeCount?: number;
  children?: CodeExplorerFileNode[];
};

export type CodeDiffLine = {
  type: 'remove' | 'add';
  content: string;
};

export type CodeFileContent = {
  path: string;
  diff: CodeDiffLine[];
};

export const codeExplorerTree: CodeExplorerFileNode[] = [
  {
    id: 'sites',
    name: 'sites',
    path: 'sites',
    type: 'folder',
    changeCount: 3,
    children: [
      {
        id: 'sites-portfolio-2024',
        name: 'portfolio-2024',
        path: 'sites/portfolio-2024',
        type: 'folder',
        changeCount: 2,
        children: [
          {
            id: 'sites-portfolio-2024-index',
            name: 'index.html',
            path: 'sites/portfolio-2024/index.html',
            type: 'file',
            changeCount: 2,
          },
          {
            id: 'sites-portfolio-2024-layout',
            name: 'layout.tsx',
            path: 'sites/portfolio-2024/layout.tsx',
            type: 'file',
            changeCount: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'styles',
    name: 'styles',
    path: 'styles',
    type: 'folder',
    changeCount: 1,
    children: [
      {
        id: 'styles-globals',
        name: 'globals.css',
        path: 'styles/globals.css',
        type: 'file',
        changeCount: 1,
      },
    ],
  },
  {
    id: 'public',
    name: 'public',
    path: 'public',
    type: 'folder',
    changeCount: 1,
    children: [
      {
        id: 'public-og',
        name: 'og-meta.json',
        path: 'public/og-meta.json',
        type: 'file',
        changeCount: 1,
      },
    ],
  },
];

export const codeFileContents: Record<string, CodeFileContent> = {
  'sites/portfolio-2024/index.html': {
    path: 'sites/portfolio-2024/index.html',
    diff: [
      { type: 'remove', content: '    <section class="hero">' },
      { type: 'remove', content: '        <h1>이전 헤드라인</h1>' },
      { type: 'remove', content: '        <p>이전 설명 문구</p>' },
      { type: 'add', content: '    <section class="hero hero--biz">' },
      { type: 'add', content: '        <h1>비즈니스를 위한 완벽한 공간</h1>' },
      {
        type: 'add',
        content: '        <p>자연어로 요청한 수정사항이 실시간으로 여기에 반영됩니다.</p>',
      },
    ],
  },
  'sites/portfolio-2024/layout.tsx': {
    path: 'sites/portfolio-2024/layout.tsx',
    diff: [
      { type: 'remove', content: 'export default function RootLayout({ children }) {' },
      { type: 'add', content: 'export default function RootLayout({ children }: { children: React.ReactNode }) {' },
    ],
  },
  'styles/globals.css': {
    path: 'styles/globals.css',
    diff: [
      { type: 'remove', content: '  --hero-bg: #f8fafc;' },
      { type: 'add', content: '  --hero-bg: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);' },
    ],
  },
  'public/og-meta.json': {
    path: 'public/og-meta.json',
    diff: [
      { type: 'remove', content: '  "title": "Portfolio"' },
      { type: 'add', content: '  "title": "Portfolio 2024"' },
    ],
  },
};

export const DEFAULT_CODE_FILE_PATH = 'sites/portfolio-2024/index.html';
