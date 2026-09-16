import { useMemo, useState } from 'react';

const collections = {
  bowl: [
    { name: '아침 공기', glaze: '황토 유약', price: '48,000', note: '얇은 굽. 밥을 담기 좋은 공기.' },
    { name: '손자국 접시', glaze: '분청', price: '62,000', note: '물레 자국을 남긴 접시. 반찬이 천천히 식습니다.' },
    { name: '두 사람 볼', glaze: '회청', price: '78,000', note: '조금 큰 볼. 면을 나눠 먹기 좋습니다.' },
    { name: '저녁 종지', glaze: '철유', price: '28,000', note: '간장과 소스를 위한 작은 종지.' },
  ],
  vase: [
    { name: '창가 화병', glaze: '백자', price: '96,000', note: '좁은 입. 한두 줄기의 꽃이 서기에 충분합니다.' },
    { name: '비온 뒤 항아리', glaze: '회청색', price: '180,000', note: '비를 머금은 흙의 색입니다.' },
    { name: '낮은 단지', glaze: '재유', price: '72,000', note: '뚜껑 있는 단지. 차 잎을 두기에 좋습니다.' },
    { name: '한 줄기 병', glaze: '청자', price: '54,000', note: '가늘고 긴 병. 책상 모서리에 둡니다.' },
  ],
} as const;

const steps = [
  { no: '01', title: '흙', body: '경기도 이천의 백토와 안성의 적토를 섞습니다.' },
  { no: '02', title: '물레', body: '하루에 많이 돌리지 않습니다. 손의 무게를 남깁니다.' },
  { no: '03', title: '가마', body: '1,230도. 불의 길을 읽고 하루를 기다립니다.' },
] as const;

const classes = [
  { day: '토', title: '물레 입문', time: '10:00 – 13:00', seats: '4명' },
  { day: '일', title: '식기 만들기', time: '14:00 – 17:30', seats: '6명' },
  { day: '수', title: '가마 구경', time: '19:00 – 21:00', seats: '8명' },
] as const;

function KilnTemplate() {
  const [collection, setCollection] = useState<'bowl' | 'vase'>('bowl');

  const pieces = useMemo(() => collections[collection], [collection]);

  return (
    <div id="kiln-template" className="kn-page">
      <header className="kn-nav">
        <a className="kn-logo" href="#top">
          <i />
          KILN
        </a>
        <nav>
          <a href="#studio">스튜디오</a>
          <a href="#works">작품</a>
          <a href="#class">수업</a>
          <a href="#visit">방문</a>
        </nav>
      </header>

      <main id="top">
        <section className="kn-hero" aria-label="KILN 도예 공방">
          <div className="kn-hero-copy">
            <span>CERAMIC STUDIO · SEOUL · SINCE 2019</span>
            <h1>
              흙이 형태가
              <br />
              되는 곳.
            </h1>
            <p>
              물레와 가마 사이, 손으로 하루를 굽습니다. 작은 공방에서 실제로 쓰는 그릇을 만들고, 남는
              자리를 수업에 엽니다.
            </p>
            <div className="kn-stats">
              <div>
                <b>1</b>
                <small>가마</small>
              </div>
              <div>
                <b>12</b>
                <small>수강</small>
              </div>
              <div>
                <b>48</b>
                <small>작품 / 시즌</small>
              </div>
            </div>
          </div>
          <div className="kn-stage" aria-hidden="true">
            <div className={collection === 'bowl' ? 'kn-plate is-bowl' : 'kn-plate is-vase'}>
              <span>{collection === 'bowl' ? 'BOWL' : 'VASE'}</span>
            </div>
          </div>
        </section>

        <section id="studio" className="kn-process">
          <div>
            <p className="kn-label">01 / PROCESS</p>
            <h2>
              서두르지 않는
              <br />
              세 번의 손.
            </h2>
            <p>성수동 골목의 1층. 창은 북향이고, 가마는 안쪽에 있습니다.</p>
          </div>
          <ol>
            {steps.map((step) => (
              <li key={step.no}>
                <em>{step.no}</em>
                <b>{step.title}</b>
                <span>{step.body}</span>
              </li>
            ))}
          </ol>
        </section>

        <section id="works" className="kn-works">
          <div className="kn-works-head">
            <div>
              <p className="kn-label">02 / OBJECTS</p>
              <h2>이번 가마에서 나온 것들.</h2>
            </div>
            <div className="kn-tabs" aria-label="작품 분류">
              <button type="button" aria-pressed={collection === 'bowl'} onClick={() => setCollection('bowl')}>
                식기
              </button>
              <button type="button" aria-pressed={collection === 'vase'} onClick={() => setCollection('vase')}>
                화기
              </button>
            </div>
          </div>
          <div className="kn-list">
            {pieces.map((piece, index) => (
              <article key={piece.name} className="kn-item">
                <div className="kn-swatch" data-i={index} />
                <small>
                  {piece.glaze} · {piece.price}원
                </small>
                <b>{piece.name}</b>
                <p>{piece.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="class" className="kn-class">
          <p className="kn-label">03 / CLASS</p>
          <h2>손으로 배우는 오후.</h2>
          <ul>
            {classes.map((item) => (
              <li key={item.title}>
                <span>{item.day}</span>
                <div>
                  <b>{item.title}</b>
                  <small>
                    {item.time} · {item.seats}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="visit" className="kn-visit">
          <div>
            <p className="kn-label">04 / VISIT</p>
            <h2>가마가 쉬는 날에 오세요.</h2>
            <p>수·토 13:00 – 18:00. 예약 없이 들러도 됩니다. 작업 중이면 차만 내어 드립니다.</p>
          </div>
          <address>
            서울 성동구 연무장길 19
            <br />
            1층 KILN
            <br />
            hello@kiln.example
          </address>
        </section>
      </main>

      <footer>
        <span>KILN STUDIO · 성수동</span>
        <span>© 2026 KILN. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}

export default KilnTemplate;
