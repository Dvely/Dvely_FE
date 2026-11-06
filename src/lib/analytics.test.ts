// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  describeClick,
  IGNORED_CLICK_LABEL,
  initAnalytics,
  isAnalyticsEnvironment,
  MAX_CLICK_LABEL_LENGTH,
  normalizePagePath,
  resolveClickLabel,
  resolveMeasurementId,
  toPageLocation,
  toSafeReferrer,
  trackPageView,
  UNLABELED_CLICK_LABEL,
} from '@/lib/analytics';

/*
  GA 로 무엇이 나가는지를 본다. 보고서가 틀리는 것보다 **보내면 안 되는 것이 나가는 것**이
  더 큰 사고라서, 주소 정리와 ignore 처리는 경우를 촘촘히 둔다.

  gtag.js 는 실제로 받지 않는다. happy-dom 의 외부 스크립트 로드를 끄고, 명령이 쌓이는
  window.dataLayer 를 그대로 읽는다 — 그것이 gtag.js 가 받아 가는 입력이다.
*/

type HappyDomSettings = {
  disableJavaScriptFileLoading: boolean;
  handleDisabledFileLoadingAsSuccess: boolean;
};

function happyDomSettings(): HappyDomSettings {
  return (window as unknown as { happyDOM: { settings: HappyDomSettings } }).happyDOM.settings;
}

/** dataLayer 에는 `arguments` 객체가 쌓인다. 비교하기 쉽게 배열로 편다 */
function commands(): unknown[][] {
  return (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>));
}

function events(name: string): Record<string, unknown>[] {
  return commands()
    .filter(([command, eventName]) => command === 'event' && eventName === name)
    .map(([, , params]) => params as Record<string, unknown>);
}

function gtagScripts() {
  return document.head.querySelectorAll('script[src^="https://www.googletagmanager.com/"]');
}

/** 붙여 넣은 마크업 안에서 selector 에 맞는 것을 누른다 */
function clickIn(html: string, selector: string) {
  document.body.innerHTML = html;
  const el = document.body.querySelector(selector);
  if (!el) throw new Error(`no element for ${selector}`);
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

const LOCATION = {
  origin: 'https://qeploy.com',
  href: 'https://qeploy.com/project/?tab=all#top',
  pathname: '/project/',
};

function describeIn(html: string, selector = '#target') {
  document.body.innerHTML = html;
  return describeClick(document.body.querySelector(selector), LOCATION);
}

let dispose: () => void = () => {};

beforeEach(() => {
  const settings = happyDomSettings();
  settings.disableJavaScriptFileLoading = true;
  settings.handleDisabledFileLoadingAsSuccess = true;
});

afterEach(() => {
  dispose();
  dispose = () => {};
  delete window.dataLayer;
  document.body.innerHTML = '';
  document.title = '';
});

describe('normalizePagePath — query·hash 를 버린다', () => {
  it.each([
    ['/auth/callback?code=secret&state=xyz', '/auth/callback'],
    ['/template#gallery', '/template'],
    ['/project/12/agent?conversation=3#m-9', '/project/12/agent'],
    ['/template/', '/template'],
    ['/template//', '/template'],
    ['/', '/'],
    ['/?code=secret', '/'],
    ['', '/'],
  ])('%s → %s', (input, expected) => {
    expect(normalizePagePath(input)).toBe(expected);
  });

  it('page_location 은 origin + 정리한 경로다', () => {
    expect(toPageLocation('/callback?code=secret', 'https://qeploy.com')).toBe(
      'https://qeploy.com/callback',
    );
  });
});

describe('toSafeReferrer', () => {
  it('같은 오리진의 이전 주소에서도 query 를 버린다', () => {
    expect(toSafeReferrer('https://qeploy.com/auth/callback?code=secret&state=xyz')).toBe(
      'https://qeploy.com/auth/callback',
    );
  });

  it('비었거나 http(s) 가 아니면 보내지 않는다', () => {
    expect(toSafeReferrer('')).toBeUndefined();
    expect(toSafeReferrer('android-app://com.google.android.gm/')).toBeUndefined();
    expect(toSafeReferrer('not a url')).toBeUndefined();
  });
});

describe('resolveMeasurementId', () => {
  it('빌드 환경 변수가 상수보다 앞선다', () => {
    expect(resolveMeasurementId('G-ENV123', 'G-CONST456')).toBe('G-ENV123');
    expect(resolveMeasurementId(undefined, 'G-CONST456')).toBe('G-CONST456');
    expect(resolveMeasurementId('  ', ' G-CONST456 ')).toBe('G-CONST456');
  });

  it('둘 다 비면 빈 값이다 — 꺼진다', () => {
    expect(resolveMeasurementId(undefined, '')).toBe('');
  });

  it('형식이 틀리면 끄고 콘솔에 알린다', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(resolveMeasurementId('UA-12345-1', '')).toBe('');
    expect(warn).toHaveBeenCalledOnce();
  });
});

