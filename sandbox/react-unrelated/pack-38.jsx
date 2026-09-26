import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function ObservatoryRow({ seed = 38 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 38) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="observatory">
      <h2>ObservatoryRow</h2>
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

function ObservatoryRowItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 135) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 136) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 137) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 138) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 139) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 140) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 141) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 142) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 143) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 144) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 145) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 146) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 147) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 148) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 149) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 38 + 150) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function ObservatoryRowItem151({ label, amount }) {
