# June 2026 Sheet Structure — Exact Layout

## TAB NAME
`June 2026`

---

## SECTION 1: CONTENT PLANNING TABLE

### Row 1: Headers
Freeze this row.

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
[Pattern continues...]
```

### Row 2 Onwards: Video Data

Each row = ONE VIDEO. Script lines are grouped in sets of 3 columns (Script | Filming | Editing).

**Example — Video 1 (All columns, rows 2–3 if it has 2 script lines):**

```
Row 2:
A2: 1
B2: June 5, 2026
C2: Ready for filming
D2: TOFU
E2: Tutorial
F2: Educational
G2: "Chicken and rice is good, but..."
H2: "3 Egg Mistakes"
I2: Eggs cooking in different methods
J2: Shot/Angle Change
K2: Follow
L2: Dark blue + teal; sans-serif; food B-roll close-ups
M2: "Scrambled eggs cook fast."
N2: Close-up of eggs in pan, scrambling with fork, medium heat, white background
O2: Text "QUICK ❌" overlay top-left, fade in 0.3s, stay 1.5s
P2: "But boiled eggs have more amino acids."
Q2: Cut to boiled eggs being peeled, white background, close-up
R2: Text "MORE PROTEIN ✅" overlay, fade in 0.3s, zoom 1.1x

Row 3:
[Same video continues if it has another script line]
S2: "Fried in olive oil is the best."
T2: Egg frying in olive oil, yolk runny, overhead shot
U2: Text "BEST ✅" overlay, green checkmark, fade in 0.3s
V2: "Follow for nutrition hacks."
W2: You speaking to camera, 3-4 seconds, confident pose
X2: CTA text "Follow for more", white, bottom third, 2s duration
```

**For Video 2 (starts in row 4):**

```
Row 4:
A4: 2
B4: June 8, 2026
C4: Ready for filming
D4: MOFU
E4: Storytelling (if applicable) or another angle
F4: Storytelling
[Continue pattern]
```

---

## Column Widths

| Column | Width | Wrap Text |
|--------|-------|-----------|
| A–C | 80px | No |
| D–F | 100px | No |
| G–I | 120px | Yes |
| J | 120px | Yes |
| K | 100px | No |
| L | 150px | Yes |
| M–onwards (Script + Notes) | 180px | Yes |

---

## Cell Formatting

### Data Validation (Dropdowns)

**C Column (Status):**
- Ready for filming
- Filmed
- Edited
- Posted

**D Column (Funnel Type):**
- TOFU
- MOFU
- BOFU

**E Column (Script Angle):**
- Tutorial
- Comparison
- Mythbust
- Do's vs Don'ts
- Tip/Hack
- Transformation
- Challenge

**F Column (Content Type):**
- Educational
- Storytelling
- Authority

**J Column (Video Format):**
- Talking Back and Forth
- Visual
- Voiceover
- Multitasking
- Setting Change
- Shot/Angle Change
- Clone
- Whiteboard
- Q&A
- Green Screen
- Reaction

**K Column (CTA Type):**
- Follow
- Freebie
- Paid Offer
- Engagement
- None

---

## SECTION 2: MONTHLY CALENDAR VIEW

**Location:** Rows [Last Video Row + 4] onwards

**Title:** Row [X], Column A: `POSTING SCHEDULE — JUNE 2026`

**Calendar Grid:**

```
Row [X+2]:
A: WEEK    B: Mon    C: Tue    D: Wed    E: Thu    F: Fri    G: Sat    H: Sun

Row [X+3] (Week 1):
A: 1       B: —      C: —      D: Video #1 (June 5)    E: —    F: —    G: —    H: —

Row [X+4] (Week 2):
A: 2       B: Video #2 (June 9)  C: —  D: —  E: Video #3 (June 12)  F: —  G: —  H: —

[Continue for full month]
```

**Formatting:**
- Center text
- Bold headers (WEEK, Mon–Sun)
- Highlight cells with videos (light teal background, #087fa3 @ 20% opacity)
- Border all cells

---

## SECTION 3: MONTHLY RATIO CHECK

**Location:** Rows [Calendar End + 3] onwards

```
[Empty row for spacing]

A[Row]: CONTENT RATIO TRACKING

