import { portfolioCodeDiffPayload } from '@/mocks/project/portfolioCodeDiff';

export type CodeExplorerFileNode = {
  id: string;
  name: string;
  path: string;
  type: 'folder' | 'file';
  changeCount?: number;
  children?: CodeExplorerFileNode[];
};

function fileNode(path: string, changeCount: number): CodeExplorerFileNode {
  const name = path.split('/').pop() ?? path;
  return {
    id: path.replace(/\//g, '-'),
    name,
    path,
    type: 'file',
    changeCount,
  };
}

export const codeExplorerTree: CodeExplorerFileNode[] = [
  fileNode('package.json', 2),
  {
    id: 'src',
    name: 'src',
    path: 'src',
    type: 'folder',
    changeCount: 74,
    children: [
      fileNode('src/App.tsx', 2),
      {
        id: 'src-components',
        name: 'components',
        path: 'src/components',
        type: 'folder',
        changeCount: 82,
        children: [fileNode('src/components/Footer.tsx', 82)],
      },
    ],
  },
  fileNode('vite.config.ts', 2),
];

export const DEFAULT_CODE_FILE_PATH = 'src/components/Footer.tsx';

export const codeDiffSummary = portfolioCodeDiffPayload.summary;
