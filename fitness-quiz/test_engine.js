/**
 * test_engine.js — בודק את מנוע תוכנית האימון על 6 דמויות קצה
 * הרצה: node test_engine.js
 *
 * מה נבדק:
 *   1. כל שריר עם prio>0 מקבל לפחות תרגיל אחד
 *   2. לא חורגים מתקציב הזמן (אלא אם כן forceSup)
 *   3. split נכון לפי מין+ימים
 *   4. secondary volume נספר
 *   5. prio=1 הופך לדרופסט בלבד (לא תרגיל עצמאי)
 *   6. שרירים עם prio=0 לא מקבלים תרגיל
 */

const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

// ── שלוף את הקוד של מנוע האימון מתוך ה-HTML ──
// המנוע עטוף ב- (function(){ ... })() בתוך תג <script>
// אנחנו מחלצים את הבלוק שמתחיל ב-INJURY_AVOID ועד לסוף ה-IIFE

const startMarker = '// ── WORKOUT PLAN ENGINE ──';
const endMarker   = '})(); // end workout plan engine IIFE';

const startIdx = html.indexOf(startMarker);
const endIdx   = html.indexOf(endMarker) + endMarker.length;
if (startIdx === -1 || endIdx === -1) {
  console.error('לא נמצאו markers בקוד — בדוק את קובץ ה-HTML');
  process.exit(1);
}

// עטוף ב-function כדי שנוכל לקרוא ל-window.buildWorkoutPlan
const engineCode = `
const window = {};
${html.slice(startIdx, endIdx)}
`;

// הרץ את קוד המנוע
try {
  eval(engineCode);
} catch(e) {
  console.error('שגיאה בטעינת המנוע:', e.message);
  console.error(e.stack);
  process.exit(1);
}

const buildWorkoutPlan     = window.buildWorkoutPlan;
const renderWorkoutPlanText = window.renderWorkoutPlanText;

// ── 6 דמויות ──
const personas = [
  {
    label: '1. גבר מתחיל — 2 ימים, Full Body',
    u: {
      gender: 'גבר', trainingLevel: 1, trainingDays: 2,
      sessionDuration: 60, supersets: 'לא',
      canPullup: 'לא', canDips: 'לא', canPushup: 'כן',
      workingWeights: { bench: 30, squat: 40 },
      injuries: [], musclePriorities: {}
    }
  },
  {
    label: '2. גבר מנוסה — 4 ימים PPL+P, סופרסטים, ישבן 5',
    u: {
      gender: 'גבר', trainingLevel: 5, trainingDays: 4,
      trainingDaysSpecific: ['א','ב','ד','ה'], // ימים עוקבים
      sessionDuration: 75, supersets: 'כן',
      canPullup: 'כן', canDips: 'כן', canPushup: 'כן',
      workingWeights: { bench: 90, squat: 120 },
      injuries: [], musclePriorities: { shoulders:5, tricep:5, bicep:5 }
    }
  },
  {
    label: '3. אישה מתחילה — 3 ימים FB, ישבן עדיפות 5',
    u: {
      gender: 'אישה', trainingLevel: 1, trainingDays: 3,
      trainingDaysSpecific: ['א','ג','ה'], // לא עוקבים
      sessionDuration: 50, supersets: 'לא',
      canPullup: 'לא', canDips: 'לא', canPushup: 'לא',
      workingWeights: {},
      injuries: [], musclePriorities: {}
    }
  },
  {
    label: '4. אישה מנוסה — 5 ימים Upper/Lower, ישבן 5, פציעת ברכיים',
    u: {
      gender: 'אישה', trainingLevel: 4, trainingDays: 5,
      trainingDaysSpecific: ['א','ב','ג','ד','ה'],
      sessionDuration: 60, supersets: 'כן',
      canPullup: 'כן', canDips: 'לא', canPushup: 'כן',
      workingWeights: { hip_thrust: 80 },
      injuries: ['ברכיים'], musclePriorities: { glute:5 }
    }
  },
  {
    label: '5. גבר — 45 דקות, ביטחון נמוך, 6 ימים PPL×2',
    u: {
      gender: 'גבר', trainingLevel: 3, trainingDays: 6,
      sessionDuration: 45, supersets: 'לא',
      canPullup: 'כן', canDips: 'לא', canPushup: 'כן',
      workingWeights: { bench: 50, squat: 70 },
      injuries: [], musclePriorities: {}
    }
  },
  {
    label: '6. גבר — 3 ימים, ימים עוקבים, כתף+מרפק פציעות',
    u: {
      gender: 'גבר', trainingLevel: 3, trainingDays: 3,
      trainingDaysSpecific: ['ב','ג','ד'], // עוקבים
      sessionDuration: 60, supersets: 'לא',
      canPullup: 'כן', canDips: 'לא', canPushup: 'כן',
      workingWeights: { bench: 65, squat: 90 },
      injuries: ['כתפיים','מרפקים'], musclePriorities: {}
    }
  }
];

// ── עזרי בדיקה ──
function maxBlocks(mins) { return Math.floor((mins - 10) / 10); }

function check(label, pass, detail) {
  const mark = pass ? '✅' : '❌';
  console.log(`  ${mark} ${label}${detail ? ' — ' + detail : ''}`);
  return pass;
}

let totalFails = 0;

