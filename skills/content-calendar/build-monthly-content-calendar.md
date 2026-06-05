# Build Monthly Content Calendar (Ava Framework)

## Purpose
Generate a complete monthly content planning sheet (one month = one Google Sheets tab) for Dad Naor's Instagram content using Ava Yuergens' framework.

## Inputs
- Month and year (e.g., "June 2026")
- Number of videos planned for that month
- Posting schedule dates

## Output Structure

### SECTION 1: CONTENT PLANNING TABLE
**Location:** Top of tab  
**Layout:** One row per video, organized left to right

| Column | Field | Purpose | Example |
|--------|-------|---------|---------|
| A | Video # | Sequential numbering | 1, 2, 3... |
| B | Post Date | When video goes live | June 5, 2026 |
| C | Status | Current stage | Ready for filming / Filmed / Edited / Posted |
| D | Funnel Type | TOFU/MOFU/BOFU | TOFU |
| E | Script Angle | One of 7 angles | Tutorial / Comparison / Mythbust / Do's vs Don'ts / Tip/Hack / Transformation / Challenge |
| F | Content Type | Educational/Storytelling/Authority | Educational |
| G | Hook - Verbal | What viewers hear (3 sec) | "Chicken and rice is good for muscle, but..." |
| H | Hook - Written | What viewers read on screen (3 sec) | "3 Egg Mistakes" |
| I | Hook - Visual | What viewers see (3 sec) | Eggs in different cooking methods |
| J | Video Format | Filming style (one of 11) | Shot/Angle Change / Voiceover / Visual / etc. |
| K | CTA Type | Call to action | Follow / Freebie / Paid Offer / Engagement / None |
| L | Editing Style Notes | Colors, fonts, B-roll, audio | Brand colors: dark + teal; Font: Arial; B-roll: gym + food |
| M | Script Line 1 | First sentence of script | "If you're eating plain chicken and rice..." |
| N | Filming Notes (Line 1) | How to film line 1 | "Close-up of chicken on plate, white background" |
| O | Editing Notes (Line 1) | How to edit line 1 | "Text overlay: '❌ Plain chicken', fade in 0.3s" |
| P | Script Line 2 | Second sentence | "Add a sauce and suddenly..." |
| Q | Filming Notes (Line 2) | How to film line 2 | "Same plate, zoom out to show sauce jar" |
| R | Editing Notes (Line 2) | How to edit line 2 | "Text: '✅ With sauce', fade in 0.3s" |
| [S onwards] | [Repeat Pattern] | Continue for each script line | One row = one take |

**Script Structure Rule:**
- Each column group = ONE LINE (sentence) of the script
- Format: [Script] | [Filming Notes] | [Editing Notes]
- Maximum 8–12 lines per video (1 take each)

---

### SECTION 2: MONTHLY CALENDAR VIEW
**Location:** Below the content table (physically separated)  
**Layout:** Traditional calendar grid showing posting dates

| Week | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|------|-----|-----|-----|-----|-----|-----|-----|
| 1 | - | - | Video #1 | - | - | - | - |
| 2 | Video #2 | - | - | Video #3 | - | - | - |
| etc. | ... | ... | ... | ... | ... | ... | ... |

**What This Shows:**
- Each cell with a video = links to "Video #X" in the table above
- Visual layout of posting schedule
- Easy to spot gaps or clustering

---

### SECTION 3: MONTHLY RATIO CHECK (TOFU/MOFU/BOFU)
**Location:** To the right of the calendar (or below, physically separated)

```
TOFU Videos:    [Count] / [Target]
MOFU Videos:    [Count] / [Target]
BOFU Videos:    [Count] / [Target]

Status:    ✅ On target  OR  ⚠️ Adjust next batch
```

