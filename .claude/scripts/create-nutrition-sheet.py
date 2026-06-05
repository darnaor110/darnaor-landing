#!/usr/bin/env python3
"""
Create Google Sheet for fitness quiz nutrition data
Structures: Meal Times → Meal Types → Components → Options
"""

import json
import sys
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

# Load service account
with open('./.claude/service-account-key.json') as f:
    creds_data = json.load(f)

creds = Credentials.from_service_account_info(creds_data, scopes=['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'])
sheets_service = build('sheets', 'v4', credentials=creds)
drive_service = build('drive', 'v3', credentials=creds)

# Create new spreadsheet
spreadsheet = {
    'properties': {
        'title': 'Fitness Quiz - Nutrition Database'
    }
}

result = sheets_service.spreadsheets().create(body=spreadsheet).execute()
sheet_id = result['spreadId']
print(f"✓ Created sheet: {sheet_id}")
print(f"📊 Link: https://docs.google.com/spreadsheets/d/{sheet_id}/edit")

# ==================== MEAL TIMES ====================
meal_times_data = [
    ['ID', 'שם', 'סדר'],
    ['breakfast', 'בוקר', 1],
    ['mid_morning', 'בין בוקר לצהריים', 2],
    ['lunch', 'צהריים', 3],
    ['afternoon', 'בין צהריים לערב', 4],
    ['evening', 'ערב', 5],
    ['night', 'לילה', 6]
]

# ==================== MEAL TYPES ====================
meal_types_data = [
    ['ID', 'Meal Time ID', 'שם', 'סדר'],
    # breakfast
    ['yogurt', 'breakfast', 'יוגורט', 1],
    ['cereals', 'breakfast', 'קורנפלקס', 2],
    ['toast', 'breakfast', 'טוסטים', 3],
    ['eggs', 'breakfast', 'ביצים', 4],
    ['shake', 'breakfast', 'שייק חלבון', 5],
    ['snack', 'breakfast', 'נשנוש', 6],
    # mid_morning
    ['fruit', 'mid_morning', 'פרי', 1],
    ['yogurt', 'mid_morning', 'יוגורט', 2],
    ['bar', 'mid_morning', 'חטיף חלבון', 3],
    ['cottage', 'mid_morning', 'קוטג', 4],
    ['salad_snack', 'mid_morning', 'סלט', 5],
    ['snack', 'mid_morning', 'נשנוש', 6],
    # lunch
    ['hot', 'lunch', 'ארוחה חמה', 1],
    ['sandwich', 'lunch', 'סנדוויץ / פיתה', 2],
    ['salad', 'lunch', 'סלט + חלבון', 3],
    # afternoon
    ['fruit', 'afternoon', 'פרי', 1],
    ['yogurt', 'afternoon', 'יוגורט', 2],
    ['bar', 'afternoon', 'חטיף חלבון', 3],
    ['cottage', 'afternoon', 'קוטג', 4],
    ['salad_snack', 'afternoon', 'סלט', 5],
    ['snack', 'afternoon', 'נשנוש', 6],
    # evening
    ['yogurt', 'evening', 'יוגורט', 1],
    ['cereals', 'evening', 'קורנפלקס', 2],
    ['toast', 'evening', 'טוסטים', 3],
    ['eggs', 'evening', 'ביצים', 4],
    ['salad', 'evening', 'סלט + גבינות', 5],
    ['hot', 'evening', 'ארוחה חמה', 6],
    # night
    ['yogurt', 'night', 'יוגורט', 1],
    ['cottage', 'night', 'קוטג', 2],
    ['bar', 'night', 'חטיף חלבון', 3],
    ['fruit', 'night', 'פרי', 4],
    ['salad_snack', 'night', 'סלט', 5],
    ['snack', 'night', 'נשנוש', 6]
]

