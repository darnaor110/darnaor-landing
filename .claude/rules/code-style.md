# Code Style

## General
- הוסף הערות // קצרות שמסבירות מה כל חלק עושה — הקוד צריך להיות קריא וברור.
- אין קוד שאינו בשימוש, dead code, או שאריות ישנות.
- Validate only at real boundaries (user input, external APIs).

## JavaScript
- Vanilla JS only — no libraries, no frameworks.
- Use `const` by default; `let` only when reassignment is needed.
- Wrap independent feature code in an IIFE `(function(){ ... })()` to avoid polluting global scope.
- Prefer `addEventListener` over inline `onclick` attributes.
- `querySelector` / `querySelectorAll` for DOM selection.

## HTML
- Semantic elements where they add meaning (`section`, `nav`, `footer`, `button`).
- `loading="lazy"` on all images below the fold.
- `alt` text on every image.
- Buttons that trigger JS use `<button>`, not `<div>` or `<a>`.

## CSS
- All design tokens go in `:root` CSS variables — never hard-code colors or spacing that appear more than once.
- Mobile-first: base styles for mobile, `@media (min-width)` for wider screens.
- Use `clamp()` for fluid typography.
- Transitions on interactive elements: `0.2s` for micro-interactions, `0.4s` for larger motions.
- Avoid `!important`.
