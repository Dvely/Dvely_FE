import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function AnchorBoard({ seed = 35 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 35) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="anchor">
      <h2>AnchorBoard</h2>
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

function AnchorBoardItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 135) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 136) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 137) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 138) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 139) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 140) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 141) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 35 + 142) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function AnchorBoardItem143({ label, amount }) {
  const [on, setOn] = useState(false);
