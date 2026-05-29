# React 컴포넌트·훅 코드 순서 표준 (Dvely FE)

`src` 아래 React 컴포넌트(`*.tsx`)와 커스텀 훅(`src/hooks/*.ts`)을 작성·수정할 때 **반드시** 따른다.  
Spec Kit 구현(`speckit-implement`) 및 일반 UI 작업 시 이 문서를 먼저 읽는다.

## 핵심 규칙

함수 본문 안 선언·훅 호출은 **아래 순서**를 지킨다.

1. **State** — `useState`, `useReducer`
2. **Variables** — 그 외 훅·파생 값·상수에 가까운 `const`
3. **Functions** — 이벤트 핸들러, `useCallback`으로 감싼 함수, 일반 `function` 선언
4. **Effects** — `useEffect`, `useLayoutEffect` (항상 **맨 마지막**)

## Variables에 포함하는 것

- `useNavigate`, `useRouterState`, `useSearch`, `useParams` 등 라우터 훅
- `useQuery` / 커스텀 query 훅 반환값
- `useRef`, `useMemo` 결과
- 다른 커스텀 훅 반환값 (`useGitHubLogin()` 등)
- props·search 기반으로 계산한 `const` (`trimmedName`, `isNameValid` 등)

## Functions에 포함하는 것

- `const handleClick = () => { ... }`
- `const handleSubmit = useCallback(...)`
- `async function loadData() { ... }` (본문 안에 두는 경우)
- `useEffect` **안에만** 쓰이고 밖에서 재사용하지 않는 함수는 예외적으로 effect 내부에 둘 수 있다. 재사용·테스트·의존성이 분명하면 **밖으로 빼서 Functions 구역**에 둔다.

## Effects

- side effect는 **항상 본문 맨 아래**
- 여러 개면 **의존성·실행 순서**가 드러나게 배치한다.

## 예시

```tsx
function ExamplePage() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { data = [] } = useProjectListQuery('example');
  const isEmpty = data.length === 0;

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await save();
      void navigate({ to: '/' });
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate]);

  useEffect(() => {
    // ...
  }, []);

  return <div>...</div>;
}
```

## 금지 패턴

- `useEffect`를 state·핸들러보다 위에 두기
- 라우터/`useQuery` 결과를 state 블록과 섞어 순서 없이 나열하기
- 컴포넌트 본문 전체를 한 덩어리로 작성하기

## 관련 표준

- API 타입: `.specify/standards/zod-api-schema.md`
- 로딩 UI: `.specify/standards/loading-ui.md`
