import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function RunLengthToy({ seed = 7 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 7) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="rle" className="sandbox-rle">
      <header>
        <h2>RunLengthToy</h2>
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

function RunLengthToyCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RunLengthToyCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 7 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
