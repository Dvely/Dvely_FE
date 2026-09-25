import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function ChessNotepad({ seed = 4 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 4) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="chess" className="sandbox-chess">
      <header>
        <h2>ChessNotepad</h2>
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

function ChessNotepadCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ChessNotepadCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 4 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
