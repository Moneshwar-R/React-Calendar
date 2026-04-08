# React Calendar

A seasonal, interactive calendar built with React + Vite. Features date range selection, notes, Indian holidays, and dynamic season-based visuals.

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

---

## Tech Stack

| Library | Why |
|---|---|
| **React 19** | UI framework |
| **Vite** | Fast dev server and bundler |
| **Tailwind CSS v4** | Utility-first styling with zero config |
| **date-fns** | Lightweight date math (no heavy moment.js) |
| **framer-motion** | Smooth animations for month transitions and note cards |
| **lucide-react** | Clean, consistent icon set |

---

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── Calendar.jsx        # Main calendar shell + range mode button
│   │   ├── CalendarGrid.jsx    # 7-col grid, fills 42 slots for uniform layout
│   │   ├── DayCell.jsx         # Individual day — handles today, selected, range, holidays
│   │   ├── Header.jsx          # Month title + prev/next navigation
│   │   ├── useCalendar.js      # All calendar state (dates, notes, range mode)
│   │   └── specialDays.js      # Indian holidays keyed by MM-DD with emoji
│   ├── Notes/
│   │   └── NotesPanel.jsx      # Add, view, delete notes tied to date ranges
│   └── UI/
│       ├── HeroImage.jsx       # Season-aware hero image with title/subtitle
│       └── SeasonParticles.jsx # Animated particles per season (snow, rain, petals, heat waves)
├── App.jsx                     # Layout — hero + notes on left, calendar on right
└── index.css                   # Tailwind + custom keyframe animations
```

---

## Key Design Decisions

**Season-aware UI**
The calendar detects the current month and switches the hero image, background particles, and ambient effects automatically — snow in winter, petals in spring, heat waves in summer, rain in monsoon, and falling leaves in autumn.

**Range mode gating**
Date selection is locked behind the "Select Date Range" button. Clicking dates freely was confusing UX — the button makes the intent explicit and turns red with a cancel option while active. Range mode auto-exits once an end date is picked.

**Indian holidays via `MM-DD` keys**
Fixed holidays (Republic Day, Independence Day, Christmas etc.) are stored as `MM-DD` strings so they work every year without any API. Lunar holidays (Holi, Diwali etc.) are hardcoded for the current year and can be updated in `specialDays.js`.

**Notes stored in localStorage**
Notes persist across page refreshes with no backend needed. They are keyed by `yyyy-MM` month so lookups stay fast and filtered per month view.

**42-slot calendar grid**
`CalendarGrid` always renders exactly 42 cells (6 weeks) regardless of the month. This prevents the calendar from shifting height as you navigate between months.
