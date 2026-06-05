---
name: content-creation-complete-workflow
description: Complete end-to-end workflow for creating video content for Dar Naor — from sketch to Google Sheets push. Includes decision framework, hook selection, script writing, and technical push process.
metadata:
  type: project
  created: 2026-06-01
  status: active
  originSessionId: continuation-session
---

# Complete Content Creation Workflow for Dar Naor

This is the EXACT process that works. Follow it step-by-step, every time.

---

## PHASE 1: SKETCH INPUT

**What you provide:**
- A video sketch (raw idea, outline, specific details, pain points, target audience)
- That's it. Nothing else needed from you until the end.

**I do nothing until you give me the sketch.**

---

## PHASE 2: FRAMEWORK PROPOSAL (I propose in full detail, you approve once)

**What I analyze from your sketch:**
- Topic/message
- Pain point being addressed
- Avatar that resonates
- Best angle to tell this story
- Why this angle works per Ava's framework

**What I present (WITH FULL CONTEXT):**

### Sketch Analysis:

**Topic:** [What the video is about]
**Angle:** [Which angle from the 7]
**Pain Point:** [What the viewer is struggling with]
**Avatar:** [How this connects to ideal client]

### Framework Proposal:

| Element | Decision |
|---------|----------|
| **Script Angle** | [Angle] (reasoning: why this fits) |
| **Content Type** | [Type] (reasoning: why this works) |
| **Funnel Type** | [TOFU/MOFU/BOFU] (reasoning: which stage) |
| **Video Format** | [Specific format] (reasoning: why this approach) |
| **CTA Type** | [Follow or other] (reasoning: why this CTA) |
| **Editing Style** | [Description] (reasoning: visual approach) |

**Direction feel right?**

**You respond:** ✅ "Good, let's go" (or suggest adjustments like "Change X to Y")

**Once you approve → I stop asking and execute everything autonomously.**

---

## PHASE 3: HOOK SELECTION (I execute, no input from you)

**What I do:**

