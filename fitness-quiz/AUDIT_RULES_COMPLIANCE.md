# Audit: Meal Rules Compliance Check

**Status: NEEDS FIXES** ❌

---

## Summary
The code currently does NOT implement the calorie-based component requirements. Components are only added when the user explicitly selects them, not based on meal calorie thresholds. Below is a detailed breakdown.

---

## Per-Function Audit

### 1. buildHot (line 4113) ❌ NEEDS FIX
**Rule:** 60% protein / 40% carbs (or 60/40 with 100 kcal allocated to veggies)

**Current Code:**
```javascript
const protCal = Math.floor(cal * 0.5 / 50) * 50;  // 50% protein
const carbCal = R50(cal - protCal - vegCal);       // remaining goes to carbs
```

**Issue:** Allocates 50% protein, not 60%.

**Fix Needed:** Change to `cal * 0.6` for protein, leaving 40% for carbs.

---

### 2. buildYogurt (line 4224) ❌ NEEDS FIX
**Rule:** If `cal >= 300`, add 50 kcal of cereal automatically

**Current Code:**
```javascript
const cerealIds = getComp(meal, 'yogurt', 'cereal') || [];
const cerealCal = cerealIds.length > 0 ? 50 : 0;  // Only if user selected
```

**Issue:** Cereal only added if user explicitly selects it. No calorie threshold check.

**Fix Needed:** Add condition:
```javascript
const cerealCal = (cal >= 300 || cerealIds.length > 0) ? 50 : 0;
```

---

### 3. buildCereals (line 4317) ❌ NEEDS FIX
**Rule:** 
- If `cal >= 300`: powder becomes required (1 scoop = ~80 kcal)
- If `cal >= 500`: powder becomes required (1.5 scoops = ~120 kcal)

**Current Code:**
```javascript
const hasPowder = (getComp(meal, 'cereals', 'powder') || []).length > 0;
const powderScoops = hasPowder ? (cal < 400 ? 1 : 2) : 0;
```

**Issues:**
- Checks if user selected powder, not if `cal >= 300`
- Uses `cal < 400` as threshold (should be `>= 300`)
- Uses 2 scoops instead of 1.5 at higher calories

**Fix Needed:**
```javascript
let powderScoops = 0;
if (cal >= 300 || (getComp(meal, 'cereals', 'powder') || []).length > 0) {
  powderScoops = cal >= 500 ? 1.5 : 1;
}
const powderCal = powderScoops * 80;  // adjust if actual scoop cal differs
```

---

### 4. buildToast (line 4371) ❌ NEEDS FIX
**Rule:** If `cal >= 350`, sauce becomes required

**Current Code:**
```javascript
const sauceCap = 50;  // Always included
if (sauceCal > 0) { ... }
```

**Issue:** Sauce is always allocated (always appears in output). No calorie threshold for making it required.

**Fix Needed:**
- Check if `cal >= 350` before allocating sauce
- If `cal < 350`, sauce should only appear if user selected it

---

### 5. buildEggs (line 4444) ❌ NEEDS FIX
**Rule:** If `cal >= 300`, bread becomes required (minimum 100 kcal)

**Current Code:**
```javascript
const breadBudget = cal - eggsCal - saladCal - cheeseCal;
if (breadBudget > 0) { ... }
```

**Issues:**
- No explicit check for `cal >= 300`
- Bread only appears if there's budget left after other items
- Does not enforce 100 kcal minimum for bread

**Fix Needed:**
- Explicitly check: if `cal >= 300`, allocate at least 100 kcal to bread
- Adjust other components (reduce salad/cheese if needed) to free up 100 kcal

---

### 6. buildSandwich (line 4538) ⚠️ PARTIALLY WRONG
**Rule:** 50/50 split between bread and protein

**Current Code:**
```javascript
const breadCalBudget = Math.max(0, protCal - (protCal * 0.6));  // 40% bread
```

**Issue:** Allocates 40% bread, 60% protein (opposite of rule).

**Fix Needed:**
```javascript
const breadCalBudget = Math.max(0, protCal * 0.5);  // 50% bread
const finalProtCal = protCal - breadCalBudget;      // 50% protein
```

---

### 7. Bread Minimum (Global) ❌ NOT ENFORCED
**Rule:** Bread must always be minimum 100 kcal (never 50 kcal alone)

**Affected Functions:** buildToast, buildEggs, buildSandwich

**Current:** No minimum enforcement in any function.

**Fix Needed:** In each bread-building section, add check:
```javascript
if (breadCalBudget < 100 && breadCalBudget > 0) {
  // Steal from other components to meet minimum
  breadCalBudget = 100;
  // Adjust vegCal, sauceCal, etc. downward
}
```

---

## Summary of Required Changes

| Component | Issue | Priority |
|-----------|-------|----------|
| buildHot | 50% → 60% protein ratio | HIGH |
| buildYogurt | Add cereal at ≥300 kcal | HIGH |
| buildCereals | Add powder at ≥300/500 kcal | HIGH |
| buildToast | Conditionally add sauce at ≥350 kcal | HIGH |
| buildEggs | Require bread at ≥300 kcal, enforce 100 kcal min | HIGH |
| buildSandwich | Fix 40/60 → 50/50 bread/protein split | HIGH |
| All bread functions | Enforce 100 kcal minimum globally | HIGH |

---

## Testing Strategy
1. Test yogurt at 250 kcal (should NOT have cereal) and 300+ kcal (should have cereal)
2. Test cereals at 250, 300+, 500+ kcal to verify powder scoops
3. Test toast at 300, 350, 400 kcal (sauce only at 350+)
4. Test eggs at 250, 300 kcal (bread only at 300+)
5. Test sandwich: verify 50/50 split
6. Test hot: verify 60/40 split
7. Verify bread never goes below 100 kcal across all types