describe('isAnalyticsEnvironment', () => {
  it('운영 빌드이고 실제 호스트일 때만 켠다', () => {
    expect(isAnalyticsEnvironment(true, 'qeploy.com')).toBe(true);
    expect(isAnalyticsEnvironment(false, 'qeploy.com')).toBe(false);
    expect(isAnalyticsEnvironment(true, 'localhost')).toBe(false);
    expect(isAnalyticsEnvironment(true, '127.0.0.1')).toBe(false);
  });
});

describe('resolveClickLabel — data-ga-label → aria-label → 보이는 글자', () => {
  function label(html: string, ignored = false) {
    document.body.innerHTML = html;
    return resolveClickLabel(document.body.firstElementChild!, ignored);
  }

  it('data-ga-label 이 가장 앞선다', () => {
    expect(label('<button data-ga-label="프로젝트 열기" aria-label="열기">보기</button>')).toBe(
      '프로젝트 열기',
    );
  });

  it('없으면 aria-label, 그것도 없으면 보이는 글자다', () => {
    expect(label('<button aria-label="사이드바 접기"><svg></svg></button>')).toBe('사이드바 접기');
    expect(label('<button><svg></svg> 프로젝트   생성\n</button>')).toBe('프로젝트 생성');
  });

  it('빈 data-ga-label·aria-label 은 건너뛴다', () => {
    expect(label('<button data-ga-label=" " aria-label="">전송</button>')).toBe('전송');
  });

  it('공백을 접은 뒤 40자에서 자른다', () => {
    const long = '가'.repeat(30) + '   ' + '나'.repeat(30);
    const result = label(`<button>${long}</button>`);
    expect(Array.from(result)).toHaveLength(MAX_CLICK_LABEL_LENGTH);
    expect(result).toBe('가'.repeat(30) + ' ' + '나'.repeat(9));
  });

  it('이모지를 반으로 가르지 않는다', () => {
    const result = label(`<button>${'🚀'.repeat(50)}</button>`);
    expect(result).toBe('🚀'.repeat(MAX_CLICK_LABEL_LENGTH));
  });

  it('aria-label 도 40자로 자른다', () => {
    expect(label(`<button aria-label="${'a'.repeat(80)}"></button>`)).toBe('a'.repeat(40));
  });

  it('이름이 될 것이 하나도 없으면 (no label)', () => {
    expect(label('<button><svg></svg></button>')).toBe(UNLABELED_CLICK_LABEL);
  });

  it('ignore 영역이면 aria-label·글자를 읽지 않는다', () => {
    expect(
      label('<button aria-label="내 비밀 프로젝트 삭제">내 비밀 프로젝트</button>', true),
    ).toBe(IGNORED_CLICK_LABEL);
  });

  it('ignore 영역이어도 data-ga-label 은 쓴다 — 코드에 적은 고정 문자열이라서', () => {
    expect(label('<a data-ga-label="프로젝트 열기">내 비밀 프로젝트</a>', true)).toBe(
      '프로젝트 열기',
    );
  });
});

