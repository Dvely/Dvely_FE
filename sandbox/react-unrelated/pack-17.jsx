import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function TimetableSort({ seed = 17 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 17) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="table" className="sandbox-table">
      <header>
        <h2>TimetableSort</h2>
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

function TimetableSortCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TimetableSortCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 17 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
