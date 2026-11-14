import type { DeviceShareKind } from '@/types/deviceShare.type';

/**
 * 공유를 시작하는 명령과 준비물. 정본은 CLI README(`agent-tools/packages/cli/README.md` 의
 * `share web`·`share android`·`share ios` 절)다 — 옵션·준비물이 바뀌면 그쪽을 보고 맞춘다.
 *
 * 화면에서 공유를 만들지 않는 이유: 기기 화면을 서버로 올리는 터널은 내 컴퓨터에서 도는
 * `qeploy share` 프로세스만 열 수 있다. 웹이 링크만 만들면 아무것도 비추지 않는 링크가 된다.
 */

type DeviceShareGuide = {
  kind: DeviceShareKind;
  /** 탭 이름. 목록의 종류 배지와 같은 말을 쓴다 */
  label: string;
  command: string;
  /** 명령 아래 한 줄 */
  summary: string;
  /** 준비물과 주의. 짧게, 하나에 한 가지 */
  notes: string[];
};

const DEVICE_SHARE_GUIDES: DeviceShareGuide[] = [
  {
    kind: 'WEB',
    label: '웹',
    command: 'npx @qeploy/cli share web http://localhost:5173',
    summary:
      '내 컴퓨터에서 도는 웹 개발 서버를 Chrome 으로 띄워 공유합니다. 폰 화면처럼 보이려면 --viewport 390x844 를 붙입니다.',
    notes: [
      '설치된 Chrome·Edge 를 찾아 씁니다. 매번 새 임시 프로필이라 내 쿠키·비밀번호가 없습니다.',
      '공유 탭은 그 주소와 같은 오리진 안에서만 움직이고, 다운로드·파일 올리기·내 클립보드 붙여넣기는 막습니다.',
    ],
  },
  {
    kind: 'ANDROID',
    label: 'Android',
    command: 'npx @qeploy/cli share android --app com.example.app',
    summary:
      'Android 에뮬레이터에 띄운 앱 하나를 공유합니다. --app 이 없으면 지금 앞에 있는 앱입니다.',
    notes: [
      'Android SDK(adb)와 scrcpy(brew install scrcpy)가 필요합니다.',
      '에뮬레이터만 받습니다. 실제 폰에는 계정과 사진이 있어서입니다.',
      '에뮬레이터를 창으로 띄우면 에뮬레이터에서 복사한 내용이 내 Mac 클립보드로 넘어옵니다. -no-window 로 띄우는 것을 권합니다.',
    ],
  },
  {
    kind: 'IOS',
    label: 'iOS',
    command: 'npx @qeploy/cli share ios --app com.example.app',
    summary: 'iOS 시뮬레이터에 띄운 앱 하나를 공유합니다(macOS). --app 에는 번들 ID 를 넣습니다.',
    notes: [
      'Xcode 시뮬레이터와 AXe(brew install cameroncooke/axe/axe)가 필요합니다.',
      '시뮬레이터만 받습니다.',
      'Simulator 메뉴 Edit > Automatically Sync Pasteboard 를 꺼 두세요. 켜져 있으면 조작하는 사람이 내 Mac 클립보드를 붙여넣을 수 있습니다.',
    ],
  },
];

export { DEVICE_SHARE_GUIDES, type DeviceShareGuide };
