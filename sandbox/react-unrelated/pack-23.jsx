import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function CompassDial({ seed = 23 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 23) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="compass">
      <h2>CompassDial</h2>
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

function CompassDialItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CompassDialItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 23 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
