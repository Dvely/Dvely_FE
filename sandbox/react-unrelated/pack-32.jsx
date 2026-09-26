import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function LighthouseLog({ seed = 32 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 32) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="lighthouse">
      <h2>LighthouseLog</h2>
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

function LighthouseLogItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function LighthouseLogItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 32 + 135) % 180;
