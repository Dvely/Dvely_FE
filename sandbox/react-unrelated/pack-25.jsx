import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function RiverGauge({ seed = 25 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 25) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="river">
      <h2>RiverGauge</h2>
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

function RiverGaugeItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RiverGaugeItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 25 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
