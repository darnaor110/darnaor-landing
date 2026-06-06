/**
 * test_split.js — בדיקה פשוטה של לוגיקת בחירת ספליט
 * הרצה: node test_split.js
 */

// ── הגדרות ──
const DAY_IDX = {'א':0,'ב':1,'ג':2,'ד':3,'ה':4,'ו':5,'ש':6};

function hasConsecutiveDays(u) {
  const days = (u.trainingDaysSpecific || []).map(l => DAY_IDX[l] ?? Number(l)).sort((a,b)=>a-b);
  for (let i = 1; i < days.length; i++) if (days[i] - days[i-1] === 1) return true;
  return false;
}

function getSplit(u, level, prio) {
  const days   = Math.max(1, u.trainingDays || 3);
  const isMale = u.gender === 'גבר';

  if (days <= 2) return 'fullbody';
  if (days === 3) {
    // 3 ימים: ab_fb רק אם יש ימים צמודים, אחרת fullbody בגלל הפיזור
    return hasConsecutiveDays(u) ? 'ab_fb' : 'fullbody';
  }
  if (days === 4) return isMale ? 'ab4' : 'upper_lower4';
  if (days === 5) {
    if (!isMale) return 'upper_lower5';
    // גבר 5 ימים: PPL אם הרגליים בעדיפות נמוכה, אחרת A/B לסירוגין
    const legsPrio = Math.max(prio['quad']||0, prio['hamstring']||0, prio['glute']||0);
    return legsPrio <= 2 ? 'ppl5' : 'ab5';
  }
  return isMale ? 'ab6' : 'upper_lower6';
}

// ── בדיקות ──
const tests = [
  {
    name: '3 ימים לא עוקבים (א,ג,ה) — אישה → fullbody',
    u: { gender: 'אישה', trainingDays: 3, trainingDaysSpecific: ['א','ג','ה'] },
    expected: 'fullbody'
  },
  {
    name: '3 ימים עוקבים (א,ב,ג) — אישה → ab_fb',
    u: { gender: 'אישה', trainingDays: 3, trainingDaysSpecific: ['א','ב','ג'] },
    expected: 'ab_fb'
  },
  {
    name: '3 ימים עוקבים חלקית (א,ב,ד) — אישה → ab_fb (יש א-ב)',
    u: { gender: 'אישה', trainingDays: 3, trainingDaysSpecific: ['א','ב','ד'] },
    expected: 'ab_fb'
  },
  {
    name: '1 יום → fullbody',
    u: { gender: 'אישה', trainingDays: 1 },
    expected: 'fullbody'
  },
  {
    name: '2 ימים → fullbody',
    u: { gender: 'אישה', trainingDays: 2 },
    expected: 'fullbody'
  },
  {
    name: '4 ימים — אישה → upper_lower4',
    u: { gender: 'אישה', trainingDays: 4 },
    expected: 'upper_lower4'
  },
  {
    name: '4 ימים — גבר → ab4',
    u: { gender: 'גבר', trainingDays: 4 },
    expected: 'ab4'
  },
  {
    name: '5 ימים — אישה → upper_lower5',
    u: { gender: 'אישה', trainingDays: 5 },
    expected: 'upper_lower5'
  },
  {
    name: '6 ימים — אישה → upper_lower6',
    u: { gender: 'אישה', trainingDays: 6 },
    expected: 'upper_lower6'
  }
];

console.log('🧪 בדיקת לוגיקת בחירת ספליט\n');

let passed = 0;
let failed = 0;

tests.forEach(test => {
  const result = getSplit(test.u, 0, {});
  const pass = result === test.expected;

  if (pass) {
    console.log(`✅ ${test.name}`);
    console.log(`   תוצאה: ${result}`);
    passed++;
  } else {
    console.log(`❌ ${test.name}`);
    console.log(`   צפוי: ${test.expected}, קיבלנו: ${result}`);
    failed++;
  }
  console.log('');
});

console.log(`\n📊 סיכום: ${passed} הצליחו, ${failed} נכשלו`);
process.exit(failed > 0 ? 1 : 0);
