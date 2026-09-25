import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function HashMixerCard({ seed = 18 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 18) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="hash" className="sandbox-hash">
      <header>
        <h2>HashMixerCard</h2>
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

function HashMixerCardCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HashMixerCardCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 18 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
