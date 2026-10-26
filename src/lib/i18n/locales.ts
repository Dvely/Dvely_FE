/*
  **지금 고를 수 있는 언어는 한국어뿐이다.**

  리소스는 ko·en·ja 세 벌이 다 있다(`src/locales`). 그런데 `useTranslation` 을 쓰는
  화면이 .tsx 134 개 중 10 개뿐이라, en·ja 를 고르면 나머지 화면이 한국어로 남는다 —
  고른 언어가 지켜지지 않는 화면을 보게 되는 쪽이 선택지가 하나인 쪽보다 나쁘다.

  선택지만 줄이는 것으로는 모자라서 **감지 결과도 여기로 모은다.** `detectLocale()` 이
  브라우저 언어를 보고 `isAppLocale` 로 거르는데, 영어권 사용자는 아무것도 고르지 않아도
  그 반쪽 화면을 먼저 만나게 된다.

  리소스는 지우지 않았다. 번역 적용률이 올라오면 이 배열에 'en', 'ja' 를 되돌리고
  `localeLabels` 에 두 줄을 더하는 것으로 끝난다.
*/
export const APP_LOCALES = ['ko'] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const LOCALE_STORAGE_KEY = 'dvely.locale';

export const DEFAULT_LOCALE: AppLocale = 'ko';

export function isAppLocale(value: string): value is AppLocale {
  return APP_LOCALES.includes(value as AppLocale);
}

export const localeLabels: Record<AppLocale, string> = {
  ko: '한국어',
};
