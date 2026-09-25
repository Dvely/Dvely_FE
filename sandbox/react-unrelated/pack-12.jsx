import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function TileHitBox({ seed = 12 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 12) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="tile" className="sandbox-tile">
      <header>
        <h2>TileHitBox</h2>
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

function TileHitBoxCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function TileHitBoxCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 12 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
