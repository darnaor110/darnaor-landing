#!/usr/bin/env python3
"""
Push video content (Hooks + Script + Framework) to Google Sheets
Uses service account authentication
"""

from google.oauth2 import service_account
from googleapiclient.discovery import build
import json
import sys

# Service account key
import os
SERVICE_ACCOUNT_FILE = os.path.join(os.path.dirname(__file__), '..', 'service-account-key.json')
SPREADSHEET_ID = '1HP0kJtm_kgHA64N55FqP1cHcjXRsDgbZt77YHU4y4dE'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def authenticate():
    """Authenticate using service account."""
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds

def find_empty_slot(service, sheet_name='June 2026'):
    """
    Find first empty 3-column slot by checking Row 5 (Post Date row).
    Valid starting columns: C(2), F(5), I(8), L(11), O(14), R(17), U(20), X(23), AA(26), AD(29)...
    Pattern: 2 + (i*3) for every i
    If current sheet full, recursively check next sheet (July 2026, etc.)
    Returns (sheet_name, col_idx) tuple or (None, None)
    """
    valid_cols = [2 + (i*3) for i in range(50)]

    try:
        result = service.spreadsheets().values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=f"{sheet_name}!A5:CD5"
        ).execute()
        values = result.get('values', [[]])[0] if result.get('values') else []
    except Exception as e:
        print(f"[ERROR] Could not read {sheet_name}: {e}")
        return (None, None)

    # Check each valid column
    for col_idx in valid_cols:
        if col_idx >= len(values) or not values[col_idx]:
            return (sheet_name, col_idx)

    # Current sheet is full, try next sheet
    sheet_progression = {
        'June 2026': 'July 2026',
        'July 2026': 'August 2026',
        'August 2026': 'September 2026',
        'September 2026': 'October 2026'
    }

    next_sheet = sheet_progression.get(sheet_name)
    if next_sheet:
        print(f"[INFO] {sheet_name} is full. Checking {next_sheet}...")
        return find_empty_slot(service, next_sheet)

    print(f"[ERROR] All sheets are full!")
    return (None, None)

def col_letter(col_idx):
    """Convert column index to letter (0=A, 1=B, 2=C, etc.)"""
    result = ""
    col_idx += 1  # Convert to 1-indexed
    while col_idx > 0:
        col_idx -= 1
        result = chr(65 + col_idx % 26) + result
        col_idx //= 26
    return result

def push_video(service, video_data, sheet_name='June 2026'):
    """
    Push video data to Google Sheets.

    video_data structure:
    {
        'post_date': '...',
        'hooks': [
            {'original': '...', 'link': '...', 'adapted': '...'},
            ...5 total...
        ],
        'framework': {
            'script_angle': '...',
            'content_type': '...',
            'funnel_type': '...',
            'video_format': '...',
            'cta_type': '...',
            'editing_notes': '...'
        },
        'script': ['scene1', 'scene2', ...]
    }
    """

    # Find empty slot
    sheet_name, col_idx = find_empty_slot(service, sheet_name)
    if col_idx is None:
        print("[ERROR] No empty video slot found!")
        return False

    col1 = col_letter(col_idx)
    col2 = col_letter(col_idx + 1)
    col3 = col_letter(col_idx + 2)

    print(f"[PUSH] Sheet: {sheet_name}, Columns: {col1}-{col3}")

    # Prepare data to push
    updates = []

    # Row 5: Post Date (Col 1)
    updates.append({
        'range': f"{sheet_name}!{col1}5",
        'values': [[video_data.get('post_date', '')]]
    })

    # Rows 6-10: Hooks (5 hooks)
    for i, hook in enumerate(video_data.get('hooks', [])[:5]):
        row = 6 + i
        # Col 1: Original hook (English)
        updates.append({
            'range': f"{sheet_name}!{col1}{row}",
            'values': [[hook.get('original', '')]]
        })
        # Col 2: Link
        updates.append({
            'range': f"{sheet_name}!{col2}{row}",
            'values': [[hook.get('link', '')]]
        })
        # Col 3: Adapted hook (Hebrew)
        updates.append({
            'range': f"{sheet_name}!{col3}{row}",
            'values': [[hook.get('adapted', '')]]
        })

    # Rows 11-16: Framework (6 fields)
    framework_fields = [
        ('script_angle', 11),
        ('content_type', 12),
        ('funnel_type', 13),
        ('video_format', 14),
        ('cta_type', 15),
        ('editing_notes', 16)
    ]

    for field, row in framework_fields:
        updates.append({
            'range': f"{sheet_name}!{col1}{row}",
            'values': [[video_data.get('framework', {}).get(field, '')]]
        })

    # Rows 18-35: Script scenes (Col 1) + Script notes (Col 2)
    script_scenes = video_data.get('script', [])
    script_notes = video_data.get('script_notes', [])
    for i, scene in enumerate(script_scenes):
        row = 18 + i
        if row <= 35:
            # Column 1: Script text
            updates.append({
                'range': f"{sheet_name}!{col1}{row}",
                'values': [[scene]]
            })
            # Column 2: Filming/editing notes
            if i < len(script_notes):
                updates.append({
                    'range': f"{sheet_name}!{col2}{row}",
                    'values': [[script_notes[i]]]
                })

    # Batch update
    body = {'data': updates, 'valueInputOption': 'RAW'}
    result = service.spreadsheets().values().batchUpdate(
        spreadsheetId=SPREADSHEET_ID,
        body=body
    ).execute()

    print(f"[OK] Pushed {len(updates)} cells to {col1}-{col3}")
    return True

def main():
    if len(sys.argv) < 2:
        print("Usage: python push-to-sheets.py <json_file>")
        sys.exit(1)

    json_file = sys.argv[1]

    # Load data
    with open(json_file, 'r', encoding='utf-8') as f:
        video_data = json.load(f)

    # Authenticate
    creds = authenticate()
    service = build('sheets', 'v4', credentials=creds)

    # Push
    success = push_video(service, video_data)

    if success:
        print("[OK] Done!")
        sys.exit(0)
    else:
        print("[ERROR] Failed!")
        sys.exit(1)

if __name__ == '__main__':
    main()
