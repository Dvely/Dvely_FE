import { useMemo, useState } from "react";

/** Unrelated sandbox UI. Not imported by the product. */
export function FerryTicket({ seed = 39 }) {
  const [tick, setTick] = useState(0);
  const values = useMemo(() => {
    const next = [];
    for (let index = 0; index < 6; index += 1) {
      next.push((seed * 19 + index * 39) % 89);
    }
    return next;
  }, [seed, tick]);

  return (
    <section data-sandbox="ferry">
      <h2>FerryTicket</h2>
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

function FerryTicketItem1({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 1) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem2({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 2) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem3({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 3) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem4({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 4) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem5({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 5) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem6({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 6) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem7({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 7) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem8({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 8) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem9({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 9) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem10({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 10) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem11({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 11) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem12({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 12) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem13({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 13) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem14({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 14) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem15({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 15) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem16({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 16) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem17({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 17) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem18({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 18) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem19({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 19) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem20({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 20) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem21({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 21) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem22({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 22) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem23({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 23) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem24({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 24) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem25({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 25) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem26({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 26) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem27({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 27) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem28({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 28) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem29({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 29) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem30({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 30) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem31({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 31) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem32({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 32) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem33({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 33) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem34({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 34) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem35({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 35) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem36({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 36) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem37({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 37) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem38({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 38) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem39({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 39) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem40({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 40) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem41({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 41) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem42({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 42) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem43({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 43) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem44({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 44) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem45({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 45) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem46({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 46) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem47({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 47) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem48({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 48) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem49({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 49) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem50({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 50) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem51({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 51) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem52({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 52) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem53({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 53) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem54({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 54) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem55({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 55) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem56({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 56) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem57({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 57) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem58({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 58) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem59({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 59) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem60({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 60) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem61({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 61) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem62({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 62) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem63({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 63) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem64({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 64) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem65({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 65) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem66({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 66) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem67({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 67) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem68({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 68) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem69({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 69) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem70({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 70) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem71({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 71) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem72({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 72) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem73({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 73) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem74({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 74) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem75({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 75) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem76({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 76) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem77({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 77) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem78({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 78) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem79({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 79) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem80({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 80) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem81({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 81) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem82({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 82) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem83({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 83) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem84({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 84) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem85({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 85) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem86({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 86) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem87({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 87) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem88({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 88) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem89({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 89) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem90({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 90) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem91({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 91) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem92({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 92) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem93({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 93) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem94({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 94) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem95({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 95) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem96({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 96) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem97({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 97) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem98({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 98) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem99({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 99) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem100({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 100) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem101({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 101) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem102({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 102) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem103({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 103) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem104({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 104) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem105({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 105) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem106({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 106) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem107({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 107) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem108({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 108) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem109({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 109) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem110({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 110) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem111({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 111) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem112({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 112) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem113({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 113) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem114({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 114) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem115({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 115) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem116({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 116) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem117({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 117) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem118({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 118) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem119({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 119) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem120({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 120) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem121({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 121) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem122({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 122) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem123({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 123) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem124({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 124) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem125({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 125) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem126({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 126) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem127({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 127) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem128({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 128) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem129({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 129) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem130({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 130) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem131({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 131) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem132({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 132) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem133({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 133) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem134({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 134) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem135({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 135) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem136({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 136) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem137({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 137) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem138({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 138) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem139({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 139) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem140({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 140) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem141({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 141) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem142({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 142) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem143({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 143) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem144({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 144) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem145({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 145) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem146({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 146) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem147({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 147) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem148({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 148) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem149({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 149) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem150({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 150) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem151({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 151) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem152({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 152) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
    </article>
  );
}

function FerryTicketItem153({ label, amount }) {
  const [on, setOn] = useState(false);
  const tone = (amount * 39 + 153) % 180;
  return (
    <article>
      <p>{label}</p>
      <p>{tone}</p>
      <button type="button" onClick={() => setOn((value) => !value)}>
        {on ? "on" : "off"}
      </button>
