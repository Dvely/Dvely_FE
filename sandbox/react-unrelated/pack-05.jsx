import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function WaveSynthPad({ seed = 5 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 5) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="wave" className="sandbox-wave">
      <header>
        <h2>WaveSynthPad</h2>
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

function WaveSynthPadCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 1) % 255;
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

function WaveSynthPadCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 2) % 255;
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

function WaveSynthPadCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 3) % 255;
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

function WaveSynthPadCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 4) % 255;
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

function WaveSynthPadCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 5) % 255;
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

function WaveSynthPadCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 6) % 255;
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

function WaveSynthPadCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 7) % 255;
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

function WaveSynthPadCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 8) % 255;
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

function WaveSynthPadCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 9) % 255;
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

function WaveSynthPadCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 10) % 255;
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

function WaveSynthPadCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 11) % 255;
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

function WaveSynthPadCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 12) % 255;
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

function WaveSynthPadCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 13) % 255;
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

function WaveSynthPadCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 14) % 255;
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

function WaveSynthPadCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 15) % 255;
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

function WaveSynthPadCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 16) % 255;
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

function WaveSynthPadCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 17) % 255;
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

function WaveSynthPadCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 18) % 255;
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

function WaveSynthPadCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 19) % 255;
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

function WaveSynthPadCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 20) % 255;
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

function WaveSynthPadCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 21) % 255;
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

function WaveSynthPadCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 22) % 255;
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

function WaveSynthPadCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 23) % 255;
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

function WaveSynthPadCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 24) % 255;
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

function WaveSynthPadCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 25) % 255;
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

function WaveSynthPadCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 26) % 255;
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

function WaveSynthPadCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 27) % 255;
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

function WaveSynthPadCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 28) % 255;
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

function WaveSynthPadCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 29) % 255;
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

function WaveSynthPadCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 30) % 255;
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

function WaveSynthPadCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 31) % 255;
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

function WaveSynthPadCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 32) % 255;
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

function WaveSynthPadCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 33) % 255;
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

function WaveSynthPadCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 34) % 255;
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

function WaveSynthPadCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 35) % 255;
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

function WaveSynthPadCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 36) % 255;
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

function WaveSynthPadCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 37) % 255;
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

function WaveSynthPadCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 38) % 255;
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

function WaveSynthPadCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 39) % 255;
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

function WaveSynthPadCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 40) % 255;
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

function WaveSynthPadCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 41) % 255;
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

function WaveSynthPadCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 42) % 255;
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

function WaveSynthPadCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 43) % 255;
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

function WaveSynthPadCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 44) % 255;
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

function WaveSynthPadCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 45) % 255;
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

function WaveSynthPadCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 46) % 255;
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

function WaveSynthPadCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 47) % 255;
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

function WaveSynthPadCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 48) % 255;
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

function WaveSynthPadCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 49) % 255;
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

function WaveSynthPadCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 50) % 255;
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

function WaveSynthPadCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 51) % 255;
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

function WaveSynthPadCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 52) % 255;
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

function WaveSynthPadCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 53) % 255;
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

function WaveSynthPadCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 54) % 255;
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

function WaveSynthPadCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 55) % 255;
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

function WaveSynthPadCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 56) % 255;
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

function WaveSynthPadCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 57) % 255;
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

function WaveSynthPadCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 58) % 255;
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

function WaveSynthPadCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 59) % 255;
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

function WaveSynthPadCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 60) % 255;
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

function WaveSynthPadCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 61) % 255;
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

function WaveSynthPadCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 62) % 255;
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

function WaveSynthPadCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 63) % 255;
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

function WaveSynthPadCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 64) % 255;
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

function WaveSynthPadCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 65) % 255;
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

function WaveSynthPadCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 66) % 255;
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

function WaveSynthPadCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 67) % 255;
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

function WaveSynthPadCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 68) % 255;
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

function WaveSynthPadCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 69) % 255;
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

function WaveSynthPadCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 70) % 255;
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

function WaveSynthPadCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 71) % 255;
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

function WaveSynthPadCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 72) % 255;
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

function WaveSynthPadCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 73) % 255;
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

function WaveSynthPadCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 74) % 255;
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

function WaveSynthPadCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 75) % 255;
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

function WaveSynthPadCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 76) % 255;
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

function WaveSynthPadCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 77) % 255;
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

function WaveSynthPadCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 78) % 255;
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

function WaveSynthPadCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 79) % 255;
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

function WaveSynthPadCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 80) % 255;
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

function WaveSynthPadCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 81) % 255;
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

function WaveSynthPadCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 82) % 255;
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

function WaveSynthPadCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 83) % 255;
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

function WaveSynthPadCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 84) % 255;
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

function WaveSynthPadCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 85) % 255;
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

function WaveSynthPadCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 86) % 255;
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

function WaveSynthPadCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 87) % 255;
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

function WaveSynthPadCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 88) % 255;
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

function WaveSynthPadCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 89) % 255;
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

function WaveSynthPadCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 90) % 255;
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

function WaveSynthPadCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 91) % 255;
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

function WaveSynthPadCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 92) % 255;
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

function WaveSynthPadCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 93) % 255;
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

function WaveSynthPadCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 94) % 255;
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

function WaveSynthPadCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 95) % 255;
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

function WaveSynthPadCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 96) % 255;
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

function WaveSynthPadCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 97) % 255;
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

function WaveSynthPadCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 98) % 255;
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

function WaveSynthPadCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 99) % 255;
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

function WaveSynthPadCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 100) % 255;
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

function WaveSynthPadCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 101) % 255;
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

function WaveSynthPadCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 102) % 255;
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

function WaveSynthPadCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 103) % 255;
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

function WaveSynthPadCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 104) % 255;
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

function WaveSynthPadCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 105) % 255;
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

function WaveSynthPadCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 106) % 255;
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

function WaveSynthPadCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 107) % 255;
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

function WaveSynthPadCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 108) % 255;
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

function WaveSynthPadCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 109) % 255;
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

function WaveSynthPadCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 110) % 255;
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

function WaveSynthPadCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 111) % 255;
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

function WaveSynthPadCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 112) % 255;
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

function WaveSynthPadCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 113) % 255;
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

function WaveSynthPadCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 114) % 255;
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

function WaveSynthPadCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 115) % 255;
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

function WaveSynthPadCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 116) % 255;
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

function WaveSynthPadCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 117) % 255;
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

function WaveSynthPadCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 118) % 255;
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

function WaveSynthPadCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 119) % 255;
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

function WaveSynthPadCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 120) % 255;
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

function WaveSynthPadCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 121) % 255;
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

function WaveSynthPadCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 122) % 255;
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

function WaveSynthPadCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 123) % 255;
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

function WaveSynthPadCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 124) % 255;
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

function WaveSynthPadCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 125) % 255;
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

function WaveSynthPadCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 126) % 255;
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

function WaveSynthPadCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 127) % 255;
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

function WaveSynthPadCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 128) % 255;
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

function WaveSynthPadCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 129) % 255;
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

function WaveSynthPadCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 130) % 255;
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

function WaveSynthPadCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 131) % 255;
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

function WaveSynthPadCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 132) % 255;
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

function WaveSynthPadCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 133) % 255;
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

function WaveSynthPadCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 134) % 255;
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

function WaveSynthPadCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 135) % 255;
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

function WaveSynthPadCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 136) % 255;
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

function WaveSynthPadCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 137) % 255;
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

function WaveSynthPadCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 138) % 255;
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

function WaveSynthPadCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 139) % 255;
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

function WaveSynthPadCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 140) % 255;
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

function WaveSynthPadCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 141) % 255;
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

function WaveSynthPadCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 142) % 255;
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

function WaveSynthPadCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 143) % 255;
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

function WaveSynthPadCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 144) % 255;
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

function WaveSynthPadCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 145) % 255;
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

function WaveSynthPadCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 146) % 255;
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

function WaveSynthPadCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 147) % 255;
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

function WaveSynthPadCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 148) % 255;
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

function WaveSynthPadCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 149) % 255;
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

function WaveSynthPadCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 150) % 255;
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

function WaveSynthPadCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 151) % 255;
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

function WaveSynthPadCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 152) % 255;
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

function WaveSynthPadCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 153) % 255;
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

function WaveSynthPadCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 154) % 255;
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

function WaveSynthPadCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 155) % 255;
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

function WaveSynthPadCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 156) % 255;
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

function WaveSynthPadCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 157) % 255;
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

function WaveSynthPadCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 158) % 255;
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

function WaveSynthPadCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 159) % 255;
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

function WaveSynthPadCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 160) % 255;
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

function WaveSynthPadCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 161) % 255;
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

function WaveSynthPadCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 162) % 255;
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

function WaveSynthPadCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 163) % 255;
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

function WaveSynthPadCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 164) % 255;
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

function WaveSynthPadCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 165) % 255;
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

function WaveSynthPadCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 166) % 255;
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

function WaveSynthPadCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 167) % 255;
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

function WaveSynthPadCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 168) % 255;
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

function WaveSynthPadCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 169) % 255;
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

function WaveSynthPadCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 170) % 255;
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

function WaveSynthPadCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 171) % 255;
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

function WaveSynthPadCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 172) % 255;
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

function WaveSynthPadCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 173) % 255;
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

function WaveSynthPadCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 174) % 255;
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

function WaveSynthPadCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 175) % 255;
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

function WaveSynthPadCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 176) % 255;
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

function WaveSynthPadCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 5 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