# ==================== COMPONENTS ====================
components_data = [
    ['ID', 'Meal Type ID', 'שם', 'Multi-Select', 'סדר'],
    # yogurt
    ['yogurt_type', 'yogurt', 'סוג יוגורט', 'TRUE', 1],
    ['yogurt_fruit', 'yogurt', 'פרי', 'TRUE', 2],
    ['yogurt_cereal', 'yogurt', 'דגנים', 'TRUE', 3],
    # cereals
    ['cereals_cereal', 'cereals', 'סוג קורנפלקס', 'TRUE', 1],
    ['cereals_milk', 'cereals', 'חלב', 'TRUE', 2],
    ['cereals_powder', 'cereals', 'אבקת חלבון', 'TRUE', 3],
    # toast
    ['toast_bread', 'toast', 'לחם', 'TRUE', 1],
    ['toast_cheese', 'toast', 'גבינה', 'TRUE', 2],
    ['toast_sauce', 'toast', 'רוטב', 'TRUE', 3],
    ['toast_extras', 'toast', 'ירקות', 'FALSE', 4],
    # eggs
    ['eggs_bread', 'eggs', 'לחם', 'TRUE', 1],
    ['eggs_cheese', 'eggs', 'גבינות', 'TRUE', 2],
    ['eggs_salad', 'eggs', 'סלט', 'FALSE', 3],
    # hot
    ['hot_protein', 'hot', 'חלבון', 'TRUE', 1],
    ['hot_carb', 'hot', 'פחמימה', 'TRUE', 2],
    ['hot_veg', 'hot', 'ירקות', 'TRUE', 3],
    # salad
    ['salad_protein', 'salad', 'חלבון', 'TRUE', 1],
    ['salad_cheese', 'salad', 'גבינה', 'TRUE', 2],
    ['salad_dressing', 'salad', 'רוטב', 'TRUE', 3],
    ['salad_base', 'salad', 'ירקות', 'FALSE', 4],
    # sandwich
    ['sandwich_bread', 'sandwich', 'לחם / פיתה', 'TRUE', 1],
    ['sandwich_protein', 'sandwich', 'חלבון', 'TRUE', 2],
    ['sandwich_veg', 'sandwich', 'ירקות', 'FALSE', 3],
    ['sandwich_sauce', 'sandwich', 'רוטב', 'TRUE', 4],
    # shake
    ['shake_milk', 'shake', 'חלב', 'TRUE', 1],
    ['shake_powder', 'shake', 'אבקת חלבון', 'TRUE', 2],
    ['shake_fruit', 'shake', 'פרי', 'TRUE', 3],
    ['shake_extras', 'shake', 'תוספות', 'TRUE', 4],
    # fruit
    ['fruit_fruit', 'fruit', 'בחר פרי', 'TRUE', 1],
    # bar
    ['bar_brand', 'bar', 'בחר חטיף', 'FALSE', 1],
    # cottage
    ['cottage_type', 'cottage', "בחר קוטג'", 'FALSE', 1],
    ['cottage_side', 'cottage', 'תוספת', 'TRUE', 2],
    # salad_snack
    ['salad_snack_protein', 'salad_snack', 'תוספת חלבון', 'TRUE', 1],
    # snack
    ['snack_items', 'snack', 'בחר נשנושים', 'TRUE', 1]
]