describe('describeClick', () => {
  it('안쪽 아이콘을 눌러도 가장 가까운 버튼을 기준으로 삼는다', () => {
    expect(describeIn('<button aria-label="알림"><svg><path id="target"/></svg></button>')).toEqual(
      {
        click_label: '알림',
        click_type: 'button',
        page_path: '/project',
      },
    );
  });

  it('page_path 는 지금 경로에서 query·hash 를 뺀 것이다', () => {
    expect(describeIn('<button id="target">보기</button>')?.page_path).toBe('/project');
  });

  it('role="button" 도 버튼으로 센다', () => {
    expect(describeIn('<article role="button"><p id="target">랜딩 템플릿</p></article>')).toEqual({
      click_label: '랜딩 템플릿',
      click_type: 'button',
      page_path: '/project',
    });
  });

  it('버튼·링크 밖의 클릭은 보내지 않는다', () => {
    expect(describeIn('<div><p id="target">그냥 글</p></div>')).toBeNull();
    expect(describeClick(null, LOCATION)).toBeNull();
  });

  it('비활성 버튼은 보내지 않는다', () => {
    expect(describeIn('<button disabled><span id="target">전송</span></button>')).toBeNull();
    expect(describeIn('<div role="button" aria-disabled="true" id="target">전송</div>')).toBeNull();
    // `fieldset disabled` 안의 버튼도 브라우저의 :disabled 가 잡는다. happy-dom 은 그것을
    // 따라 하지 않아서 여기서는 보지 않는다(앱에도 아직 그런 자리가 없다)
  });

  describe('링크', () => {
    it('외부 링크는 origin + pathname 만 link_url 로 보낸다', () => {
      expect(
        describeIn(
          '<a id="target" href="https://github.com/login/oauth/authorize?client_id=x&state=secret#frag">GitHub</a>',
        ),
      ).toEqual({
        click_label: 'GitHub',
        click_type: 'link',
        link_url: 'https://github.com/login/oauth/authorize',
        page_path: '/project',
      });
    });

    it('같은 사이트 링크는 link_url 을 싣지 않는다', () => {
      expect(describeIn('<a id="target" href="/template?type=landing">템플릿</a>')).toEqual({
        click_label: '템플릿',
        click_type: 'link',
        page_path: '/project',
      });
    });

    it('http(s) 가 아닌 링크도 link_url 을 싣지 않는다', () => {
      expect(
        describeIn('<a id="target" href="mailto:someone@example.com">문의</a>'),
      ).not.toHaveProperty('link_url');
    });

    it('role="button" 이 붙은 링크는 버튼으로 센다', () => {
      expect(describeIn('<a id="target" role="button">닫기</a>')?.click_type).toBe('button');
    });
  });

  describe('data-ga-ignore', () => {
    it('조상에 있으면 이름을 (ignored) 로 바꾼다', () => {
      expect(
        describeIn(
          '<ul data-ga-ignore><li><button><span id="target">내 비밀 프로젝트</span></button></li></ul>',
        ),
      ).toEqual({ click_label: IGNORED_CLICK_LABEL, click_type: 'button', page_path: '/project' });
    });

    it('버튼 자신에 달려 있어도 같다', () => {
      expect(
        describeIn('<button data-ga-ignore id="target" aria-label="my-shop 삭제"></button>')
          ?.click_label,
      ).toBe(IGNORED_CLICK_LABEL);
    });

    it('외부 링크 주소도 뺀다 — 대화 속 링크는 사용자가 붙여 넣은 주소다', () => {
      const params = describeIn(
        '<div data-ga-ignore><p><a id="target" href="https://my-secret-shop.example.com/admin">https://my-secret-shop.example.com/admin</a></p></div>',
      );
      expect(params).toEqual({
        click_label: IGNORED_CLICK_LABEL,
        click_type: 'link',
        page_path: '/project',
      });
    });

    it('이벤트 자체는 남긴다 — 그 자리에서 누른 횟수는 쓸모 있는 신호다', () => {
      expect(describeIn('<div data-ga-ignore><button id="target">x</button></div>')).not.toBeNull();
    });

    it('ignore 밖의 형제는 영향을 받지 않는다', () => {
      expect(
        describeIn(
          '<div><ul data-ga-ignore><li><button>비밀</button></li></ul><button id="target">다시 불러오기</button></div>',
        )?.click_label,
      ).toBe('다시 불러오기');
    });
  });
});

