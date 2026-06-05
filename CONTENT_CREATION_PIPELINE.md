# Content Creation Pipeline — Dar Naor

## Quick Invocation

**In any conversation, send a video sketch like this:**

```
[סקיצה לסרטון]

נושא: [What is the video about]
כאב: [What problem/pain does it address]
מסר: [Core message/insight]
דוגמה: [Any specific example or data point]
```

---

## What Happens Automatically (7 Phases)

### PHASE 1: Sketch Input
You send the sketch. That's it.

### PHASE 2: Framework Proposal
I propose a framework in a structured table:
- **Script Angle:** Which angle from Ava's methods
- **Content Type:** Educational / Storytelling / Authority
- **Funnel Type:** TOFU / MOFU / BOFU
- **Video Format:** ABR / Talking Head / Whiteboard / etc.
- **CTA Type:** Follow / Freebie / Paid Offer / etc.
- **Editing Notes:** What visuals/graphics to add

**You respond:** "Good, let's go" (or suggest changes)

### PHASE 3: Hook Selection
I extract 5 relevant hooks from `viral-hooks-extracted.txt`:
- Selected by relevance, not sequentially
- Search starts at random line to avoid repetition
- **Each hook MUST include (mandatory):**
  - Original (English, exact from file)
  - Adapted (Hebrew, customized to your video)
  - Instagram Link (from the file)
  - Filming Notes (what to film specifically for THIS hook)
  - Editing Notes (text overlays, graphics, timing for THIS hook)

### PHASE 4: Script Writing
I write 12-18 scenes in Hebrew, conversational tone:
- Direct, specific numbers, no fluff
- One line per scene (dialogue only)
- Minimal filming/editing notes (only if specific)
- Tone matches `dar_naor_scripts_may_june_2026.md`

### PHASE 5: Data Organization
All data structured in JSON:
- Post date, 5 hooks, framework fields, script scenes

### PHASE 6: Google Sheets Push (Automated)
I push to your Google Sheet (`1HP0kJtm_kgHA64N55FqP1cHcjXRsDgbZt77YHU4y4dE`):
- **Find empty slot:** Check Row 5 (not Row 4!) for first empty column (I, L, O, R, U, X, AA, AD, AG, etc.)
- **Push to correct columns:**
  - Column 1: Post Date (Row 5), Framework (Rows 11-16), Script (Rows 18+)
  - Column 2: Hook Links (Rows 6-10)
  - Column 3: Adapted Hooks (Rows 6-10)
- **Verify:** Push succeeded, report back

### PHASE 7: Confirmation
Report: "✅ Script complete. Pushed to [Sheet], Video #[X], columns [I-K]."

---

## Critical Rules

### Rule 1: Check Row 5, Not Row 4
- **Row 4** = Video # labels (empty visually)
- **Row 5** = Post Date (shows which columns are actually filled)
- **Always check Row 5** to find the empty slot

### Rule 2: Valid Column Sequence (Precise Algorithm)
- **Legitimate starting columns ONLY:** C(2), F(5), I(8), L(11), O(14), R(17), U(20), X(23), AA(26), AD(29), AG(32), AJ(35), AM(38), AP(41), AS(44), AV(47), AY(50), BB(53)...
- Pattern: Every 3rd column starting from C (indices 2, 5, 8, 11, 14, 17...)
- **Algorithm:**
  1. Read Row 5 from current sheet
  2. Check ONLY legitimate columns in order
  3. Find first that is empty
  4. Push there (3 consecutive columns)
  5. If all legitimate columns in current sheet are filled → move to next sheet (July 2026, August 2026, etc.)
- **NEVER push outside legitimate columns** (no random columns, no BW-BY)

### Rule 3: Push to Correct Rows
- Row 5: Post Date
- Rows 6-10: Hooks (5 total)
- Rows 11-16: Framework (6 fields)
- Rows 18-35: Script scenes

### Rule 4: After You Approve Framework, Autonomy
- No asking for hook approval
- No asking for script approval
- No asking before push
- Just execute, then report

### Rule 5: Script Tone
- Match `dar_naor_scripts_may_june_2026.md` examples
- Conversational, not robotic
- Specific numbers, not vague
- Call out behavioral/psychological problems
- 12-18 scenes, one line per scene

---

## Reference Files (All Loaded Automatically)
- `content_creation_complete_workflow.md` — Full 7-phase workflow
- `viral-hooks-extracted.txt` — 1000+ hooks library (142KB)
- `dar_naor_scripts_may_june_2026.md` — Voice examples & tone reference
- `dar_naor_comprehensive_profile.md` — Your identity & brand
- `ideal_client_avatar.md` — Target audience (age 21-45, analytical, plateaued)
- `.claude/service-account-key.json` — Google Sheets authentication (SERVICE ACCOUNT)
- `.claude/scripts/push-to-sheets.py` — Automation script for push

---

## Common Mistakes to Avoid

❌ **Mistake 1:** Checking Row 4 instead of Row 5
- Row 4 is empty by design (labels)
- Always check Row 5 to find actual filled columns

❌ **Mistake 2:** Pushing to arbitrary columns (BW-BY, random columns)
- Only check legitimate columns: C, F, I, L, O, R, U, X, AA, AD, AG, AJ, AM...
- Find the FIRST legitimate empty slot
- NEVER skip ahead to far columns

❌ **Mistake 3:** Hooks without Filming Notes or Editing Notes
- Each of 5 hooks MUST have both
- Filming Notes = what to film for THIS hook (specific action)
- Editing Notes = text overlays, graphics, timing for THIS hook

❌ **Mistake 4:** Script scenes without Filming/Editing Notes
- Each scene needs specific visual direction
- Don't use generic notes ("B-roll", "cut", "transition")
- Use specific notes ("Show the jam jars", "Numbers appear on screen")

❌ **Mistake 5:** Not moving to next sheet when full
- If current sheet (June 2026) is full, automatically move to July 2026, August 2026, etc.
- Don't try to force into adjacent columns

❌ **Mistake 6:** Asking for approval between phases
- After framework approval (Phase 2), execute phases 3-6 autonomously with zero questions

---

## How It Works Behind the Scenes

1. **Hook Extraction:** 
   - Opens `viral-hooks-extracted.txt`
   - Finds hooks matching your sketch topic
   - Selects 5 random starting points (never sequential)
   - Extracts: Hook (English) + Link + Adapted (Hebrew)

2. **Script Writing:**
   - Reads `dar_naor_scripts_may_june_2026.md` for voice examples
   - Writes 12-18 scenes in your conversational tone
   - Matches structure: hook → problem → solution → CTA

3. **Google Sheets Push:**
   - Uses Python + service account authentication
   - Reads Row 5 to find first empty column
   - Creates batch update with 30-40 cells
   - Pushes all data at once (no sequential writes)
   - Clears any mistakes

---

## Ready to Start?

Send a sketch anytime. Pipeline runs automatically. 🚀

Example:
```
סקיצה: "אנשים חושבים שלגוון בתפריט זה טוב, אבל זה בעצם רע"
נושא: Variety in meal planning
כאב: Over-complicating nutrition, leading to non-adherence
מסר: Jam Study (6 vs 24 options) — less choice = more action
דוגמה: Fitness clients with 2-3 meal options per meal stick to diet 10x better
```

Done. Phases 2-7 run automatically. You get back a finished video ready to film.
