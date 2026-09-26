import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function CanyonTrail({ seed = 33 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 33) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="canyon">
      <h2>CanyonTrail</h2>
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

function CanyonTrailItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 135) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 136) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function CanyonTrailItem137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 33 + 137) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
