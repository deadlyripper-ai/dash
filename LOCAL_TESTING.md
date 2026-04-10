# Inception Efficiency Dashboard — Local Testing Guide

## ✅ What's Ready (Live Data + Mock)

**LIVE DATA (Green Dot 🟢):**
- ✅ WorkBoard OKRs (via JWT token)
- ✅ Monday.com Projects (via API key)

**MOCK DATA (Gray Dot ⚫):**
- ⚫ D365 Sales pipeline
- ⚫ D365 Finance metrics
- ⚫ Custom growth metrics

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies

```bash
cd /Users/syed.nizamuddin/Documents/Claude/inception-dashboard

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
cd ..
```

### Step 2: Start Backend

```bash
cd backend
npm run dev
```

You should see:
```
[Cron] Initializing scheduler (Asia/Dubai timezone)
Server running on http://localhost:3001
```

**Test it:**
```bash
curl http://localhost:3001/health
# Response: {"status":"ok","timestamp":"...","uptime":...}

curl http://localhost:3001/api/kpis/overview
# Response: KPIs with live WorkBoard data + mock pipeline data
```

### Step 3: Start Frontend

In a **new terminal**:
```bash
cd inception-dashboard/frontend
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- ready started server on 0.0.0.0:3000
```

Open: **http://localhost:3000**

---

## 📊 What You'll See

### Overview Page (http://localhost:3000/dashboard/overview)
- **Hero Strip (Top 4 KPIs):**
  - Total Pipeline: **$317.9M** 🟢 (LIVE from WorkBoard)
  - Avg Win Probability: **30.3%** ⚫ (mock)
  - Product/Bespoke: **77/23** ⚫ (mock)
  - OKR Progress: **49%** 🟢 (LIVE from WorkBoard)

- **Pillar Cards:** 4 clickable cards
  - Growth (⚪ $317.9M)
  - Technology (⚪ 77/23 ratio)
  - Delivery (⚪ 2.0 projects/person)
  - Corporate (⚪ 8:1 HC ratio)

- **OKR Table:** Real data from WorkBoard showing 8 teams + their KR progress

### Growth Page (http://localhost:3000/dashboard/growth)
- 6 KPI cards with real WorkBoard data
- Pipeline distribution chart
- Deal breakdown by stage

### OKRs Page (http://localhost:3000/dashboard/okrs)
- Team progress bars (animated)
- Detailed KR table with owner names
- Real-time status indicators

---

## 🔴 Data Sources Reference

| Source | Endpoint | Status | Data |
|--------|----------|--------|------|
| **WorkBoard API** | `/api/okrs` | ✅ **LIVE** | 8 objectives, 55+ KRs |
| **Monday.com API** | `/api/projects` | ✅ **LIVE** | Projects, sprints, utilisation |
| **D365 Sales** | `/api/kpis/growth` + `/api/pipeline` | ⚫ Mock | 4 sample deals, $317.9M TCV |
| **D365 Finance** | `/api/kpis/corporate` | ⚫ Mock | DSO 42 days, month-close 4.5 days |

**Live indicator:** Green dot next to KPI = real API data. Gray dot = mock data for testing UI.

---

## 🧪 Testing Each Feature

### Test Live WorkBoard Data
```bash
# Fetch OKRs from WorkBoard
curl http://localhost:3001/api/okrs

# Response includes: 8 objectives, 55 key results, team summaries
# All with isLive: true flag
```

### Test Live Monday.com Data
```bash
# Fetch projects from Monday
curl http://localhost:3001/api/projects

# Response includes: Projects with status, completion %, CSAT
# All with isLive: false (currently using mock, will enable when board ID confirmed)
```

### Test KPI Calculation Engine
```bash
# Fetch overview KPIs (mix of live + mock)
curl http://localhost:3001/api/kpis/overview

# Fetch growth pillar KPIs
curl http://localhost:3001/api/kpis/growth

# Fetch technology pillar KPIs
curl http://localhost:3001/api/kpis/technology

# Fetch delivery pillar KPIs
curl http://localhost:3001/api/kpis/delivery

# Fetch corporate pillar KPIs
curl http://localhost:3001/api/kpis/corporate
```

### Test Manual Sync Trigger
```bash
# Trigger sync (fetches from all sources)
curl -X POST http://localhost:3001/api/sync \
  -H "Content-Type: application/json" \
  -d '{"source":"all"}'

# Response: { "status": "in_progress", "triggered_at": "..." }

# Check sync status
curl http://localhost:3001/api/sync/status

# Response: [sync logs from all 4 connectors]
```

