---
name: Qeploy
description: 말로 설명한 서비스를 디자인·개발·배포까지 잇는 AI 웹 제작 워크스페이스
colors:
  # 브랜드 — Qeploy-Logo/colors.json 과 같은 값이다. 로고와 UI 가 갈라지면 안 된다
  primary: '#7C3AED'
  primary-hover: '#6D28D9'
  primary-soft: '#C4B5FD'
  primary-subtle: '#EDE9FE'
  primary-tint: '#FAF5FF'
  lavender: '#C4A7FF'
  ink: '#0B0C12'

  # 글자
  text: '#0F172A'
  text-secondary: '#334155'
  text-tertiary: '#475569'
  text-muted: '#64748B'
  text-subtle: '#94A3B8'

  # 면
  surface: '#FFFFFF'
  surface-subtle: '#F8FAFC'
  surface-muted: '#F1F5F9'
  canvas: '#FAFAFB'

  # 선
  border: '#E2E8F0'
  border-strong: '#CBD5E1'
  border-soft: '#F1F5F9'
  border-field: '#E5E7EB'

  # 상태
  danger: '#DC2626'
  danger-strong: '#B91C1C'
  danger-border: '#FECACA'
  danger-surface: '#FEF2F2'
  warning: '#B45309'
  warning-strong: '#92400E'
  warning-border: '#FDE68A'
  warning-surface: '#FFFBEB'
  success: '#15803D'
  success-border: '#BBF7D0'
  success-surface: '#F0FDF4'

typography:
  font-sans: "'Pretendard', system-ui, -apple-system, 'Segoe UI', sans-serif"
  font-mono: 'ui-monospace, SFMono-Regular, Menlo, monospace'

  # 랜딩 전용 스케일. src/index.css 에 @utility typo-* 로 정의돼 있고
  # 각 토큰이 md 미만 축소값을 스스로 들고 있다 (아래 Typography 절 참고)
  display-lg: { size: '56px', line: '120%', weight: 700, mobile-size: '30px' }
  display-md: { size: '40px', line: '150%', weight: 700, mobile-size: '26px' }
  display-sm: { size: '30px', line: '150%', weight: 700, mobile-size: '22px' }
  title-lg: { size: '24px', line: '150%', weight: 600, mobile-size: '19px' }
  title-md: { size: '20px', line: '150%', weight: 600, mobile-size: '17px' }
  title-sm: { size: '18px', line: '150%', weight: 600, mobile-size: '16px' }

  # 앱 화면 본문. Tailwind 기본 스케일을 그대로 쓴다
  body-lg: { size: '16px', line: '150%', weight: 400 }
  body-md: { size: '15px', line: '150%', weight: 400 }
  body-sm: { size: '14px', line: '150%', weight: 400 }
  body-xs: { size: '13px', line: '150%', weight: 400 }
  caption: { size: '12px', line: '150%', weight: 500 }
  micro: { size: '11px', line: '150%', weight: 600 }

rounded:
  sm: '0.25rem'
  md: '0.375rem'
  lg: '0.5rem'
  xl: '0.75rem'
  2xl: '1rem'
  3xl: '1.5rem'
  full: '9999px'

spacing:
  base: '0.25rem'
  gutter-mobile: '1.25rem'
  gutter-tablet: '2.5rem'
  gutter-desktop: '13rem'
  section-mobile: '3rem'
  section-desktop: '4rem'

breakpoints:
  sm: '640px'
  md: '768px'
  lg: '1024px'
  xl: '1280px'

components:
  button-primary:
    background: '{colors.primary}'
    color: '{colors.surface}'
    radius: '{rounded.lg}'
    padding: '0.75rem 1rem'
    typography: '{typography.body-md}'
    weight: 600
    hover-background: '{colors.primary-hover}'
  button-secondary:
    background: '{colors.surface}'
    color: '{colors.text-secondary}'
    border: '1px solid {colors.border}'
    radius: '{rounded.lg}'
    hover-background: '{colors.surface-subtle}'
  button-disabled:
    background: '{colors.surface-muted}'
    color: '{colors.text-subtle}'
    border: '1px solid {colors.border}'
    cursor: 'default'
  card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    radius: '{rounded.2xl}'
    padding: '1.25rem'
  card-landing:
    background: '{colors.surface}'
    border: '1px solid rgba(15, 23, 42, 0.08)'
    radius: '{rounded.3xl}'
    padding: '1.25rem'
    padding-desktop: '1.5rem'
  input:
    background: '{colors.surface}'
    border: '1px solid {colors.border-field}'
    radius: '{rounded.lg}'
    height: '2.25rem'
    padding: '0 0.75rem'
    typography: '{typography.body-xs}'
  badge:
    radius: '{rounded.full}'
    padding: '0.125rem 0.5rem'
    typography: '{typography.micro}'
  dialog:
    background: '{colors.surface}'
    radius: '{rounded.2xl}'
    overlay: 'rgba(15, 23, 42, 0.25)'
    max-width: '480px'
