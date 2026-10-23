// Apps Script bound to the business Google Sheet — receives leads from the
// CaseStudy landing page form, logs each one into the "מעקב לידים" table,
// and emails a notification immediately.
//
// SETUP / UPDATE:
// 1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1lGw2Fj1aLWQtNkuMpkUMsQtOXk5my0wyhkbyRUOllA4/edit
// 2. Extensions > Apps Script
// 3. Select all, delete, paste this whole file in, Save
// 4. Deploy > Manage deployments > pencil on the existing deployment >
//    Version: New version > Deploy
//    (NOT "New deployment": that makes a new URL the page doesn't call)

var SCRIPT_VERSION = 'casestudy-2026-10-23'; // מוחזר בכל תשובה, כדי לוודא איזו גרסה באוויר
var SPREADSHEET_ID = '1lGw2Fj1aLWQtNkuMpkUMsQtOXk5my0wyhkbyRUOllA4';
var SHEET_GID = 1209798032;
var SHARED_TOKEN = 'M0tJPU58G8vzQ6VTU7gVh9zvS2oNOk52'; // must match the client
var NOTIFY_EMAIL = 'darnaor110@gmail.com';
var LEAD_SECTION_LABEL = 'מעקב לידים';

// רשימה אחת של העמודות (מעמודה B והלאה) - ממנה נבנים גם השורה בגיליון, גם הכותרות וגם המייל,
// כדי שלא יהיה שוב פער ביניהם. email: התווית במייל (null = לא מופיע במייל)
var FIELDS = [
  { header: 'שם',                                  email: 'שם',                                  value: function (d) { return d.name || ''; } },
  { header: 'טלפון',                               email: 'טלפון',                               value: function (d) { return d.phone || ''; }, text: true },
  { header: 'מתי השאיר פרטים',                     email: null,                                  value: function () { return nowText(); } },
  { header: 'מקור ליד',                            email: 'מקור',                                value: function (d) { return leadSourceLabel(d); } },
  { header: 'סגר?',                                email: null,                                  value: function () { return ''; } },
  { header: 'הערות',                               email: null,                                  value: function () { return ''; } },
  { header: 'מה רוצה לראות במראה בעוד 3 חודשים',   email: 'מה רוצה לראות במראה בעוד 3 חודשים',   value: function (d) { return d.goal || ''; } },
  { header: 'גיל, מין',                            email: 'גיל, מין',                            value: function (d) { return [d.age, d.gender].filter(Boolean).join(', '); } },
  { header: 'מתאמן/ת היום?',                       email: 'מתאמן/ת היום?',                       value: function (d) { return d.training || ''; } },
  { header: 'מה מתאר את התזונה היום',              email: 'מה מתאר את התזונה היום',              value: function (d) { return d.nutrition || ''; } }
];

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOutput({ ok: false, error: 'bad request', version: SCRIPT_VERSION });
  }
  if (data.token !== SHARED_TOKEN) {
    return jsonOutput({ ok: false, error: 'unauthorized', version: SCRIPT_VERSION });
  }

  // קודם מנסים לרשום בגיליון. גם אם זה נכשל - המייל נשלח בכל מקרה, כדי שאף ליד לא ילך לאיבוד
  var insertRow = null;
  var sheetError = '';
  try {
    insertRow = appendLeadRow(getLeadSheet(), data);
  } catch (err) {
    sheetError = String(err);
  }

  sendNotificationEmail(data, sheetError);
  return jsonOutput({ ok: !sheetError, row: insertRow, error: sheetError || undefined, version: SCRIPT_VERSION });
}

function getLeadSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === SHEET_GID) return sheets[i];
  }
  return sheets[0];
}

function appendLeadRow(sheet, data) {
  // מאתר את שורת הכותרות עצמה (התא שכתוב בו בדיוק "שם")
  var match = sheet.createTextFinder('שם').matchEntireCell(true).findNext();
  if (!match) throw new Error('לא נמצאה שורת הכותרות ("שם") בטבלת "' + LEAD_SECTION_LABEL + '"');

  var headerRow = match.getRow();
  var firstCol = match.getColumn();

  // מעדכן את הכותרות כך שתמיד יתאימו לשאלות בטופס
  sheet.getRange(headerRow, firstCol, 1, FIELDS.length)
    .setValues([FIELDS.map(function (f) { return f.header; })]);

  // השורה הריקה הבאה בעמודת "שם"
  var insertRow = findNextEmptyRow(sheet, headerRow + 1, firstCol);

  // עמודות טקסט (טלפון) - פורמט טקסט לפני הכתיבה, כדי שה-0 בהתחלה לא ייעלם
  FIELDS.forEach(function (f, i) {
    if (f.text) sheet.getRange(insertRow, firstCol + i).setNumberFormat('@');
  });

  var rowValues = FIELDS.map(function (f) { return f.value(data); });
  sheet.getRange(insertRow, firstCol, 1, rowValues.length).setValues([rowValues]);
  return insertRow;
}

// מקור הליד: מאיזה קישור מתויג הגיע (ביו / סטורי / הודעות / וואטסאפ / ממומן)
function leadSourceLabel(data) {
  return 'קייס סטאדי | ' + (data.source || 'ישיר');
}

// התאריך והשעה עכשיו, בשעון ישראל
function nowText() {
  return Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd/MM/yyyy HH:mm');
}

// סורק את עמודת "שם" מ-startRow ומטה ומחזיר את השורה הריקה הראשונה
function findNextEmptyRow(sheet, startRow, col) {
  var lastRow = Math.max(sheet.getLastRow(), startRow);
  var values = sheet.getRange(startRow, col, lastRow - startRow + 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === '' || values[i][0] === null) return startRow + i;
  }
  return startRow + values.length;
}

function sendNotificationEmail(data, sheetError) {
  // גוף המייל נבנה מאותה רשימת שדות כמו הגיליון
  var lines = FIELDS
    .filter(function (f) { return f.email; })
    .map(function (f) { return f.email + ': ' + f.value(data); });

  var footer = sheetError
    ? '⚠️ לא נרשם בגיליון: ' + sheetError
    : 'נרשם אוטומטית בגיליון, בטבלת "' + LEAD_SECTION_LABEL + '".';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'ליד חדש מהקייס סטאדי: ' + (data.name || ''),
    body: 'התקבל ליד חדש מדף הקייס סטאדי.\n\n' + lines.join('\n') + '\n\n' + footer
  });
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
