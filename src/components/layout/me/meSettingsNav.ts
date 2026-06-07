import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  Database,
  HelpCircle,
  LayoutGrid,
  Link2,
  Mail,
  Monitor,
  Plug,
  Star,
  User,
  SlidersHorizontal,
  Wand2,
} from 'lucide-react';

export type MeSettingsSectionId =
  | 'account'
  | 'general'
  | 'billing'
  | 'personalization'
  | 'mail'
  | 'data-control'
  | 'my-computer'
  | 'cloud-browser'
  | 'skills'
  | 'connectors'
  | 'integrations';

export type MeSettingsNavItem = {
  id: MeSettingsSectionId;
  label: string;
  icon: LucideIcon;
};

export type MeSettingsNavGroup = {
  title: string;
  items: MeSettingsNavItem[];
};

export const meSettingsNavGroups: MeSettingsNavGroup[] = [
  {
    title: '계정',
    items: [
      { id: 'account', label: '계정', icon: User },
      { id: 'general', label: '일반', icon: SlidersHorizontal },
      { id: 'billing', label: '사용량 및 청구', icon: Star },
      { id: 'personalization', label: '개인화', icon: LayoutGrid },
    ],
  },
  {
    title: '기능',
    items: [
      { id: 'mail', label: 'Mail', icon: Mail },
      { id: 'data-control', label: '데이터 제어', icon: Database },
      { id: 'my-computer', label: 'My Computer', icon: Monitor },
      { id: 'cloud-browser', label: '클라우드 브라우저', icon: Cloud },
      { id: 'skills', label: '스킬', icon: Wand2 },
      { id: 'connectors', label: '커넥터', icon: Plug },
      { id: 'integrations', label: '통합', icon: Link2 },
    ],
  },
];

export const meSettingsSectionLabels: Record<MeSettingsSectionId, string> = {
  account: '계정',
  general: '일반',
  billing: '사용량 및 청구',
  personalization: '개인화',
  mail: 'Mail',
  'data-control': '데이터 제어',
  'my-computer': 'My Computer',
  'cloud-browser': '클라우드 브라우저',
  skills: '스킬',
  connectors: '커넥터',
  integrations: '통합',
};

export const meSettingsHelpItem = {
  label: '도움 받기',
  icon: HelpCircle,
};