---

# Qeploy Design System

## Overview

Qeploy 는 두 개의 얼굴을 가진다. **랜딩**은 제품을 설득하는 자리고, **워크스페이스**는
일을 하는 자리다. 둘은 같은 색과 같은 서체를 쓰지만 밀도가 다르다 — 랜딩은 56px
헤드라인과 13rem 거터로 숨 쉬고, 워크스페이스는 13px 본문과 1rem 패딩으로 정보를
채운다. 한쪽의 치수를 다른 쪽에 그대로 옮기지 말 것.

보라(`{colors.primary}`)는 **행동**에만 쓴다. 시작하기·배포·저장처럼 사용자가 누르면
무언가 일어나는 자리다. 상태 표시(성공·경고·오류)는 각자의 색을 쓰고, 나머지는 전부
슬레이트 계열 무채색이다. 화면에 보라가 두 군데 이상 강하게 떠 있으면 무엇을 눌러야
할지 알 수 없어진다.

## Colors

브랜드 세 색(`primary` · `ink` · `lavender`)은 `Qeploy-Logo/colors.json` 과 같은 값이다.
로고 패키지를 갱신하면 이쪽도 함께 갱신한다.

글자는 네 단계로만 쓴다. 더 잘게 나누면 어느 것이 더 중요한지 읽는 쪽이 구분하지
못한다.

| 토큰                      | 쓰는 자리                  |
| ------------------------- | -------------------------- |
| `{colors.text}`           | 제목, 본문                 |
| `{colors.text-muted}`     | 설명, 보조 문구            |
| `{colors.text-subtle}`    | 비어 있음 안내, 타임스탬프 |
| `{colors.text-secondary}` | 버튼·링크 레이블           |

면은 세 단계다. `{colors.surface}` 위에 `{colors.surface-subtle}` 을 얹어 영역을
나누고, `{colors.surface-muted}` 는 눌린 상태나 비활성 배경에만 쓴다.

**상태 색은 삼종 세트로 쓴다** — 글자·테두리·배경을 짝지어 쓰고 하나만 떼어 쓰지
않는다. 예: 경고는 `{colors.warning-strong}` 글자 + `{colors.warning-border}` 테두리 +
`{colors.warning-surface}` 배경.

## Typography

서체는 Pretendard 하나다. 한글과 라틴 문자의 크기 균형이 맞아 본문에서 섞여도
줄이 흔들리지 않는다.

**랜딩 스케일(`typo-*`)은 `src/index.css` 에 `@utility` 로 정의돼 있다.** `@layer
utilities` 가 아닌 이유는 그래야 `xl:typo-b3-sb` 같은 변형이 생성되기 때문이다 —
`@layer` 로 두면 변형이 아예 만들어지지 않고, 게다가 Tailwind 유틸리티를 특이도
동률로 이겨 버려 어떤 값으로도 덮어쓸 수 없게 된다.

각 토큰은 **md(768px) 미만 축소값을 스스로 들고 있다.** `typo-h1-bd` 하나만 쓰면
데스크탑 56px · 모바일 30px 이 자동으로 적용된다. 별도의 `text-[30px] md:text-[56px]`
을 붙이지 말 것.

앱 화면은 `typo-*` 를 쓰지 않는다. Tailwind 기본 스케일(`text-[13px]` 등)로 충분하고,
랜딩 스케일을 끌어오면 밀도가 맞지 않는다.

## Layout

**PC 레이아웃이 기준이고, 좁은 화면은 그것을 줄인 것이다.** 새 배치를 발명하지 말고
같은 배치의 열 수와 치수를 내린다 — 3열 표는 2열이나 3열 축소형이 되고, 세로로
여섯 번 쌓이지 않는다.

거터: `{spacing.gutter-mobile}` → md `{spacing.gutter-tablet}` → xl `{spacing.gutter-desktop}`.
랜딩 섹션의 세로 여백은 `{spacing.section-mobile}` → xl `{spacing.section-desktop}`.

**브레이크포인트 정책**

