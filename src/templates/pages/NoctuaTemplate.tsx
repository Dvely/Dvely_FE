import { useMemo, useState } from 'react';

const screenings = {
  today: [
    {
      time: '19:20',
      title: '밤의 우체국',
      director: '한소윤',
      runtime: '102분',
      note: '편지를 배달하다 길을 잃는 이야기.',
    },
    {
      time: '21:10',
      title: '마지막 상영',
      director: '이준혁',
      runtime: '96분',
      note: '문을 닫는 단관, 그 안의 관객들.',
    },
    {
      time: '23:00',
      title: '침묵의 악보',
      director: '모리카와 렌',
      runtime: '118분',
      note: '소리를 잃은 피아니스트의 일주일.',
    },
  ],
  tomorrow: [
    {
      time: '18:40',
      title: '강의 반대편',
      director: '박지혜',
      runtime: '89분',
      note: '강을 건너지 않기로 한 두 사람.',
    },
    {
      time: '20:30',
      title: '초록 커튼',
      director: '클레어 봉',
      runtime: '111분',
      note: '오래된 극장의 마지막 시즌.',
    },
    {
      time: '22:20',
      title: '돌아오지 않는 배',
      director: '정서린',
      runtime: '104분',
      note: '안개를 기다리는 항구의 밤.',
    },
  ],
} as const;

const house = [
  { title: '48석', body: '앞뒤 간격을 넓힌 단층 좌석. 목 받침은 없습니다.' },
  { title: '35mm & DCP', body: '필름이 오면 필름으로. 그 외에는 DCP로 상영합니다.' },
  { title: '작은 바', body: '상영 전 40분, 와인과 보리차를 엽니다.' },
] as const;

function NoctuaTemplate() {
  const [day, setDay] = useState<'today' | 'tomorrow'>('today');
  const [filmIndex, setFilmIndex] = useState(0);

  const films = useMemo(() => screenings[day], [day]);
  const featured = films[filmIndex] ?? films[0];

  const handleDay = (next: 'today' | 'tomorrow') => {
    setDay(next);
    setFilmIndex(0);
  };

  return (
    <div id="noctua-template" className="nc-page">
      <header className="nc-nav">
        <a className="nc-logo" href="#top">
          NOC<span>TUA</span>
        </a>
        <nav>
          <a href="#board">상영</a>
          <a href="#house">하우스</a>
          <a href="#member">멤버십</a>
          <a href="#visit">오시는 길</a>
        </nav>
      </header>

      <main id="top">
        <section className="nc-hero" aria-label="NOCTUA 독립 영화관">
          <div className="nc-hero-copy">
            <p className="nc-now">
              <i />
              NOW SHOWING · HAEBANGCHON
            </p>
            <h1>
              밤이 되면,
              <br />
              이야기가 켜진다.
            </h1>
            <p>
              한 스크린, 마흔여덟 좌석. 오늘 밤에만 열리는 독립 영화관입니다. 예고편 대신 짧은 정적을
              둡니다.
            </p>
            <div className="nc-days" aria-label="상영일">
              <button type="button" aria-pressed={day === 'today'} onClick={() => handleDay('today')}>
                오늘
              </button>
              <button type="button" aria-pressed={day === 'tomorrow'} onClick={() => handleDay('tomorrow')}>
                내일
              </button>
            </div>
          </div>
          <article className="nc-poster">
            <span>
              {featured.time} · {featured.runtime}
            </span>
            <strong>{featured.title}</strong>
            <p>{featured.note}</p>
            <small>DIR. {featured.director}</small>
          </article>
        </section>

        <section id="board" className="nc-board">
          <div className="nc-board-head">
            <p>TONIGHT’S PROGRAM</p>
            <span>{day === 'today' ? 'TODAY' : 'TOMORROW'} · 3 FILMS</span>
          </div>
          {films.map((film, index) => (
            <button
              key={film.title}
              type="button"
              className={index === filmIndex ? 'nc-film is-on' : 'nc-film'}
              aria-pressed={index === filmIndex}
              onClick={() => setFilmIndex(index)}
            >
              <small>{film.time}</small>
              <b>{film.title}</b>
              <p>{film.note}</p>
              <em>
                {film.director} · {film.runtime}
              </em>
            </button>
          ))}
        </section>

        <section id="house" className="nc-house">
          <div>
            <p className="nc-label">01 / THE HOUSE</p>
            <h2>
              작은 방이
              <br />
              극장이 되는 방식.
            </h2>
          </div>
          <ul>
            {house.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="member" className="nc-member">
          <p className="nc-label">02 / MEMBERSHIP</p>
          <h2>한 달에 네 번의 밤.</h2>
          <p>
            월 29,000원. 상영 전 좌석을 먼저 고르고, 바의 첫잔이 포함됩니다. 양도는 되지 않습니다.
          </p>
          <a href="mailto:door@noctua.example">멤버십 문의</a>
        </section>

        <section id="visit" className="nc-visit">
          <div>
            <p className="nc-label">03 / FIND US</p>
            <h2>해방촌 오르막, 간판은 작습니다.</h2>
            <p>상영 30분 전부터 문을 엽니다. 지각하시면 다음 회차를 권합니다.</p>
          </div>
          <address>
            서울 용산구 신흥로 20길
            <br />
            NOCTUA CINEMA
            <br />
            door@noctua.example
          </address>
        </section>
      </main>

      <footer>
        <span>NOCTUA · 해방촌</span>
        <span>© 2026 NOCTUA CINEMA. ALL RIGHTS RESERVED.</span>
      </footer>
    </div>
  );
}

export default NoctuaTemplate;
