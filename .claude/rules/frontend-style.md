# Frontend Style

## Layout & Direction
- Always RTL (`dir="rtl"`, `lang="he"`).
- Hebrew font: `'Assistant'` from Google Fonts (weights 400, 600, 700, 800).
- Material Symbols Outlined for icons.

## Design Tokens (match index.html :root)
```
--bg:      #071419   dark base background
--bg2:     #0b1e26   slightly lighter sections
--accent:  #5bd4ff   bright teal — highlights, hover states
--accent2: #087fa3   medium teal — buttons, borders, glows
--text:    #e2edf2   primary text
--muted:   #8aa4af   secondary/dimmed text
--border:  rgba(8,127,163,0.3)  default border color
```

## Components
- **Cards**: `border: 1.5px solid var(--border)`, `border-radius: 14px`, `background: rgba(8,127,163,0.05)`.
  - Hover: `border-color: var(--accent2)`, subtle `box-shadow`.
- **Buttons (primary)**: `background: var(--accent2)`, white text, `border-radius: 10px`.
  - Hover: `background: var(--accent)`, text becomes `var(--bg)`.
- **Section divider line**: `width:60px; height:3px; background:var(--accent2); margin: 0.6rem auto 2.5rem`.
- **Glow effects**: `box-shadow: 0 0 Xpx rgba(8,127,163,0.Y)` — keep subtle (X ≤ 20 for cards, ≤ 60 for containers).

## Typography
- Section titles: `clamp(1.5rem, 3.5vw, 2.2rem)`, `font-weight: 800`.
- Body / descriptions: `1rem`, `line-height: 1.7`, color `var(--muted)`.
- Fluid heading scale with `clamp()` — never fixed `px` for headings.

## Interactivity
- Hover lift on containers: `transform: translateY(-2px)`.
- All interactive elements need a visible hover/focus state.
- Animations: use `@keyframes` + `animation` for entrance effects; keep duration ≤ 0.5s.
- Infinite carousels: clone-based infinite loop, drag + edge-hover navigation, touch support.

## Responsive
- Breakpoint: `767px` (mobile).
- On mobile: reduce font sizes, reduce padding (`3.5rem 1.2rem`), stack grids to 1 column.
- Navigation collapses to hamburger on mobile.
- `overflow-x: hidden` on `body` and `section` to prevent horizontal scroll.