1. Open `viral-hooks-extracted.txt`
2. **Random selection** — pick 5 random line positions (NEVER sequential, NEVER top-down)
3. **Domain check** — Do these hooks fit the topic? (fitness/nutrition/mindset/money/etc.)
4. **Structural fit** — Can I swap (insert X) placeholders with actual sketch details WITHOUT changing core structure?
5. **Adapt all 5:**
   - Original (from Ava's file, exact text)
   - Adapted (with actual sketch details, in Hebrew)
   - Link (Instagram URL from the file)

**Format I present in script:**
```
HOOK 1 (line 642)
Original: "..."
Adapted (Hebrew): "..."
Link: https://www.instagram.com/...

HOOK 2 (line 1847)
[same format]
```

**Critical:** Every hook MUST include:
- Line number from viral-hooks-extracted.txt
- Original text (exact from file)
- Adapted text (with sketch details, in Hebrew)
- Instagram URL (from the file)

**You don't do anything here. I just present the 5 hooks in the script.**

---

## PHASE 4: SCRIPT WRITING (I execute, no input from you)

**What I write:**

- 12-18 scenes (NOT 30, that's too long)
- Each scene = ONE line of dialogue in Hebrew
- **Conversational tone, not textbook**
- **Short sentences, direct delivery**
- **Specific numbers, not vague**
- **Call out real problem** (behavioral, psychological)
- **No fluff, no motivation**

**Format I use:**
```
SCENE 1: "Opening line"
SCENE 2: "Next idea"
SCENE 3: "Support or contrast"
...
```

**CRITICAL: Tone Reference**

Match these examples from June 2026:
- "השנה הפסדת שלושים אלף שקל." ← Direct, provocative
- "לא על דברים שאתה לא צריך. על אימונים ותזונה." ← Short, specific
- "שתי פעמים בשבוע, שלוש שעות אימון..." ← Detail-driven, not vague
- "זה לא יעד. זה עיוורון." ← Call out the real problem (behavioral)

**What to AVOID:**
- ❌ "Inspire yourself" / "Believe in yourself"
- ❌ Vague advice ("work hard," "stay consistent")
- ❌ Long, winding sentences
- ❌ Selling dreams instead of systems
- ❌ Stage directions unless they're specific and add value

**When to add Filming/Editing notes:**
- Only if it's SPECIFIC and improves clarity per Ava's framework
- Example: "Numbers appear on screen as I say them" ← timing matters
- Skip generic: "close-up," "quick cut," "B-roll"
- Keep minimal — if dialogue is clear, visuals follow naturally

---

## PHASE 5: DATA ORGANIZATION (I execute, no input from you)

**What I organize:**

All data from Phases 2-4, structured for Google Sheets push:

- Post Date
- Hook 1-5 (Adapted Hebrew | Link | Original English)
- Framework elements (Script Angle, Content Type, Funnel Type, Video Format, CTA Type, Editing Notes)
- 12-18 scene lines (just dialogue, minimal filming/editing notes)

---

## PHASE 6: GOOGLE SHEETS PUSH (I execute autonomously)

**What I do:**

1. **Find empty video slot:**
   - Check Row 4 (Video # labels)
   - Find first empty 3-column block starting at C, F, I, L, O, R, U, X... (valid starting columns)
   - Example: If C is filled, check F; if F is filled, check I

2. **Push to correct columns:**
   - Column 1 (C, F, I, L, etc.): Post Date + Framework
   - Column 2 (D, G, J, M, etc.): Hook Original/Filming Notes
   - Column 3 (E, H, K, N, etc.): Hook Adapted/Editing Notes

3. **Push to correct rows:**
   - Row 5: Post Date
   - Rows 6-10: Hooks 1-5 (stacked vertically)
   - Rows 11-16: Framework (Script Angle, Content Type, Funnel Type, Video Format, CTA Type, Editing Notes)
   - Rows 18-35 (or however many scenes): Script scenes

4. **Verify push succeeded** and report back to you

---

## PHASE 7: CONFIRMATION TO YOU

**I report back:**

"✅ Script complete. Pushed to [Sheet Name], Video #X, columns [C-E/F-H/I-K].

- Post Date: [date]
- Framework: [Angle | Type | Funnel | Format | CTA]
- 15 scenes, ready to film"

**You check the sheet. That's it.**

---

## CRITICAL RULES (Non-Negotiable)

### Rule 1: Hook Selection
- **Random, never sequential**
- Jump around the file (line 650, 1200, 400, 2000, etc.)
- Filter for domain relevance
- Check structural fit before adapting
- Every hook must come from `viral-hooks-extracted.txt`

### Rule 2: Script Writing
- **Conversational tone, not robotic**
- Reference `dar_naor_scripts_may_june_2026.md` for voice examples
- Match Dar's actual speech patterns (short, direct, specific numbers)
- Call out behavioral/psychological problems, not just technical
- 12-18 scenes, not more
- One line per scene (dialogue only)
- Minimal filming/editing notes (only if specific)

### Rule 3: Google Sheets Push
- **Find empty video slot** (not predetermined)
- **Push to correct columns** (C-E, F-H, I-K, L-N, O-Q, R-T, U-W, X-Z)
- **Push to correct rows** (5, 6-10, 11-16, 18-35)
- **Verify push succeeded** before reporting

### Rule 4: Autonomy
- **After you approve framework, I stop asking**
- No asking for hook approval
- No asking for script approval
- No asking before push
- Just execute, then report back

---

## REFERENCE FILES

- `dar_naor_comprehensive_profile.md` — Your identity, story, business, communication style
- `ideal_client_avatar.md` — Target audience (age 21-45, career-driven, analytical, plateaued)
- `decision_framework_guidelines.md` — How to choose Script Angle, Content Type, Funnel Type, Format, CTA, Editing
- `hook_selection_final_process.md` — How to find and present 5 hooks randomly from viral-hooks-extracted.txt
- `dar_naor_scripts_may_june_2026.md` — Voice examples, tone reference, exact script samples for matching tone

---

## QUICK REFERENCE: ROW STRUCTURE IN GOOGLE SHEETS

**Every video uses the same row structure:**

| Row | Column 1 | Column 2 | Column 3 |
|-----|----------|----------|----------|
| 4 | (Video # label) | (empty) | (empty) |
| 5 | Post Date | (empty) | (empty) |
| 6 | Hook 1 Original | Hook 1 Link | Hook 1 Adapted |
| 7 | Hook 2 Original | Hook 2 Link | Hook 2 Adapted |
| 8 | Hook 3 Original | Hook 3 Link | Hook 3 Adapted |
| 9 | Hook 4 Original | Hook 4 Link | Hook 4 Adapted |
| 10 | Hook 5 Original | Hook 5 Link | Hook 5 Adapted |
| 11 | Script Angle | (empty) | (empty) |
| 12 | Content Type | (empty) | (empty) |
| 13 | Funnel Type | (empty) | (empty) |
| 14 | Video Format | (empty) | (empty) |
| 15 | CTA Type | (empty) | (empty) |
| 16 | Editing Notes | (empty) | (empty) |
| 18-35 | Scene Dialogue | Filming Notes | Editing Notes |

**Valid starting columns:** C, F, I, L, O, R, U, X (columns 3, 6, 9, 12, 15, 18, 21, 24)

---

## HOW THIS WORKS IN PRACTICE

**When you send a sketch in a new conversation:**

1. I read the sketch
2. I propose framework
3. You say "good" or adjust
4. I find 5 random hooks (no input from you)
5. I write script in your actual voice (no input from you)
6. I organize data
7. I push to Google Sheets correctly
8. I report back: "Done. Video X at [location]."

**That's the whole thing. Every time.**

---

## WHAT NOT TO DO

❌ Ask you to choose from hook options
❌ Ask you to approve script before push
❌ Ask you to guide me to empty video slot
❌ Push to wrong columns or rows
❌ Write script in generic/robotic voice
❌ Use sequential hooks (always random)
❌ Skip verification of push
❌ Continue asking questions after framework approval

---