# ==================== OPTIONS (All nutrition data) ====================
options_data = [
    ['ID', 'Component ID', 'שם', 'kcal/100g', 'חלבון/100g', 'הגדרת יחידה', 'משקל יחידה (g)'],

    # yogurt - type
    ['yogurt_pro', 'yogurt_type', 'יוגורט חלבון 0%', 55, 10, '1 קופסה', 200],
    ['yogurt_madaan', 'yogurt_type', 'מעדן חלבון', 100, 10, '1 קופסה', 150],

    # yogurt - fruit
    ['fruit_berries', 'yogurt_fruit', '10 יחידות פירות יער', 80, 2, '10 יחידות', 50],
    ['fruit_apple', 'yogurt_fruit', '1 תפוח', 42, 0, '1 תפוח', 180],
    ['fruit_banana', 'yogurt_fruit', '1 בננה', 75, 1, '1 בננה', 120],
    ['fruit_grapes', 'yogurt_fruit', '1 ענבים', 67, 1, '1 אשכול', 150],
    ['fruit_mango', 'yogurt_fruit', '0.5 מנגו', 100, 1, 'חצי מנגו', 100],
    ['fruit_date', 'yogurt_fruit', '2-3 תמר', 267, 0, '2-3 יחידות', 30],

    # yogurt - cereal
    ['cereal_prot', 'yogurt_cereal', 'קורנפלקס חלבון', 388, 25, '40g', 40],
    ['cereal_gran_pro', 'yogurt_cereal', 'גרנולה חלבון', 400, 27, '45g', 45],
    ['cereal_fitness', 'yogurt_cereal', 'קורנפלקס פיטנס', 388, 10, '40g', 40],
    ['cereal_classic', 'yogurt_cereal', 'גרנולה קלאסית', 440, 10, '50g', 50],
    ['cereal_alufim', 'yogurt_cereal', 'קורנפלקס אלופים', 425, 8, '40g', 40],

    # cereals - cereal
    ['cer_prot', 'cereals_cereal', 'קורנפלקס חלבון', 388, 25, '40g', 40],
    ['cer_fitness', 'cereals_cereal', 'קורנפלקס פיטנס', 388, 10, '40g', 40],
    ['cer_alufim', 'cereals_cereal', 'קורנפלקס אלופים', 425, 8, '40g', 40],
    ['cer_oats', 'cereals_cereal', 'שיבולת שועל', 350, 13, '60g', 60],

    # cereals - milk
    ['milk_1', 'cereals_milk', 'חלב 1%', 35, 3, 'כוס', 200],
    ['milk_2', 'cereals_milk', 'חלב 2%', 45, 3, 'כוס', 200],
    ['milk_soy', 'cereals_milk', 'חלב סויה', 33, 2, 'כוס', 200],
    ['milk_oat', 'cereals_milk', 'חלב שיבולת שועל', 30, 0.5, 'כוס', 200],
    ['milk_3', 'cereals_milk', 'חלב 3%', 55, 3, 'כוס', 200],

    # cereals - powder
    ['powder_whey', 'cereals_powder', 'אבקת חלבון', 400, 80, '20g', 20],

    # toast - bread
    ['bread_light', 'toast_bread', 'לחם קל', 150, 13, '1 פרוסה', 30],
    ['bread_pita99', 'toast_bread', 'פיתה 99', 132, 5, '1 פיתה', 75],
    ['bread_whole', 'toast_bread', 'לחם מלא', 209, 9, '1 פרוסה', 35],
    ['bread_white', 'toast_bread', 'לחם לבן', 233, 7, '1 פרוסה', 30],
    ['bread_pita_w', 'toast_bread', 'פיתה לבנה', 179, 6, '1 פיתה', 140],
    ['bread_roll', 'toast_bread', 'לחמניה', 280, 10, '1 לחמניה', 50],

    # toast - cheese
    ['cheese_9', 'toast_cheese', 'גבינה צהובה 9%', 300, 40, '15g', 15],
    ['cheese_tsfarit', 'toast_cheese', 'צפתית', 367, 53, '30g', 30],
    ['cheese_hemed', 'toast_cheese', 'חמד / טל', 275, 35, '20g', 20],
    ['cheese_15', 'toast_cheese', 'גבינה צהובה 15%', 371, 40, '17.5g', 17.5],
    ['cheese_22', 'toast_cheese', 'גבינה צהובה 22%', 457, 34, '17.5g', 17.5],

    # toast - sauce
    ['sauce_tomato', 'toast_sauce', 'רוטב עגבניות', 100, 0, '1 כף (15g)', 15],
    ['sauce_chili', 'toast_sauce', 'רוטב צילי דל', 133, 0, '1 כף (15g)', 15],
    ['sauce_mustard', 'toast_sauce', 'חרדל ודבש לייט', 167, 0, '1 כף (15g)', 15],
    ['sauce_teriyaki', 'toast_sauce', 'טריאקי', 200, 0, '1 כף (15g)', 15],
    ['sauce_ketchup', 'toast_sauce', 'קטשופ', 200, 0, '1 כף (15g)', 15],
    ['sauce_pesto', 'toast_sauce', 'פסטו', 533, 7, '1 כף (15g)', 15],
    ['sauce_mayo', 'toast_sauce', 'מיוקל / מיונז', 533, 0, '1 כף (15g)', 15],

    # toast - extras (no nutritional value)
    ['extras_small', 'toast_extras', 'סלט קטן', 25, 1, '3 ירקות', 80],
    ['extras_large', 'toast_extras', 'סלט גדול', 25, 1, '6 ירקות', 150],

    # eggs (same bread/cheese as toast)
    ['eggs_qty', 'eggs_bread', '2 ביצים', 155, 13, '2 ביצים', 100],

    # hot - protein
    ['hot_chicken', 'hot_protein', 'חזה עוף', 175, 31, '100g', 100],
    ['hot_turkey', 'hot_protein', 'הודו טחון', 160, 24, '100g', 100],
    ['hot_thigh', 'hot_protein', 'פרגית', 200, 27, '100g', 100],
    ['hot_shwarma', 'hot_protein', 'שוק עוף', 185, 28, '100g', 100],
    ['hot_tuna', 'hot_protein', 'טונה במים', 110, 25, '100g', 100],
    ['hot_fish', 'hot_protein', 'דגים לבנים', 90, 18, '100g', 100],
    ['hot_salmon', 'hot_protein', 'סלמון', 220, 20, '100g', 100],
    ['hot_beef', 'hot_protein', 'סטייק', 220, 26, '100g', 100],
    ['hot_minced', 'hot_protein', 'בקר טחון 10%', 220, 22, '100g', 100],
    ['hot_tofu', 'hot_protein', 'טופו', 200, 18, '100g', 100],
    ['hot_meat_sub', 'hot_protein', 'תחליפי בשר', 200, 20, '100g', 100],
    ['hot_liver', 'hot_protein', 'כבד עוף', 165, 27, '100g', 100],

    # hot - carb
    ['hot_sweet_p', 'hot_carb', 'בטטה', 90, 2, '100g', 100],
    ['hot_rice_w', 'hot_carb', 'אורז לבן', 130, 3, '75g מבושל', 75],
    ['hot_potato', 'hot_carb', 'תפוח אדמה', 80, 2, '130g', 130],
    ['hot_rice_b', 'hot_carb', 'אורז מלא', 110, 3, '85g מבושל', 85],
    ['hot_pasta_w', 'hot_carb', 'פסטה מלאה', 130, 5, '70g מבושלת', 70],
    ['hot_pasta', 'hot_carb', 'פסטה לבנה', 160, 5, '65g מבושלת', 65],
    ['hot_cous', 'hot_carb', 'קוסקוס', 112, 4, '80g מבושל', 80],
    ['hot_quinoa', 'hot_carb', 'קינואה', 120, 4, '80g מבושלת', 80],
    ['hot_buckwheat', 'hot_carb', 'כוסמת', 92, 3, '80g מבושלת', 80],
    ['hot_lentils', 'hot_carb', 'עדשים', 116, 9, '100g מבושל', 100],
    ['hot_beans', 'hot_carb', 'שעועית לבנה', 127, 9, '100g מבושל', 100],

    # hot - veg
    ['hot_veg_small', 'hot_veg', 'סלט קטן', 25, 1, '3 ירקות', 80],
    ['hot_veg_large', 'hot_veg', 'סלט גדול', 25, 1, '6 ירקות', 150],
    ['hot_antipasti', 'hot_veg', 'אנטיפסטי', 60, 1, 'סיר קטן', 80],

    # salad - protein
    ['salad_tuna_w', 'salad_protein', 'טונה במים', 110, 25, '50g', 50],
    ['salad_pastrama', 'salad_protein', 'פסטרמה', 275, 55, '20g', 20],
    ['salad_chicken', 'salad_protein', 'חזה עוף פרוס', 220, 44, '50g', 50],
    ['salad_tuna_o', 'salad_protein', 'טונה בשמן', 240, 30, '50g', 50],
    ['salad_cottage', 'salad_protein', "קוטג' 5%", 70, 9, '100g', 100],
    ['salad_egg', 'salad_protein', 'ביצה קשה', 155, 13, '1 ביצה', 50],

    # salad - cheese
    ['salad_cheese_tsfarit', 'salad_cheese', 'צפתית', 367, 53, '30g', 30],
    ['salad_cheese_9', 'salad_cheese', 'גבינה צהובה 9%', 300, 40, '15g', 15],
    ['salad_cheese_white', 'salad_cheese', 'גבינה לבנה 5%', 150, 14, '30g', 30],
    ['salad_cheese_bulgar', 'salad_cheese', 'בולגרת', 267, 27, '30g', 30],

    # salad - dressing
    ['dressing_chili', 'salad_dressing', 'רוטב צילי דל', 133, 0, '1 כף (15g)', 15],
    ['dressing_garlic', 'salad_dressing', 'רוטב שום לייט', 167, 0, '1 כף (15g)', 15],
    ['dressing_soy', 'salad_dressing', 'רוטב סויה', 67, 3.5, '1 כף (15g)', 15],
    ['dressing_balsamic', 'salad_dressing', 'חומץ בלסמי', 100, 0, '1 כף (15g)', 15],
    ['dressing_mustard', 'salad_dressing', 'חרדל לייט', 100, 0, '1 כף (15g)', 15],
    ['dressing_olive', 'salad_dressing', 'שמן זית', 400, 0, '1 כף (10g)', 10],
    ['dressing_tehina', 'salad_dressing', 'טחינה', 600, 10, '1 כף (15g)', 15],
    ['dressing_mayo', 'salad_dressing', 'מיוקל', 300, 0, '1 כף (15g)', 15],

    # salad - base
    ['salad_base_small', 'salad_base', 'סלט קטן', 25, 1, '3 ירקות', 80],
    ['salad_base_large', 'salad_base', 'סלט גדול', 25, 1, '6 ירקות', 150],

    # sandwich - bread
    ['sand_bread_light', 'sandwich_bread', 'לחם קל', 150, 13, '2 פרוסות', 60],
    ['sand_bread_pita99', 'sandwich_bread', 'פיתה 99', 132, 5, '1 פיתה', 75],
    ['sand_bread_whole', 'sandwich_bread', 'לחם מלא', 209, 9, '2 פרוסות', 70],
    ['sand_bread_pita_w', 'sandwich_bread', 'פיתה לבנה', 179, 6, '1 פיתה', 140],
    ['sand_bread_roll', 'sandwich_bread', 'לחמניה', 280, 10, '1 לחמניה', 50],

    # sandwich - protein
    ['sand_chicken', 'sandwich_protein', 'חזה עוף', 110, 22, '50g', 50],
    ['sand_pastrama', 'sandwich_protein', 'פסטרמה', 275, 55, '20g', 20],
    ['sand_tuna_w', 'sandwich_protein', 'טונה במים', 110, 25, '50g', 50],
    ['sand_tuna_o', 'sandwich_protein', 'טונה בשמן', 240, 30, '50g', 50],
    ['sand_salmon', 'sandwich_protein', 'סלמון מעושן', 320, 40, '25g', 25],
    ['sand_cheese', 'sandwich_protein', 'גבינה צהובה 9%', 300, 40, '15g', 15],
    ['sand_cottage', 'sandwich_protein', "קוטג' 5%", 70, 9, '100g', 100],
    ['sand_egg', 'sandwich_protein', 'ביצה', 155, 13, '1 ביצה', 50],

    # sandwich - veg
    ['sand_veg_small', 'sandwich_veg', 'סלט קטן', 25, 1, '3 ירקות', 80],
    ['sand_veg_large', 'sandwich_veg', 'סלט גדול', 25, 1, '6 ירקות', 150],

    # sandwich - sauce
    ['sand_sauce_chili', 'sandwich_sauce', 'רוטב צילי דל', 133, 0, '1 כף (15g)', 15],
    ['sand_sauce_mustard', 'sandwich_sauce', 'חרדל לייט', 100, 0, '1 כף (15g)', 15],
    ['sand_sauce_garlic', 'sandwich_sauce', 'רוטב שום לייט', 167, 0, '1 כף (15g)', 15],
    ['sand_sauce_soy', 'sandwich_sauce', 'רוטב סויה', 67, 3.5, '1 כף (15g)', 15],
    ['sand_sauce_balsamic', 'sandwich_sauce', 'חומץ בלסמי', 100, 0, '1 כף (15g)', 15],
    ['sand_sauce_jam', 'sandwich_sauce', 'ריבה לייט', 167, 0, '1 כף (15g)', 15],
    ['sand_sauce_tehina', 'sandwich_sauce', 'טחינה', 600, 10, '1 כף (15g)', 15],
    ['sand_sauce_mayo', 'sandwich_sauce', 'מיוקל', 300, 0, '1 כף (15g)', 15],

    # shake - milk
    ['shake_milk_1', 'shake_milk', 'חלב 1%', 35, 3, '200ml', 200],
    ['shake_milk_2', 'shake_milk', 'חלב 2%', 45, 3, '200ml', 200],
    ['shake_milk_3', 'shake_milk', 'חלב 3%', 55, 3, '200ml', 200],

    # shake - powder
    ['shake_whey', 'shake_powder', 'אבקת חלבון', 400, 80, '25g', 25],

    # shake - fruit
    ['shake_berries', 'shake_fruit', '10 יחידות יער', 80, 2, '10 יחידות', 50],
    ['shake_banana', 'shake_fruit', '1 בננה', 75, 1, '1 בננה', 120],
    ['shake_frozen', 'shake_fruit', '1 יחידה קפואה', 62.5, 1, '1 יחידה', 80],
    ['shake_mango', 'shake_fruit', '0.5 מנגו', 100, 1, 'חצי מנגו', 100],

    # shake - extras
    ['shake_oats', 'shake_extras', 'שיבולת שועל', 350, 13, '2 כפות', 30],
    ['shake_cinnamon', 'shake_extras', 'קינמון', 247, 4, 'קינמון', 2],

    # fruit
    ['fruit_berries_snack', 'fruit_fruit', '10 יחידות יער', 80, 2, '10 יחידות', 50],
    ['fruit_apple_snack', 'fruit_fruit', '1 תפוח', 42, 0, '1 תפוח', 180],
    ['fruit_orange', 'fruit_fruit', '1 תפוז', 44, 1, '1 תפוז', 140],
    ['fruit_banana_snack', 'fruit_fruit', '1 בננה', 75, 1, '1 בננה', 120],
    ['fruit_grapes_snack', 'fruit_fruit', '1 ענבים', 67, 1, '1 אשכול', 150],
    ['fruit_melon', 'fruit_fruit', '1 מלון', 28, 1, '1 מלון', 250],
    ['fruit_mango_snack', 'fruit_fruit', '0.5 מנגו', 100, 1, 'חצי מנגו', 100],

    # bar
    ['bar_myprotein', 'bar_brand', 'Myprotein Layered', 420, 40, '1 בר', 50],
    ['bar_today', 'bar_brand', 'Today Bar', 400, 40, '1 בר', 50],
    ['bar_allin', 'bar_brand', 'All In Bar', 430, 40, '1 בר', 50],

    # cottage
    ['cottage_5', 'cottage_type', "קוטג' 5%", 70, 9, '200g', 200],
    ['cottage_9', 'cottage_type', "קוטג' 9%", 90, 9, '200g', 200],

    # cottage - side
    ['cottage_chips', 'cottage_side', 'ציפס חלבון', 367, 33, '30g', 30],
    ['cottage_cracks', 'cottage_side', 'קרקרים פיטנס', 396, 20, '5 יחידות', 25],
    ['cottage_crackers', 'cottage_side', 'שקית פריכיות', 495, 10, '1 שקית', 20],
    ['cottage_cuc', 'cottage_side', 'מלפפון', 15, 1, '100g', 100],

    # salad_snack - protein
    ['snack_salad_tsfarit', 'salad_snack_protein', 'צפתית', 367, 53, '30g', 30],
    ['snack_salad_bulgar', 'salad_snack_protein', 'בולגרת', 267, 27, '30g', 30],
    ['snack_salad_cottage', 'salad_snack_protein', "קוטג' 5%", 70, 9, '200g', 200],
    ['snack_salad_chicken', 'salad_snack_protein', 'חזה עוף צלוי', 220, 44, '50g', 50],

    # snack - items
    ['snack_edamame', 'snack_items', 'אדממה', 100, 11, '100g מבושל', 100],
    ['snack_popcorn', 'snack_items', 'פופקורן', 667, 27, '1 שליש שקית', 15],
    ['snack_kasta', 'snack_items', 'גלידל קסטה', 167, 1, '2 יחידות', 60],
    ['snack_kartiv', 'snack_items', 'גלידל קרטיב', 167, 1, '2 יחידות', 60],
    ['snack_pb', 'snack_items', 'חמאת בוטנים', 600, 27, '1 כפית', 15],
    ['snack_choc', 'snack_items', 'שוקולד מריר', 250, 5, '4 קוביות', 20],
    ['snack_marshmallow', 'snack_items', 'מרשמלו', 320, 3, '10 יחידות', 32],
    ['snack_lollipop', 'snack_items', 'סוכריות', 300, 0, '2 יחידות', 30],
    ['snack_pesek', 'snack_items', 'פסק זמן קטן', 400, 16, '1 בר', 25],
    ['snack_slim', 'snack_items', 'סלים דליס', 475, 10, '1 בר', 20]
]

