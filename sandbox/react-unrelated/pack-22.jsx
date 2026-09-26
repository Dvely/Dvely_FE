import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function LanternList({ seed = 22 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 22) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="lantern">
      <h2>LanternList</h2>
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

function LanternListItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LanternListItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 22 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
