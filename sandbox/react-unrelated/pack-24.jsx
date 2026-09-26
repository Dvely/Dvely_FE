import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function GardenBed({ seed = 24 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 24) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="garden">
      <h2>GardenBed</h2>
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

function GardenBedItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 24 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function GardenBedItem114({ label, amount }) {
