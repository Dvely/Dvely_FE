import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function GlacierShelf({ seed = 36 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 36) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="glacier">
      <h2>GlacierShelf</h2>
      <button type="button" onClick={() => setTick((value) => value + 1)}>
        refresh
      </button>
      <ul>
        {values.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

function GlacierShelfItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 135) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 136) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 137) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 138) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 139) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 140) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 141) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 142) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 143) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 144) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GlacierShelfItem145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 36 + 145) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
