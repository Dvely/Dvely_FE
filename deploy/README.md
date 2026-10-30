# 프론트엔드 배포

`main` 기준으로 GitHub Pages에 정적 산출물을 올리고, `qeploy.com`을 거기에 붙인다.

2026-10-30까지는 운영 EC2(nginx)에 올렸다. AWS 지원이 끝나 그 인스턴스를 비우면서
Pages로 옮겼다. 예전 구성은 이 파일과 `deploy-ec2.yml`의 git 이력에 남아 있다.

## 워크플로

| 파일                                 | 언제                         | 하는 일                                                           |
| ------------------------------------ | ---------------------------- | ----------------------------------------------------------------- |
| `.github/workflows/ci.yml`           | `main` 대상 PR, `main` push  | `bun install --frozen-lockfile` → typecheck → lint → test → build |
| `.github/workflows/deploy-pages.yml` | `main` push(= PR 병합), 수동 | 빌드 → SPA fallback 추가 → Pages 배포 → 엣지에서 검증             |

**`main` 병합이 곧 배포다.**

## 저장소 설정

- Settings > Pages > Build and deployment > Source: **GitHub Actions**
- Settings > Pages > Custom domain: **`qeploy.com`**. 산출물에 `CNAME` 파일을 두지 않는다 —
  Actions 배포에서는 그 파일이 아니라 이 설정이 도메인을 정한다
- Settings > Secrets and variables > Actions > Variables:

| 이름           | 값                          |
| -------------- | --------------------------- |
| `VITE_API_URL` | `https://qeploy.com/api/v1` |

시크릿이 아니라 변수인 이유: 이 값은 클라이언트 번들에 그대로 구워져 공개된다.

`VITE_API_URL`은 **빌드 시점에 번들로 들어간다.** 워크플로는 빌드 전에 값이 비었는지,
빌드 후에는 그 문자열이 번들에 실제로 들어갔는지까지 대조한다.

## 도메인(Cloudflare DNS)

`qeploy.com`은 Cloudflare에 등록돼 있고 DNS도 Cloudflare에 있다. Pages로 보내는 레코드는
아래와 같다. **프록시는 끈다(DNS only, 회색 구름).** 켜 두면 GitHub이 인증서를 발급하지 못한다.

| 이름  | 유형  | 값                                                                                         |
| ----- | ----- | ------------------------------------------------------------------------------------------ |
| `@`   | A     | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`                 |
| `@`   | AAAA  | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www` | CNAME | `dvely.github.io`                                                                          |

`www`는 GitHub이 `qeploy.com`으로 넘겨준다. DNS가 GitHub을 가리키면 인증서가 보통 수 분 안에
발급되고, 그 뒤 Settings > Pages에서 **Enforce HTTPS**를 켠다.

사용자 프로젝트용 서브도메인(`<이름>.qeploy.com`)은 백엔드가 Cloudflare API로 따로 만든
레코드다. 위 표의 레코드만 바꾸고 그것들은 건드리지 않는다.

## SPA fallback

Pages에는 nginx의 `try_files` 같은 서버 쪽 fallback이 없다. 워크플로가 `index.html`을
`404.html`로 복사해 두므로 `/home` 같은 깊은 주소로 바로 들어와도 앱이 뜬다.
**상태 코드는 404**로 나간다. 검색 수집 대상인 공개 페이지(`public/sitemap.xml`)만은
`template.html`처럼 `<경로>.html`로도 두어 200으로 받게 한다. sitemap에 페이지를 늘리면
워크플로의 `Add SPA fallback` 스텝에도 같이 넣는다.

## 백엔드

함께 옮기지 않았다. `qeploy.com/api/`를 받아 주던 nginx가 없으므로 지금 번들의 API 호출은
Pages의 404로 끝난다. 백엔드를 다시 띄우면 `api.qeploy.com` 같은 별도 호스트에 두고,
`VITE_API_URL`을 그 주소로 바꾼 뒤 재배포한다. 이때 백엔드 CORS가 `https://qeploy.com`을
허용해야 한다.

## 배포 검증

워크플로가 마지막에 Pages 엣지(`185.199.108.153`)를 직접 때려 확인한다.

- `/` 의 `index.html`이 이번 빌드의 진입 스크립트를 참조하는지
- 그 스크립트가 200으로 받아지는지
- `/template` 도 같은 앱을 내주는지

DNS를 거치지 않으므로 도메인을 옮기는 도중이나 앞에 프록시가 있어도 같은 것을 본다.

## 롤백

이전 커밋으로 되돌리는 PR을 병합하거나, Actions에서 이전에 성공한 `Deploy to GitHub Pages`
실행을 다시 돌린다(Re-run all jobs). Pages는 마지막으로 배포된 산출물을 통째로 내준다.

## 패키지 매니저

**npm이 아니라 bun을 쓴다.** `package-lock.json`은 2026-05-25 이후 갱신이 끊겨
`package.json`과 어긋나 있고 `npm ci`가 거부한다(`i18next`, `react-i18next`,
`@tanstack/react-query-devtools` 누락). 실제로 유지되는 락파일은 `bun.lock`이다 —
`package.json`을 마지막으로 바꾼 커밋(`2c61c23` "i18n 라이브러리 추가")에서 함께 갱신됐다.

`package-lock.json`은 정리하거나 되살리거나 둘 중 하나를 정해야 한다.
지금처럼 두 개가 공존하면 `npm install`로 시작한 사람은 다른 의존성 트리를 받게 된다.
