import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function WeatherRibbon({ seed = 3 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 3) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="weather" className="sandbox-weather">
      <header>
        <h2>WeatherRibbon</h2>
        <button type="button" onClick={() => setTick((value) => value + 1)}>
          refresh
        </button>
      </header>
      <ul>
        {values.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

function WeatherRibbonCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WeatherRibbonCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 3 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
