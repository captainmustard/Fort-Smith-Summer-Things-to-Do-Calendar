/* ============================================================
   Fort Smith Summer 2026 — Calendar renderer & filters
   Expects: EVENTS array from events.js (loaded first)
   ============================================================ */

const SRC_NAME = {
  library:   "Library",
  ram:       "Art Museum",
  museum:    "Museum of History",
  parks:     "Parks",
  nature:    "Nature Center",
  parrot:    "Parrot Island",
  community: "Community",
  marshals:  "Marshals Museum",
  historic:  "Historic Site",
};

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DOW = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

let activeSrc = "all";
let freeOnly = false;

function parseDate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function buildEvent(e) {
  const div = document.createElement("div");
  div.className = "event" + (e.closed ? " is-closed" : "");
  div.style.setProperty("--src", `var(--${e.closed ? "closed" : e.src})`);

  if (e.closed) {
    div.innerHTML =
      `<div class="top"><span class="title">${esc(e.title)}</span></div>
       <div class="row2"><span class="tag closed">Closed</span></div>`;
  } else {
    let tags = `<span class="tag src">${SRC_NAME[e.src] || e.src}</span>`;
    tags += e.cost === "free"
      ? `<span class="tag free">Free</span>`
      : `<span class="tag paid">Paid</span>`;
    if (e.age) tags += `<span class="tag age">${esc(e.age)}</span>`;

    div.innerHTML =
      `<div class="top">
        <span class="title">${esc(e.title)}</span>
        ${e.time ? `<span class="time">${esc(e.time)}</span>` : ""}
      </div>
      ${e.loc ? `<div class="loc">\u{1F4CD} ${esc(e.loc)}</div>` : ""}
      <div class="row2">${tags}</div>
      ${e.note ? `<div class="note">${esc(e.note)}</div>` : ""}`;
  }

  return div;
}

function render() {
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  const filtered = EVENTS
    .filter(e => {
      if (activeSrc !== "all" && e.src !== activeSrc) return false;
      if (freeOnly && e.cost !== "free" && !e.closed) return false;
      return true;
    })
    .sort((a, b) =>
      a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || "")
    );

  document.getElementById("emptyMsg").style.display =
    filtered.length ? "none" : "block";

  let curMonth = "";
  let curDay = "";
  let dayEl = null;

  filtered.forEach(e => {
    const dt = parseDate(e.date);
    const monthKey = dt.getFullYear() + "-" + dt.getMonth();

    if (monthKey !== curMonth) {
      curMonth = monthKey;
      curDay = "";
      const h = document.createElement("div");
      h.className = "month";
      h.textContent = MONTHS[dt.getMonth()] + " " + dt.getFullYear();
      cal.appendChild(h);
    }

    if (e.date !== curDay) {
      curDay = e.date;
      const day = document.createElement("div");
      const wknd = dt.getDay() === 0 || dt.getDay() === 6;
      day.className = "day" + (wknd ? " weekend" : "");
      day.innerHTML =
        `<div class="datebox">
          <div class="dow">${DOW[dt.getDay()]}</div>
          <div class="dnum">${dt.getDate()}</div>
        </div>`;
      const ev = document.createElement("div");
      ev.className = "events";
      day.appendChild(ev);
      cal.appendChild(day);
      dayEl = ev;
    }

    dayEl.appendChild(buildEvent(e));
  });
}

// ── Filter chips ────────────────────────────────────────────
document.querySelectorAll(".chip[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    activeSrc = btn.dataset.filter;
    document.querySelectorAll(".chip[data-filter]").forEach(b =>
      b.setAttribute("aria-pressed", b === btn ? "true" : "false")
    );
    render();
  });
});

const freeBtn = document.getElementById("freeToggle");
freeBtn.addEventListener("click", () => {
  freeOnly = !freeOnly;
  freeBtn.setAttribute("aria-pressed", freeOnly ? "true" : "false");
  render();
});

// ── Initial render ──────────────────────────────────────────
render();
