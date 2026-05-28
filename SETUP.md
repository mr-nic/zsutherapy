# GitHub Setup Guide
## zsutherapy project · mr-nic

Follow these steps once to get everything live. Takes about 20 minutes.

---

## Step 1 — Create the repository

1. Go to github.com and sign in as mr-nic
2. Click the **+** icon (top right) → **New repository**
3. Name it: `zsutherapy`
4. Set to **Public** (required for free GitHub Pages)
5. Tick **Add a README file**
6. Click **Create repository**

---

## Step 2 — Enable GitHub Pages

1. In the repo, go to **Settings** → **Pages** (left sidebar)
2. Under Source, select **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait ~60 seconds, then visit: `https://mr-nic.github.io/zsutherapy`

---

## Step 3 — Upload the files

1. In the repo, click **Add file** → **Upload files**
2. Drag in the entire `zsutherapy` folder from your computer (or upload files one by one)
3. Make sure the folder structure matches:
   - `js/zsu-core.js`
   - `marketing/what-to-post.html`
   - `index.html`
   - `README.md`
   - etc.
4. Click **Commit changes**

---

## Step 4 — Create a Gist (for checklist persistence)

1. Go to gist.github.com (signed in as mr-nic)
2. Click **+** (top right) to create a new Gist
3. Filename: `zsu-state.json`
4. Content: `{}`
5. Set to **Secret** (not public)
6. Click **Create secret gist**
7. Copy the Gist ID from the URL:
   `https://gist.github.com/mr-nic/` **`THIS_LONG_STRING_IS_THE_ID`**

---

## Step 5 — Create a Personal Access Token (PAT)

1. Go to github.com → **Settings** (your profile, top right)
2. Scroll to **Developer settings** (bottom of left sidebar)
3. **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token (classic)**
5. Note: `zsutherapy-gist`
6. Expiration: **No expiration** (or 1 year)
7. Scopes: tick **gist** only
8. Click **Generate token**
9. **Copy the token immediately** — you won't see it again

---

## Step 6 — Add Gist ID and token to zsu-core.js

1. In the repo, open `js/zsu-core.js`
2. Click the pencil icon to edit
3. Find these two lines near the top:
   ```
   const GIST_ID  = 'YOUR_GIST_ID_HERE';
   const GH_TOKEN = 'YOUR_PAT_HERE';
   ```
4. Replace `YOUR_GIST_ID_HERE` with the ID from Step 4
5. Replace `YOUR_PAT_HERE` with the token from Step 5
6. Click **Commit changes**

---

## Step 7 — Test everything

1. Visit `https://mr-nic.github.io/zsutherapy`
2. Enter password: `ZSU2026` (or whatever you set)
3. Click a checklist file
4. Tick a few boxes
5. Close the tab, reopen — boxes should still be ticked

---

## Sharing with Zsu

Send her this URL: `https://mr-nic.github.io/zsutherapy`  
And the password separately (WhatsApp or Signal, not email).

She enters the password once per browser session.  
Her progress saves automatically to the Gist.

---

## Changing the password

1. Open `js/zsu-core.js` in GitHub
2. Line 4: `const ZSU_PWD = btoa('ZSU2026');`
3. Change `ZSU2026` to the new password
4. Commit — takes effect immediately

---

## Sharing with a designer (website folder)

Send them the direct URL to the website folder:  
`https://mr-nic.github.io/zsutherapy/website/design-brief.html`

Same password. They only need that one URL.

---

## GitHub Desktop (optional — easier file management)

If you'd rather drag and drop files than use the GitHub web interface:

1. Download GitHub Desktop from desktop.github.com
2. Sign in as mr-nic
3. Clone the zsutherapy repo to your computer
4. Drag files in, make changes locally
5. Hit **Commit to main** then **Push origin**
6. Changes go live in ~60 seconds
