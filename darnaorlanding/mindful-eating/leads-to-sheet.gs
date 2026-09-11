// Apps Script bound to the business Google Sheet — receives leads from the
// mindful-eating landing page form, logs each one into the "מעקב לידים"
// section, and emails a notification immediately.
//
// SETUP:
// 1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/1lGw2Fj1aLWQtNkuMpkUMsQtOXk5my0wyhkbyRUOllA4/edit
// 2. Extensions > Apps Script
// 3. Delete any placeholder code, paste this whole file in
// 4. Deploy > New deployment > type: Web app
//      Execute as: Me
//      Who has access: Anyone
// 5. Copy the /exec URL it gives you and send it back — it goes into the
//    APPS_SCRIPT_URL constant in mindful-eating/index.html

var SPREADSHEET_ID = '1lGw2Fj1aLWQtNkuMpkUMsQtOXk5my0wyhkbyRUOllA4';
var SHEET_GID = 1209798032;
var SHARED_TOKEN = 'M0tJPU58G8vzQ6VTU7gVh9zvS2oNOk52'; // must match the client
var NOTIFY_EMAIL = 'darnaor110@gmail.com';
var LEAD_SECTION_LABEL = 'מעקב לידים';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.token !== SHARED_TOKEN) {
      return jsonOutput({ ok: false, error: 'unauthorized' });
    }

    var sheet = getLeadSheet();
    var insertRow = appendLeadRow(sheet, data);
    sendNotificationEmail(data);

    return jsonOutput({ ok: true, row: insertRow });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
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
  var finder = sheet.createTextFinder(LEAD_SECTION_LABEL).matchEntireCell(false);
  var match = finder.findNext();
  if (!match) throw new Error('לא נמצאה טבלת "' + LEAD_SECTION_LABEL + '" בגיליון');

  // מבנה הטבלה: 2 שורות כותרת ממוזגת, ואז שורת כותרות עמודות
  var columnHeaderRow = match.getRow() + 2;
  var insertRow = columnHeaderRow + 1;

  // מוסיף שורה חדשה מיד מתחת לכותרות — הליד החדש תמיד למעלה, וכל מה שמתחת זז
  sheet.insertRowBefore(insertRow);

  var now = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Jerusalem', 'dd/MM/yyyy HH:mm');

  var rowValues = [
    data.name || '',
    data.phone || '',
    now,
    'דף נחיתה - אכילה מדעת',
    '',
    '',
    data.goal || '',
    data.helpsGoal || '',
    data.training || '',
    data.nutrition || ''
  ];

  sheet.getRange(insertRow, 2, 1, rowValues.length).setValues([rowValues]);
  return insertRow;
}

function sendNotificationEmail(data) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'ליד חדש מדף הנחיתה - אכילה מדעת: ' + (data.name || ''),
    body:
      'התקבל ליד חדש מדף הנחיתה "אכילה מדעת".\n\n' +
      'שם: ' + (data.name || '') + '\n' +
      'טלפון: ' + (data.phone || '') + '\n' +
      'מטרה: ' + (data.goal || '') + '\n' +
      'אכילה מדעת תעזור לדעתו/ה?: ' + (data.helpsGoal || '') + '\n' +
      'מתאמן/ת היום?: ' + (data.training || '') + '\n' +
      'סטטוס תזונתי: ' + (data.nutrition || '') + '\n\n' +
      'נרשם אוטומטית בגיליון, בטבלת "' + LEAD_SECTION_LABEL + '".'
  });
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
