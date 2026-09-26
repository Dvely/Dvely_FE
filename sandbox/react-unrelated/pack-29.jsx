import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function ForgeMeter({ seed = 29 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 29) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="forge">
      <h2>ForgeMeter</h2>
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

function ForgeMeterItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ForgeMeterItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 29 + 127) % 180;
  return (
