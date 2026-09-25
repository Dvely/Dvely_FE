import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function RepeatRuleCard({ seed = 11 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 8; index += 1) {
      next.push((seed * 17 + index * 11) % 97);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="repeat" className="sandbox-repeat">
      <header>
        <h2>RepeatRuleCard</h2>
        <button type="button" onClick={() => setTick((value) => value + 1)}>
          refresh
        </button>
      </header>
      <ul>
        {values.map((value, index) => (
          <li key={`${value}-${index}`}>{value}</li>
        ))}
      </ul>
    </section>
  );
}

function RepeatRuleCardCell1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 1) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 2) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 3) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 4) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 5) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 6) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 7) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 8) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 9) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 10) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 11) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 12) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 13) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 14) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 15) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 16) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 17) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 18) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 19) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 20) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 21) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 22) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 23) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 24) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 25) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 26) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 27) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 28) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 29) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 30) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 31) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 32) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 33) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 34) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 35) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 36) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 37) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 38) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 39) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 40) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 41) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 42) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 43) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 44) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 45) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 46) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 47) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 48) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 49) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 50) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 51) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 52) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 53) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 54) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 55) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 56) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 57) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 58) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 59) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 60) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 61) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 62) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 63) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 64) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 65) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 66) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 67) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 68) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 69) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 70) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 71) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 72) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 73) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 74) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 75) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 76) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 77) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 78) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 79) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 80) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 81) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 82) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 83) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 84) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 85) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 86) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 87) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 88) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 89) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 90) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 91) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 92) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 93) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 94) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 95) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 96) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 97) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 98) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 99) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 100) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 101) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 102) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 103) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 104) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 105) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 106) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 107) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 108) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 109) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 110) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 111) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 112) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 113) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 114) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 115) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 116) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 117) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 118) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 119) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 120) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 121) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 122) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 123) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 124) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 125) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 126) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 127) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 128) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 129) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 130) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 131) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 132) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 133) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 134) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 135) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 136) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 137) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 138) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 139) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 140) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 141) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 142) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 143) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 144) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 145) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 146) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 147) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 148) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 149) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 150) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 151) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 152) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 153) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell154({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 154) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell155({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 155) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell156({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 156) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell157({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 157) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell158({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 158) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell159({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 159) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell160({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 160) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell161({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 161) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell162({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 162) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell163({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 163) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell164({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 164) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell165({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 165) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell166({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 166) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell167({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 167) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell168({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 168) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell169({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 169) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell170({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 170) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell171({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 171) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell172({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 172) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell173({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 173) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell174({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 174) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell175({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 175) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell176({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 176) % 255;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function RepeatRuleCardCell177({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 11 + 177) % 255;
  return (
    <article>
      <p>{label}</p>