**Target Ratios (per Ava's framework):**
- **0–1,000 followers (Dar's stage):** 3 TOFU + 2 MOFU + 2 BOFU per week
- Adjust monthly total based on your posting schedule

---

## How to Fill It

### Step 1: Set Up Headers
- Row 1 = all column headers (A through as far right as needed)
- Freeze Row 1 so it stays visible when scrolling

### Step 2: Enter Video Metadata
For each video:
1. Video # (auto-increment: 1, 2, 3...)
2. Post Date (specific calendar date)
3. Status (default to "Ready for filming")
4. Funnel Type (TOFU, MOFU, or BOFU)
5. Script Angle (choose from 7)
6. Content Type (Educational, Storytelling, or Authority)
7. Hook Stack (Verbal, Written, Visual — from 5 hook options per element)
8. Video Format (from 11 options)
9. CTA Type (Follow, Freebie, Paid, Engagement, None)
10. Editing Style Notes (brand colors, fonts, B-roll types)

### Step 3: Script + Filming/Editing Notes
- One row of three columns per script line
- Script line = ONE SENTENCE (one take, max ~15 words)
- Filming notes = specific instructions (camera angle, location, props, positioning)
- Editing notes = specific instructions (text overlay, transition, timing, effects)

### Step 4: Build the Calendar
- Transfer posting dates to a calendar grid
- Show visual layout of monthly posts
- Verify no clustering or gaps

### Step 5: Check Ratio
- Count TOFU/MOFU/BOFU videos
- Compare to target
- Flag if adjustment needed

---

## Example: One Complete Video Entry

```
Video #: 3
Post Date: June 10, 2026
Status: Ready for filming
Funnel Type: TOFU
Script Angle: Comparison
Content Type: Educational
Hook - Verbal: "Eggs cooked in butter are good, but..."
Hook - Written: "3 Ways to Cook Eggs"
Hook - Visual: Three eggs cooking in different methods
Video Format: Shot/Angle Change
CTA Type: Follow
Editing Style: Dark blue + teal, sans-serif font, close-up food B-roll

Script Line 1: "Scrambled eggs are fast to cook."
  Filming: Close-up of eggs in pan, medium heat, scrambling with fork
  Editing: Text overlay "Scrambled = QUICK", fade in at 0.2s, stay for 1.5s

Script Line 2: "But boiled eggs have more muscle-building amino acids."
  Filming: Cut to boiled eggs being peeled, white background
  Editing: Text "Boiled = MORE PROTEIN", fade in at 0.3s, zoom 1.1x

Script Line 3: "The best option is fried in olive oil."
  Filming: Cut to egg frying in olive oil, yolk still runny
  Editing: Text "Fried in Oil = BEST", fade in at 0.3s, green checkmark overlay

[CTA at end]
Script Line 4: "Follow for more nutrition hacks like this."
  Filming: You speaking directly to camera, 3-4 seconds
  Editing: Bring in CTA text "Follow for more", white text, bottom third
```

---

## Monthly Tabs (Naming Convention)

- **June 2026** — First template tab
- **July 2026** — Copy June structure, update dates
- **[Month] [Year]** — Standard naming for all future months

---

## Technical Setup

### In Google Sheets:
1. Create new tab named "June 2026"
2. Set up column headers (A–R minimum, can extend)
3. Freeze first row (View → Freeze → 1 row)
4. Set column widths:
   - Narrow: Video #, Post Date, Status, Funnel, Angle, Type, CTA (20–80px each)
   - Medium: Hook fields, Format, Notes (100–150px each)
   - Wide: Script + Filming + Editing (150–200px each, wrap text enabled)
5. Format cells:
   - Status column = dropdown menu (Ready for filming / Filmed / Edited / Posted)
   - Funnel Type = dropdown (TOFU / MOFU / BOFU)
   - Script Angle = dropdown (7 options)
   - Content Type = dropdown (Educational / Storytelling / Authority)
   - CTA Type = dropdown (Follow / Freebie / Paid Offer / Engagement / None)

### Calendar Section:
- Create calendar grid below content table
- Use conditional formatting to highlight posted dates

### Ratio Check:
- Use COUNTIF formulas to auto-count TOFU/MOFU/BOFU videos
- Show status (On target / Adjust needed)

---

## Workflow (Once Built)

1. **Populate metadata** — Hook stack, format, CTA, angle (takes ~5 min per video)
2. **Write script lines** — Each line 1 sentence; add filming/editing notes (takes ~10–15 min per video)
3. **Update status** — Move from "Ready" → "Filmed" → "Edited" → "Posted"
4. **Check ratio monthly** — Adjust next batch if needed
5. **Duplicate for next month** — Copy June structure, update dates only

---

## Notes

- **One sentence = one take.** Dar struggles with long lines, so break everything into short, filmable chunks.
- **Filming notes are CRITICAL** — These are shot lists. Be specific (camera angle, positioning, props, location).
- **Editing notes guide the editor** — If Dar is self-editing, these are his instructions. If hiring an editor, these are the brief.
- **Script is the skeleton; notes are the flesh** — The script is what he says; the filming/editing notes are HOW it happens.
- **Dropdowns keep it clean** — Standardizes entries, makes filtering/sorting easier.
- **Calendar view is for visual planning** — Lets you see clustering, gaps, rhythm at a glance.

