# Loading UI 표준 (Dvely FE)

UI 컴포넌트에서 비동기 로딩 상태(`isLoading`, `isFetching`)를 처리할 때 **반드시** 따른다.

## 핵심 규칙

- `isLoading` 상태에서는 단순 텍스트(`"로딩 중..."`)를 기본값으로 사용하지 않는다.
- 실제 최종 레이아웃과 유사한 **스켈레톤 UI**를 렌더링한다.
- 목록 화면은 리스트/카드 개수에 맞춘 스켈레톤 아이템을 표시한다.
- 상세 화면은 헤더/본문 구조에 맞춘 스켈레톤 블록을 표시한다.
- 스켈레톤은 로딩 종료 시 즉시 제거되고 실제 데이터 UI로 치환되어야 한다.

## 권장 패턴

```tsx
const { data = [], isLoading } = useSomeListQuery('some-key');
const skeletonItems = Array.from({ length: 6 }, (_, idx) => idx);

return (
  <section>
    {isLoading
      ? skeletonItems.map((item) => <CardSkeleton key={item} />)
      : data.map((item) => <Card key={item.id} item={item} />)}
  </section>
);
```

## 금지 패턴

- `isLoading ? <p>로딩중...</p> : <RealUI />` (스켈레톤 없이 텍스트만 표시)
- 로딩 중 레이아웃 점프를 유발하는 최소 높이 없는 처리
