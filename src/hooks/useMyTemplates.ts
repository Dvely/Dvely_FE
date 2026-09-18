import { useCallback, useEffect, useState } from 'react';
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
  const [templates, setTemplates] = useState<MyTemplateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addTemplate = useCallback((file: File, name?: string) => {
    const item: MyTemplateItem = {
      id: crypto.randomUUID(),
      name: (name ?? toTemplateName(file.name)).trim() || toTemplateName(file.name),
      fileName: file.name,
      size: file.size,
      addedAt: new Date().toISOString(),
    };

    setTemplates((current) => {
      const next = [item, ...current];
      writeStoredTemplates(next);
      return next;
    });
  }, []);

  const removeTemplate = useCallback((id: string) => {
    setTemplates((current) => {
      const next = current.filter((item) => item.id !== id);
      writeStoredTemplates(next);
      return next;
    });
  }, []);

  useEffect(() => {
    setTemplates(readStoredTemplates());
    setIsLoading(false);
  }, []);

  return { templates, isLoading, addTemplate, removeTemplate };
}
