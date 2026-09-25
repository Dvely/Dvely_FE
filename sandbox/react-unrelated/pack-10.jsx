import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function NoiseSampler({ seed = 10 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 10) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="noise" className="sandbox-noise">
      <header>
        <h2>NoiseSampler</h2>
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

function NoiseSamplerCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function NoiseSamplerCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 10 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
