/**
 * Summer 2026 events for the Fort Smith area.
 *
 * Each event object can have:
 *   date   – "YYYY-MM-DD" (required)
 *   time   – display string, e.g. "2:00–3:00pm"
 *   title  – event name (required)
 *   src    – category key: library | ram | museum | parks | nature | parrot | community | marshals | historic
 *   age    – audience, e.g. "All ages", "School age–Teens"
 *   cost   – "free" or "paid"
 *   loc    – location / branch name
 *   note   – extra details
 *   closed – true if the venue is closed that day
 */
const EVENTS = [
  // ── May 2026 ──────────────────────────────────────────────
  { date: "2026-05-23", time: "12:00–3:00pm", title: "RAM Saturday: Lichtenstein Pop Art", src: "ram", age: "All ages", cost: "free", note: "Make-and-take, no registration." },
  { date: "2026-05-25", title: "Library closed — Memorial Day", src: "library", closed: true },
  { date: "2026-05-26", time: "10:00–10:45am", title: "250th Stars and Stripes Family Series", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Interactive lessons and hands-on activities about Independence Day, the flag, and national symbols." },
  { date: "2026-05-26", time: "1:00–1:45pm", title: "250th Stars and Stripes Family Series (afternoon)", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Second session." },
  { date: "2026-05-26", time: "4:00–4:30pm", title: "Storytime with the FSPD", src: "library", age: "Preschool–School age", cost: "free" },
  { date: "2026-05-27", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-05-28", time: "4:30–5:30pm", title: "Once Upon a Stitch Crochet Club", src: "library", age: "School age–Teens", cost: "free" },
  { date: "2026-05-29", time: "10:00–11:00am", title: "Storytime", src: "library", age: "Babies–School age", cost: "free", loc: "Miller Branch" },
  { date: "2026-05-30", time: "11:00am–12:00pm", title: "Kids Create: Dinosaur Crafts!", src: "library", age: "Preschool–Teens", cost: "free" },
  { date: "2026-05-30", time: "12:00–3:00pm", title: "RAM Saturday: Dragon Eggs", src: "ram", age: "All ages", cost: "free", note: "Make-and-take, no registration." },
  { date: "2026-05-30", time: "8:00am–3:00pm", title: "Wheels of Summer Car Show", src: "community", age: "All ages", cost: "free", loc: "1101 Riverfront Drive", note: "Open car show + vendor market, live DJ, door prizes, 50/50 drawing. Free to attend; $20 day-of to enter a vehicle. Awards 3pm. Benefits ICA student programs." },

  // ── June 2026 ─────────────────────────────────────────────
  { date: "2026-06-01", time: "11:00–11:45am", title: "Paper Airplane Contest", src: "library", age: "School age–Teens", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-01", time: "2:00–3:00pm", title: "Summer Reading Kick-Off: Tommy Terrific's Wacky Magic Show", src: "library", age: "Preschool–School age", cost: "free", note: "Big kickoff — magic show." },
  { date: "2026-06-01", time: "5:30–6:30pm", title: "LEGO Club", src: "library", age: "School age–Teens", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-02", time: "10:00–11:00am", title: "Collage Art for Kids", src: "library", age: "Preschool–School age", cost: "free" },
  { date: "2026-06-03", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-03", time: "2:00–5:00pm", title: "Wonderful Wednesday: CB to You Mobile Art Lab", src: "library", age: "Preschool–School age", cost: "free", note: "Drop-in window." },
  { date: "2026-06-04", time: "10:00–11:30am", title: "A Day in the Garden", src: "historic", age: "All ages", cost: "free", loc: "Fort Smith National Historic Site", note: "Garden talks and planting stations. Part of kids summer programming." },
  { date: "2026-06-04", time: "10:00–11:30am", title: "Children's Summer Programming (FSMH)", src: "museum", age: "Kids", cost: "free", loc: "320 Rogers Ave", note: "5th annual — runs four Thursdays (Jun 4, 11, 18, 25)." },
  { date: "2026-06-05", time: "10:00–11:00am", title: "Storytime", src: "library", age: "Babies–School age", cost: "free", loc: "Miller Branch" },
  { date: "2026-06-05", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "First Friday of the series. Title posted closer to date." },
  { date: "2026-06-06", time: "10:00am", title: "Join the Artillery", src: "historic", age: "All ages", cost: "free", loc: "Fort Smith National Historic Site", note: "Learn about Civil War artillery — try equipment, bark orders, and fire a cannon with park volunteers." },
  { date: "2026-06-06", time: "9:30am–12:30pm", title: "250th Summer Saturday Program", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Outdoor hands-on activities and open-air exploration." },
  { date: "2026-06-06", time: "12:00–3:00pm", title: "RAM Saturday: Notan Collage", src: "ram", age: "All ages", cost: "free", note: "Make-and-take, no registration." },
  { date: "2026-06-06", time: "2:00–3:00pm", title: "La Hora de Cuentos / Spanish Storytime", src: "library", age: "Babies–School age", cost: "free" },
  { date: "2026-06-08", time: "10:30am–12:00pm", title: "Monday Movies: Dog Man (PG)", src: "library", age: "School age–Teens", cost: "free" },
  { date: "2026-06-08", time: "2:00–3:45pm", title: "Monday Movies: A Minecraft Movie (PG)", src: "library", age: "School age–Teens", cost: "free" },
  { date: "2026-06-08", time: "3:30–5:00pm", title: "STEAM Team", src: "library", age: "School age", cost: "free" },
  { date: "2026-06-10", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-10", time: "2:00–4:00pm", title: "Wonderful Wednesday: Musical Guest Kim Noller", src: "library", age: "Preschool–School age", cost: "free" },
  { date: "2026-06-11", time: "10:00–11:30am", title: "Children's Summer Programming (FSMH)", src: "museum", age: "Kids", cost: "free", loc: "320 Rogers Ave", note: "Week 2 of 4." },
  { date: "2026-06-12", time: "10:00–11:00am", title: "Storytime", src: "library", age: "Babies–School age", cost: "free", loc: "Miller Branch" },
  { date: "2026-06-12", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Title posted closer to date." },
  { date: "2026-06-13", time: "12:00–3:00pm", title: "RAM Saturday: Paper Cup Crabs", src: "ram", age: "All ages", cost: "free", note: "Make-and-take, no registration." },
  { date: "2026-06-13", time: "All day", title: "Parrot Island: Healthcare Workers Day", src: "parrot", age: "All ages", cost: "paid", note: "Free admission for healthcare workers; family 50% off." },
  { date: "2026-06-15", time: "2:00–3:00pm", title: "Maker Monday: LEGO Robots!", src: "library", age: "School age", cost: "free" },
  { date: "2026-06-16", time: "10:00–10:45am", title: "250th Stars and Stripes Family Series", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Fireworks history with colorful hands-on activities." },
  { date: "2026-06-16", time: "1:00–1:45pm", title: "250th Stars and Stripes Family Series (afternoon)", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Afternoon session on fireworks history." },
  { date: "2026-06-17", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-17", time: "12:00–1:00pm & 2:00–3:00pm", title: "Wonderful Wednesday: Rooted Movement Collective", src: "library", age: "Preschool–School age", cost: "free", note: "Two sessions." },
  { date: "2026-06-17", time: "Time TBD", title: "Pop-Up Play Day", src: "parks", age: "All ages", cost: "free", note: "Free play activities in a city park." },
  { date: "2026-06-18", time: "10:00–11:30am", title: "Children's Summer Programming (FSMH)", src: "museum", age: "Kids", cost: "free", loc: "320 Rogers Ave", note: "Week 3 of 4." },
  { date: "2026-06-19", title: "Library closed — Juneteenth", src: "library", closed: true },
  { date: "2026-06-19", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Title posted closer to date." },
  { date: "2026-06-20", time: "10:00am", title: "Nature of the Fort", src: "historic", age: "All ages", cost: "free", loc: "Fort Smith National Historic Site", note: "Explore the natural world within the historic site." },
  { date: "2026-06-20", time: "10:30am–12:00pm", title: "Button Bouquets", src: "library", age: "School age–Adults", cost: "free", note: "Craft session." },
  { date: "2026-06-20", time: "12:00–3:00pm", title: "RAM Saturday: Egg Carton Reef", src: "ram", age: "All ages", cost: "free", note: "Make-and-take, no registration." },
  { date: "2026-06-22", time: "10:00am–12:00pm", title: "Camp Fiction (River Valley Literary Society)", src: "library", age: "School age", cost: "free", note: "Day 1 of a 5-day writing camp (Mon–Fri)." },
  { date: "2026-06-23", time: "10:00am–12:00pm", title: "Camp Fiction (River Valley Literary Society)", src: "library", age: "School age", cost: "free", note: "Day 2." },
  { date: "2026-06-24", time: "10:00am–12:00pm", title: "Camp Fiction (River Valley Literary Society)", src: "library", age: "School age", cost: "free", note: "Day 3." },
  { date: "2026-06-24", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-06-24", time: "2:00–4:00pm", title: "Wonderful Wednesday: A Critter Adventure (Janet Huckabee Nature Center)", src: "library", age: "Preschool–School age", cost: "free", note: "Live animals from the nature center, at the library." },
  { date: "2026-06-25", time: "10:00am–12:00pm", title: "Camp Fiction (River Valley Literary Society)", src: "library", age: "School age", cost: "free", note: "Day 4." },
  { date: "2026-06-25", time: "10:00–11:30am", title: "Children's Summer Programming (FSMH)", src: "museum", age: "Kids", cost: "free", loc: "320 Rogers Ave", note: "Week 4 of 4 (final)." },
  { date: "2026-06-25", time: "4:30–5:30pm", title: "Once Upon a Stitch Crochet Club", src: "library", age: "School age–Teens", cost: "free" },
  { date: "2026-06-26", time: "10:00am–12:00pm", title: "Camp Fiction (River Valley Literary Society)", src: "library", age: "School age", cost: "free", note: "Day 5 (final)." },
  { date: "2026-06-26", time: "10:00–11:00am", title: "Storytime", src: "library", age: "Babies–School age", cost: "free", loc: "Miller Branch" },
  { date: "2026-06-26", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Title posted closer to date." },
  { date: "2026-06-27", time: "10:00am", title: "Junior Ranger Day", src: "historic", age: "All ages", cost: "free", loc: "Fort Smith National Historic Site", note: "Earn your Junior Ranger badge with hands-on activities." },
  { date: "2026-06-30", time: "4:00–4:30pm", title: "Storytime with the FSPD", src: "library", age: "Preschool–School age", cost: "free" },

  // ── July 2026 ─────────────────────────────────────────────
  { date: "2026-07-01", time: "10:00–10:45am & 11:00–11:45am", title: "Storytime & Crafts", src: "library", age: "Preschool–School age", cost: "free", loc: "Dallas Branch" },
  { date: "2026-07-01", time: "2:00–3:00pm", title: "Wonderful Wednesday: Dino Academy (Bright Star Theatre)", src: "library", age: "Preschool–School age", cost: "free", note: "Dinosaur discovery show." },
  { date: "2026-07-01", time: "Time TBD", title: "Pop-Up Play Day", src: "parks", age: "All ages", cost: "free" },
  { date: "2026-07-03", time: "9:00am–8:00pm", title: "$2.50 Admission Day", src: "marshals", age: "All ages", cost: "paid", loc: "U.S. Marshals Museum", note: "Extended hours, special $2.50 admission. RAM craft activity at 5pm." },
  { date: "2026-07-03", title: "Library closed — Independence Day (7/3–7/4)", src: "library", closed: true },
  { date: "2026-07-03", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Title posted closer to date." },
  { date: "2026-07-04", time: "9:00am–5:00pm", title: "$2.50 Admission Day", src: "marshals", age: "All ages", cost: "paid", loc: "U.S. Marshals Museum", note: "Fourth of July — special $2.50 admission." },
  { date: "2026-07-07", time: "10:00–10:45am", title: "250th Stars and Stripes Family Series", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Explore the meaning of the flag with hands-on activities." },
  { date: "2026-07-07", time: "1:00–1:45pm", title: "250th Stars and Stripes Family Series (afternoon)", src: "marshals", age: "All ages", cost: "free", loc: "U.S. Marshals Museum", note: "Afternoon session on flag history and symbolism." },
  { date: "2026-07-10", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Title posted closer to date." },
  { date: "2026-07-11", time: "All day", title: "Parrot Island: Military Appreciation Day", src: "parrot", age: "All ages", cost: "paid", note: "Free admission for military; family 50% off." },
  { date: "2026-07-15", time: "Time TBD", title: "Pop-Up Play Day", src: "parks", age: "All ages", cost: "free" },
  { date: "2026-07-17", time: "Dusk", title: "Movies in the Park", src: "parks", age: "All ages", cost: "free", note: "Final Friday of the series." },
  { date: "2026-07-18", time: "9:00am–6:00pm", title: "APN Coin Show", src: "community", age: "All ages", cost: "free", loc: "Wyndham Hotel City Center, 700 Rogers Ave", note: "Up to 100 tables — coins, bullion, currency, tokens. Free admission & parking." },
  { date: "2026-07-19", time: "9:00am–4:00pm", title: "APN Coin Show", src: "community", age: "All ages", cost: "free", loc: "Wyndham Hotel City Center, 700 Rogers Ave", note: "Day 2 — free admission & parking." },
  { date: "2026-07-25", time: "All day", title: "Parrot Island: First Responders Day", src: "parrot", age: "All ages", cost: "paid", note: "Free admission for first responders; family 50% off." },
];
