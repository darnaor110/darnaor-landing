// Google Apps Script to auto-create June 2026 sheet and populate it
// Copy this entire code, paste into Tools > Script Editor in your Google Sheet, run it

function createJune2026Sheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create new sheet named "June 2026"
  let sheet = ss.getSheetByName("June 2026");
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet("June 2026");

  // Define headers
  const headers = [
    "Video #",
    "Post Date",
    "Status",
    "Funnel Type",
    "Script Angle",
    "Content Type",
    "Hook - Verbal",
    "Hook - Written",
    "Hook - Visual",
    "Video Format",
    "CTA Type",
    "Editing Style Notes",
    "Script Line 1",
    "Filming Notes (L1)",
    "Editing Notes (L1)",
    "Script Line 2",
    "Filming Notes (L2)",
    "Editing Notes (L2)",
    "Script Line 3",
    "Filming Notes (L3)",
    "Editing Notes (L3)"
  ];

  // Add headers to first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Freeze first row
  sheet.setFrozenRows(1);

  // Define video data (8 videos for June)
  const videoData = [
    [1, "June 5, 2026", "Ready for filming", "TOFU", "Tutorial", "Educational", "", "", "", "Shot/Angle Change", "Follow", "", "", "", "", "", "", "", "", "", ""],
    [2, "June 8, 2026", "Ready for filming", "TOFU", "Comparison", "Educational", "", "", "", "Visual", "Follow", "", "", "", "", "", "", "", "", "", ""],
    [3, "June 12, 2026", "Ready for filming", "MOFU", "Storytelling", "Storytelling", "", "", "", "Voiceover", "Follow", "", "", "", "", "", "", "", "", "", ""],
    [4, "June 15, 2026", "Ready for filming", "TOFU", "Tip/Hack", "Educational", "", "", "", "Shot/Angle Change", "Follow", "", "", "", "", "", "", "", "", "", ""],
    [5, "June 18, 2026", "Ready for filming", "MOFU", "Transformation", "Authority", "", "", "", "Visual", "Freebie", "", "", "", "", "", "", "", "", "", ""],
    [6, "June 22, 2026", "Ready for filming", "BOFU", "Tutorial", "Educational", "", "", "", "Voiceover", "Paid Offer", "", "", "", "", "", "", "", "", "", ""],
    [7, "June 25, 2026", "Ready for filming", "TOFU", "Do's vs Don'ts", "Educational", "", "", "", "Shot/Angle Change", "Follow", "", "", "", "", "", "", "", "", "", ""],
    [8, "June 28, 2026", "Ready for filming", "MOFU", "Challenge", "Storytelling", "", "", "", "Visual", "Follow", "", "", "", "", "", "", "", "", "", ""]
  ];

  // Add video data starting from row 2
  sheet.getRange(2, 1, videoData.length, headers.length).setValues(videoData);

  // Set column widths
  const columnWidths = {
    1: 70,   // Video #
    2: 80,   // Post Date
    3: 100,  // Status
    4: 100,  // Funnel Type
    5: 120,  // Script Angle
    6: 120,  // Content Type
    7: 120,  // Hook - Verbal
    8: 120,  // Hook - Written
    9: 120,  // Hook - Visual
    10: 120, // Video Format
    11: 100, // CTA Type
    12: 150, // Editing Style Notes
    13: 180, // Script Line 1
    14: 180, // Filming Notes (L1)
    15: 180, // Editing Notes (L1)
    16: 180, // Script Line 2
    17: 180, // Filming Notes (L2)
    18: 180, // Editing Notes (L2)
    19: 180, // Script Line 3
    20: 180, // Filming Notes (L3)
    21: 180  // Editing Notes (L3)
  };

  for (let col in columnWidths) {
    sheet.setColumnWidth(col, columnWidths[col]);
  }

  // Enable text wrapping for script/notes columns (M through U)
  sheet.getRange("M:U").setWrap(true);

  // Format header row (row 1): Bold, dark background, light text
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0b1e26"); // Dark blue
  headerRange.setFontColor("#5bd4ff"); // Teal text
  headerRange.setFontSize(11);

  // Add data validation (dropdowns) for specific columns

  // Column C: Status (Ready for filming, Filmed, Edited, Posted)
  const statusRange = sheet.getRange("C2:C1000");
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Ready for filming", "Filmed", "Edited", "Posted"], false)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(statusRule);

  // Column D: Funnel Type (TOFU, MOFU, BOFU)
  const funnelRange = sheet.getRange("D2:D1000");
  const funnelRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["TOFU", "MOFU", "BOFU"], false)
    .setAllowInvalid(false)
    .build();
  funnelRange.setDataValidation(funnelRule);

  // Column E: Script Angle
  const angleRange = sheet.getRange("E2:E1000");
  const angleRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Tutorial", "Comparison", "Mythbust", "Do's vs Don'ts", "Tip/Hack", "Transformation", "Challenge"], false)
    .setAllowInvalid(false)
    .build();
  angleRange.setDataValidation(angleRule);

  // Column F: Content Type (Educational, Storytelling, Authority)
  const contentRange = sheet.getRange("F2:F1000");
  const contentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Educational", "Storytelling", "Authority"], false)
    .setAllowInvalid(false)
    .build();
  contentRange.setDataValidation(contentRule);

  // Column J: Video Format
  const formatRange = sheet.getRange("J2:J1000");
  const formatRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Talking Back and Forth", "Visual", "Voiceover", "Multitasking", "Setting Change", "Shot/Angle Change", "Clone", "Whiteboard", "Q&A", "Green Screen", "Reaction"], false)
    .setAllowInvalid(false)
    .build();
  formatRange.setDataValidation(formatRule);

  // Column K: CTA Type
  const ctaRange = sheet.getRange("K2:K1000");
  const ctaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Follow", "Freebie", "Paid Offer", "Engagement", "None"], false)
    .setAllowInvalid(false)
    .build();
  ctaRange.setDataValidation(ctaRule);

  // Add borders to all data cells
  const dataRange = sheet.getRange(1, 1, 9, 21);
  dataRange.setBorder(true, true, true, true, true, true, "#5087a3", SpreadsheetApp.BorderStyle.SOLID);

  // Format data cells for readability
  const bodyRange = sheet.getRange(2, 1, 8, 21);
  bodyRange.setFontSize(11);
  bodyRange.setVerticalAlignment("top");

  // Add calendar section below (starting at row 12)
  const calendarStartRow = 12;
  sheet.getRange(calendarStartRow, 1).setValue("POSTING SCHEDULE — JUNE 2026");
  sheet.getRange(calendarStartRow, 1).setFontWeight("bold").setFontSize(12).setBackground("#0b1e26").setFontColor("#5bd4ff");

  // Calendar headers
  const calendarHeaders = ["WEEK", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  sheet.getRange(calendarStartRow + 2, 1, 1, 8).setValues([calendarHeaders]);
  sheet.getRange(calendarStartRow + 2, 1, 1, 8).setFontWeight("bold").setBackground("#0b1e26").setFontColor("#5bd4ff");

  // Calendar data for June 2026
  // June 1 = Sunday (week 1 starts)
  const calendarData = [
    ["1", "", "", "Video #1 (June 5)", "", "", "", ""],
    ["2", "Video #2 (June 8)", "", "", "Video #3 (June 12)", "", "", ""],
    ["3", "", "Video #4 (June 15)", "", "", "Video #5 (June 18)", "", ""],
    ["4", "", "", "", "Video #6 (June 22)", "", "Video #7 (June 25)", ""],
    ["5", "Video #8 (June 28)", "", "", "", "", "", ""]
  ];

  sheet.getRange(calendarStartRow + 3, 1, calendarData.length, 8).setValues(calendarData);
  sheet.getRange(calendarStartRow + 3, 1, calendarData.length, 8).setHorizontalAlignment("center").setVerticalAlignment("middle").setBorder(true, true, true, true, true, true, "#5087a3", SpreadsheetApp.BorderStyle.SOLID);

  // Ratio check section (starting at row 22)
  const ratioStartRow = 22;
  sheet.getRange(ratioStartRow, 1).setValue("CONTENT RATIO TRACKING");
  sheet.getRange(ratioStartRow, 1).setFontWeight("bold").setFontSize(11).setBackground("#0b1e26").setFontColor("#5bd4ff");

  sheet.getRange(ratioStartRow + 2, 1).setValue("TOFU Videos:");
  sheet.getRange(ratioStartRow + 2, 2).setFormula('=COUNTIF(D:D,"TOFU")');
  sheet.getRange(ratioStartRow + 2, 3).setValue("/");
  sheet.getRange(ratioStartRow + 2, 4).setValue("12");

  sheet.getRange(ratioStartRow + 3, 1).setValue("MOFU Videos:");
  sheet.getRange(ratioStartRow + 3, 2).setFormula('=COUNTIF(D:D,"MOFU")');
  sheet.getRange(ratioStartRow + 3, 3).setValue("/");
  sheet.getRange(ratioStartRow + 3, 4).setValue("8");

  sheet.getRange(ratioStartRow + 4, 1).setValue("BOFU Videos:");
  sheet.getRange(ratioStartRow + 4, 2).setFormula('=COUNTIF(D:D,"BOFU")');
  sheet.getRange(ratioStartRow + 4, 3).setValue("/");
  sheet.getRange(ratioStartRow + 4, 4).setValue("8");

  sheet.getRange(ratioStartRow + 6, 1).setValue("Status:");
  sheet.getRange(ratioStartRow + 6, 2).setValue("✅ On target");

  // Select cell A1 to finish
  sheet.setActiveRange(sheet.getRange("A1"));

  SpreadsheetApp.flush();

  return "June 2026 sheet created successfully!";
}

// Run this function
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Content Calendar')
    .addItem('Create June 2026 Sheet', 'createJune2026Sheet')
    .addToUi();
}
