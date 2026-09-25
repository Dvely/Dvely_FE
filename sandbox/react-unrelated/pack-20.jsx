import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function PuzzleBacktrack({ seed = 20 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 20) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="puzzle" className="sandbox-puzzle">
      <header>
        <h2>PuzzleBacktrack</h2>
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

function PuzzleBacktrackCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function PuzzleBacktrackCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 20 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
