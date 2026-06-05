# Dar Naor — Content Creation System

## 🎬 Content Creation Pipeline

**When a video sketch is sent (նושא, כאב, מסר, דוגמה), execute the 7-phase pipeline automatically:**

### PHASE 1: Sketch Input ✅
- Receive sketch (any format)

### PHASE 2: Framework Proposal ✅
- Propose framework in structured table (Script Angle, Content Type, Funnel Type, Video Format, CTA Type, Editing Notes)
- Ask only: "Direction feel right?"
- Wait for approval before proceeding

### PHASE 3: Hook Selection ✅
- Extract 5 relevant hooks from `viral-hooks-extracted.txt`
- Select by relevance (not sequential)
- Start search at random line in file
- **Each hook MUST include (mandatory):**
  - Original (English, exact from file)
  - Adapted (Hebrew, customized to this sketch)
  - Instagram Link (from the file)
  - Filming Notes (what to film specifically for THIS hook)
  - Editing Notes (text overlays, graphics, timing for THIS hook)

### PHASE 4: Script Writing ✅
- Write 12-18 scenes in Hebrew
- Tone: conversational, direct, specific numbers
- Match `dar_naor_scripts_may_june_2026.md` voice examples
- One line per scene (dialogue only)
- **Include Filming & Editing Notes for each scene (not generic)**
  - Filming: "Show the jam jars" / "Point to scale" (specific action)
  - Editing: "Numbers appear on screen" / "Cut to B-roll of decision" (specific visual timing)

### PHASE 5: Data Organization ✅
- Structure into JSON: post_date, hooks (5), framework, script (12-18 scenes), script_notes (12-18 notes)
- **Each scene must have a matching filming/editing note in script_notes**

### PHASE 6: Google Sheets Push ✅
- **CRITICAL:** Check Row 5 (not Row 4!) for first empty column
- Valid starting columns: C, F, I, L, O, R, U, X, AA, AD, AG, AJ, AM, AP, AS, AV, AY, BB...
- Push structure:
  - Column 1: Post Date (Row 5), Framework (Rows 11-16), Script text (Rows 18-35)
  - Column 2: Hook Links (Rows 6-10), **Script filming/editing notes (Rows 18-35)**
  - Column 3: Adapted Hooks (Rows 6-10)
- Use: `python .claude/scripts/push-to-sheets.py [json_file]`
- Verify: data is in correct columns and rows (notes must be in separate column from dialogue)

### PHASE 7: Confirmation ✅
- Report: "✅ Script complete. Pushed to June 2026, Video #[X], columns [I-K]."

---

## Critical Rules (Non-Negotiable)

1. **Always check Row 5, never Row 4**
   - Row 4 = Video # labels (empty by design)
   - Row 5 = Post Date (where actual data goes, shows which columns are filled)

2. **Valid column sequence (Precise Logic)**
   - Legitimate starting columns ONLY: C, F, I, L, O, R, U, X, AA, AD, AG, AJ, AM, AP, AS, AV, AY, BB, BE, BH, BK, BN...
   - Every 3rd column starting from C (2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32...)
   - **Algorithm:**
     1. Read Row 5 from current sheet
     2. Check ONLY legitimate columns (C, F, I, L, O, R, U, X, AA, AD...)
     3. Find first one that is empty
     4. Push there (3 consecutive columns: Col1, Col1+1, Col1+2)
     5. If all legitimate columns in current sheet are filled, move to next sheet (July 2026, August 2026, etc.)
   - **NEVER push outside legitimate columns** (no BW-BY, no random columns)

3. **Push to exact rows**
   - Row 5: Post Date
   - Rows 6-10: Hooks (5 hooks × 3 columns each)
   - Rows 11-16: Framework (6 fields)
   - Rows 18-35: Script scenes

4. **After framework approval = full autonomy**
   - No asking for hook approval
   - No asking for script approval
   - No asking before push
   - Just execute all 3 phases, then report

