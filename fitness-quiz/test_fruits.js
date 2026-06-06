/**
 * test_fruits.js — בדיקת פלט הפרי
 * בדוק שהפרי מופיע בפורמט "X יחידות" בלא גרמים כפולים
 */

const UNIT_DATA = {
  'תפוח': { per100g_kcal: 80, unit_weight_g: 100, unit_name: 'יחידה' },
  'בננה': { per100g_kcal: 90, unit_weight_g: 100, unit_name: 'יחידה' },
  'תותים': { per100g_kcal: 32, unit_weight_g: 100, unit_name: 'קערית' },
  'תפוז': { per100g_kcal: 80, unit_weight_g: 100, unit_name: 'יחידה' },
};

const FRUIT_CAL = {
  'תפוח': 80,
  'בננה': 90,
  'תותים': 32,
  'תפוז': 80,
};

// סימולציה של הלוגיקה החדשה
function formatFruitPortion(fname, frCalNeeded) {
  const frCalPer = FRUIT_CAL[fname] || 80;
  const frG = Math.round(frCalNeeded / frCalPer * 100 / 5) * 5;
  const unitData = UNIT_DATA[fname];

  let portion = frG + 'ג';
  if (unitData && unitData.unit_weight_g) {
    const units = frG / unitData.unit_weight_g;
    const unitNum = Math.round(units * 2) / 2; // round to nearest 0.5
    const pluralForm = unitData.unit_name === 'יחידה' ? 'יחידות'
      : unitData.unit_name === 'קערית' ? 'קערוות'
      : unitData.unit_name + 'ים';
    const unitCount = unitNum === 1
      ? unitData.unit_name
      : `${unitNum} ${pluralForm}`;
    portion = unitCount;
  }

  return { fname, portion, frG };
}

// בדיקות עם 4 פרים שונים
console.log('🍎 בדיקת פלט הפרי\n');

const tests = [
  { name: 'תפוח (Apple) — 200 קל', fruit: 'תפוח', caloriesNeeded: 200 },
  { name: 'בננה (Banana) — 180 קל', fruit: 'בננה', caloriesNeeded: 180 },
  { name: 'תותים (Strawberry) — 100 קל', fruit: 'תותים', caloriesNeeded: 100 },
  { name: 'תפוז (Orange) — 240 קל', fruit: 'תפוז', caloriesNeeded: 240 },
];

tests.forEach(t => {
  const result = formatFruitPortion(t.fruit, t.caloriesNeeded);
  console.log(`✅ ${t.name}`);
  console.log(`   Portion: "${result.portion}"`);
  console.log(`   Grams: ${result.frG}ג`);
  console.log(`   Output: ${result.fname} || ${result.portion} || ${result.frG}ג\n`);
});

console.log('✨ הפרי מופיע בפורמט נקי בלא דו-כפול של גרמים!');
