import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function BridgeSpan({ seed = 31 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 31) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="bridge">
      <h2>BridgeSpan</h2>
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

function BridgeSpanItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function BridgeSpanItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 31 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