5. **Script tone**
   - Reference: `dar_naor_scripts_may_june_2026.md`
   - Conversational, not robotic
   - Direct, specific numbers, no vague statements
   - Call out behavioral/psychological problems
   - Minimum 12, maximum 18 scenes

---

## Reference Files (Loaded Automatically)

- `../content_creation_complete_workflow.md` — Full 7-phase workflow documentation
- `../viral-hooks-extracted.txt` — 1000+ Ava Yuergens viral hooks (142KB)
- `../dar_naor_scripts_may_june_2026.md` — Voice examples & tone reference
- `../dar_naor_comprehensive_profile.md` — Identity, story, business context
- `../ideal_client_avatar.md` — Target audience definition
- `./.claude/service-account-key.json` — Google Sheets service account (for Python)
- `./.claude/scripts/push-to-sheets.py` — Automation script
- `../CONTENT_CREATION_PIPELINE.md` — Quick reference guide

---

## Common Mistakes to Avoid

❌ Check Row 4 instead of Row 5 for empty slots
❌ Push to columns outside the legitimate sequence (only C, F, I, L, O, R, U, X, AA, AD... are valid)
❌ Push to arbitrary columns like BW-BY (far right) — always check Row 5 for the FIRST legitimate empty slot
❌ Push data to wrong rows (Row 5 = Date, 6-10 = Hooks, 11-16 = Framework, 18-35 = Script)
❌ Ask for approval after framework is approved
❌ Use generic script tone instead of Dar's voice
❌ **Hooks without Filming Notes or Editing Notes** — each of 5 hooks MUST have both
❌ **Forget to update Filming/Editing Notes in script scenes** — each scene needs specific visual direction
❌ Don't move to next sheet when current sheet is full — always check July 2026, August 2026, etc.

---

## Google Sheets Details

**Sheet ID:** `1HP0kJtm_kgHA64N55FqP1cHcjXRsDgbZt77YHU4y4dE`  
**Sheet Name:** `June 2026` (auto-advances to July 2026, August 2026, etc. when full)  
**Service Account:** claude-sheets@claudeproject-498015.iam.gserviceaccount.com  
**Automation:** Python 3.14+ with google-auth, googleapiclient

---

## JSON Data Structure (Exact Format)

```json
{
  "post_date": "2026-06-15",
  "hooks": [
    {
      "original_en": "Stop (insert action) if you want (insert result).",
      "instagram_link": "https://www.instagram.com/p/DGaYM9PIO9b/",
      "adapted_he": "Hebrew version customized to video topic"
    },
    ... 5 hooks total ...
  ],
  "framework": {
    "script_angle": "Angle name",
    "content_type": "Educational / Storytelling / Authority",
    "funnel_type": "TOFU / MOFU / BOFU",
    "video_format": "ABR / Talking Head / Carousel / etc.",
    "cta_type": "Follow / Freebie / Paid / etc.",
    "editing_notes": "Overall editing style for this video"
  },
  "script": [
    "Scene 1 dialogue in Hebrew (NO filming notes here)",
    "Scene 2 dialogue in Hebrew (NO filming notes here)",
    ... 12-18 scenes total ...
  ],
  "script_notes": [
    "FILMING/EDITING DIRECTION for Scene 1",
    "FILMING/EDITING DIRECTION for Scene 2",
    ... 12-18 notes matching script array ...
  ]
}
```

**Field Names MUST be exact:**
- Hooks: `original_en`, `instagram_link`, `adapted_he`
- Script: dialogue only (no notes mixed in)
- Script_notes: filming/editing directions (separate array)

---

## How to Invoke

In any conversation:
```
נושא: [Topic]
כאב: [Pain point]
מסר: [Core message]
דוגמה: [Example/data point]
```

Or just send a sketch. Pipeline runs completely automatically (Phases 2-7).

---

## End Result

**One command:** Send sketch  
**Get back:** Fully written, formatted, and pushed to Google Sheets — ready to film  
**Time:** ~10 seconds (7 phases automated)