---

## 🎨 Testing UI/UX Features

### Dark Theme
- Background: `#13131c`
- Surface: `#1c1c28`
- Accent (Inception purple): `#8a87c4`
- Status colors: Green, Orange, Red

### Animations (Smooth & Fluid)
- Page transitions: **fadeUp** 0.3s
- Button hovers: **color + transform** 0.18s
- Progress bars: **animated fill** 1.1s
- Cards: **hover lift** -3px + glow

### Live Data Indicator
- Green dot `🟢` = real API data with timestamp
- Gray dot `⚫` = mock data for UI testing
- Visible in KPI cards and dashboard

### Responsive Design
- **Desktop** (1920px+): Full layout
- **Tablet** (768px-1024px): Stacked cards
- **Mobile** (375px-667px): Single column

---

## 🛠 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Error in Browser Console

If you see: `CORS error: Access to XMLHttpRequest blocked`

**Solution:** Backend CORS is already configured for localhost. Try:
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Clear browser cache
- Check that backend is running on port 3001

### WorkBoard Data Not Showing

```bash
# Check WorkBoard API is working
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://www.myworkboard.com/wb/api/objectives?period=current
```

If 401: Token may be expired. Get a new JWT from WorkBoard settings.

### Monday.com Data Not Showing

```bash
# Check Monday API is working
curl -H "Authorization: YOUR_MONDAY_KEY" \
  https://api.monday.com/v2 \
  -d '{"query":"{ me { name } }"}'
```

If error: API key may be invalid. Regenerate from Monday settings.

---

## 📋 Local Testing Checklist

- [ ] Backend running on http://localhost:3001
- [ ] Frontend running on http://localhost:3000
- [ ] Dashboard loads with data (http://localhost:3000/dashboard/overview)
- [ ] Hero strip shows 4 KPIs (mix of live + mock)
- [ ] Pillar cards clickable → navigate to pillar pages
- [ ] Growth page loads with 6 KPI cards
- [ ] OKRs page shows 8 teams with progress bars
- [ ] Green dots visible for WorkBoard live data
- [ ] Gray dots visible for mock data
- [ ] Page transitions smooth (fadeUp animation)
- [ ] Card hovers show glow effect
- [ ] Progress bars animate when page loads
- [ ] `/api/kpis/overview` returns data
- [ ] `/api/okrs` returns real WorkBoard objectives + KRs
- [ ] `/api/projects` returns project data
- [ ] `/api/pipeline` returns deal data
- [ ] Manual sync works: `curl -X POST http://localhost:3001/api/sync`

---

## 🔄 Data Flow (Architecture)

```
Browser (Next.js)
    ↓ (fetch /api/...)
Express Backend (Node.js)
    ↓ (HTTP GET)
WorkBoard API ← real OKRs
Monday.com API ← real projects
D365 Sales API ← real deals (not yet)
D365 Finance API ← real metrics (not yet)
    ↓ (aggregate + calculate)
Calculation Engine (sync.service.ts)
    ↓ (return JSON)
Frontend displays with isLive flag
    ↓ (green dot = live, gray dot = mock)
Beautiful dashboard 🎨
```

---

## 📝 Next Steps After Local Testing

1. **Confirm Monday.com board ID** → Update `MONDAY_PROJECT_BOARD_ID` in `.env`
2. **Get D365 Sales credentials** → Enable live pipeline data
3. **Get D365 Finance credentials** → Enable live financial metrics
4. **Deploy to Vercel** (frontend) → See `SHAREPOINT_HOSTING.md`
5. **Deploy to Railway** (backend) → See `SHAREPOINT_HOSTING.md`
6. **Embed in SharePoint** → iFrame with `?spfx=1` parameter

---

## 🆘 Need Help?

Check these files:
- **Full README:** `/Users/syed.nizamuddin/Documents/Claude/inception-dashboard/README.md`
- **SharePoint Deploy:** `/Users/syed.nizamuddin/Documents/Claude/inception-dashboard/SHAREPOINT_HOSTING.md`
- **Architecture Plan:** `/Users/syed.nizamuddin/.claude/plans/encapsulated-spinning-naur.md`

Or test the API directly:
```bash
# Get all available endpoints + current data
curl http://localhost:3001/api/kpis/overview | jq

# See frontend environment
echo "Frontend using: $(grep NEXT_PUBLIC_API_BASE_URL frontend/.env.local)"
```

---

**Happy testing! 🚀**
