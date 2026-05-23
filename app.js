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

const SRC_URL = {
  library:   "https://www.fortsmithlibrary.org/events",
  ram:       "https://fsram.org/",
  museum:    "https://www.fortsmithmuseum.org/",
  parks:     "https://www.fortsmithar.gov/government/departments/parks-recreation",
  nature:    "https://www.agfc.com/en/explore-outdoors/nature-and-education-centers/jharvnc/",
  parrot:    "https://parrotislandwaterpark.com/hours-events/",
  community: "https://www.discoverfortsmith.com/events/",
  marshals:  "https://www.marshalsmuseum.org/events/",
  historic:  "https://www.nps.gov/fosm/planyourvisit/calendar.htm",
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

// ── "Add to calendar" via .ics download ─────────────────────
function parseTimeRange(timeStr) {
  // Returns { startH, startM, endH, endM } or null if unparseable.
  // Handles: "2:00–3:00pm", "10:00am–12:00pm", "10:00–10:45am",
  //          "10:00am", "12:00–1:00pm & 2:00–3:00pm" (first session only)
  if (!timeStr) return null;
  const s = timeStr.split("&")[0].trim(); // take first session
  const m = s.match(/(\d{1,2}):(\d{2})\s*(am|pm)?\s*[–\-—]\s*(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (m) {
    let [, sh, sm, sap, eh, em, eap] = m;
    sh = +sh; sm = +sm; eh = +eh; em = +em;
    const endAp = (eap || sap || "").toLowerCase();
    const startAp = (sap || eap || "").toLowerCase();
    if (endAp === "pm" && eh < 12) eh += 12;
    if (endAp === "am" && eh === 12) eh = 0;
    if (startAp === "pm" && sh < 12) sh += 12;
    if (startAp === "am" && sh === 12) sh = 0;
    // if start looks later than end and no explicit am/pm on start, it's probably am
    if (sh > eh && !sap) sh -= 12;
    return { startH: sh, startM: sm, endH: eh, endM: em };
  }
  // single time like "10:00am"
  const single = s.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (single) {
    let [, h, min, ap] = single;
    h = +h; min = +min;
    if (ap.toLowerCase() === "pm" && h < 12) h += 12;
    if (ap.toLowerCase() === "am" && h === 12) h = 0;
    return { startH: h, startM: min, endH: h + 1, endM: min };
  }
  return null;
}

function pad2(n) { return String(n).padStart(2, "0"); }

function icsEscape(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function generateICS(e) {
  const dt = parseDate(e.date);
  const y = dt.getFullYear(), m = dt.getMonth() + 1, d = dt.getDate();
  const dateStr = `${y}${pad2(m)}${pad2(d)}`;
  const times = parseTimeRange(e.time);

  let dtStart, dtEnd;
  if (times) {
    dtStart = `DTSTART:${dateStr}T${pad2(times.startH)}${pad2(times.startM)}00`;
    dtEnd = `DTEND:${dateStr}T${pad2(times.endH)}${pad2(times.endM)}00`;
  } else {
    // all-day event
    const next = new Date(y, m - 1, d + 1);
    const nextStr = `${next.getFullYear()}${pad2(next.getMonth()+1)}${pad2(next.getDate())}`;
    dtStart = `DTSTART;VALUE=DATE:${dateStr}`;
    dtEnd = `DTEND;VALUE=DATE:${nextStr}`;
  }

  const summary = icsEscape(e.title);
  const location = e.loc ? `LOCATION:${icsEscape(e.loc)}\r\n` : "";
  const infoUrl = e.url || SRC_URL[e.src] || "";
  const desc = [e.time, e.note, e.age ? `Ages: ${e.age}` : "", e.cost === "free" ? "Free" : "", infoUrl ? `Info: ${infoUrl}` : ""]
    .filter(Boolean).join(" · ");

  const uid = `${dateStr}-${e.title.replace(/\W+/g,"-").toLowerCase()}@calendar.captainmustard.com`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fort Smith Summer Calendar//EN",
    "BEGIN:VEVENT",
    dtStart,
    dtEnd,
    `SUMMARY:${summary}`,
    location + `DESCRIPTION:${icsEscape(desc)}`,
    infoUrl ? `URL:${infoUrl}` : null,
    `UID:${uid}`,
    `DTSTAMP:${dateStr}T000000Z`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  return ics;
}

function addToCalendar(e) {
  const ics = generateICS(e);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = e.title.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").substring(0, 40) + ".ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
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

    const infoUrl = e.url || SRC_URL[e.src] || "";
    div.innerHTML =
      `<div class="top">
        <span class="title">${esc(e.title)}</span>
        ${e.time ? `<span class="time">${esc(e.time)}</span>` : ""}
      </div>
      ${e.loc ? `<div class="loc">\u{1F4CD} ${esc(e.loc)}</div>` : ""}
      <div class="row2">${tags}</div>
      ${e.note ? `<div class="note">${esc(e.note)}</div>` : ""}
      ${infoUrl ? `<a class="src-link" href="${esc(infoUrl)}" target="_blank" rel="noopener">More info ↗</a>` : ""}`;

    const addBtn = document.createElement("button");
    addBtn.className = "add-cal";
    addBtn.title = "Add to calendar";
    addBtn.textContent = "+\u{1F4C5}";
    addBtn.addEventListener("click", (ev) => { ev.stopPropagation(); addToCalendar(e); });
    div.appendChild(addBtn);
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
