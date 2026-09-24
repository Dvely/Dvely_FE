import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  KeyRound,
  Terminal,
  HelpCircle,
  LayoutGrid,
  Monitor,
  User,
  SlidersHorizontal,
} from 'lucide-react';

export type MeSettingsSectionId =
  | 'account'
  | 'general'
  | 'personalization'
  | 'my-computer'
  | 'cloud-browser'
  | 'ai-credentials'
  | 'api-tokens';

export type MeSettingsNavGroupKey = 'account' | 'features';

export type MeSettingsNavItem = {
  id: MeSettingsSectionId;
  icon: LucideIcon;
};

export type MeSettingsNavGroup = {
  groupKey: MeSettingsNavGroupKey;
  items: MeSettingsNavItem[];
};

export const meSettingsNavGroups: MeSettingsNavGroup[] = [
  {
    groupKey: 'account',
    items: [
      { id: 'account', icon: User },
      { id: 'general', icon: SlidersHorizontal },
      { id: 'personalization', icon: LayoutGrid },
    ],
  },
  {
    groupKey: 'features',
    items: [
      { id: 'ai-credentials', icon: KeyRound },
      { id: 'api-tokens', icon: Terminal },
      { id: 'my-computer', icon: Monitor },
      { id: 'cloud-browser', icon: Cloud },
    ],
  },
];

export const meSettingsHelpItem = {
  icon: HelpCircle,
};