A[Row+2]: TOFU Videos:
B[Row+2]: [COUNTIF formula counting TOFU in column D]
C[Row+2]: /
D[Row+2]: [Target number based on posting schedule]

A[Row+3]: MOFU Videos:
B[Row+3]: [COUNTIF formula counting MOFU in column D]
C[Row+3]: /
D[Row+3]: [Target number]

A[Row+4]: BOFU Videos:
B[Row+4]: [COUNTIF formula counting BOFU in column D]
C[Row+4]: /
D[Row+4]: [Target number]

A[Row+6]: Status:
B[Row+6]: ✅ On target  [or]  ⚠️ Adjust next batch
```

**Formulas:**

```
TOFU Count: =COUNTIF(D:D, "TOFU")
MOFU Count: =COUNTIF(D:D, "MOFU")
BOFU Count: =COUNTIF(D:D, "BOFU")
```

**Target Ratio (for 0–1,000 followers, Dar's stage):**
- Per week: 3 TOFU + 2 MOFU + 2 BOFU
- Per month (4–5 weeks): 12–15 TOFU, 8–10 MOFU, 8–10 BOFU

---

## FORMATTING & STYLING

### Colors
- Header row background: #0b1e26 (dark blue, matches Dar's brand)
- Header text: #5bd4ff (teal, matches brand)
- Calendar video cells: #087fa3 @ 20% opacity
- Section title rows: #0b1e26 background, #5bd4ff text

### Typography
- Font: "Assistant" (Google Fonts, to match landing page) or fallback to sans-serif
- Header: Bold, 12px
- Data: Regular, 11px

### Borders
- All data cells: 1px solid rgba(8,127,163,0.3) [matches design token --border]

---

## How to Set This Up in Google Sheets

### Step 1: Create the Tab
1. Right-click sheet tab at bottom → "Insert 1 below"
2. Name it "June 2026"

### Step 2: Add Headers (Row 1)
- Manually enter all column headers A1:X1 (or as far as needed)
- Select Row 1 → View → Freeze → 1 row

### Step 3: Format Columns
- Select A:X
- Right-click → "Column width" → Set per table above
- Right-click → "Wrap text" → Set per table above

### Step 4: Add Data Validation (Dropdowns)
- Select column C (Status)
- Data → Data Validation → Create list
- Repeat for D, E, F, J, K columns

### Step 5: Add Sample Data
- Start with at least 2–3 videos to show structure

### Step 6: Build Calendar
- Starting rows below content table
- Manual calendar grid with posting dates

### Step 7: Add Ratio Check
- Add COUNTIF formulas to count TOFU/MOFU/BOFU
- Formula: =COUNTIF(D:D,"TOFU") for TOFU count, etc.

### Step 8: Format Colors/Styling
- Header row: Background #0b1e26, Text #5bd4ff
- Calendar video cells: Background teal @ 20% opacity
- Section titles: Same as headers
- All cells: Border 1px solid rgba(8,127,163,0.3)

---

## Notes for Implementation

1. **Script lines can span multiple rows** — if a video has 5 script lines, it takes 5 rows (A5:X5, A6:X6, A7:X7, A8:X8, A9:X9).
   - BUT each row has the same Video #, Post Date, Status, Funnel Type, etc. in columns A–L
   - Only columns M onwards change (script line content changes)

2. **OR: One row per video, one big merged cell per script** — if you want each video in ONE row only.
   - Pro: Cleaner layout
   - Con: Can't see individual script lines at a glance
   - **Recommendation:** Stick with one-row-per-script-line for clarity during filming

3. **Dropdowns keep data clean** — Users can't type invalid values.

4. **Calendar is visual** — Doesn't need to be linked to the table above; it's just a reference view.

5. **COUNTIF formulas auto-update** — As you add videos, the ratio check updates automatically.

---

## Once Built: How to Use It

1. **Planning phase:** Fill in Hook Stack, Script Angle, Format, CTA, Status = "Ready for filming"
2. **Filming phase:** Add Filming Notes for each line; update Status = "Filmed"
3. **Editing phase:** Add Editing Notes for each line; update Status = "Edited"
4. **Uploading phase:** Update Status = "Posted"; verify calendar is accurate
5. **Monthly check:** Review ratio; adjust next month's ideas if needed
6. **Monthly duplication:** Copy June structure → rename to July → update dates only

