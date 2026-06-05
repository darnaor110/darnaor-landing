# Google Sheets API Setup — Step by Step

**Goal:** Give Claude permission to edit your Google Sheet automatically.

**Time needed:** 5-10 minutes (mostly waiting for Google)

---

## PART 1: Google Cloud Setup (One-time, 3 minutes)

### Step 1: Go to Google Cloud Console
- Open: https://console.cloud.google.com/

### Step 2: Create a New Project
1. At the top, click the **project selector** (blue bar showing "Select a project")
2. Click **NEW PROJECT**
3. Name it: `claudeproject-sheets`
4. Click **CREATE**
5. Wait for it to load (30 seconds)

### Step 3: Enable Google Sheets API
1. In the search bar at the top, search: `sheets`
2. Click **Google Sheets API** (first result)
3. Click **ENABLE**
4. Wait for it to load

### Step 4: Create OAuth Credentials
1. Click **CREATE CREDENTIALS** (blue button, top right)
2. Select:
   - **Application type:** "Desktop app"
   - **User data:** Check this box
3. Click **NEXT**
4. Fill in (it's okay to leave as defaults):
   - **App name:** `claudeproject`
   - Click **CREATE AND CONTINUE**
5. On the next screen, click **DOWNLOAD** (downloads a JSON file)
6. Save this file to your Downloads folder

### Step 5: Move the Credentials File
1. The file you downloaded is named something like: `client_secret_XXXXX.json`
2. Move it to your home directory with this exact name:
   - **Windows:** `C:\Users\[YourUsername]\.darna_sheets_credentials.json`
   - Or just copy to: `C:\Users\darna\.darna_sheets_credentials.json`

**To do this:**
- Open File Explorer
- Navigate to Downloads (find the `client_secret_XXX.json` file)
- Right-click → **Rename** → Name it exactly: `.darna_sheets_credentials.json`
- Cut it (Ctrl+X)
- Go to: `C:\Users\darna\`
- Paste it (Ctrl+V)

---

## PART 2: Python Setup (2 minutes)

### Step 1: Install Required Libraries
Open PowerShell or Command Prompt and run:

```
pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

Wait for it to finish (should say "Successfully installed" at the end).

---

## PART 3: Run Authentication Script (2 minutes)

### Step 1: Open Command Prompt or PowerShell
- Windows: Press `Win + R`, type `powershell`, press Enter

### Step 2: Navigate to Project Folder
```
cd C:\Users\darna\claudeproject
```

### Step 3: Run the Auth Script
```
python auth-google-sheets.py
```

### Step 4: Approve in Browser
1. A browser window opens automatically
2. Google asks you to sign in → **Sign in with your account**
3. Google asks for permission → **Click "Allow"**
4. Browser says "The authentication flow has completed" → **You can close this**

### Step 5: Back in PowerShell
You should see:
```
✅ Authentication successful!
✅ Credentials saved to: C:\Users\darna\.darna_sheets_token.json

Claude now has access to edit your Google Sheet.
```

---

## PART 4: You're Done!

If you see the success message above, you're finished.

Now you can go back to Claude and tell him:
> "I finished the setup. Build the June 2026 sheet."

And I'll create everything automatically in your Google Sheet.

---

## Troubleshooting

### "❌ ERROR: Credentials file not found!"
- Make sure the file is saved as: `C:\Users\darna\.darna_sheets_credentials.json`
- Check the exact filename (it's case-sensitive)

### "ModuleNotFoundError: No module named 'google_auth_oauthlib'"
- Run: `pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client`
- Try again

### Browser doesn't open automatically
- Copy the URL from the PowerShell output
- Paste it into your browser manually
- Follow the approval steps

### "Connection refused" or port errors
- Close PowerShell
- Wait 10 seconds
- Open a fresh PowerShell
- Try again

---

## What Just Happened?

1. **Google gave you a "credentials" file** — It's like a password that identifies your app
2. **You ran the auth script** — It used that credentials file to ask Google for permission
3. **You clicked "Allow"** — You authorized Claude to edit your Sheet
4. **Google gave you a "token"** — It's a temporary permission that stays on your machine
5. **Claude can now use that token** — To edit your Sheet from here

Every time Claude needs to edit your Sheet, he uses that token to authenticate.

---

## Security Note

The token file (`.darna_sheets_token.json`) is stored locally on your machine. **Only Claude in this project can use it.** It's specific to your account and your Sheet.

If you ever want to revoke access:
- Delete the `.darna_sheets_token.json` file
- Or go to: https://myaccount.google.com/permissions
- Find "claudeproject" and click "Remove"

---

## Ready?

Once you see the success message, come back here and tell me. I'll build the entire June 2026 sheet automatically.

