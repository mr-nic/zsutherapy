# zsutherapy

Private project files for Zsu Therapy — marketing strategy tools and website redesign.

**Owner:** mr-nic  
**Client:** Zsu Therapy · @zsutherapy · Brockley SE4  
**Live URL:** https://mr-nic.github.io/zsutherapy

---

## Structure

```
/
├── index.html          ← password-protected landing page
├── js/
│   └── zsu-core.js     ← shared password + Gist persistence
├── marketing/          ← Zsu-facing strategy tools
│   ├── what-to-post.html
│   ├── instagram-setup.html
│   ├── retention-referral.html
│   ├── questionnaire.html
│   ├── google-business-profile.html
│   └── strategy-gaps.html
└── website/            ← designer-facing mockups and brief
    ├── design-brief.html
    └── mockups/
```

---

## Password

All pages share one password. To change it:

1. Open `js/zsu-core.js`
2. Find line: `const ZSU_PWD = btoa('ZSU2026');`
3. Replace `ZSU2026` with your new password
4. Save and push

---

## Checklist persistence (Gist)

Checkbox state saves to a GitHub Gist so Zsu's progress persists across devices.  
See `SETUP.md` for one-time configuration.

---

## Adding or updating files

1. Go to the file in GitHub (github.com/mr-nic/zsutherapy)
2. Click the pencil icon to edit, or drag a new file into the folder
3. Commit changes — GitHub Pages updates within ~60 seconds
