from google.oauth2 import service_account
from googleapiclient.discovery import build
import os

SERVICE_ACCOUNT_FILE = './.claude/service-account-key.json'
SPREADSHEET_ID = '1HP0kJtm_kgHA64N55FqP1cHcjXRsDgbZt77YHU4y4dE'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
service = build('sheets', 'v4', credentials=creds)

result = service.spreadsheets().values().get(
    spreadsheetId=SPREADSHEET_ID,
    range="June 2026!A4:Z4"
).execute()

values = result.get('values', [[]])[0] if result.get('values') else []
print(f"Row 4 values: {values}")
print(f"Length: {len(values)}")

# Check which columns are filled
valid_cols = [2, 5, 8, 11, 14, 17, 20, 23]
for col_idx in valid_cols:
    col_letter = chr(65 + col_idx)
    filled = col_idx < len(values) and values[col_idx]
    print(f"{col_letter}: {'FILLED' if filled else 'EMPTY'}")
