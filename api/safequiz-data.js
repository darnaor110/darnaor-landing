export default async function handler(req, res) {
  // Protected data for SafeQuiz — all calculations moved server-side

  const BF_LEVELS_MALE = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51];
  const BF_LEVELS_FEMALE = [15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57];

  const MEAL_TIMES = [
    { id:'בוקר',             label:'בוקר',             hint:'07:00–09:00', icons:{S:'☕',          M:'☕ 🥛',       L:'☕ 🥛 🍳'} },
    { id:'בין_בוקר_לצהריים', label:'בין בוקר לצהריים', hint:'10:00–11:00', icons:{S:'🍎',          M:'🍎 🥛',       L:'🍎 🥛 🥪'} },
    { id:'צהריים',           label:'צהריים',           hint:'12:00–14:00', icons:{S:'🥗',          M:'🍗 🥗',       L:'🍗 🥗 🍚'} },
    { id:'בין_צהריים_לערב',  label:'בין צהריים לערב',  hint:'15:00–17:00', icons:{S:'🍓',          M:'🍓 🥛',       L:'🍓 🥛 🥪'} },
    { id:'ערב',              label:'ערב',              hint:'18:00–20:00', icons:{S:'🥚',          M:'🥚 🥗',       L:'🥚 🥗 🍞'} },
    { id:'לילה',             label:'לילה',             hint:'21:00+',      icons:{S:'🥛',          M:'🥛 🍪',       L:'🥛 🍪 🧀'} }
  ];

  const MEAL_TYPES = {
    'בוקר':              [{id:'yogurt',lbl:'יוגורט'},{id:'cereals',lbl:'קורנפלקס'},{id:'toast',lbl:'טוסטים'},{id:'eggs',lbl:'ביצים'},{id:'shake',lbl:'שייק חלבון'},{id:'snack',lbl:'נשנוש'}],
    'בין_בוקר_לצהריים':  [{id:'fruit',lbl:'פרי'},{id:'yogurt',lbl:'יוגורט'},{id:'bar',lbl:'חטיף חלבון'},{id:'cottage',lbl:"קוטג'"},{id:'salad_snack',lbl:'סלט'},{id:'snack',lbl:'נשנוש'}],
    'צהריים':            [{id:'hot',lbl:'ארוחה חמה'},{id:'sandwich',lbl:'סנדוויץ / פיתה'},{id:'salad',lbl:'סלט + חלבון'}],
    'בין_צהריים_לערב':   [{id:'fruit',lbl:'פרי'},{id:'yogurt',lbl:'יוגורט'},{id:'bar',lbl:'חטיף חלבון'},{id:'cottage',lbl:"קוטג'"},{id:'salad_snack',lbl:'סלט'},{id:'snack',lbl:'נשנוש'}],
    'ערב':               [{id:'yogurt',lbl:'יוגורט'},{id:'cereals',lbl:'קורנפלקס'},{id:'toast',lbl:'טוסטים'},{id:'eggs',lbl:'ביצים'},{id:'salad',lbl:'סלט + גבינות'},{id:'hot',lbl:'ארוחה חמה'}],
    'לילה':              [{id:'yogurt',lbl:'יוגורט'},{id:'cottage',lbl:"קוטג'"},{id:'bar',lbl:'חטיף חלבון'},{id:'fruit',lbl:'פרי'},{id:'salad_snack',lbl:'סלט'},{id:'snack',lbl:'נשנוש'}]
  };

  const data = {
    BF_LEVELS_MALE,
    BF_LEVELS_FEMALE,
    MEAL_TIMES,
    MEAL_TYPES,
    timestamp: Date.now()
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json(data);
}
