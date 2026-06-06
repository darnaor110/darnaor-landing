// UNIFIED FOOD DATABASE - ALL CORRECTIONS APPLIED
// Format: { kcal_per_100g, prot_per_100g, unit_weight_g, unit_name }

const FOOD_DB = {
  // ────────────────────────────────────────────
  // FRUITS
  // ────────────────────────────────────────────
  blueberries: { kcal_per_100g: 57, prot_per_100g: 1.5, unit_weight_g: 2, unit_name: 'אוכמנייה' },
  strawberries: { kcal_per_100g: 32, prot_per_100g: 0.8, unit_weight_g: 15, unit_name: 'תות' },
  apple: { kcal_per_100g: 80, prot_per_100g: 0.3, unit_weight_g: 100, unit_name: 'יחידה' },
  orange: { kcal_per_100g: 80, prot_per_100g: 1, unit_weight_g: 100, unit_name: 'יחידה' },
  banana: { kcal_per_100g: 90, prot_per_100g: 1.1, unit_weight_g: 100, unit_name: 'יחידה' },
  grapes: { kcal_per_100g: 70, prot_per_100g: 0.7, unit_weight_g: 10, unit_name: 'יחידה' },
  melon: { kcal_per_100g: 35, prot_per_100g: 0.8, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  mango: { kcal_per_100g: 60, prot_per_100g: 0.8, unit_weight_g: 300, unit_name: 'מנגו שלם' },
  date: { kcal_per_100g: 280, prot_per_100g: 1.7, unit_weight_g: 30, unit_name: 'יחידה' },
  watermelon: { kcal_per_100g: 30, prot_per_100g: 0.6, unit_weight_g: 0, unit_name: 'גרמים' }, // no units

  // ────────────────────────────────────────────
  // CEREALS & GRAINS
  // ────────────────────────────────────────────
  prot_cer: { kcal_per_100g: 400, prot_per_100g: 13, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },
  gran_pro: { kcal_per_100g: 450, prot_per_100g: 12, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },
  fitness: { kcal_per_100g: 400, prot_per_100g: 10, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },
  classic: { kcal_per_100g: 440, prot_per_100g: 9, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },
  alufim: { kcal_per_100g: 400, prot_per_100g: 8, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },
  oats: { kcal_per_100g: 370, prot_per_100g: 11, unit_weight_g: 30, unit_name: 'כוס חד פעמית' },

  // ────────────────────────────────────────────
  // MILK & DAIRY
  // ────────────────────────────────────────────
  m1: { kcal_per_100g: 41, prot_per_100g: 3.5, unit_weight_g: 170, unit_name: 'כוס' },
  m2: { kcal_per_100g: 53, prot_per_100g: 3.5, unit_weight_g: 170, unit_name: 'כוס' },
  soy: { kcal_per_100g: 38, prot_per_100g: 2.4, unit_weight_g: 170, unit_name: 'כוס' },
  oat: { kcal_per_100g: 35, prot_per_100g: 0.6, unit_weight_g: 170, unit_name: 'כוס' },
  m3: { kcal_per_100g: 65, prot_per_100g: 3.5, unit_weight_g: 170, unit_name: 'כוס' },
  whey: { kcal_per_100g: 400, prot_per_100g: 80, unit_weight_g: 25, unit_name: 'כף' },

  // ────────────────────────────────────────────
  // BREADS & STARCHES
  // ────────────────────────────────────────────
  light: { kcal_per_100g: 150, prot_per_100g: 13, unit_weight_g: 30, unit_name: 'פרוסה' },
  pita99: { kcal_per_100g: 200, prot_per_100g: 8, unit_weight_g: 50, unit_name: 'יחידה' },
  whole: { kcal_per_100g: 200, prot_per_100g: 9, unit_weight_g: 36, unit_name: 'פרוסה' },
  white: { kcal_per_100g: 200, prot_per_100g: 7, unit_weight_g: 35, unit_name: 'פרוסה' },
  pita_w: { kcal_per_100g: 250, prot_per_100g: 7, unit_weight_g: 100, unit_name: 'יחידה' },
  roll: { kcal_per_100g: 275, prot_per_100g: 10, unit_weight_g: 100, unit_name: 'יחידה' },
  tortilla: { kcal_per_100g: 200, prot_per_100g: 6, unit_weight_g: 50, unit_name: 'יחידה' },

  // ────────────────────────────────────────────
  // PROTEINS
  // ────────────────────────────────────────────
  chicken: { kcal_per_100g: 170, prot_per_100g: 31, unit_weight_g: 60, unit_name: 'יחידה' },
  turkey: { kcal_per_100g: 160, prot_per_100g: 24, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  thigh: { kcal_per_100g: 200, prot_per_100g: 27, unit_weight_g: 100, unit_name: 'גרם' },
  shwarma: { kcal_per_100g: 200, prot_per_100g: 28, unit_weight_g: 80, unit_name: 'יחידה' },
  tuna: { kcal_per_100g: 110, prot_per_100g: 25, unit_weight_g: 100, unit_name: 'גרם' },
  white_fish: { kcal_per_100g: 150, prot_per_100g: 20, unit_weight_g: 150, unit_name: 'פילה' },
  salmon: { kcal_per_100g: 220, prot_per_100g: 20, unit_weight_g: 150, unit_name: 'פילה' },
  beef: { kcal_per_100g: 250, prot_per_100g: 26, unit_weight_g: 200, unit_name: 'מנת מסעדה' },
  minced: { kcal_per_100g: 220, prot_per_100g: 22, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  tofu: { kcal_per_100g: 200, prot_per_100g: 18, unit_weight_g: 300, unit_name: 'קופסא' },
  liver: { kcal_per_100g: 165, prot_per_100g: 27, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  tuna_o: { kcal_per_100g: 200, prot_per_100g: 23, unit_weight_g: 100, unit_name: 'גרם' },
  pastrama: { kcal_per_100g: 100, prot_per_100g: 11, unit_weight_g: 20, unit_name: 'פרוסה' },
  smoked_s: { kcal_per_100g: 160, prot_per_100g: 10, unit_weight_g: 100, unit_name: 'גרם' },
  egg: { kcal_per_100g: 150, prot_per_100g: 12, unit_weight_g: 70, unit_name: 'ביצה L' },
  cottage_salad: { kcal_per_100g: 110, prot_per_100g: 9, unit_weight_g: 250, unit_name: 'קופסא' },
  cottage_sandwich: { kcal_per_100g: 110, prot_per_100g: 9, unit_weight_g: 250, unit_name: 'קופסא' },

  // ────────────────────────────────────────────
  // CHEESES
  // ────────────────────────────────────────────
  ch9: { kcal_per_100g: 150, prot_per_100g: 20, unit_weight_g: 30, unit_name: 'פרוסה' },
  tsfarit: { kcal_per_100g: 220, prot_per_100g: 32, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  ch15: { kcal_per_100g: 260, prot_per_100g: 28, unit_weight_g: 25, unit_name: 'פרוסה' },
  ch22: { kcal_per_100g: 320, prot_per_100g: 25, unit_weight_g: 25, unit_name: 'פרוסה' },
  bulgarian: { kcal_per_100g: 200, prot_per_100g: 26, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  cheese9_salad: { kcal_per_100g: 150, prot_per_100g: 20, unit_weight_g: 30, unit_name: 'פרוסה' },
  white: { kcal_per_100g: 150, prot_per_100g: 14, unit_weight_g: 0, unit_name: 'גרמים' }, // no units

  // ────────────────────────────────────────────
  // CARBS & STARCHES (all with tablespoon units = 35g)
  // ────────────────────────────────────────────
  sweet_p: { kcal_per_100g: 90, prot_per_100g: 1.6, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  rice_w: { kcal_per_100g: 130, prot_per_100g: 2.7, unit_weight_g: 35, unit_name: 'כף' },
  potato: { kcal_per_100g: 80, prot_per_100g: 1.7, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  rice_b: { kcal_per_100g: 110, prot_per_100g: 2.6, unit_weight_g: 35, unit_name: 'כף' },
  pasta_w: { kcal_per_100g: 130, prot_per_100g: 5, unit_weight_g: 35, unit_name: 'כף' },
  pasta: { kcal_per_100g: 160, prot_per_100g: 5.3, unit_weight_g: 35, unit_name: 'כף' },
  cous: { kcal_per_100g: 112, prot_per_100g: 3.8, unit_weight_g: 35, unit_name: 'כף' },
  quinoa: { kcal_per_100g: 120, prot_per_100g: 4.4, unit_weight_g: 35, unit_name: 'כף' },
  buckwheat: { kcal_per_100g: 92, prot_per_100g: 3.4, unit_weight_g: 35, unit_name: 'כף' },
  lentils: { kcal_per_100g: 116, prot_per_100g: 9, unit_weight_g: 35, unit_name: 'כף' },
  beans: { kcal_per_100g: 127, prot_per_100g: 9, unit_weight_g: 35, unit_name: 'כף' },
  beans_red: { kcal_per_100g: 127, prot_per_100g: 9, unit_weight_g: 35, unit_name: 'כף' }, // NEW

  // ────────────────────────────────────────────
  // SAUCES & CONDIMENTS (all tablespoon = 15g)
  // ────────────────────────────────────────────
  tomato: { kcal_per_100g: 17, prot_per_100g: 1, unit_weight_g: 15, unit_name: 'כף' },
  chili: { kcal_per_100g: 40, prot_per_100g: 2, unit_weight_g: 15, unit_name: 'כף' },
  mustard: { kcal_per_100g: 50, prot_per_100g: 1, unit_weight_g: 15, unit_name: 'כף' },
  teriyaki: { kcal_per_100g: 75, prot_per_100g: 4, unit_weight_g: 15, unit_name: 'כף' },
  ketchup: { kcal_per_100g: 100, prot_per_100g: 1.7, unit_weight_g: 15, unit_name: 'כף' },
  pesto: { kcal_per_100g: 300, prot_per_100g: 7, unit_weight_g: 15, unit_name: 'כף' },
  mayo: { kcal_per_100g: 680, prot_per_100g: 0, unit_weight_g: 15, unit_name: 'כף' },
  tehina: { kcal_per_100g: 300, prot_per_100g: 9, unit_weight_g: 15, unit_name: 'כף' },
  olive: { kcal_per_100g: 884, prot_per_100g: 0, unit_weight_g: 15, unit_name: 'כף' },
  garlic: { kcal_per_100g: 50, prot_per_100g: 1, unit_weight_g: 15, unit_name: 'כף' },
  balsamic: { kcal_per_100g: 30, prot_per_100g: 0, unit_weight_g: 15, unit_name: 'כף' },
  soy: { kcal_per_100g: 20, prot_per_100g: 2, unit_weight_g: 15, unit_name: 'כף' },
  jam: { kcal_per_100g: 100, prot_per_100g: 0, unit_weight_g: 15, unit_name: 'כף' },

  // ────────────────────────────────────────────
  // VEGETABLES
  // ────────────────────────────────────────────
  small: { kcal_per_100g: 30, prot_per_100g: 1, unit_weight_g: 300, unit_name: 'סלט קטן' },
  large: { kcal_per_100g: 30, prot_per_100g: 1, unit_weight_g: 600, unit_name: 'סלט גדול' },
  inside: { kcal_per_100g: 30, prot_per_100g: 1, unit_weight_g: 50, unit_name: 'גרם' },
  antipasti: { kcal_per_100g: 60, prot_per_100g: 2, unit_weight_g: 0, unit_name: 'גרמים' }, // no units

  // ────────────────────────────────────────────
  // SNACKS & BARS
  // ────────────────────────────────────────────
  edamame: { kcal_per_100g: 120, prot_per_100g: 11, unit_weight_g: 0, unit_name: 'גרמים' }, // no units
  popcorn: { kcal_per_100g: 320, prot_per_100g: 8, unit_weight_g: 85, unit_name: 'יחידה' },
  kasta: { kcal_per_100g: 170, prot_per_100g: 1, unit_weight_g: 34, unit_name: 'יחידה' },
  kartiv: { kcal_per_100g: 170, prot_per_100g: 1, unit_weight_g: 34, unit_name: 'יחידה' },
  choc: { kcal_per_100g: 500, prot_per_100g: 4, unit_weight_g: 4, unit_name: 'קוביה' },
  marshmallow: { kcal_per_100g: 320, prot_per_100g: 1, unit_weight_g: 3, unit_name: 'מרשמלו' },
  lollipop: { kcal_per_100g: 300, prot_per_100g: 0, unit_weight_g: 10, unit_name: 'סוכריה על מקל' },
  pesek: { kcal_per_100g: 550, prot_per_100g: 4, unit_weight_g: 20, unit_name: 'יחידה' },
  myprotein: { kcal_per_100g: 362, prot_per_100g: 20, unit_weight_g: 60, unit_name: 'בר' },
  today: { kcal_per_100g: 334, prot_per_100g: 20, unit_weight_g: 60, unit_name: 'בר' },
  allin: { kcal_per_100g: 358, prot_per_100g: 20, unit_weight_g: 60, unit_name: 'בר' },

  // ────────────────────────────────────────────
  // COTTAGE SIDES
  // ────────────────────────────────────────────
  prot_chips: { kcal_per_100g: 550, prot_per_100g: 10, unit_weight_g: 0, unit_name: 'שקית' }, // bag unit
  fit_cracks: { kcal_per_100g: 495, prot_per_100g: 5, unit_weight_g: 4, unit_name: 'יחידה' },
  crackers: { kcal_per_100g: 400, prot_per_100g: 2, unit_weight_g: 6, unit_name: 'יחידה' }
};

// Export for use in HTML
if (typeof window !== 'undefined') {
  window.FOOD_DB = FOOD_DB;
}
