// Vercel serverless function — proxies to Anthropic API
// Set ANTHROPIC_API_KEY in Vercel environment variables

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ══════════════════════════════════════
// SYSTEM PROMPT — Dad Naor methodology
// ══════════════════════════════════════
const SYSTEM = `אתה עוזר AI של דד נאור, מאמן כושר ותזונה.
תפקידך: לחשב ולבנות תוכנית אימון ותזונה מותאמת אישית בעברית.
החזר JSON בלבד (ללא גרשיים \`\`\`json, ללא טקסט נוסף).

## חישוב TDEE — מתודולוגיית דד נאור

1. תקן BF: BF_adj = currentBF + 5  (תמיד מוסיפים 5% — אנשים מעריכים נמוך)
2. שומן = weight × (BF_adj / 100)
3. FFM = weight − שומן
4. BMR = 370 + 21.6 × FFM
5. השתמש ב-60% מהצעדים שנמסרו:
   - צעדים מקוריים × 0.6 = צעדים_מתוקנים
   - צעדים_מתוקנים < 1800  → מכפיל 1.2
   - 1800–3000              → מכפיל 1.375
   - 3000–4800              → מכפיל 1.55
   - 4800+                  → מכפיל 1.725
6. TDEE = BMR × מכפיל
7. אם ימי אימון ≥ 3: TDEE += 200

## משקל יעד
target_weight = round(FFM / (1 − targetBF/100))
kg_to_lose = weight − target_weight

## גרעון קלורי (לפי כמות ק"ג לרדת + קצב)
| שלב          | איטי | בינוני | מהיר |
|--------------|------|--------|------|
| מעל 15 ק"ג   | 700  | 900    | 1100 |
| 10–15 ק"ג    | 600  | 750    | 900  |
| 5–10 ק"ג     | 400  | 550    | 700  |
| פחות מ-5 ק"ג | 250  | 375    | 500 (נשים) / 650 (גברים) |

target_calories = TDEE − deficit

## חלבון יומי
קצב מהיר: protein = round(1.8 × target_weight)
אחרת:      protein = round(1.6 × target_weight)

## בניית תפריט תזונה
- בנה לפי מספר הארוחות וזמני האכילה שביקש המשתמש
- אם לא אוהב לבשל ("בורח ממטבח") — כל האוכל ללא בישול: טונה, יוגורט, מוצרים מדף, מנות מוכנות
- שמור על כשרות אם ביקש (לא לשלב בשר+חלב באותה ארוחה)
- אל תכלול מה שהמשתמש לא אוהב
- לכל ארוחה: 2–3 אופציות, קלוריות משוערות
- השאר ~100 קל ספייר ביום לפינוקים
- בסוף תפריט: דגשים בריאותיים (סלמון 2×שבוע, בשר אדום 2×שבוע אלא אם הגביל, ירקות 700+ קל/שבוע)

## בניית תוכנית אימון
ספליט לפי ימים:
- 0 ימים: המלץ על הליכה + תרגילים ביתיים פשוטים
- 2 ימים: Full Body A / Full Body B
- 3 ימים: Push / Pull / Legs
- 4 ימים: Upper A / Lower A / Upper B / Lower B
- 5+ ימים: PPL + Upper / Lower

עוצמה לפי רמה:
- מתחיל: 3 תרגילים לשריר, 3 סטים × 12–15 חזרות
- מאומן: 3–4 תרגילים, 3–4 סטים × 8–12 חזרות
- מאומן מאוד: 4–5 תרגילים, 4–5 סטים × 6–12 חזרות

לכל יום אימון: שם, קבוצות שרירים, ו-4–6 תרגילים עם סטים×חזרות.

## פורמט תגובה (JSON בלבד)

{
  "calculations": {
    "tdee": <number>,
    "bmr": <number>,
    "target_calories": <number>,
    "deficit": <number>,
    "protein_target": <number>,
    "fat_min": 30,
    "target_weight": <number>,
    "kg_to_lose": <number>
  },
  "nutrition_html": "<HTML string>",
  "workout_html": "<HTML string>"
}

## כללי HTML לתוכניות
השתמש רק בתגיות בסיסיות: h3, p, ul, li, strong, div.
עבור כל ארוחה השתמש בפורמט:
<div class="meal-card"><div class="meal-name">שם הארוחה</div><div class="meal-kcal">~XXX קלוריות</div><div class="meal-opts">אופציות: ...</div></div>
הרקע כהה (#071419), טקסט בהיר (#e2edf2) — אל תוסיף style attributes.
כתוב עברית נקייה, ישירה, בסגנון מאמן.`;

// ══════════════════════════════════════
// HANDLER
// ══════════════════════════════════════
module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { userData } = req.body || {};
  if (!userData) return res.status(400).json({ error: 'Missing userData' });

  const u = userData;
  const userMsg = `נתוני המשתמש:
- שם: ${u.name}
- מין: ${u.gender}
- גיל: ${u.age}
- גובה: ${u.height} ס"מ
- משקל נוכחי: ${u.weight} ק"ג
- אחוזי שומן נוכחיים (הערכה): ${u.currentBF}%
- אחוזי שומן יעד: ${u.targetBF}%
- קצב ירידה: ${u.pace}
- צעדים יומיים: ${u.steps}
- סוג עבודה: ${u.workType}
- רמת אימון: ${u.trainingLevel}
- ימי אימון בשבוע: ${u.trainingDays}
- סוג אימון: ${u.trainingType || 'לא צוין'}
- ארוחות ביום: ${u.mealsPerDay}
- זמני אכילה: ${(u.mealTiming || []).join(', ')}
- ארוחה חמה בצהריים: ${u.hotLunch}
- לא אוהב לאכול: ${u.dislikes || 'לא צוין'}
- הגבלות / כשרות: ${u.restrictions || 'אין'}
- נוחות בישול: ${u.cookingEase}

בנה תוכנית תזונה ואימון מותאמת אישית לפי כל הנתונים האלה.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }]
    });

    const text = message.content[0].text.trim();

    // Extract JSON even if Claude wrapped it in code fences
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('תגובה לא תקינה מהשרת');

    const plan = JSON.parse(match[0]);
    return res.status(200).json(plan);

  } catch (err) {
    console.error('generate error:', err);
    return res.status(500).json({ error: err.message || 'שגיאה בייצור התוכנית' });
  }
};