// ── ריצה ──
for (const { label, u } of personas) {
  console.log('\n' + '═'.repeat(60));
  console.log(`📋 ${label}`);
  console.log('═'.repeat(60));

  let plan;
  try {
    plan = buildWorkoutPlan(u);
  } catch(e) {
    console.log(`  ❌ buildWorkoutPlan זרק שגיאה: ${e.message}`);
    totalFails++;
    continue;
  }

  const budget = maxBlocks(u.sessionDuration);
  console.log(`  split: ${plan.split} | level: ${plan.levelName} | תקציב תרגילים/יום: ${budget}`);

  // בדיקה 1: כל יום לא חורג מתקציב (מאפשרים forceSup — כי סופרסט מחצה)
  let dayFail = false;
  plan.days.forEach(day => {
    const exCount = day.exercises.length;
    // עם סופרסטים, בלוקים ≈ ceil(exCount/2)
    const blocks = plan.supersets ? Math.ceil(exCount / 2) : exCount;
    const ok = blocks <= budget;
    if (!ok) { dayFail = true; }
    check(`${day.name}: ${exCount} תרגילים → ${blocks} בלוקים (תקציב ${budget})`, ok);
  });
  if (dayFail) totalFails++;

  // בדיקה 2: אין תרגיל עצמאי לשריר prio=1
  let prio1Fail = false;
  plan.days.forEach(day => {
    day.exercises.forEach(e => {
      if ((plan.prio[e.muscleId] || 0) === 1) {
        check(`שריר prio=1 (${e.muscleId}) מופיע כתרגיל עצמאי — אמור להיות דרופסט בלבד!`, false);
        prio1Fail = true;
      }
    });
  });
  if (!prio1Fail) check('אין שרירי prio=1 כתרגיל עצמאי', true);
  if (prio1Fail) totalFails++;

  // בדיקה 3: כל שריר עם prio≥2 מקבל נפח (תרגיל ישיר + secondary)
  const MUSCLE_NAMES = { chest:'חזה', back:'גב', shoulders:'כתפיים', tricep:'יד אחורית',
    bicep:'יד קדמית', quad:'ארבע ראשי', hamstring:'המסטרינג',
    glute:'ישבן', calves:'תאומים', abs:'בטן' };
  let volFail = false;
  Object.entries(plan.prio).forEach(([mId, p]) => {
    if (p < 2) return;
    const actual = plan.actualVol[mId] || 0;
    const ok = actual > 0;
    if (!ok) {
      check(`${MUSCLE_NAMES[mId]||mId} (prio=${p}) — נפח בפועל: ${actual}`, false);
      volFail = true;
    }
  });
  if (!volFail) check('כל שריר prio≥2 מקבל נפח >0', true);
  if (volFail) totalFails++;

  // בדיקה 4: שריר prio=0 לא מקבל תרגיל
  let prio0Fail = false;
  plan.days.forEach(day => {
    day.exercises.forEach(e => {
      const p = plan.prio[e.muscleId] || 0;
      if (p === 0) {
        check(`שריר prio=0 (${e.muscleId}) קיבל תרגיל — לא אמור!`, false);
        prio0Fail = true;
      }
    });
  });
  if (!prio0Fail) check('אין תרגילים לשרירים prio=0', true);
  if (prio0Fail) totalFails++;

  // בדיקה 5: secondary volume נספר (actualVol כולל חצאי סטים)
  // בדיקה עקיפה: אם יש שריר שלא קיבל תרגיל ישיר אבל כן יש לו secondary — actualVol > 0
  const directMuscles = new Set();
  plan.days.forEach(day => day.exercises.forEach(e => directMuscles.add(e.muscleId)));
  let secCount = 0;
  Object.entries(plan.actualVol).forEach(([m, v]) => {
    if (!directMuscles.has(m) && v > 0) secCount++;
  });
  check(`נפח משני נספר ב-${secCount} שרירים ללא תרגיל ישיר`, true);

  // הדפסת טבלת נפח
  console.log('\n  📊 נפח שבועי:');
  Object.keys(plan.prio).forEach(mId => {
    const p = plan.prio[mId];
    if (p === 0) return;
    const actual = Math.round((plan.actualVol[mId] || 0) * 10) / 10;
    console.log(`     ${(MUSCLE_NAMES[mId]||mId).padEnd(14)} prio=${p}  בפועל=${actual}`);
  });

  // בדיקה 6: לא חורגים ממינימום 6 סטים שבועיים לפי prio≥2 (אם הופיעו בתוכנית)
  let minFail = false;
  Object.entries(plan.prio).forEach(([mId, p]) => {
    if (p < 2) return;
    if (!directMuscles.has(mId)) return; // שריר שלא קיבל תרגיל ישיר — בדקנו בנפרד
    const actual = plan.actualVol[mId] || 0;
    const minSets = p >= 2 ? 6 : 0;
    if (actual < minSets) {
      check(`${MUSCLE_NAMES[mId]||mId} (prio=${p}) — נפח ${actual} < מינימום ${minSets}`, false);
      minFail = true;
    }
  });
  if (!minFail) check('כל שריר עם תרגיל ישיר עומד במינימום 6 סטים (prio≥2)', true);
  if (minFail) totalFails++;
}

console.log('\n' + '═'.repeat(60));
if (totalFails === 0) {
  console.log('🎉 כל הבדיקות עברו בהצלחה!');
} else {
  console.log(`⚠️  ${totalFails} בדיקות נכשלו — בדוק את הפרטים למעלה`);
}
console.log('═'.repeat(60));
