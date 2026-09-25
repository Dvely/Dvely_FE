import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function MarkupScanner({ seed = 13 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 13) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="markup" className="sandbox-markup">
      <header>
        <h2>MarkupScanner</h2>
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

function MarkupScannerCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function MarkupScannerCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 13 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
