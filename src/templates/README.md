# Dvely 더미 템플릿

원본: https://figma-react-eight-plum.vercel.app/home

`index.ts`에서 RELAY 팀 워크스페이스까지 9개 더미 템플릿을 내보냅니다. 원본 홈의 이후 항목(압구정 현대 등)은 넣지 않습니다.

| ID         | 이름                  | 유형       |
| ---------- | --------------------- | ---------- |
| monoform   | MONOFORM 스튜디오     | 랜딩       |
| soluna     | SOLUNA 웰니스         | 랜딩       |
| otherday   | OTHERDAY 커피         | 랜딩       |
| paperwave  | PAPERWAVE 서점        | 랜딩       |
| axiom      | AXIOM 데이터          | 랜딩       |
| stillhouse | STILLHOUSE 공간       | 포트폴리오 |
| offgrid    | OFFGRID 페스티벌      | 랜딩       |
| indexfolio | INDEX 디자이너        | 포트폴리오 |
| relay      | RELAY 팀 워크스페이스 | 랜딩       |

- `assets/`: MONOFORM, SOLUNA, OTHERDAY는 원본 PNG입니다. 나머지는 원본 화면을 참고해 만든 정적 SVG 대체 썸네일입니다.
- 홈 카드의 `thumbnailPreviewUrl`은 원본처럼 실제 템플릿 화면을 iframe으로 표시합니다. 로컬 썸네일은 그 아래에 유지합니다.
- `previewUrl`은 원본 사이트의 상세 미리보기입니다. 인터넷 연결과 원본 사이트의 운영에 의존합니다.
- 더미 카탈로그와 썸네일만 추가했습니다. 원본 템플릿의 React 소스, 서버 API, 실제 생성·배포 기능은 포함하지 않습니다.