describe('initAnalytics — 꺼져 있을 때는 아무것도 하지 않는다', () => {
  it('측정 ID 가 없으면 스크립트도 큐도 리스너도 없다', () => {
    dispose = initAnalytics({ measurementId: '', enabled: true });

    expect(gtagScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();

    clickIn('<button>프로젝트 생성</button>', 'button');
    trackPageView('/home');
    expect(window.dataLayer).toBeUndefined();
  });

  it('운영 환경이 아니면 ID 가 있어도 같다', () => {
    dispose = initAnalytics({ measurementId: 'G-TEST123', enabled: false });

    expect(gtagScripts()).toHaveLength(0);
    clickIn('<button>프로젝트 생성</button>', 'button');
    trackPageView('/home');
    expect(window.dataLayer).toBeUndefined();
  });

  it('기본값(vitest 는 운영 빌드가 아니다)으로 부르면 꺼져 있다', () => {
    dispose = initAnalytics();

    expect(gtagScripts()).toHaveLength(0);
    expect(window.dataLayer).toBeUndefined();
  });
});

describe('initAnalytics — 켜져 있을 때', () => {
  beforeEach(() => {
    dispose = initAnalytics({ measurementId: 'G-TEST123', enabled: true });
  });

  it('gtag.js 를 비동기로 한 번 붙인다', () => {
    const scripts = gtagScripts();
    expect(scripts).toHaveLength(1);

    const script = scripts[0] as HTMLScriptElement;
    expect(script.src).toBe('https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    expect(script.async).toBe(true);
  });

  it('두 번 불러도 다시 붙이지 않는다', () => {
    initAnalytics({ measurementId: 'G-TEST123', enabled: true });
    expect(gtagScripts()).toHaveLength(1);
  });

  it('기본 page_view·Google 신호·광고 개인화를 끄고 설정한다', () => {
    const config = commands().find(([command]) => command === 'config');
    expect(config?.[1]).toBe('G-TEST123');
    expect(config?.[2]).toMatchObject({
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: toPageLocation(window.location.pathname),
    });
  });

  it('dataLayer 에는 gtag.js 가 읽는 arguments 객체를 넣는다 — 배열이면 무시된다', () => {
    const first = window.dataLayer?.[0];
    expect(Array.isArray(first)).toBe(false);
    expect(Object.prototype.toString.call(first)).toBe('[object Arguments]');
  });

  describe('page_view', () => {
    it('query·hash 를 버린 주소와 지금 제목으로 보낸다', () => {
      document.title = '템플릿 갤러리 | Qeploy';
      trackPageView('/auth/callback?code=secret&state=xyz#top');

      expect(events('page_view')).toEqual([
        {
          page_location: `${window.location.origin}/auth/callback`,
          page_title: '템플릿 갤러리 | Qeploy',
        },
      ]);
      expect(JSON.stringify(commands())).not.toContain('secret');
    });

    it('이후 자동 이벤트도 같은 주소로 묶이도록 set 한다', () => {
      trackPageView('/home');
      expect(commands()).toContainEqual([
        'set',
        { page_location: `${window.location.origin}/home`, page_title: '' },
      ]);
    });

    it('같은 경로는 연달아 보내지 않는다', () => {
      trackPageView('/home');
      trackPageView('/home?tab=recent');
      trackPageView('/home/');
      trackPageView('/project');
      trackPageView('/home');

      expect(events('page_view').map((params) => params.page_location)).toEqual([
        `${window.location.origin}/home`,
        `${window.location.origin}/project`,
        `${window.location.origin}/home`,
      ]);
    });
  });

  describe('ui_click', () => {
    it('문서 어디서 누르든 위임 리스너 하나가 잡는다', () => {
      clickIn('<main><section><button>프로젝트 생성</button></section></main>', 'button');

      expect(events('ui_click')).toEqual([
        {
          click_label: '프로젝트 생성',
          click_type: 'button',
          page_path: normalizePagePath(window.location.pathname),
          page_location: toPageLocation(window.location.pathname),
        },
      ]);
    });

    it('화면 쪽에서 stopPropagation 해도 센다(capture)', () => {
      document.body.innerHTML = '<button>닫기</button>';
      const button = document.body.querySelector('button')!;
      button.addEventListener('click', (event) => event.stopPropagation());
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(events('ui_click')).toHaveLength(1);
    });

    it('ignore 영역의 글자는 GA 로 가지 않는다', () => {
      clickIn(
        '<div data-ga-ignore><button aria-label="내 비밀 프로젝트 열기">내 비밀 프로젝트</button></div>',
        'button',
      );

      expect(events('ui_click')[0]?.click_label).toBe(IGNORED_CLICK_LABEL);
      expect(JSON.stringify(commands())).not.toContain('비밀');
    });

    it('비활성 버튼과 버튼 밖 클릭은 보내지 않는다', () => {
      clickIn('<button disabled><span>전송</span></button>', 'span');
      clickIn('<p>그냥 글</p>', 'p');

      expect(events('ui_click')).toHaveLength(0);
    });
  });

  it('dispose 하면 리스너와 스크립트를 떼고 다시 꺼진다', () => {
    dispose();
    dispose = () => {};

    const before = commands().length;
    clickIn('<button>프로젝트 생성</button>', 'button');
    trackPageView('/home');

    expect(commands()).toHaveLength(before);
    expect(gtagScripts()).toHaveLength(0);
  });
});

describe('initAnalytics — gtag.js 를 못 받으면', () => {
  it('거기서 멈추고 더는 큐에 쌓지 않는다', () => {
    happyDomSettings().handleDisabledFileLoadingAsSuccess = false;
    // happy-dom 이 로드 실패를 콘솔에 찍는다. 기대한 실패라 출력만 막는다
    vi.spyOn(console, 'error').mockImplementation(() => {});

    dispose = initAnalytics({ measurementId: 'G-TEST123', enabled: true });

    const before = commands().length;
    clickIn('<button>프로젝트 생성</button>', 'button');
    trackPageView('/home');

    expect(commands()).toHaveLength(before);
    expect(gtagScripts()).toHaveLength(0);
  });
});
