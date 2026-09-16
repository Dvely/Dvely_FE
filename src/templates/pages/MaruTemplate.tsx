import { useMemo, useState } from 'react';

const rooms = [
  {
    name: '마루',
    code: '01',
    size: '12평',
    guests: '2인',
    note: '대청이 열린 본채. 마당과 산이 한 시선에 들어옵니다.',
  },
  {
    name: '온돌',
    code: '02',
    size: '8평',
    guests: '2인',
    note: '낮은 창과 흙벽. 하룻밤을 천천히 데우는 방입니다.',
  },
  {
    name: '다락',
    code: '03',
    size: '5평',
    guests: '1인',
    note: '책과 이불만 둔 작은 다락. 비 오는 오후에 머뭅니다.',
  },
] as const;

const hours = [
  { time: '07:30', title: '마당 차', body: '이슬이 걷히기 전, 대청에서 차를 올립니다.' },
  { time: '12:00', title: '약식 점심', body: '가까운 밭의 나물과 따뜻한 밥 한 그릇.' },
  { time: '18:30', title: '불 피우기', body: '마당 화로에 불을 지피고 밤을 맞습니다.' },
  { time: '21:00', title: '온돌', body: '방은 이미 데워져 있습니다. 창을 조금 열어 두세요.' },
] as const;

const notes = [
  { label: '체크인', value: '16:00 – 20:00' },
  { label: '체크아웃', value: '11:00' },
  { label: '식사', value: '조식 포함 · 석식 예약' },
  { label: '목욕', value: '본채 목조 욕조' },
] as const;

function MaruTemplate() {
  const [stay, setStay] = useState<(typeof rooms)[number]['name']>('마루');

  const selected = useMemo(() => rooms.find((room) => room.name === stay) ?? rooms[0], [stay]);

  return (
    <div id="maru-template" className="mr-page">
      <header className="mr-nav">
        <a className="mr-logo" href="#top">
          MARU<span>®</span>
        </a>
        <nav>
          <a href="#stay">STAY</a>
          <a href="#rooms">ROOMS</a>
          <a href="#day">A DAY</a>
          <a href="#reserve">RESERVE</a>
        </nav>
      </header>

      <main id="top">
        <section className="mr-hero" aria-label="MARU 한옥 스테이">
          <div className="mr-hero-copy">
            <p className="mr-kicker">ANDONG · GYEONGSANGBUK-DO · EST. 2016</p>
            <h1>
              머무는 시간,
              <br />
              <em>집이 된다.</em>
            </h1>
            <p>
              오래된 마당과 짧은 여행 사이. 하루를 빌려 사는 한옥입니다. 시계를 두고, 흙바닥을 걷고,
              밤이 오면 온돌에 몸을 맡기면 됩니다.
            </p>
            <div className="mr-hero-meta">
              <span>3 rooms</span>
              <span>2 nights min.</span>
              <span>6 guests</span>
            </div>
            <a className="mr-cta" href="#reserve">
              머무를 날짜 보기
            </a>
          </div>
          <div className="mr-hero-art" aria-hidden="true">
            <div className="mr-moon" />
            <div className="mr-roof" />
            <div className="mr-column" />
            <div className="mr-courtyard" />
            <p>THE SOUTH COURT</p>
          </div>
        </section>

        <div className="mr-ticker" aria-hidden="true">
          <span>SLOW MORNING</span>
          <b>✳</b>
          <span>COURTYARD BREAKFAST</span>
          <b>✳</b>
          <span>NIGHT FIRE</span>
          <b>✳</b>
          <span>ONDOOL SLEEP</span>
        </div>

        <section id="stay" className="mr-intro">
          <p className="mr-kicker">01 / THE HOUSE</p>
          <blockquote>
            우리는 새로 짓지 않았습니다.
            <br />
            이미 있던 집의 결을 천천히 닦았을 뿐입니다.
          </blockquote>
          <p>
            안동 풍산의 낮은 언덕. 대문은 작고, 마당은 넓습니다. 계절에 따라 그림자가 옮겨 가는 자리를
            그대로 두었습니다.
          </p>
        </section>

        <section id="rooms" className="mr-rooms" aria-label="객실">
          {rooms.map((room) => (
            <article key={room.name} className={stay === room.name ? 'mr-room is-on' : 'mr-room'}>
              <div className="mr-room-visual" data-room={room.name} />
              <button type="button" onClick={() => setStay(room.name)} aria-pressed={stay === room.name}>
                {room.code} · {stay === room.name ? '오늘 머무는 곳' : '둘러보기'}
              </button>
              <strong>{room.name}</strong>
              <p>{room.note}</p>
              <small>
                {room.size} · {room.guests}
              </small>
            </article>
          ))}
        </section>

        <section id="day" className="mr-day">
          <div>
            <p className="mr-kicker">02 / A DAY</p>
            <h2>
              서두르지 않는
              <br />
              하루의 리듬.
            </h2>
            <p>
              {selected.name}에 묵는 동안, 시간은 방의 온도를 따라 움직입니다. 일정표는 제안일 뿐입니다.
            </p>
          </div>
          <ol>
            {hours.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <div>
                  <b>{item.title}</b>
                  <span>{item.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="reserve" className="mr-reserve">
          <div>
            <p className="mr-kicker">03 / RESERVE</p>
            <h2>머물 자리를 고르세요.</h2>
            <p>
              선택 중인 방 · {selected.name}. 최소 2박, 조식 포함. 문의는 편지처럼 천천히 답합니다.
            </p>
            <a className="mr-cta" href="mailto:stay@maru.example">
              stay@maru.example
            </a>
          </div>
          <dl>
            {notes.map((note) => (
              <div key={note.label}>
                <dt>{note.label}</dt>
                <dd>{note.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer>
        <span>MARU STAY · 경상북도 안동시 풍산읍</span>
        <span>© 2026 MARU. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}

export default MaruTemplate;