- 랜딩은 `xl`(1280px) 에서 원래 값으로 복원한다. 섹션들이 `px-52` + `w-[504px]×2`
  구조라 본래 ~1440px 기준으로 그려졌다.
- 앱 화면은 `lg`(1024px) 에서 복원한다.
- 좁은 화면 전용 값은 반드시 위 브레이크포인트에서 되돌린다. `leading-*` 처럼
  다른 토큰의 행간을 덮는 속성은 특히 주의 — 되돌리지 않으면 PC 에서 1~3px 씩
  어긋난다.

**고정 헤더는 뷰포트의 15% 를 넘지 않는다.** 모바일 56px 바 + 30px 배너(합 86px,
844px 기준 10%), 데스크탑 72px 바 + 48px 배너. 고정 헤더와 배너를 둘 다 두되 좁은
화면에서는 배너를 한 줄로 접는다.

앱 셸은 lg 이상에서 좌측 사이드바(76px 접힘 / 260px 펼침), 그 미만에서 하단 탭바다.

## Elevation & Depth

그림자는 **떠 있음**을 말할 때만 쓴다. 정보를 나누는 것은 선(`{colors.border}`)의
일이다.

| 단계    | 값                                | 자리                 |
| ------- | --------------------------------- | -------------------- |
| flat    | 없음                              | 본문 안의 카드       |
| raised  | `0 1px 3px rgba(15,23,42,0.06)`   | 목록 카드, 입력 필드 |
| overlay | `0 8px 30px rgba(15,23,42,0.08)`  | 팝오버, 드롭다운     |
| modal   | `0 16px 40px rgba(15,23,42,0.14)` | 다이얼로그           |

보라 그림자(`0 4px 14px rgba(124,58,237,0.28)`)는 주요 CTA 한 곳에만 쓴다.

## Shapes

`{rounded.lg}` 가 기본이다 — 버튼·입력·작은 카드가 전부 여기에 속한다.
`{rounded.xl}` 은 묶음 컨테이너, `{rounded.2xl}` 은 다이얼로그와 앱 카드,
`{rounded.3xl}` 은 랜딩 카드다. `{rounded.full}` 은 배지·아바타·알약 버튼에만.

**한 화면에서 반경을 세 종류 넘게 섞지 않는다.** 중첩된 카드는 바깥이 안쪽보다
한 단계 크다.

## Components

**버튼은 한 화면에 주요 행동 하나만 `{components.button-primary}` 로 둔다.** 나머지는
`{components.button-secondary}`.

**동작하지 않는 것은 눌리는 것처럼 보이지 않게 한다.** 아직 만들지 않은 기능은
`{components.button-disabled}` 를 쓰고 `cursor: default` 로 둔다. 링크가 갈 곳이 없으면
버튼이 아니라 흐린 글씨(`{colors.text-subtle}`)로 둔다. 목적지 없는 링크를 파란 글씨로
두는 것이 가장 나쁘다.

**입력 필드**(`{components.input}`)는 높이 2.25rem 로 통일한다. 같은 줄에 놓이는
버튼·셀렉트도 같은 높이다.

**터치 대상은 44px 이상.** 모바일 내비 항목은 48px 로 둔다.

**비밀값을 다루는 화면**은 별도 규칙이 있다 — 아래 Do's and Don'ts 참고.

## Do's and Don'ts

### Do

- PC 배치를 줄여서 좁은 화면에 맞춘다. 열 수를 내리고 치수를 줄인다.
- 좁은 화면 전용 값은 브레이크포인트에서 원래 값으로 되돌린다.
- 상태 색은 글자·테두리·배경 삼종으로 함께 쓴다.
- 실제 데이터가 아닌 것은 화면에서 예시라고 밝힌다.
- 비밀값(API 키·토큰)은 마스킹된 형태로만 표시한다. 평문을 한 번만 보여주는
  화면이라면 모달이나 전용 단계로 두고, 복사를 확인한 뒤에 닫는다.

### Don't

- 좁은 화면이라고 모든 섹션을 세로 스택이나 가로 스크롤 한 가지로 밀어넣지 않는다.
  섹션이 전하려는 것에 따라 배치가 다르다.
- `typo-*` 옆에 `text-*`·`leading-*` 을 같이 쓰지 않는다. 한쪽이 죽는다.
- 존재하지 않는 수치를 쓰지 않는다("가장 많이 고르는 플랜" 같은 통계, 지어낸
  사업자 정보, 실제가 아닌 후기).
- 비밀값을 상태에 남겨두거나 목록에서 다시 렌더링하지 않는다.
- 보라를 강조 이외의 자리에 쓰지 않는다.
