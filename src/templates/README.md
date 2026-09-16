# Dvely 더미 템플릿

원본: https://figma-react-eight-plum.vercel.app/home

`index.ts`에서 RELAY 팀 워크스페이스까지 원본 9개와, 로컬에서 직접 만든 더미 3개를 내보냅니다. 원본 홈의 이후 항목(압구정 현대 등)은 넣지 않습니다.

| ID         | 이름                  | 유형       | 출처   |
| ---------- | --------------------- | ---------- | ------ |
| monoform   | MONOFORM 스튜디오     | 랜딩       | 원본   |
| soluna     | SOLUNA 웰니스         | 랜딩       | 원본   |
| otherday   | OTHERDAY 커피         | 랜딩       | 원본   |
| paperwave  | PAPERWAVE 서점        | 랜딩       | 원본   |
| axiom      | AXIOM 데이터          | 랜딩       | 원본   |
| stillhouse | STILLHOUSE 공간       | 포트폴리오 | 원본   |
| offgrid    | OFFGRID 페스티벌      | 랜딩       | 원본   |
| indexfolio | INDEX 디자이너        | 포트폴리오 | 원본   |
| relay      | RELAY 팀 워크스페이스 | 랜딩       | 원본   |
| maru       | MARU 한옥 스테이      | 랜딩       | 로컬   |
| kiln       | KILN 도예 공방        | 랜딩       | 로컬   |
| noctua     | NOCTUA 독립 영화관    | 랜딩       | 로컬   |

- `assets/`: MONOFORM, SOLUNA, OTHERDAY는 원본 PNG입니다. 원본 계열 나머지는 원본 화면을 참고한 SVG이고, MARU·KILN·NOCTUA는 로컬에서 만든 썸네일입니다.
- 홈 카드의 `thumbnailPreviewUrl`은 실제 템플릿 화면을 iframe으로 표시합니다. MARU·KILN·NOCTUA는 `/template/{id}` 로컬 페이지를 씁니다.
- 원본 9개의 `previewUrl`은 원본 사이트에 의존합니다. 로컬 3개는 이 앱의 `/template/{id}` 페이지입니다.
