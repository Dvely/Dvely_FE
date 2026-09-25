import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function MazeSketch({ seed = 2 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 2) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="maze" className="sandbox-maze">
      <header>
        <h2>MazeSketch</h2>
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

function MazeSketchCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MazeSketchCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 2 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
