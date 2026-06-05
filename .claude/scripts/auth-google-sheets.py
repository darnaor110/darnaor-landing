#!/usr/bin/env python3
"""
Google Sheets Authentication Setup
Run this once to give Claude access to edit your Google Sheet.
"""

import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

# Scopes needed to edit Google Sheets
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Credentials file location
CREDENTIALS_FILE = os.path.expanduser('~/.darna_sheets_credentials.json')
TOKEN_FILE = os.path.expanduser('~/.darna_sheets_token.json')

def authenticate():
    """Authenticate with Google Sheets API using OAuth2."""

    creds = None

    # Load existing token if it exists
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
        print("✅ Existing credentials found. Using them.")
        return creds

    # If no valid creds, create new ones via OAuth2
    print("🔓 Starting Google authentication...")
    print("A browser window will open. Click 'Allow' to give access to your Google Sheets.")
    print()

    # Create OAuth2 flow
    flow = InstalledAppFlow.from_client_secrets_file(
        CREDENTIALS_FILE,
        SCOPES,
        redirect_uri='http://localhost:8080'
    )

    # Run local server and get credentials
    creds = flow.run_local_server(port=8080, open_browser=True)

    # Save credentials for future use
    with open(TOKEN_FILE, 'w') as token:
        token.write(creds.to_json())

    print()
    print("✅ Authentication successful!")
    print(f"✅ Credentials saved to: {TOKEN_FILE}")
    print()
    print("Claude now has access to edit your Google Sheet.")
    print("You can close this window.")

    return creds

if __name__ == '__main__':
    # Check if credentials file exists
    if not os.path.exists(CREDENTIALS_FILE):
        print("❌ ERROR: Credentials file not found!")
        print()
        print("SETUP REQUIRED:")
        print("1. Go to: https://console.cloud.google.com/")
        print("2. Create a new project")
        print("3. Enable Google Sheets API")
        print("4. Create OAuth 2.0 Desktop credentials (Client ID)")
        print("5. Download the credentials JSON file")
        print(f"6. Save it as: {CREDENTIALS_FILE}")
        print()
        print("Then run this script again.")
        exit(1)

    # Authenticate
    try:
        creds = authenticate()
        print()
        print("=" * 60)
        print("SETUP COMPLETE")
        print("=" * 60)
        print()
        print("You're ready! Now:")
        print("1. Go back to Claude")
        print("2. Tell me to build the June 2026 sheet")
        print("3. Everything will be created automatically")
        print()
    except Exception as e:
        print(f"❌ Authentication failed: {e}")
        exit(1)