# Prepare requests
requests = []

# Clear default sheet and rename
requests.append({
    'updateSheetProperties': {
        'fields': 'title',
        'properties': {
            'sheetId': 0,
            'title': 'Meal Times'
        }
    }
})

# Add new sheets
for i, name in enumerate(['Meal Types', 'Components', 'Options'], 1):
    requests.append({
        'addSheet': {
            'properties': {
                'title': name,
                'sheetId': i
            }
        }
    })

# Execute batch update
batch_request = {'requests': requests}
sheets_service.spreadsheets().batchUpdate(spreadsheetId=sheet_id, body=batch_request).execute()
print("✓ Created 4 sheets")

# Helper function to append data
def append_to_sheet(sheet_name, data):
    body = {'values': data}
    sheets_service.spreadsheets().values().append(
        spreadsheetId=sheet_id,
        range=f"'{sheet_name}'!A1",
        valueInputOption='RAW',
        body=body
    ).execute()
    print(f"✓ Populated {sheet_name} ({len(data)-1} rows)")

# Append data to each sheet
append_to_sheet('Meal Times', meal_times_data)
append_to_sheet('Meal Types', meal_types_data)
append_to_sheet('Components', components_data)
append_to_sheet('Options', options_data)

# Format header rows (bold)
format_requests = [
    {
        'repeatCell': {
            'range': {'sheetId': i, 'startRowIndex': 0, 'endRowIndex': 1},
            'cell': {
                'userEnteredFormat': {
                    'textFormat': {'bold': True},
                    'backgroundColor': {'red': 0.2, 'green': 0.2, 'blue': 0.2}
                }
            },
            'fields': 'userEnteredFormat'
        }
    }
    for i in range(4)
]

sheets_service.spreadsheets().batchUpdate(
    spreadsheetId=sheet_id,
    body={'requests': format_requests}
).execute()
print("✓ Formatted headers")

# Set column widths
width_requests = [
    {
        'updateDimensionProperties': {
            'range': {'sheetId': i, 'dimension': 'COLUMNS', 'startIndex': 0, 'endIndex': 7},
            'properties': {'pixelSize': 150},
            'fields': 'pixelSize'
        }
    }
    for i in range(4)
]

sheets_service.spreadsheets().batchUpdate(
    spreadsheetId=sheet_id,
    body={'requests': width_requests}
).execute()
print("✓ Adjusted column widths")

print(f"\n✅ Sheet created successfully!")
print(f"📊 Open: https://docs.google.com/spreadsheets/d/{sheet_id}/edit")
print(f"\nSave this ID: {sheet_id}")
