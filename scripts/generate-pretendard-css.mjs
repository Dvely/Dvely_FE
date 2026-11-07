#!/usr/bin/env node
/*
  src/styles/pretendard.css 를 만든다. 손으로 고치지 말고 이 스크립트를 다시 돌린다.

    node scripts/generate-pretendard-css.mjs

  원본은 패키지의 dynamic-subset CSS 다(굵기마다 unicode-range 로 쪼갠 조각 92개).
  브라우저는 화면에 실제로 나온 글자가 든 조각만 받으므로, 굵기 하나에 0.7~0.8MB 씩
  통째로 받던 것이 수십 KB 로 준다.

  패키지 CSS 를 그대로 import 하지 않고 다시 쓰는 이유는 세 가지다.
  1. woff 폴백을 뺀다. 브라우저는 앞의 woff2 를 집으므로 woff 는 아무도 받지 않는데,
     번들러는 참조된 자산이라 전부 dist 에 복사한다.
  2. 쓰지 않는 굵기(100·200·300)를 뺀다. 앱 어디에도 400 미만 굵기가 없다
     (font-thin/extralight/light, font-weight 100~300, lighter 모두 0건).
     900 은 남긴다 — Tailwind preflight 가 strong 을 `bolder` 로 두어서, 600 이상
     글자 안의 strong 은 900 을 요청한다.
  3. url 을 node_modules 상대경로로 바꾼다. CSS 의 url() 을 패키지 이름으로 적으면
     vite 가 풀지 못하고 경로를 그대로 둬서 폰트가 전부 404 난다.

  local() 은 예전 파일과 같이 앞에 둔다. Pretendard 를 설치한 사용자는 내려받지 않는다.
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = resolve(root, 'node_modules/pretendard');
const sourcePath = resolve(packageDir, 'dist/web/static/pretendard-dynamic-subset.css');
const targetPath = resolve(root, 'src/styles/pretendard.css');

/** 이 굵기들만 남긴다. 바꾸면 위 주석의 근거도 같이 고친다 */
const KEEP_WEIGHTS = new Map([
  [400, 'Pretendard Regular'],
  [500, 'Pretendard Medium'],
  [600, 'Pretendard SemiBold'],
  [700, 'Pretendard Bold'],
  [800, 'Pretendard ExtraBold'],
  [900, 'Pretendard Black'],
]);

/** src/styles/ 에서 node_modules 까지의 상대경로 */
const URL_PREFIX = '../../node_modules/pretendard/dist/web/static/woff2-dynamic-subset/';

const { version } = JSON.parse(readFileSync(resolve(packageDir, 'package.json'), 'utf8'));
const source = readFileSync(sourcePath, 'utf8');
const blocks = source.match(/@font-face\s*{[^}]*}/g) ?? [];

const parsed = [];
for (const block of blocks) {
  const weight = Number(/font-weight:\s*(\d+)/.exec(block)?.[1]);
  if (!KEEP_WEIGHTS.has(weight)) continue;

  const file = /url\(\.\/woff2-dynamic-subset\/([^)]+\.woff2)\)/.exec(block)?.[1];
  const subset = Number(/\.subset\.(\d+)\.woff2$/.exec(file ?? '')?.[1]);
  const range = /unicode-range:\s*([^;]+);/.exec(block)?.[1];
  if (!file || !range || Number.isNaN(subset)) {
    throw new Error(`예상과 다른 @font-face 블록이다. 패키지 형식이 바뀌었는지 본다:\n${block}`);
  }
  parsed.push({ weight, file, subset, range: range.trim() });
}

/*
  같은 조각 번호(= 같은 unicode-range)끼리 붙여 적는다. 패키지 순서(굵기별로 92개씩)
  그대로면 같은 범위 문자열이 수십 KB 떨어져 반복돼 gzip 창(32KB)을 벗어나고, 렌더링을
  막는 첫 CSS 가 압축되지 않는다. 순서는 @font-face 매칭 결과에 영향이 없다.
*/
parsed.sort((a, b) => a.subset - b.subset || a.weight - b.weight);

const faces = [];
for (const { weight, file, range } of parsed) {
  faces.push(
    [
      '@font-face {',
      "  font-family: 'Pretendard';",
      '  font-style: normal;',
      `  font-weight: ${weight};`,
      '  font-display: swap;',
      `  src: local('${KEEP_WEIGHTS.get(weight)}'), url(${URL_PREFIX}${file}) format('woff2');`,
      `  unicode-range: ${range};`,
      '}',
    ].join('\n'),
  );
}

const expected = KEEP_WEIGHTS.size * 92;
if (faces.length !== expected) {
  throw new Error(
    `@font-face 가 ${faces.length}개다(예상 ${expected}). 패키지 형식이 바뀌었는지 본다.`,
  );
}

const header = `/*
  자동 생성 파일 — 고치지 말 것. scripts/generate-pretendard-css.mjs 를 다시 돌린다.
  원본: pretendard@${version} dist/web/static/pretendard-dynamic-subset.css
  굵기 ${[...KEEP_WEIGHTS.keys()].join('·')}, woff2 전용, unicode-range 조각 ${faces.length}개.
  패키지를 올리면 이 파일도 다시 만든다.

  Copyright (c) 2021 Kil Hyung-jin, with Reserved Font Name Pretendard.
  SIL Open Font License 1.1 - https://github.com/orioncactus/pretendard
*/
`;

writeFileSync(targetPath, `${header}\n${faces.join('\n\n')}\n`);
console.log(`${targetPath} — @font-face ${faces.length}개`);
