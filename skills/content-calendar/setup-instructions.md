# Google Sheets Setup — Step-by-Step Instructions

## Overview
You'll create the June 2026 tab structure manually (takes ~15–20 minutes). Once done, you have a template to copy for all future months.

---

## STEP 1: Open Your Google Sheet
- Go to: https://docs.google.com/spreadsheets/d/1HP0kJtm_kgHA64N55FqP1cHcjXRsDgbZt77YHU4y4dE/edit?usp=sharing
- You should see existing tabs at the bottom

---

## STEP 2: Create New Tab for June 2026

1. Click the **"+"** button at the bottom left (next to existing tabs)
2. A new blank tab appears
3. Right-click the new tab → **Rename**
4. Type: `June 2026`
5. Press Enter

**Result:** You now have a "June 2026" tab open

---

## STEP 3: Add Column Headers (Row 1)

Click on cell **A1** and start typing. Enter these headers in order:

```
A1: Video #
B1: Post Date
C1: Status
D1: Funnel Type
E1: Script Angle
F1: Content Type
G1: Hook - Verbal
H1: Hook - Written
I1: Hook - Visual
J1: Video Format
K1: CTA Type
L1: Editing Style Notes
M1: Script Line 1
N1: Filming Notes (L1)
O1: Editing Notes (L1)
P1: Script Line 2
Q1: Filming Notes (L2)
R1: Editing Notes (L2)
S1: Script Line 3
T1: Filming Notes (L3)
U1: Editing Notes (L3)
```

**Note:** You can continue adding more script lines (V, W, X for Script Line 4, etc.) if you want room for longer scripts. Start with this — you can expand later.

**Enter headers quickly:**
- Click A1, type header, press Tab → moves to B1
- Repeat for each header
- When done, press Enter

---

## STEP 4: Freeze Row 1

1. Click anywhere in Row 1 (header row)
2. Go to menu: **View** → **Freeze** → **1 row**

**Result:** Row 1 stays visible when you scroll down

---

## STEP 5: Set Column Widths

1. Select all columns: Click the top-left corner (above row numbers, left of column letters) to select entire sheet
2. Right-click → **Column width**
3. Set widths per this table:

| Columns | Width | Action |
|---------|-------|--------|
| A–C | 70px | Right-click, Column width, type 70 |
| D–F | 100px | Same process |
| G–I | 120px | Same |
| J | 120px | Same |
| K | 100px | Same |
| L | 150px | Same |
| M onwards | 180px | Same |

**Faster way:**
- Click column header (e.g., "A") to select entire column
- Right-click → "Column width"
- Enter number → OK
- Repeat for each range

---

## STEP 6: Enable Text Wrapping

1. Select columns M onwards (Script + Notes columns)
2. Right-click → **Wrap text** → Check box

**Why:** Script lines and notes can be long; wrapping makes cells readable without expanding row height excessively

---

## STEP 7: Add Data Validation (Dropdowns)

### For Column C (Status):
1. Click the column header **C**
2. Go to menu: **Data** → **Data validation**
3. Click **List** (if not already selected)
4. In "List of items" box, paste:
   ```
   Ready for filming,Filmed,Edited,Posted
   ```
5. Check "Show dropdown arrow"
6. Click **Done**

**Result:** Column C now has dropdown with 4 options

### For Column D (Funnel Type):
1. Click column header **D**
2. **Data** → **Data validation**
3. Paste:
   ```
   TOFU,MOFU,BOFU
   ```
4. Check dropdown arrow → **Done**

### For Column E (Script Angle):
1. Click column **E**
2. **Data** → **Data validation**
3. Paste:
   ```
   Tutorial,Comparison,Mythbust,Do's vs Don'ts,Tip/Hack,Transformation,Challenge
   ```
4. Check dropdown → **Done**

### For Column F (Content Type):
1. Click column **F**
2. **Data** → **Data validation**
3. Paste:
   ```
   Educational,Storytelling,Authority
   ```
4. Check dropdown → **Done**

### For Column J (Video Format):
1. Click column **J**
2. **Data** → **Data validation**
3. Paste:
   ```
   Talking Back and Forth,Visual,Voiceover,Multitasking,Setting Change,Shot/Angle Change,Clone,Whiteboard,Q&A,Green Screen,Reaction
   ```
4. Check dropdown → **Done**

### For Column K (CTA Type):
1. Click column **K**
2. **Data** → **Data validation**
3. Paste:
   ```
   Follow,Freebie,Paid Offer,Engagement,None
   ```
4. Check dropdown → **Done**

---

## STEP 8: Format Header Row (Styling)

