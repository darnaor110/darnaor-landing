const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

const startMarker = '// ── WORKOUT PLAN ENGINE ──';
const endMarker   = '})(); // end workout plan engine IIFE';
const startIdx = html.indexOf(startMarker);
const endIdx   = html.indexOf(endMarker) + endMarker.length;

global.window = {};
const engineCode = html.slice(startIdx, endIdx);

try { eval(engineCode); } catch(e) { console.error('Error:', e.message); process.exit(1); }

const buildWorkoutPlan = global.window.buildWorkoutPlan;

console.log('\n=== CONSTRAINT 1: Time Budget ===');
const t1 = buildWorkoutPlan({
  gender: 'אישה', trainingLevel: 1, trainingDays: 1, sessionDuration: 45, supersets: 'לא',
  canPullup: 'לא', canDips: 'לא', canPushup: 'לא', workingWeights: {}, injuries: [], musclePriorities: {}
});
const ex1 = t1.days[0].exercises.length;
console.log(`45 min = 5 blocks max. Got ${ex1} exercises. ${ex1 <= 5 ? 'WORKS' : 'BROKEN'}`);

console.log('\n=== CONSTRAINT 2: Supersets (NO choice) ===');
const t2 = buildWorkoutPlan({
  gender: 'גבר', trainingLevel: 5, trainingDays: 2, sessionDuration: 60, supersets: 'לא',
  canPullup: 'כן', canDips: 'כן', canPushup: 'כן', workingWeights: { bench: 90, squat: 120 },
  injuries: [], musclePriorities: {}
});
console.log(`User said NO to supersets. Forced: ${t2.supersets}. ${!t2.supersets ? 'WORKS' : 'BROKEN'}`);

console.log('\n=== CONSTRAINT 3: Volume + Time ===');
const t3 = buildWorkoutPlan({
  gender: 'אישה', trainingLevel: 1, trainingDays: 1, sessionDuration: 45, supersets: 'לא',
  canPullup: 'לא', canDips: 'לא', canPushup: 'לא', workingWeights: {}, injuries: [],
  musclePriorities: { glute: 5 }
});
const gVol = t3.actualVol.glute || 0;
const hasD = t3.days.some(d => d.exercises.some(e => e.drop));
const has4 = t3.days.some(d => d.exercises.some(e => e.sets === 4));
console.log(`Glute min=16, got ${gVol}. Drops: ${hasD}, 4-sets: ${has4}. ${gVol >= 16 || hasD || has4 ? 'WORKS' : 'BROKEN'}`);

console.log('\n=== CONSTRAINT 4: Exercise Filters ===');
const t4 = buildWorkoutPlan({
  gender: 'גבר', trainingLevel: 2, trainingDays: 3, sessionDuration: 60, supersets: 'לא',
  canPullup: 'כן', canDips: 'לא', canPushup: 'כן', workingWeights: { bench: 50, squat: 70 },
  injuries: ['ברכיים'], musclePriorities: {}, gymEquipment: 'dumbbell'
});
let bad = false;
t4.days.forEach(d => d.exercises.forEach(e => {
  if (e.muscleId === 'quad' && e.ex.name === 'סקווט עם מוט') bad = true;
  if (!['משקולת','משקל גוף'].includes(e.ex.equipment)) bad = true;
}));
console.log(`Blocked squat or bad equipment appeared: ${bad ? 'BROKEN' : 'WORKS'}`);

console.log('\n=== CONSTRAINT 5: Drop Sets ===');
const t5 = buildWorkoutPlan({
  gender: 'גבר', trainingLevel: 2, trainingDays: 1, sessionDuration: 45, supersets: 'לא',
  canPullup: 'כן', canDips: 'לא', canPushup: 'כן', workingWeights: { bench: 50, squat: 70 },
  injuries: [], musclePriorities: { glute: 5, quad: 5 }
});
let drops = [];
t5.days.forEach(d => d.exercises.forEach(e => {
  if (e.drop) drops.push(e.ex.equipment);
}));
const allValid = drops.every(eq => ['כבל','מכונה','משקולת'].includes(eq));
console.log(`Drop sets: ${drops.length}. All cable/machine/dumbbell: ${allValid ? 'WORKS' : 'BROKEN'}`);
