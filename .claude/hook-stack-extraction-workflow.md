---
name: hook-stack-extraction-workflow
description: Complete workflow for extracting 3 Hook Stack options from Ava's 1000 Viral Hooks PDF for any video topic
metadata:
  type: reference
---

# Hook Stack Extraction Workflow

## Overview
Extract 3 Hook Stack options (with real Instagram reference links) for any video topic using Ava Yuergens' 1000 Viral Hooks PDF. Each Hook Stack includes 3 components: Verbal hook, Written hook, and Visual hook.

---

## Prerequisites
- `viral-hooks-extracted.txt` — extracted PDF content (in `c:\Users\darna\claudeproject\`)
- Video metadata (topic, angle, funnel type, content type)
- Understanding of Ava's 7 Hook Patterns

---

## Step 1: Identify the Video Topic & Content Type

**Input needed:**
- Video number
- Main topic (e.g., "Bread Selection")
- Script Angle (Tip/Hack, Educational, Myth Buster, etc.)
- Content Type (Educational, Storytelling, Authority)
- Funnel (TOFU, MOFU, BOFU)

**Example for Video 3:**
- Topic: Bread Selection for Cutting
- Angle: Tip/Hack + Educational
- Content: Educational
- Funnel: TOFU

---

## Step 2: Read the Extracted Hooks File

**Command:**
```bash
head -1000 viral-hooks-extracted.txt
```

**Structure:**
The file is organized as:
```
SECTION HEADER (e.g., "EDUCATIONAL")

HOOK TEXT (template with placeholders)

https://www.instagram.com/...link...
```

Each hook has:
- Hook template with `(insert X)` placeholders
- Real Instagram link on next line(s)

---

## Step 3: Search for Relevant Hook Patterns

**For Video 3 (Bread Selection), search these patterns:**

1. **"This is what X looks like"** → Authority positioning
   - Pattern: "This is what [noun] looks like. I am a pro [title]..."
   - Link: `https://www.instagram.com/p/DEnW3Mmvswc/`
   - Use when: You want to establish expertise

2. **"Does it actually matter what type of X"** → Question hook
   - Pattern: "Does it actually matter what type of [noun] you [verb]?"
   - Link: `https://www.instagram.com/p/DHMtL1GSsy-/`
   - Use when: You want curiosity hook

3. **"Stop buying/doing X if you want Y"** → Warning/Negative hook
   - Pattern: "Stop [action] if you actually want to [result]"
   - Link: Search PDF for similar "Stop doing" patterns
   - Use when: You want urgency/FOMO

**Search method:**
- Use `grep` or manual search in `viral-hooks-extracted.txt`
- Match patterns by keyword, not exact text
- Extract the hook template + associated Instagram link

---

## Step 4: Map Hook Templates to Video Topic

**For each of the 3 Hook Stack options:**

### Option Template:
```
HOOK STACK OPTION [#]: [Hook Pattern Name]

Pattern from Ava: [Category] + [Psychological Trigger]
Instagram Reference: [Real link from PDF]

Verbal Hook (First 3 seconds):
> [Specific to video topic - customize the template]

Written Hook (Text Overlay):
[What appears on screen]

Visual Hook:
[Detailed description of what audience sees]

Why: [Psychological reason this works]
```

**Key rule:** Customize the Ava template to your video topic, don't just paste the template.

**Example - Video 3:**

❌ **WRONG:**
```
This is what (insert noun) looks like.
```

✅ **RIGHT:**
```
This is what a GOOD bread looks like. I'm a nutrition coach 
and this is the PROPER way to choose it.
```

---

## Step 5: Create Complete Hook Stack Document

**File structure:**
```markdown
# Video [#]: [Topic] — REAL Hook Stack (מאבה's Library)

Source: 1000 Viral Hooks PDF
Video Type: [Type]
Funnel: [TOFU/MOFU/BOFU]

---

## HOOK STACK OPTION 1: "[Pattern Name]"
[Full details as per template above]

## HOOK STACK OPTION 2: "[Pattern Name]"
[Full details as per template above]

## HOOK STACK OPTION 3: "[Pattern Name]"
[Full details as per template above]

## PRODUCTION NOTES
- [What to film]
- [Which option to test first]
- [How to measure success]
```

**Save as:** `video[#]-real-hook-stack.md`

---

## Step 6: Test & Iterate

**For each Hook Stack option:**

1. **Film** with the specified visual hook
2. **Edit** with exact written hook text overlay
3. **Post** and measure first 3-second replay rate
4. **Track:** Which hook keeps viewers watching?

**Metric:** % of viewers who replay video in first 3 seconds

**Rotation strategy:**
- Week 1: Test Option 2 (highest curiosity rate)
- Week 2: Test Option 1 (builds authority)
- Week 3: Test Option 3 (urgency/FOMO)
- Compare metrics → double down on winner

---

## Common Patterns to Extract from PDF

| Pattern | Psychological Trigger | Best For |
|---------|----------------------|----------|
| "This is what X looks like" | Authority positioning | Expertise content |
| "Does it matter what type of X" | Curiosity/Question | Myth-busting |
| "Stop doing X if you want Y" | Urgency/FOMO | Warning/correction |
| "Here are X things you need" | Framework/Structure | Educational lists |
| "X vs X comparison" | Visual contrast | Product selection |
| "This one mistake can..." | Fear of mistakes | Safety/warnings |
| "If you're (demographic)..." | Targeting | Niche content |

---

## Workflow Checklist

- [ ] Step 1: Identify video topic & content type
- [ ] Step 2: Read `viral-hooks-extracted.txt`
- [ ] Step 3: Search for 3 relevant hook patterns
- [ ] Step 4: Map templates to your specific topic
- [ ] Step 5: Create `video[#]-real-hook-stack.md`
- [ ] Step 6: Plan filming/editing with Hook Stack specs
- [ ] Step 7: Post and measure first 3-second replay %
- [ ] Step 8: Rotate hooks weekly and compare metrics

---

## Files Generated

For each video, you'll create:
- `video[#]-real-hook-stack.md` — Hook Stack document with 3 options
- Reference to `viral-hooks-extracted.txt` — your source library

---

## Time Required

- **Step 1-3:** 15-20 minutes (pattern search)
- **Step 4-5:** 10-15 minutes (customization + document)
- **Step 6:** Ongoing (weekly testing)

**Total setup per video:** ~30-35 minutes

---

## Notes

- **Do NOT invent hooks** — always pull from `viral-hooks-extracted.txt`
- **Do customize the template** — make it specific to your topic
- **Always include Instagram link** — for reference/inspiration
- **Test in rotation** — one hook per week to isolate variables
- **Track metrics** — first 3-second replay rate is your KPI

