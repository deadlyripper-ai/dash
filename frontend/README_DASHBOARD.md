# 📊 Inception Dashboard — Standalone Build

This is a self-contained dashboard package that your entire team can open and view in a web browser.

## ⚡ Quick Start (30 seconds)

### Mac Users:
1. Double-click `START_DASHBOARD.sh` (or right-click → Open)
2. Your browser will open automatically to `http://localhost:3000`
3. Click pages in the sidebar to navigate
4. Drill down into any section for details
5. Close the Terminal window when done

### Windows Users:
1. Open `Command Prompt` or `PowerShell`
2. Navigate to this folder: `cd path\to\dashboard`
3. Run: `python -m http.server 3000`
4. Open browser to: `http://localhost:3000`
5. Close the terminal when done

## 📱 What You Can Do

- **Navigate**: Click any section in the left sidebar (Overview, Growth, Technology, Delivery, Corporate, OKRs)
- **Drill Down**: Click on cards to see detailed insights and department breakdowns
- **Filter**: Use filters within each page to narrow down data
- **Share**: Use the Share button in the topbar to copy the page link
- **Export/Print**: Use the Export button to print or save as PDF

## 🔧 Technical Details

- **Built with**: Next.js 14 + React 18
- **Framework**: Standalone production build
- **Port**: Default 3000 (change if needed)
- **Theme**: Dark mode optimized
- **Mobile Ready**: Works on tablets and mobile browsers

## ❓ Troubleshooting

**"Address already in use" error?**
- Another app is using port 3000
- Try: `python -m http.server 3001` (use port 3001 instead)
- Then open: `http://localhost:3001`

**Can't find START_DASHBOARD.sh?**
- Open Terminal
- Navigate to this folder
- Run: `python -m http.server 3000`

**Pages are blank or not loading?**
- Make sure you're at `http://localhost:3000/dashboard/overview`
- Not just `http://localhost:3000`

## 📂 Folder Structure

```
inception-dashboard/
├── .next/              ← Production build (pre-compiled)
├── public/             ← Static assets
├── START_DASHBOARD.sh  ← Click to start
├── server.js           ← Node.js server (optional)
└── README_DASHBOARD.md ← This file
```

## 💾 Important Notes

- All data is **hard-coded** (no live backend required)
- Changes don't persist when you close — it's read-only
- Perfect for demos, sharing insights, offline viewing
- Team members don't need to install anything

---

**Questions?** Check that your port isn't already in use, and try a different port number.
