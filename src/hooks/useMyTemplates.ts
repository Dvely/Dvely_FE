import { useCallback, useState } from 'react';
import {
  myTemplateListSchema,
  type MyTemplateItem,
} from '@/types/my-template.type';

const STORAGE_KEY = 'qeploy.my-templates';

function readStoredTemplates(): MyTemplateItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return myTemplateListSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeStoredTemplates(templates: MyTemplateItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

function toTemplateName(fileName: string) {
  return fileName.replace(/\.zip$/i, '').trim() || '내 템플릿';
}

export function useMyTemplates() {
  /*
    처음 값을 effect 가 아니라 초기화 함수로 읽는다.

    예전에는 빈 배열로 시작해 effect 에서 `setTemplates(readStoredTemplates())` 를
    불렀다. localStorage 는 동기라 기다릴 것이 없는데도 렌더가 한 번 더 돌았고, 그
    한 프레임 동안 "불러오는 중" 스켈레톤이 깜빡였다. 있지도 않은 대기를 보여준 셈이다.

    `useState(fn)` 은 첫 렌더에서 한 번만 부른다. 그래서 목록이 처음부터 제 값으로
    그려지고, 로딩 상태 자체가 필요 없어진다.
  */
  const [templates, setTemplates] = useState<MyTemplateItem[]>(readStoredTemplates);

  const addTemplate = useCallback(
    (
      file: File,
      options?: {
        name?: string;
        siteType?: MyTemplateItem['siteType'];
        categories?: MyTemplateItem['categories'];
      },
    ) => {
      const item: MyTemplateItem = {
        id: crypto.randomUUID(),
        name: (options?.name ?? toTemplateName(file.name)).trim() || toTemplateName(file.name),
        fileName: file.name,
        size: file.size,
        siteType: options?.siteType ?? null,
        categories: options?.categories ?? [],
        addedAt: new Date().toISOString(),
      };

      setTemplates((current) => {
        const next = [item, ...current];
        writeStoredTemplates(next);
        return next;
      });
    },
    [],
  );

  const removeTemplate = useCallback((id: string) => {
    setTemplates((current) => {
      const next = current.filter((item) => item.id !== id);
      writeStoredTemplates(next);
      return next;
    });
  }, []);


  return { templates, addTemplate, removeTemplate };
}
