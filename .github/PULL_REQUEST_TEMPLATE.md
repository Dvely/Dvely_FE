## Summary

## Type

- [ ] feat (기능 추가)
- [ ] fix (버그 수정)
- [ ] refactor (동작 동일한 구조 개선)
- [ ] chore (설정·템플릿·의존성 등)
- [ ] docs (문서)

## Screenshots

UI 변경이 있을 때만 채우고, 없으면 섹션 삭제

| Before | After |
| ------ | ----- |
|        |       |

## Checklist

- [ ] 새 응답 필드는 `.optional()` 로 받는다. `.prefault` 는 **서버가 반드시 보낸다고 확인한** 필드에만 쓴다 — `.prefault` 는 "응답에 그 필드가 없다"와 "서버가 `null` 을 보냈다"를 같은 값으로 만들어, 계약이 어긋나도 오류 없이 **화면만 조용히 틀린다**

## Notes

- 관련 이슈/PR:
- 리스크 / 롤백:
- 후속 작업:
