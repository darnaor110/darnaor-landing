# Meal Building Rules — Component Requirements & Calorie Distribution

## Global Rules
- **Bread minimum:** Always 100 kcal minimum (never 50 kcal bread alone)
- Apply this rule across: toast, eggs, sandwich

---

## Per Meal Type

### YOGURT
**Always Required:**
- type (סוג יוגורט)

**Calorie-Based:**
- **≥ 300 kcal:** cereal becomes required (allocate exactly 50 kcal)

**Optional:**
- fruit (only if selected by user)

---

### CEREALS (קורנפלקס)
**Always Required:**
- cereal (סוג קורנפלקס)
- milk (חלב)

**Calorie-Based:**
- **≥ 300 kcal:** powder (אבקת חלבון) becomes required → allocate 1 scoop (80 kcal)
- **≥ 500 kcal:** powder becomes 1.5 scoops (120 kcal)

---

### TOAST
**Always Required:**
- bread (לחם) — minimum 100 kcal
- cheese (גבינה) — always

**Calorie-Based:**
- **≥ 350 kcal:** sauce (רוטב) becomes required

**Optional:**
- extras (ירקות)

---

### EGGS
**Always Required:**
- bread (לחם) — minimum 100 kcal

**Calorie-Based:**
- **≥ 300 kcal:** bread is required; below 300 kcal, bread is optional

**Optional:**
- cheese (גבינות)
- salad (סלט)

---

### HOT (ארוחה חמה)
**Always Required:**
- protein (חלבון)
- carb (פחמימה)

**Calorie Distribution:**
- **Default (no veggies selected):** 60% protein / 40% carbs
- **If veggies selected:** allocate 100 kcal to veggies, split remaining: 60% protein / 40% carbs

**Optional:**
- veg (ירקות) — only included if user selects

---

### SALAD
**Always Required:**
- protein (חלבון)
- base (ירקות כבסיס)

**Optional:**
- cheese (גבינה)
- dressing (רוטב)

---

### SANDWICH
**Always Required:**
- bread (לחם) — minimum 100 kcal
- protein (חלבון)

**Calorie Distribution:**
- 50/50 split between bread and protein

**Optional:**
- veg (ירקות)
- sauce (רוטב)

---

### FRUIT
**Always Required:**
- fruit (בחר פרי)

---

### BAR
**Always Required:**
- brand (בחר חטיף)

---

### COTTAGE
**Always Required:**
- type (בחר קוטג')

**Optional:**
- side (תוספת)

---

### SALAD_SNACK
**Optional:**
- protein (תוספת חלבון) — only if selected

---

### SNACK
**Optional:**
- items (בחר נשנושים) — only if selected
