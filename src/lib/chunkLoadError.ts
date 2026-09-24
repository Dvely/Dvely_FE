/**
 * 지연 로딩한 조각을 못 받은 것으로 보이는 오류인가.
 *
 * 이 일이 실제로 나는 자리는 배포 직후다. 산출물이 트리째 교체되므로 열어 둔 탭이 들고
 * 있는 옛 해시 파일은 그 순간부터 404 다. 그 탭에서 조각을 처음 불러오는 순간 터진다.
 *
 * 브라우저마다 문구가 달라서 한 가지로 못 잡는다. 놓치면 새로고침 안내가 안 뜰 뿐이고
 * (대신 보여줄 것은 그대로 그린다), 잘못 잡으면 멀쩡한 오류에 "새 버전" 이라고 하게 된다.
 * 그래서 넓게 잡되 `import` 실패의 특징적인 문구에 한정한다.
 */
function looksLikeChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const text = `${error.name} ${error.message}`;
  return (
    /ChunkLoadError/i.test(text) ||
    /Loading chunk .* failed/i.test(text) ||
    /Failed to fetch dynamically imported module/i.test(text) ||
    /error loading dynamically imported module/i.test(text) ||
    /Importing a module script failed/i.test(text)
  );
}

export { looksLikeChunkLoadError };
