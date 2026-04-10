# 🪟 Inception Dashboard — Windows Setup Guide

Your dashboard package is ready! Follow these steps to get it running on Windows.

## 📋 Pre-requisites

You need **one** of these (you probably already have Python):
- **Python 3** (recommended — pre-installed on most systems)
- **Node.js** (optional, but faster)

### Check if you have Python:
1. Open **Command Prompt** (`Win+R` → type `cmd` → Enter)
2. Type: `python --version`
3. If you see a version number, you're good! Skip to **Quick Start**
4. If you get "not recognized", install from: https://www.python.org/downloads/

### Check if you have Node.js (optional):
1. Open **Command Prompt**
2. Type: `node -v`
3. If you see a version, Node.js is installed
4. To install Node.js: https://nodejs.org/ (LTS version recommended)

---

## ⚡ Quick Start (Choose One Method)

### Method 1: Python (Recommended - Easiest)

1. **Open the `inception-dashboard` folder** you extracted
2. **Right-click in the folder** → Select **Open in Terminal**
3. **Copy-paste this command:**
   ```
   python -m http.server 3000
   ```
4. **Press Enter**
5. **Open your browser** and go to: `http://localhost:3000/dashboard/overview`

That's it! You should see the dashboard.

### Method 2: Windows Batch File

1. **Double-click `START_DASHBOARD.bat`** in the extracted folder
2. A **black command window** will appear
3. **Wait 3-5 seconds** for the server to start
4. A **browser window should open** automatically
5. If not, open your browser and go to: `http://localhost:3000/dashboard/overview`

### Method 3: Node.js (Fastest - If You Have It)

1. **Open Terminal in the dashboard folder**
2. **Run:**
   ```
   npm install
   npm start
   ```
3. **Open your browser** to: `http://localhost:3000/dashboard/overview`

---

## 🎯 What to Expect

- ✅ Left sidebar with navigation (Overview, Growth, Technology, Delivery, Corporate, OKRs)
- ✅ Click any page to view detailed dashboards
- ✅ Click cards to drill down into department details
- ✅ Share button to copy links
- ✅ Export button to print as PDF
- ✅ Dark theme optimized for visibility

---

## 🔧 Troubleshooting

### Issue: "Address already in use"
**Solution:** Use a different port number:
```
python -m http.server 3001
```
Then open: `http://localhost:3001/dashboard/overview`

### Issue: Pages show blank or 404 errors
**Solution:** Make sure you're going to the full URL:
- ❌ Don't use: `http://localhost:3000`
- ✅ Do use: `http://localhost:3000/dashboard/overview`

### Issue: Python command not found
**Solution:** Install Python from https://www.python.org/downloads/
- During installation, **CHECK** "Add Python to PATH"
- Then restart Command Prompt and try again

### Issue: Batch file won't run
**Solution:** Open Command Prompt and run manually:
```
cd path\to\inception-dashboard
python -m http.server 3000
```

### Issue: Browser won't open automatically
**Solution:** Copy and paste into your browser manually:
```
http://localhost:3000/dashboard/overview
```

---

## 📱 Sharing with Your Team

1. **Send the `inception-dashboard.zip` file** to your team
2. **They extract it** on their Windows/Mac computer
3. **They run `START_DASHBOARD.bat`** (Windows) or `START_DASHBOARD.sh`** (Mac)
4. **Done!** No installation, no servers, just open and view

---

## ❓ Still Having Issues?

1. **Check the Python version:** `python --version` (should be 3.x)
2. **Check you're using the right URL:** `http://localhost:3000/dashboard/overview`
3. **Make sure the terminal is still running** (don't close it until you're done)
4. **Check if another app is using port 3000** (try port 3001 instead)

---

## 🎓 How It Works

- Your computer acts as a local **web server**
- The dashboard pages are **pre-compiled and ready to run**
- No internet connection needed
- No installation required for your team
- Everything is **self-contained in the zip file**

---

**That's it! You're all set. Enjoy your dashboard! 📊**
