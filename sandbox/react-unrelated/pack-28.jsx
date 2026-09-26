import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function KitePanel({ seed = 28 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 28) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="kite">
      <h2>KitePanel</h2>
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

function KitePanelItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function KitePanelItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 28 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
