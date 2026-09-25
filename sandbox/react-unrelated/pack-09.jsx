import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function DitherPreview({ seed = 9 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 9) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="dither" className="sandbox-dither">
      <header>
        <h2>DitherPreview</h2>
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

function DitherPreviewCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function DitherPreviewCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 9 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
