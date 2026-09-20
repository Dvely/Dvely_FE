# Qeploy 로고 패키지

## 편집 원본
Figma: https://www.figma.com/design/zRMXy8UcumsC4I3BdoxiND/Untitled?node-id=3-2
Figma에서 심볼은 벡터, 워드마크는 편집 가능한 텍스트로 구성되어 있습니다.
다운로드용 SVG의 워드마크는 윤곽선으로 변환되어 있어 폰트를 설치하지 않아도 같은 모양으로 표시됩니다.
원본 Figma SVG 내보내기 결과를 기반으로 투명 여백을 추가했습니다. 로고 자체의 비율은 변경하지 않았습니다.
폰트 파일은 포함하지 않았습니다.

## 디자인
Q의 열린 고리 + 바깥으로 이어지는 배포 화살표.
제안 메시지: 아이디어를, 서비스로.
영문 제안 메시지: From prompt to production.

## 색상
- Violet: #7C3AED
- Ink: #0B0C12
- Lavender: #C4A7FF
- White: #FFFFFF

## 파일 안내
- Qeploy-Logo-Primary.svg / .png: 밝은 배경용 가로형 로고
- Qeploy-Logo-Dark.svg / .png: 어두운 배경용 라벤더 심볼 + 흰색 글자
- Qeploy-Logo-Black.svg / .png: 잉크색 단색 로고
- Qeploy-Logo-White.svg / .png: 흰색 단색 로고
- Qeploy-Symbol-*.svg / .png: 심볼 단독 버전
- Qeploy-App-Icon.svg: 배경을 포함한 둥근 사각형 아이콘
- Qeploy-App-Icon-192/512/1024.png: 아이콘 PNG
- favicon.svg: 브라우저 테마에 반응하는 벡터 파비콘
- favicon-16/24/32/48/64.png 및 favicon.ico: 고정 크기 파비콘
- Qeploy-Preview.png: 밝은 배경의 미리보기 이미지

가로형 PNG는 2112 × 576px, 심볼 PNG는 512 × 512px입니다.
로고와 심볼 PNG의 배경은 투명합니다. Preview 파일에는 흰 배경이 있습니다.

## 사용 규칙
1. 웹 헤더에는 가로형, 좁은 영역·파비콘·앱 아이콘에는 심볼을 사용하세요.
2. 심볼 높이의 1/4 이상 보호 여백을 확보하세요. 파일 내부 여백만으로 부족하면 레이아웃에서 추가하세요.
3. 가로세로 비율을 유지하고, 회전·그림자·윤곽선 효과를 임의로 추가하지 마세요.
4. 16px은 파비콘용이며 일반 인터페이스에서는 24px 이상을 권장합니다.
5. SVG 파일은 웹·인쇄용으로 확대해 사용할 수 있습니다.

## 웹 적용 예시
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" href="/favicon.ico" sizes="any">
<img src="/Qeploy-Logo-Primary.svg" alt="Qeploy" width="176" height="48">
```

이 패키지는 로고 디자인 제안입니다. 별도의 상표 유사성·등록 가능성 조사는 포함하지 않았습니다.
GitHub 소스 코드는 변경하지 않았습니다.
