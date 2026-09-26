import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function WindmillArm({ seed = 40 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 40) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="windmill">
      <h2>WindmillArm</h2>
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

function WindmillArmItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function WindmillArmItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 40 + 106) % 180;
  return (
    <article>