1. Click row number **1** (selects entire row 1)
2. **Format** → **Number format** → **Bold** (or use Ctrl+B)
3. With Row 1 still selected:
   - **Format** → **Paint format** (optional, to apply a style)
   - Or manually:
     - Right-click → **Conditional formatting**
     - Choose a dark background color (#0b1e26 or dark blue)
     - Text color white or bright teal (#5bd4ff)

**Simpler approach:**
- Select Row 1
- Click the background color button in toolbar → Choose dark blue
- Click text color button → Choose white or light teal
- Make text bold (Ctrl+B)

---

## STEP 9: Add Sample Data (2 Videos)

Click cell **A2** and enter your first video:

```
A2: 1
B2: June 5, 2026
C2: [Click dropdown] Ready for filming
D2: [Click dropdown] TOFU
E2: [Click dropdown] Tutorial
F2: [Click dropdown] Educational
G2: [Type something like] "Chicken and rice is good, but..."
H2: [Type] "3 Egg Mistakes"
I2: [Type] "Eggs cooking in different methods"
J2: [Dropdown] Shot/Angle Change
K2: [Dropdown] Follow
L2: [Type] "Dark blue + teal, sans-serif, food B-roll close-ups"
M2: [Type] "Scrambled eggs cook fast."
N2: [Type] "Close-up of eggs in pan, scrambling with fork, medium heat, white background"
O2: [Type] "Text 'QUICK ❌' overlay top-left, fade in 0.3s, stay 1.5s"
```

**Move to next row:** Press Enter after each cell, or Tab to move horizontally

**For second video:** Follow same pattern, starting at Row 3

```
A3: 2
B3: June 8, 2026
C3: [Dropdown] Ready for filming
[etc.]
```

---

## STEP 10: Create Calendar View

Below your video table (e.g., starting at Row 6 if you have 2 videos), create a calendar:

**Row 6:** Add title
```
A6: POSTING SCHEDULE — JUNE 2026
```

**Row 8:** Create calendar headers
```
A8: WEEK
B8: Mon
C8: Tue
D8: Wed
E8: Thu
F8: Fri
G8: Sat
H8: Sun
```

**Row 9 onwards:** Calendar grid

```
A9: 1            (Week 1)
B9: —
C9: —
D9: Video #1 (June 5)
E9: —
F9: —
G9: —
H9: —

A10: 2           (Week 2)
B10: Video #2 (June 8)
C10: —
D10: —
E10: Video #3 (June 12)   [if you have it]
[etc.]
```

---

## STEP 11: Add Ratio Check

Below the calendar (e.g., Row 15), add:

```
A15: [Leave blank or label: "CONTENT RATIO"]

A17: TOFU Videos:
B17: [Type formula] =COUNTIF(D:D,"TOFU")
C17: /
D17: [Target, e.g.] 12

A18: MOFU Videos:
B18: =COUNTIF(D:D,"MOFU")
C18: /
D18: [Target, e.g.] 8

A19: BOFU Videos:
B19: =COUNTIF(D:D,"BOFU")
C19: /
D19: [Target, e.g.] 8

A21: Status:
B21: [Manually type] ✅ On target  [or]  ⚠️ Adjust next batch
```

**To add a formula:** Click cell (e.g., B17), type `=COUNTIF(D:D,"TOFU")`, press Enter. It auto-calculates.

---

## STEP 12: Apply Borders & Final Styling

1. Select all data cells (A1:U19, or however far your data extends)
2. **Format** → **Borders** → **All borders**
3. Choose a light border color (matches your theme, e.g., subtle blue-gray)

**Optional color highlights:**
- Calendar video cells: Light teal background (subtly)
- Section titles (row 6, row 15): Dark background, light text (matches headers)

---

## STEP 13: Test It

1. Click on any dropdown column (C, D, E, F, J, K)
2. Verify dropdown arrow appears
3. Click to test → options show up
4. Try scrolling down → Row 1 should stay frozen at top
5. Enter data in a script line cell → text should wrap

**All working?** ✅ Your sheet is ready!

---

## Next Steps (When Ready)

Once June is solid:

1. **Populate with real videos** — Add your actual content ideas using the workflow
2. **Duplicate for July** — Right-click "June 2026" tab → "Duplicate" → Rename to "July 2026" → Update dates only
3. **Repeat** — Do this for each month ahead

---

## Quick Reference: Column Purposes

| Columns | Purpose | Input Type |
|---------|---------|-----------|
| A–B | Tracking | Number + Date |
| C | Current Stage | Dropdown |
| D–F | Framework | Dropdowns |
| G–I | Hooks | Text (your ideas) |
| J–K | Format + CTA | Dropdowns |
| L | Visual Notes | Text |
| M–U | Script + Filming + Editing | Text (one row per script line) |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Column too narrow, text cut off | Right-click column → Column width → increase number |
| Can't see dropdown arrow | Data → Data validation → Check "Show dropdown arrow" |
| Formula not working (shows error) | Check spelling: `=COUNTIF(D:D,"TOFU")` must match exactly |
| Row 1 doesn't stay frozen when scrolling | View → Freeze → 1 row (re-do it) |
| Can't wrap text | Select column → Format → Wrap text → Wrap |

---

## Done!

Your June 2026 sheet is now set up and ready to use. Start adding your content ideas and scripts!

