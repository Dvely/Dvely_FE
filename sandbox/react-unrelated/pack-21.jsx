import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function HarborClock({ seed = 21 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 21) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="harbor">
      <h2>HarborClock</h2>
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

function HarborClockItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 21 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function HarborClockItem106({ label, amount }) {
  const [on, setOn] = useState(false);
