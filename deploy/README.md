# 프론트엔드 배포

`main` 기준으로 EC2(`13.251.154.173`, `qeploy.com`)에 정적 산출물을 올린다.
백엔드(`Dvely_springboot`)와 같은 인스턴스를 쓰지만 배포 경로는 완전히 분리돼 있다.

## 구조

```
/var/www/dvely/frontend/
├── dist -> releases/<sha>     ← nginx의 root. 심볼릭 링크다.
├── prev -> releases/<이전sha>  ← 롤백용 포인터
├── releases/
│   ├── <sha>/                 ← 릴리스마다 한 디렉터리 (약 27MB)
│   └── legacy-manual/         ← 자동화 이전의 수동 배포본 (1회성)
├── staging/                   ← 업로드 임시 경로. 매 배포 시작 시 비운다.
└── source/                    ← 예전에 서버에서 직접 clone 하던 흔적. 지금은 쓰지 않는다.
```

배포는 `dist` 심볼릭 링크를 새 릴리스로 갈아끼우는 것이 전부다.
정적 파일이라 프로세스 재시작이 없고, nginx reload도 필요 없다.

교체는 `mv -T`(rename)로 한다. `rm -rf dist && cp -r` 방식은 그 사이에 들어온 요청이
404를 받는다. rename은 원자적이라 그런 구간이 없다.

`/var/www/dvely/frontend` 이하는 전부 `ubuntu` 소유라 배포 전 과정에 sudo가 필요 없다.

## 워크플로

| 파일                               | 언제                         | 하는 일                                                    |
| ---------------------------------- | ---------------------------- | ---------------------------------------------------------- |
| `.github/workflows/ci.yml`         | `main` 대상 PR, `main` push  | `bun install --frozen-lockfile` → typecheck → lint → build |
| `.github/workflows/deploy-ec2.yml` | `main` push(= PR 병합), 수동 | 러너에서 빌드 → tar 업로드 → 릴리스 교체 → 검증            |

빌드는 러너에서 한다. 서버는 메모리 3.8GB에 MySQL·백엔드·Docker가 이미 올라가 있어
`bun install && bun run build`를 돌리기에 여유가 없다. 서버로는 `dist` 산출물만 보낸다.

**`main` 병합이 곧 배포다.** 2026-08-01 첫 수동 배포로 78커밋 밀려 있던 프로덕션을
갱신하고 로그인까지 확인한 뒤 `push` 트리거를 열었다.

되돌리려면 `deploy-ec2.yml` 상단의 `push` 블록을 주석 처리하면 된다.
그러면 `workflow_dispatch`(수동)만 남는다.

### 브랜치 보호

`main` 보호 규칙에 CI의 **`Typecheck and build`** 를 required status check로 등록해야
실제로 병합이 막힌다. 워크플로 파일만으로는 강제되지 않는다.
자동 배포가 켜져 있으므로, 이게 없으면 검증을 건너뛴 직접 푸시가 그대로 프로덕션에 나간다.

## 필요한 설정값

레포 Settings > Secrets and variables > Actions.

**Secrets**

| 이름           | 값                               |
| -------------- | -------------------------------- |
| `EC2_HOST`     | `13.251.154.173`                 |
| `EC2_USER`     | `ubuntu`                         |
| `EC2_SSH_KEY`  | `~/.ssh/dvely-key.pem` 내용 전체 |
| `EC2_SSH_PORT` | (선택) 기본 22                   |

`EC2_SSH_KEY`는 반드시 CLI로 등록한다. 웹 UI에 붙여넣으면 줄바꿈이 뭉개져
`ssh: no key found`로 실패한다.

```bash
gh secret set EC2_SSH_KEY < ~/.ssh/dvely-key.pem --repo Dvely/Dvely_FE
```

**Variables**

| 이름           | 값                          |
| -------------- | --------------------------- |
| `VITE_API_URL` | `https://qeploy.com/api/v1` |

시크릿이 아니라 변수인 이유: 이 값은 클라이언트 번들에 그대로 구워져 공개된다.
숨길 수 있는 값이 아니고, 잘못 들어갔을 때 로그에서 바로 보이는 편이 낫다.

`VITE_API_URL`은 **빌드 시점에 번들로 들어간다.** 서버에서 고칠 수 없다.
비어 있으면 axios `baseURL`이 `undefined`가 되어 모든 API 호출이 `qeploy.com` 오리진으로
나가고, nginx는 `/api/`만 백엔드로 넘기므로 `/auth/...` 같은 경로는 SPA fallback에 걸려
`index.html`이 돌아온다. 2026-05-29 배포본이 실제로 이 상태였다.
그래서 워크플로는 빌드 전에 값이 비었는지 확인하고, 빌드 후에는 그 문자열이 번들에
실제로 들어갔는지까지 대조한 뒤에야 업로드한다.

## 배포 검증

워크플로가 마지막에 서버 안에서 직접 확인한다.

- nginx가 내주는 `index.html`이 이번 릴리스 파일과 바이트 단위로 같은지
- `index.html`이 참조하는 JS asset이 실제로 200으로 받아지는지
- `/api/v1/auth/github/url` 프록시가 살아 있는지

바깥에서 `qeploy.com`을 부르지 않고 `127.0.0.1`로 때리는 이유는 Cloudflare 캐시 때문이다.
밖에서 보면 옛 `index.html`이 돌아와 배포 검증이 되지 않는다.
인증서가 Cloudflare Origin 전용이라 호스트명이 맞지 않으므로 `curl -k`를 쓴다.

## 롤백

```bash
ssh dvely
cd /var/www/dvely/frontend
ln -sfn "$(readlink prev)" dist.tmp && mv -T dist.tmp dist   # 직전 릴리스로
ls -1dt releases/*/                                          # 남아 있는 릴리스 확인
```

특정 릴리스로 되돌리려면 `prev` 대신 `releases/<sha>`를 직접 걸면 된다.
릴리스는 최근 5개까지 남는다(`KEEP_RELEASES`). 현재 릴리스와 `prev`는 정리 대상에서 제외된다.

nginx reload는 필요 없다. 링크를 바꾸는 즉시 반영된다.

## 패키지 매니저

**npm이 아니라 bun을 쓴다.** `package-lock.json`은 2026-05-25 이후 갱신이 끊겨
`package.json`과 어긋나 있고 `npm ci`가 거부한다(`i18next`, `react-i18next`,
`@tanstack/react-query-devtools` 누락). 실제로 유지되는 락파일은 `bun.lock`이다 —
`package.json`을 마지막으로 바꾼 커밋(`2c61c23` "i18n 라이브러리 추가")에서 함께 갱신됐다.

`package-lock.json`은 정리하거나 되살리거나 둘 중 하나를 정해야 한다.
지금처럼 두 개가 공존하면 `npm install`로 시작한 사람은 다른 의존성 트리를 받게 된다.

## 알려진 문제

- **lint 에러 17건이 남아 있다.** 대부분 `react-refresh/only-export-components`.
  CI에서 돌리되 `continue-on-error: true`라 배포를 막지 않는다.
  정리가 끝나면 그 줄만 지우면 차단 검사가 된다.
- **`source/` 디렉터리는 더 이상 쓰지 않는다.** 자동 배포가 자리를 잡으면 지워도 된다.
